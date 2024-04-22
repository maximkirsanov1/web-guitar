import "./Header.scss";
import { Link } from "react-router-dom";
import { ModalContext } from "../../App";
import { UserContext } from "../../App";
import LoginSvg from "../svg/loginSvg";
import ProfileSvg from "../svg/profileSvg";
import { useContext } from "react";
import { CartContext } from "../../App";
import cartSvg from "../../assets/cart.svg";

export default function Header({ activeLink }) {
  const { openModal } = useContext(ModalContext);
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  return (
    <>
      <header className="header">
        <div className="container container--header">
          <img src="" alt="" className="logo" />
          <nav className="header__menu">
            <ul className="header__list">
              <li
                className={`header__item ${
                  activeLink === "hello" ? "header__item--active" : ""
                }`}
              >
                <Link to={"/"}>
                  <img src="" alt="" className="header__item__img" />
                  Главная
                </Link>
              </li>
              <li
                className={`header__item ${
                  activeLink === "catalog" ? "header__item--active" : ""
                }`}
              >
                <Link to={"/catalog"}>
                  <img src="" alt="" className="header__item__img" />
                  Каталог
                </Link>
              </li>
              <li
                className={`header__item ${
                  activeLink === "contacts" ? "header__item--active" : ""
                }`}
              >
                <Link to={"/contacts"}>
                  <img src="" alt="" className="header__item__img" />
                  Контакты
                </Link>
              </li>
              <li
                className={`header__item ${
                  activeLink === "about" ? "header__item--active" : ""
                }`}
              >
                <Link to={"/about"}>
                  <img src="" alt="" className="header__item__img" />О нас
                </Link>
              </li>
            </ul>

            <div className="lk">
              {user ? (
                <>
                  <Link to={"/profile"}>
                    <button className="lk__button">
                      <div className="lk__img">
                        <ProfileSvg></ProfileSvg>
                      </div>
                      <div className="lk__text"> {user.name}</div>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    className="lk__button"
                    onClick={() => openModal("login")}
                  >
                    <div className="lk__img">
                      <LoginSvg></LoginSvg>
                    </div>
                    <div className="lk__text">Войти</div>
                  </button>
                </>
              )}
              <button className="lk__cart" onClick={() => openModal("cart")}>
                <img src={cartSvg} alt="" />
                <div className="lk__cart__count">{cart.length}</div>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
