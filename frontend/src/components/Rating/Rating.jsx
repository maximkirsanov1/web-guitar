import "./Rating.scss";
import StarSvg from "../svg/starSvg.jsx";
import React, { useState } from "react";
import { sendRating } from "../../../api/sendRating.js";
import { ModalContext } from "../../App.jsx";
import { useContext } from "react";

export default function Rating({ id, isRated, rating }) {
  const { openModal } = useContext(ModalContext);
  const stars = [0, 1, 2, 3, 4];
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index) => {
    if (!isRated) {
      setHoverRating(index + 1);
    }
  };
  const handleMouseLeave = () => {
    if (!isRated) {
      setHoverRating(0);
    }
  };
  const handleSendRating = async (index) => {
    if (!isRated) {
      openModal("review", { id: id, rating: index + 1 });
      // setIsLoading(true);
      // await sendRating(id, index + 1);
    }
  };

  return (
    <>
      <div className="rating">
        {stars.map((star, index) => (
          <button
            className={`rating__button ${
              index === hoverRating - 1 && !isRated
                ? "rating__button--active"
                : isRated
                ? "rating__button--disabled"
                : ""
            }`}
            key={index}
            onMouseOver={() => handleMouseOver(index)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => handleSendRating(index)}
            disabled={isRated}
          >
            <StarSvg
              color={
                (!isRated && index < hoverRating) || (isRated && index < rating)
                  ? "gold"
                  : "transparent"
              }
              delay={hoverRating > 0 ? index * 0.03 : 0}
            />
          </button>
        ))}
      </div>
    </>
  );
}
