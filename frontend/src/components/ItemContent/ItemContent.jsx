import { useEffect, useState } from "react";
import "./ItemContent.scss";
import StarSvg from "../svg/starSvg";
import { LoaderContext } from "../../App";
import { CartContext } from "../../App";
import { UserContext } from "../../App";
import { ModalContext } from "../../App";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../../../api/getItem";
import { getReviews } from "../../../api/getReviews";
import Rating from "../Rating/Rating";

export default function ItemContent() {
  const { closeLoader } = useContext(LoaderContext);
  const { user } = useContext(UserContext);
  const { openModal } = useContext(ModalContext);
  const { cart, addToCart } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  const handleGetItem = async () => {
    const item = await getItem(id);
    const reviews = await getReviews(id);
    if (reviews) {
      setReviews(reviews);
    }

    if (item) {
      setItem(item);
      const cartItem = cart.find((cartItem) => cartItem._id === item._id);
      if (cartItem) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }

      return;
    }
    alert("This item does not exist");
  };

  useEffect(() => {
    handleGetItem();
    closeLoader();
  }, []);

  useEffect(() => {
    if (item) {
      const cartItem = cart.find((cartItem) => cartItem._id === item._id);
      if (cartItem) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    }
  }, [cart]);

  return (
    <>
      {item ? (
        <>
          <div className="item-content">
            <div className="item-block">
              <div className="item-block__top">
                <h2 className="item-block__title">{item.title}</h2>
                <h4 className="item-block__category">{item.category}</h4>
              </div>

              <div className="item-block__middle">
                <div className="item-block__img-block">
                  <img src={item.img} alt="" loading="lazy" />
                  {item.rating !== 0 ? (
                    <div className="item__rating">
                      {item.rating}
                      <StarSvg></StarSvg>
                      <div className="item__rating__count">{` (${item.ratingCount})`}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="item-block__description-block">
                  <p className="item-block__description">{item.description}</p>
                </div>
                <div className="item-block__buttons">
                  {!user || user.role === "user" ? (
                    ""
                  ) : (
                    <>
                      <button
                        className="item-block__button item-block__button--edit"
                        onClick={() => openModal("edit", item)}
                      >
                        Изм
                      </button>
                      <button className="item-block__button item-block__button--delete"></button>
                    </>
                  )}
                  {isInCart ? (
                    <button
                      className="item-block__button item-block__button-add item-block__button-add--active"
                      disabled={true}
                    >
                      В корзине
                    </button>
                  ) : (
                    <button
                      className="item-block__button item-block__button--add"
                      onClick={() => addToCart(item)}
                    >
                      В корзину
                    </button>
                  )}
                </div>
              </div>
              <div className="item-block__cost">{item.cost} р.</div>
              <ul className="item-block__features">
                {item.propertyArray.map((property, index) => (
                  <li key={index} className="item-block__feature">
                    <div className="item-block__feature__name">
                      {property.property}:
                    </div>
                    <div className="item-block__feature__value">
                      {property.value}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reviews">
              <h3 className="reviews__title">Отзывы</h3>
              <ul className="reviews__list">
                {reviews.map((review, index) => (
                  <li className="reviews__review" key={index}>
                    <div className="reviews__review__about">
                      <div className="reviews__review__name">{review.name}</div>
                      <Rating
                        id={id}
                        isRated={true}
                        rating={review.rating}
                      ></Rating>
                    </div>
                    <div className="reviews__review__text">{review.value}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
