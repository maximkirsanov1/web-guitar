import "./Modal.scss";
import { ModalContext, UserContext } from "../../App";
import { useContext, useEffect, useRef, useState } from "react";
import { registration } from "../../../api/registration";
import { validation } from "../../../api/validation";
import closeSvg from "../../assets/close.svg";
import { authorization } from "../../../api/authorization";
import { useCookies } from "react-cookie";
import { CartContext } from "../../App";
import Cart from "../Cart/Cart";
import { addItem } from "../../../api/addItem";
import { editItem } from "../../../api/editItem";
import { makeOrder } from "../../../api/makeOrder";
import { apiFindAddress } from "../../../api/apiFindAddress";
import Rating from "../Rating/Rating";
import { sendRating } from "../../../api/sendRating";

export default function Modal() {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [error, setError] = useState(null);
  const { cart, removeFromCart, plusItem, minusItem, calculateTotal, setCart } =
    useContext(CartContext);
  const { modal, openModal, closeModal } = useContext(ModalContext);
  const { user } = useContext(UserContext);
  const emailLogin = useRef();
  const passLogin = useRef();
  const nameReg = useRef();
  const emailReg = useRef();
  const passReg = useRef();
  const pass2Reg = useRef();
  const title = useRef();
  const cost = useRef();
  const img = useRef();
  const category = useRef();
  const imgEdit = useRef();
  const address = useRef();
  const description = useRef();
  const property = useRef();
  const review = useRef();
  const [idItem, setIdItem] = useState(null);
  const isAddress = useRef(false);
  const [addresses, setAddreses] = useState([]);
  const [currentRating, setCurrentRating] = useState(null);
  const [reviewLength, setReviewLength] = useState(0);

  const handleScroll = (e, textarea) => {
    const textArea = textarea.current;
    const label = textArea.nextSibling;
    if (e.target.scrollTop > 0) {
      label.style.opacity = "0";
    } else {
      label.style.opacity = "1";
    }
  };

  const handleSendRating = async (e) => {
    e.preventDefault();
    await sendRating(idItem, currentRating, review.current.value);
  };

  const handleMakeOrder = async (e) => {
    e.preventDefault();
    if (!isAddress || addresses.length > 0) {
      setError("Неверно введен адрес");
      return;
    }
    const response = await makeOrder(
      emailReg.current.value,
      nameReg.current.value,
      cart,
      address.current.value
    );
    if (response !== true) {
      setError(response);
    } else {
      setCart([]);
      closeModal();
    }
    try {
    } catch (error) {
      return;
    }
  };

  const selectAddress = async (e, newAddress) => {
    e.preventDefault();
    if (addresses.length === 1) {
      setAddreses([]);
      address.current.value = newAddress;
      isAddress.current = true;
      return;
    }
    if (newAddress !== address.current.value) {
      address.current.value = newAddress;
      await findAddress(address);
    } else {
      address.current.value = newAddress;
      setAddreses([]);
    }
  };

  const findAddress = async (address) => {
    inputChange(address);
    const currentAddress = address.current.value;
    if (currentAddress.length > 6) {
      const addresses = await apiFindAddress(currentAddress);
      setAddreses(addresses);
    } else {
      setAddreses([]);
    }
  };
  const inputChange = (inputRef) => {
    setError(null);
    const input = inputRef.current;
    const label = input.nextSibling;
    if (input.value.trim() !== "") {
      label.classList.add("label--active");
    } else {
      label.classList.remove("label--active");
    }
    if (inputRef === review) {
      setReviewLength(input.value.length);
    }
  };

  const changeImg = (e) => {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      imgEdit.current.src = dataURL;
    };
    if (img) {
      reader.readAsDataURL(img);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const check = validation({
      email: emailLogin.current.value,
      pass: passLogin.current.value,
    });
    if (check === true) {
      const response = await authorization(
        emailLogin.current.value,
        passLogin.current.value,
        setCookie
      );
      if (response) {
        alert("Вы вошли в аккаунт!");
        closeModal();
      } else {
        setError("Неверные почта или пароль! Попробуйте еще раз.");
      }
    } else {
      setError(check);
    }
  };
  const signUp = async (e) => {
    e.preventDefault();
    const check = validation({
      name: nameReg.current.value,
      email: emailReg.current.value,
      pass: passReg.current.value,
      pass2: pass2Reg.current.value,
    });
    if (check === true) {
      const response = await registration(
        nameReg.current.value,
        emailReg.current.value,
        passReg.current.value,
        setCookie
      );
      if (response === true) {
        alert("Аккаунт успешно создан!");
        closeModal();
      } else {
        setError("Аккаунт с таким электронным адресом уже существует.");
      }
    } else {
      setError(check);
    }
  };
  useEffect(() => {
    if (modal.typeModal === "order" && user) {
      nameReg.current.value = user.name;
      emailReg.current.value = user.email;
      const labelName = nameReg.current.nextSibling;
      const labelEmail = emailReg.current.nextSibling;
      labelName.classList.add("label--active");
      labelEmail.classList.add("label--active");
    }
    if (modal.typeModal === "edit") {
      if (modal.data) {
        title.current.value = modal.data.title;
        cost.current.value = modal.data.cost;
        description.current.value = modal.data.description;
        const propertyString = modal.data.propertyArray.reduce(
          (acc, curr, index, array) => {
            if (index === array.length - 1) {
              return acc + curr.property + ": " + curr.value;
            } else {
              return acc + curr.property + ": " + curr.value + "\n";
            }
          },
          ""
        );
        property.current.value = propertyString;
        const labelTitle = title.current.nextSibling;
        const labelCost = cost.current.nextSibling;
        const labelDescr = description.current.nextSibling;
        const labelProperty = property.current.nextSibling;
        labelTitle.classList.add("label--active");
        labelCost.classList.add("label--active");
        labelDescr.classList.add("label--active");
        labelProperty.classList.add("label--active");
        category.current.value = modal.data.category;
        imgEdit.current.src = modal.data.img;
        setIdItem(modal.data._id);
      }
    }
    if (modal.typeModal === "addItem") {
      title.current.value = null;
      category.current.value = "Акустические";
      cost.current.value = null;
      img.current.files = null;
      img.current.value = null;
      imgEdit.current.src = "";
      const labelTitle = title.current.nextSibling;
      const labelCost = cost.current.nextSibling;
      labelTitle.classList.remove("label--active");
      labelCost.classList.remove("label--active");
    }
    if (modal.typeModal === "review") {
      if (modal.data) {
        setIdItem(modal.data.id);
        setCurrentRating(modal.data.rating);
      }
    }
  }, [modal]);

  return (
    <>
      <div className={`modal ${modal.isModal ? "" : "modal--hidden"}`}>
        <div className="modal__content">
          {modal.typeModal === "login" ? (
            <>
              <h2 className="modal__title">Авторизация</h2>
              <form className="modal__form">
                <div className="input__block">
                  <input
                    type="email"
                    id="email"
                    ref={emailLogin}
                    onChange={() => inputChange(emailLogin)}
                  />
                  <label htmlFor="email">Почта</label>
                </div>
                <div className="input__block">
                  <input
                    type="password"
                    id="pass"
                    ref={passLogin}
                    onChange={() => inputChange(passLogin)}
                  />
                  <label htmlFor="pass">Пароль</label>
                </div>
                <div className="modal__buttons">
                  <button
                    type="submit"
                    className="modal__button"
                    onClick={(e) => login(e)}
                  >
                    Войти
                  </button>
                  <button
                    type="submit"
                    className="modal__button modal__button--change"
                    onClick={() => openModal("signUp")}
                  >
                    Регистрация
                  </button>
                </div>
                <div className="modal__error">{error}</div>
              </form>
            </>
          ) : modal.typeModal === "signUp" ? (
            <>
              <h2 className="modal__title">Регистрация</h2>
              <form className="modal__form">
                <div className="input__block">
                  <input
                    type="text"
                    id="name"
                    ref={nameReg}
                    onChange={() => inputChange(nameReg)}
                  />
                  <label htmlFor="name">Имя</label>
                </div>
                <div className="input__block">
                  <input
                    type="email"
                    id="email"
                    ref={emailReg}
                    onChange={() => inputChange(emailReg)}
                  />
                  <label htmlFor="email">Почта</label>
                </div>
                <div className="input__block">
                  <input
                    type="password"
                    id="pass"
                    ref={passReg}
                    onChange={() => inputChange(passReg)}
                  />
                  <label htmlFor="pass">Пароль</label>
                </div>
                <div className="input__block">
                  <input
                    type="password"
                    id="pass2"
                    ref={pass2Reg}
                    onChange={() => inputChange(pass2Reg)}
                  />
                  <label htmlFor="pass2">Повторите пароль</label>
                </div>
                <div className="modal__buttons">
                  <button
                    type="submit"
                    className="modal__button"
                    onClick={(e) => signUp(e)}
                  >
                    Создать аккаунт
                  </button>
                  <button
                    type="submit"
                    className="modal__button modal__button--change"
                    onClick={() => openModal("login")}
                  >
                    Войти
                  </button>
                </div>
                <div className="modal__error">{error}</div>
              </form>
            </>
          ) : modal.typeModal === "cart" ? (
            <>
              <div className="cart">
                <h2>Корзина</h2>
                <ul className="cart__items">
                  {cart.map((item, index) => (
                    <li key={index} className="cart__item">
                      <img src={item.img} alt="" className="cart__img" />
                      <h4 className="cart__title">{item.title}</h4>
                      <div className="cart__price">
                        {item.quantity * item.cost} р.
                      </div>
                      <div className="cart__quantity-block">
                        <button
                          className="button cart__minus-item"
                          onClick={() => {
                            minusItem(item._id);
                          }}
                        >
                          -
                        </button>
                        <div
                          type="text"
                          name=""
                          id=""
                          className="cart__quantity"
                        >
                          {item.quantity}{" "}
                        </div>
                        <button
                          className="button cart__plus-item"
                          onClick={() => {
                            plusItem(item._id);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="button button-remove"
                        onClick={() => removeFromCart(item._id)}
                      >
                        del
                      </button>
                    </li>
                  ))}
                </ul>
                {cart.length > 0 ? (
                  <div className="cart__summ">
                    <h3 className="cart__summ__price">
                      Итого: {calculateTotal()} р.
                    </h3>
                    <button className="cart__summ__offer">
                      <div
                        className="cart__summ__offer-text"
                        onClick={() => openModal("order")}
                      >
                        Оформить заказ
                      </div>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : modal.typeModal === "order" ? (
            <>
              <>
                <h2 className="modal__title">Оформление заказа</h2>
                <form className="modal__form">
                  <div className="input__block">
                    <input
                      type="text"
                      id="name"
                      ref={nameReg}
                      onChange={() => inputChange(nameReg)}
                    />
                    <label htmlFor="name">Имя</label>
                  </div>
                  <div className="input__block">
                    <input
                      type="email"
                      id="email"
                      ref={emailReg}
                      onChange={() => inputChange(emailReg)}
                    />
                    <label htmlFor="email">Почта</label>
                  </div>
                  <div className="input__block address">
                    <input
                      type="text"
                      id="address"
                      ref={address}
                      onChange={() => findAddress(address)}
                    />
                    <label htmlFor="adress">Адрес</label>
                    <ul
                      className={`address__list ${
                        addresses.length > 0 ? "address__list--active" : ""
                      }`}
                    >
                      {addresses.map((address, index) => (
                        <li className="address__item" key={index}>
                          <button
                            className="address__button"
                            onClick={(e) => selectAddress(e, address.value)}
                          >
                            {address.value}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="modal__buttons">
                    <button
                      type="submit"
                      className="modal__button"
                      onClick={(e) => handleMakeOrder(e)}
                    >
                      Оформить заказ
                    </button>
                  </div>
                  <div className="modal__error">{error}</div>
                </form>
              </>
            </>
          ) : modal.typeModal === "addItem" ? (
            <>
              <h2 className="modal__title">Добавить товар</h2>
              <form className="modal__form">
                <div className="input__block">
                  <input
                    type="text"
                    id="title"
                    ref={title}
                    onChange={() => inputChange(title)}
                  />
                  <label htmlFor="title">Название</label>
                </div>
                <div className="input__block">
                  <select
                    name="category"
                    id="category"
                    className="admin__input-category"
                    ref={category}
                  >
                    <option value="Акустические">Акустические</option>
                    <option value="Бас-гитары">Бас-гитары</option>
                    <option value="Электрогитары">Электрогитары</option>
                    <option value="Усилители">Усилители</option>
                  </select>
                </div>
                <div className="input__block">
                  <input
                    type="text"
                    id="cost"
                    ref={cost}
                    onChange={() => inputChange(cost)}
                  />
                  <label htmlFor="cost">Стоимость</label>
                </div>
                <div className="input__block input__block--row">
                  <img src="" alt="" ref={imgEdit} />
                  <input
                    type="file"
                    id="image"
                    ref={img}
                    onChange={changeImg}
                  />
                </div>
                <div className="input__block">
                  <textarea
                    type="text"
                    id="description"
                    ref={description}
                    onChange={() => inputChange(description)}
                    onScroll={(e) => handleScroll(e, description)}
                  />
                  <label htmlFor="description">Описание</label>
                </div>
                <div className="input__block">
                  <textarea
                    type="text"
                    id="property"
                    ref={property}
                    onChange={() => inputChange(property)}
                    onScroll={(e) => handleScroll(e, property)}
                  />
                  <label htmlFor="description">Характеристики</label>
                </div>
                <button
                  type="submit"
                  className="modal__button modal__button--change"
                  onClick={(e) =>
                    addItem(
                      e,
                      title,
                      cost,
                      img,
                      category,
                      description,
                      property
                    )
                  }
                >
                  Добавить
                </button>

                <div className="modal__error">{error}</div>
              </form>
            </>
          ) : modal.typeModal === "edit" ? (
            <>
              <h2 className="modal__title">Редактировать товар</h2>
              <form className="modal__form">
                <div className="input__block">
                  <input
                    type="text"
                    id="title"
                    ref={title}
                    onChange={() => inputChange(title)}
                  />
                  <label htmlFor="title">Название</label>
                </div>
                <div className="input__block">
                  <select
                    name="category"
                    id="category"
                    className="admin__input-category"
                    ref={category}
                  >
                    <option value="Акустические">Акустические</option>
                    <option value="Бас-гитары">Бас-гитары</option>
                    <option value="Электрогитары">Электрогитары</option>
                    <option value="Усилители">Усилители</option>
                  </select>
                </div>
                <div className="input__block">
                  <input
                    type="text"
                    id="cost"
                    ref={cost}
                    onChange={() => inputChange(cost)}
                  />
                  <label htmlFor="cost">Стоимость</label>
                </div>
                <div className="input__block input__block--row">
                  <img src="" alt="" ref={imgEdit} />
                  <input
                    type="file"
                    id="image"
                    ref={img}
                    onChange={changeImg}
                  />
                </div>
                <div className="input__block">
                  <textarea
                    type="text"
                    id="description"
                    ref={description}
                    onChange={() => inputChange(description)}
                    onScroll={(e) => handleScroll(e, description)}
                  />
                  <label htmlFor="description">Описание</label>
                </div>
                <div className="input__block">
                  <textarea
                    type="text"
                    id="property"
                    ref={property}
                    onChange={() => inputChange(property)}
                    onScroll={(e) => handleScroll(e, property)}
                  />
                  <label htmlFor="description">Характеристики</label>
                </div>

                <button
                  type="submit"
                  className="modal__button modal__button--change"
                  onClick={(e) =>
                    editItem(
                      e,
                      title,
                      cost,
                      img,
                      category,
                      idItem,
                      description,
                      property
                    )
                  }
                >
                  Редактировать
                </button>

                <div className="modal__error">{error}</div>
              </form>
            </>
          ) : modal.typeModal === "review" ? (
            <>
              <h2 className="modal__title">Оставить отзыв</h2>
              <form className="modal__form">
                <Rating
                  id={idItem}
                  isRated={true}
                  rating={currentRating}
                ></Rating>
                <div className="input__block input__block--review">
                  <textarea
                    type="text"
                    id="review"
                    ref={review}
                    onChange={() => inputChange(review)}
                    onScroll={(e) => handleScroll(e, review)}
                    maxLength={450}
                  />
                  <label htmlFor="review">Отзыв</label>
                  <span className="textarea-length">{reviewLength}/450</span>
                </div>

                <button
                  type="submit"
                  className="modal__button modal__button--review"
                  onClick={(e) => handleSendRating(e)}
                >
                  Отправить отзыв
                </button>

                <div className="modal__error">{error}</div>
              </form>
            </>
          ) : (
            ""
          )}
          <button className="modal__close" onClick={() => closeModal()}>
            <img src={closeSvg} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
