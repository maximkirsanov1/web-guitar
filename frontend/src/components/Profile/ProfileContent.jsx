import "./Profile.scss";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { getOrders } from "../../../api/getOrders";
import { logout } from "../../../api/logout";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../App";
import Rating from "../Rating/Rating.jsx";

export default function ProfileContent() {
  const { setIsLoading, closeLoader } = useContext(LoaderContext);
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const handleGetOrders = async () => {
    const orders = await getOrders(user.email);
    setOrders(orders);

    closeLoader();
  };
  useEffect(() => {
    setIsLoading(true);
    if (user) {
      handleGetOrders();
    }
  }, [user]);
  return (
    <>
      <div className="profile">
        <div className="profile__info">
          <h1 className="profile__name">{user.name}</h1>
          <h3 className="profile__email">{user.email}</h3>
          <button
            className="profile__exit"
            onClick={() => logout(removeCookie, navigate)}
          >
            Выйти
          </button>
        </div>
        <div className="orders">
          <h2 className="orders__title">История заказов</h2>
          <ul className="orders__list">
            {orders.map((order, index) => (
              <li className="orders__order" key={index}>
                <div className="orders__order__id">Заказ №{order._id}</div>
                <div className="orders__order__date">{order.creationDate}</div>
                <div className="orders__order__address">{order.address}</div>
                <ul className="orders__order__items">
                  {order.items.map((item, index) => (
                    <li className="orders__order__item" key={index}>
                      <div className="orders__order__number">{index + 1}.</div>
                      <img src={item.img} alt="" />
                      <div className="orders__order__title">
                        {item.item.title}
                      </div>
                      <div className="orders__order__count">
                        {item.quantity}
                      </div>
                      <div className="orders__order__price">
                        {item.price} р.
                      </div>
                      <Rating
                        id={item.item._id}
                        isRated={item.rated}
                        rating={item.rating}
                      ></Rating>
                    </li>
                  ))}
                </ul>
                <div className="orders__order__total">
                  Итог: {order.total} р.
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
