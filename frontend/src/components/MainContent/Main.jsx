import "./Main.scss";
import { getItems } from "../../../api/getItems.js";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../App.jsx";
import findSvg from "../../assets/find.svg";
import editSvg from "../../assets/edit.svg";
import deleteSvg from "../../assets/delete.svg";
import { ModalContext } from "../../App.jsx";
import { deleteItem } from "../../../api/deleteItem.js";
import { UserContext } from "../../App.jsx";
import { LoaderContext } from "../../App.jsx";
import StarSvg from "../svg/starSvg.jsx";
import plusItemJpg from "../../assets/plusItem.jpg";
import { Link } from "react-router-dom";

export default function MainContent() {
  const { setIsLoading, closeLoader } = useContext(LoaderContext);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const { cart, addToCart } = useContext(CartContext);
  const findItemRef = useRef();
  const { openModal } = useContext(ModalContext);
  const { user } = useContext(UserContext);
  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      await handleGetItems();
    } catch (error) {
      return;
    }
  };
  const changeCategory = (category) => {
    if (category === "Все") {
      setFilteredItems(items);
    } else {
      const filteredItems = items.filter((item) => item.category === category);
      setFilteredItems(filteredItems);
    }
    setActiveCategory(category);
  };
  const handleGetItems = async () => {
    const items = await getItems();
    setItems(items);
    setFilteredItems(items);
    closeLoader();
  };
  const findItems = () => {
    const searchValue = findItemRef.current.value.toLowerCase();
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
    if (filteredItems.length > 0) {
      setFilteredItems(filteredItems);
    } else {
      setFilteredItems(items);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    handleGetItems();
  }, []);
  return (
    <>
      <div className="main">
        <div className="main__menu">
          <div className="main__categories">
            {[
              "Все",
              "Акустические",
              "Электрогитары",
              "Бас-гитары",
              "Усилители",
            ].map((category, index) => (
              <button
                key={index}
                className={`main__category ${
                  activeCategory === category ? "main__category--active" : ""
                }`}
                onClick={() => changeCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="main__find">
            <input
              type="text"
              className="main__find__input"
              ref={findItemRef}
              onChange={findItems}
              placeholder="Поиск"
            />
            <img src={findSvg} alt="" className="main__find__img" />
          </div>
        </div>
        <ul className="items">
          {!user || user.role === "user" ? (
            ""
          ) : (
            <>
              <li className="item" onClick={() => openModal("addItem")}>
                <div className="img-block">
                  <img src={plusItemJpg} alt="" />
                </div>
              </li>
            </>
          )}

          {filteredItems.map((item, index) => {
            const isInCart = cart.some((cartItem) => cartItem._id === item._id);
            return (
              <li key={index} data-id={item._id} className="item">
                <Link to={`/product/${item._id}`} className="link">
                  <div className="img-block">
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
                </Link>
                <div className="item__about">
                  <h2 className="item__title">{item.title}</h2>
                  <h4 className="item__category">{item.category}</h4>
                </div>
                <div className="item__bottom">
                  <div className="item__buy">
                    <div className="item__cost">{item.cost} р.</div>
                    {isInCart ? (
                      <button
                        className="button button-add button-add--active"
                        disabled={true}
                      >
                        В корзине
                      </button>
                    ) : (
                      <button
                        className="button button--add"
                        onClick={() => addToCart(item)}
                      >
                        В корзину
                      </button>
                    )}
                  </div>

                  {!user || user.role === "user" ? (
                    ""
                  ) : (
                    <>
                      <div className="buttons">
                        <button
                          className="button button--edit"
                          onClick={() => openModal("edit", item)}
                        >
                          <img src={editSvg} alt="" />
                        </button>
                        <button
                          className="button button--delete"
                          onClick={() => handleDeleteItem(item._id)}
                        >
                          <img src={deleteSvg} alt="" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
