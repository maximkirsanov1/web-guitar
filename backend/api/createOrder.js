import { OrderModel } from "../schemas/orderSchema.js";
import { ItemModel } from "../schemas/itemSchema.js";
import { UserModel } from "../schemas/userSchema.js";

export const createOrder = async (email, name, items, address) => {
  const orderItems = [];
  let total = 0;
  for (const item of items) {
    const { _id, quantity } = item;
    const foundItem = await ItemModel.findById(_id);

    if (!foundItem) {
      throw new Error(`Item with _id ${_id} not found`);
    }

    const ratedItem = await OrderModel.findOne({
      "items.item": _id,
      "items.rated": true,
      "user.name": name,
    });
    let rating = 0;
    if (ratedItem) {
      rating = ratedItem.items.find(
        (i) => i.item.toString() === _id.toString()
      ).rating;
    }

    await ItemModel.findByIdAndUpdate(_id, { $inc: { countOrders: 1 } });
    const price = quantity * foundItem.cost;
    total += price;
    orderItems.push({
      item: foundItem._id,
      quantity,
      price,
      rated: ratedItem ? true : false,
      rating: rating,
    });
  }
  try {
    const newOrder = new OrderModel({
      items: orderItems,
      user: {
        userEmail: email,
        name: name,
      },
      address: address,
      total: total,
    });
    const savedOrder = await newOrder.save();
    const user = await UserModel.findOne({ email: email });
    if (user) {
      user.orders.push(savedOrder);
      await user.save();
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
