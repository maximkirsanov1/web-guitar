import "./Popular.scss";
import { getPopularItems } from "../../../../../api/getPopularItems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { LoaderContext } from "../../../../App";
import { useContext } from "react";

export default function Popular() {
  const { setIsLoading, closeLoader } = useContext(LoaderContext);
  const [items, setItems] = useState([]);
  const handleGetPopularItems = async () => {
    const items = await getPopularItems();
    if (items) {
      closeLoader();
    }
    setItems(items);
  };
  useEffect(() => {
    setIsLoading(true);
    handleGetPopularItems();
  }, []);

  return (
    <>
      <div className="container">
        <div className="popular__content">
          <div className="popular__top">
            <h2 className="popular__title">Популярные товары</h2>
            <Link to={"/catalog"} className="popular__link">
              Перейти в каталог
            </Link>
          </div>
          <div className="popular__slider">
            {items.length > 0 ? (
              <>
                <Swiper
                  slidesPerView={2}
                  modules={[Navigation, Pagination, Autoplay, Parallax]}
                  loop={true}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  speed={1200}
                  pagination={{ clickable: true }}
                  parallax={true}
                >
                  {items.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="popular__item"
                        data-swiper-parallax-x={`${(index + 1) * -20}`}
                        data-swiper-parallax-scale="0.8"
                        data-swiper-parallax-opacity="0.7"
                      >
                        <img
                          src={item.img}
                          alt={item.title}
                          data-swiper-parallax-scale="1.1"
                        />
                        <div className="popular__item__info">
                          <h3>{item.title}</h3>
                          <div className="popular__item__category">
                            {item.category}
                          </div>
                          <p>{item.cost} руб.</p>

                          <button className="popular__button">В корзину</button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
