import "./Home.scss";
import Start from "./HomeComponents/Start/Start";
import Feature from "./HomeComponents/Feature/Feature";
import Popular from "./HomeComponents/Popular/Popular";
import Header from "../Header/Header";
import deliveryImg from "../../assets/delivery.svg";
import qualityImg from "../../assets/quality.svg";
import safeguardImg from "../../assets/safeguard.svg";

import { useEffect, useRef, useState } from "react";
import { ModalContext } from "../../App";
import { useContext } from "react";
export default function HelloComponent() {
  const { modal } = useContext(ModalContext);
  const sectionsRef = useRef([]);
  const [sections, setSections] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const currentIndex = useRef(0);
  let isScroll = false;
  const handleWheel = (event) => {
    if (!isScroll) {
      isScroll = true;
      window.removeEventListener("wheel", handleWheel);
      event.preventDefault();

      const delta = event.deltaY;

      if (delta > 0) {
        if (currentIndex.current < sectionsRef.current.length - 1) {
          const nextSectionIndex = currentIndex.current + 1;
          sectionsRef.current.forEach((section, index) => {
            if (index >= nextSectionIndex) {
              section.style.transform = `translateY(${
                nextSectionIndex * -100
              }%) ${
                index === currentIndex.current + 1 ? "scaleY(1)" : "scaleY(0.5)"
              }`;
            }
          });
          setCurrentSectionIndex(nextSectionIndex);
          currentIndex.current += 1;
        }
      } else {
        // scroll up
        if (currentIndex.current > 0) {
          const prevSectionIndex = currentIndex.current - 1;
          sectionsRef.current.forEach((section, index) => {
            if (index > prevSectionIndex) {
              if (index > 0) {
                section.style.transform = `translateY(${
                  prevSectionIndex * -100
                }%) ${
                  index === currentIndex.current + 1
                    ? "scaleY(1)"
                    : "scaleY(0.5)"
                }`;
              }
            }
          });
          setCurrentSectionIndex(prevSectionIndex);
          currentIndex.current -= 1;
        }
      }

      setTimeout(() => {
        isScroll = false;
        window.addEventListener("wheel", handleWheel);
      }, 800);
    }
  };
  const changeSection = (buttonIndex) => {
    sectionsRef.current.forEach((section, index) => {
      if (index <= buttonIndex) {
        section.style.transform = `translateY(${index * -100}%)`;
      } else {
        section.style.transform = `translateY(${buttonIndex * -100}%)`;
      }
      setCurrentSectionIndex(buttonIndex);
      currentIndex.current = buttonIndex;
    });
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", handleWheel);

    return () => {
      document.body.style.overflowY = "auto";
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [modal]);

  useEffect(() => {
    setSections([
      document.querySelector(".start"),
      document.querySelector(".feature"),
      document.querySelector(".feature"),
      document.querySelector(".feature"),
      document.querySelector(".popular"),
    ]);
  }, []);

  return (
    <>
      <div className="home">
        <section
          className={`home__section start section ${
            currentSectionIndex === 0 ? "section--active" : ""
          }`}
          ref={(el) => (sectionsRef.current[0] = el)}
        >
          <Header activeLink={"hello"}></Header>
          <Start></Start>
        </section>
        <section
          className={`home__section feature section ${
            currentSectionIndex === 1 ? "section--active" : ""
          }`}
          ref={(el) => (sectionsRef.current[1] = el)}
        >
          <Feature img={deliveryImg} title={"Доставка"}></Feature>
        </section>
        <section
          className={`home__section feature section ${
            currentSectionIndex === 2 ? "section--active" : ""
          }`}
          ref={(el) => (sectionsRef.current[2] = el)}
        >
          <Feature img={qualityImg} title={"Качество"}></Feature>
        </section>
        <section
          className={`home__section feature section ${
            currentSectionIndex === 3 ? "section--active" : ""
          }`}
          ref={(el) => (sectionsRef.current[3] = el)}
        >
          <Feature img={safeguardImg} title={"Гарантия"}></Feature>
        </section>
        <section
          className={`home__section popular section ${
            currentSectionIndex === 4 ? "section--active" : ""
          }`}
          ref={(el) => (sectionsRef.current[4] = el)}
        >
          <Popular></Popular>
        </section>

        {sectionsRef.current.length > 0 && (
          <div
            className={`pagination ${currentSectionIndex === 2 ? "white" : ""}`}
          >
            <ul className="pagination__list">
              {sectionsRef.current.map((section, index) => (
                <li className="pagination__item" key={index}>
                  <button
                    className={`pagination__button ${
                      index === currentSectionIndex
                        ? "pagination__button--active"
                        : ""
                    }`}
                    onClick={() => changeSection(index)}
                  ></button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
