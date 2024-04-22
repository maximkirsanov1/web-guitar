import React, { useContext, useState } from "react";
import "./Cart.scss";
import { CartContext } from "../../App";

export default function Cart() {
  const { cart, removeFromCart, plusItem, minusItem } = useContext(CartContext);
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity * item.cost;
    }, 0);
  };
  return (
    <></>
    // <div className="cart">
    //   <h2>Корзина</h2>
    //   <ul className="cart__items">
    //     {cart.map((item, index) => (
    //       <li key={index} className="cart__item">
    //         <img src={item.img} alt="" className="cart__img" />
    //         <h4 className="cart__title">{item.title}</h4>
    //         <div className="cart__price">{item.quantity * item.cost} р.</div>
    //         <div className="cart__quantity-block">
    //           <button
    //             className="button cart__minus-item"
    //             onClick={() => {
    //               minusItem(item._id);
    //             }}
    //           >
    //             -
    //           </button>
    //           <div type="text" name="" id="" className="cart__quantity">
    //             {item.quantity}{" "}
    //           </div>
    //           <button
    //             className="button cart__plus-item"
    //             onClick={() => {
    //               plusItem(item._id);
    //             }}
    //           >
    //             +
    //           </button>
    //         </div>
    //         <button
    //           className="button button-remove"
    //           onClick={() => removeFromCart(item._id)}
    //         >
    //           del
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    //   {cart.length > 0 ? (
    //     <div className="cart__summ">
    //       <h3 className="cart__summ__price">Итого: {calculateTotal()} р.</h3>
    //       <button className="cart__summ__offer">
    //         <div className="cart__summ__offer-text">Оформить заказ</div>
    //       </button>
    //     </div>
    //   ) : (
    //     ""
    //   )}
    // </div>
  );
}
