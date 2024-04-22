import axios from "axios";
import { url } from "./constUrlApi";
import {
  checkEmail,
  checkEmptyValue,
  checkRussianLetters,
  checkSpaces,
} from "./validation";
export const makeOrder = async (email, name, items, address) => {
  if (!checkEmail(email)) {
    return "Неверный формат электронной почты!";
  }
  if (
    !checkEmptyValue(email) ||
    !checkEmptyValue(name) ||
    !checkEmptyValue(address)
  ) {
    return "Все поля должны быть заполнены!";
  }
  if (!checkSpaces(name) || !checkSpaces(email)) {
    return "Пробелы в начале или конце строк недопустимы!";
  }
  if (!checkRussianLetters(name)) {
    return "В поле имени должны быть русские буквы";
  }

  const itemsData = items.map((item) => ({
    _id: item._id,
    quantity: item.quantity,
  }));
  try {
    const response = await axios.post(`${url}/api/makeOrder`, {
      email: email,
      name: name,
      items: itemsData,
      address: address,
    });
    return true;
  } catch (error) {
    return "Ошибка!";
  }
};
