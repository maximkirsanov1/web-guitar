import "./Start.scss";
import video from "../../../../assets/guitar.mp4";

export default function Start() {
  return (
    <>
      <div className="start__content">
        <div className="start__background"></div>
        <video src={video} controls={false} autoPlay={true} muted loop></video>
        <div className="start__text">
          <h2 className="start__title">НАЗВАНИЕ</h2>
          <p className="start__subtitle">
            Добро пожаловать в наш интернет-магазин <b>"НАЗВАНИЕ"</b>! Мы
            предлагаем широкий выбор гитар для любителей музыки и
            профессиональных музыкантов. У нас вы найдете гитары различных
            типов, размеров и цветов, которые подойдут для любого уровня
            владения инструментом.
          </p>
        </div>
      </div>
    </>
  );
}
