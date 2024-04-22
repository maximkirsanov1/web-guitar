import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./global.scss";
import Catalog from "./pages/Catalog.jsx";
import Admin from "./pages/Admin.jsx";
import Home from "./pages/Home.jsx";
import Item from "./pages/Item.jsx";
import Reviews from "./pages/Reviews.jsx";
import { CookiesProvider, useCookies } from "react-cookie";
import { verifyToken } from "../api/verifyToken.js";
import { getUser } from "../api/getUser.js";
import Profile from "./pages/Profile.jsx";
import React from "react";
import Loader from "./components/Loader/Loader.jsx";

export const CartContext = React.createContext();
export const ModalContext = React.createContext();
export const UserContext = React.createContext();
export const LoaderContext = React.createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const closeLoader = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [modal, setModal] = useState({
    isModal: false,
    typeModal: "login",
    data: null,
  });
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [user, setUser] = useState("");
  const openModal = (type, data) => {
    const documentWidth = parseInt(document.documentElement.clientWidth);
    const windowWidth = parseInt(window.innerWidth);
    const scrollbarWidth = windowWidth - documentWidth;
    document.body.style.overflowY = "hidden";
    document.body.style.marginRight = scrollbarWidth + "px";

    setModal({ isModal: true, typeModal: type, data: data });
  };
  const closeModal = () => {
    document.body.style.overflowY = "visible";
    document.body.style.marginRight = 0;
    setModal({ ...modal, isModal: false, data: null });
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
  };
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };
  const plusItem = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) => {
        if (cartItem._id === id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      return updatedCart;
    });
  };
  const minusItem = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) => {
        if (cartItem._id === id && cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        if (cartItem._id === id && cartItem.quantity === 1) {
          removeFromCart(id);
        }
        return cartItem;
      });
      return updatedCart;
    });
  };
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity * item.cost;
    }, 0);
  };

  const checkTokens = async () => {
    const access = await verifyToken(cookies, setCookie);
    if (access) {
      const user = await getUser(access);
      setUser(user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkTokens();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <LoaderContext.Provider value={{ isLoading, setIsLoading, closeLoader }}>
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
          <CartContext.Provider
            value={{
              cart,
              addToCart,
              removeFromCart,
              plusItem,
              minusItem,
              calculateTotal,
              setCart,
            }}
          >
            <UserContext.Provider value={{ user, setUser }}>
              <CookiesProvider defaultSetOptions={{ path: "/" }}>
                <Loader></Loader>
                <Router>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/product/:id" element={<Item />} />
                    <Route path="/reviews" element={<Reviews />} />
                  </Routes>
                </Router>
              </CookiesProvider>
            </UserContext.Provider>
          </CartContext.Provider>
        </ModalContext.Provider>
      </LoaderContext.Provider>
    </>
  );
}

export default App;
