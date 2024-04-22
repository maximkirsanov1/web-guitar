import "./Loader.scss";
import GuitarSvg from "../svg/guitarSvg";
import { LoaderContext } from "../../App";
import { useContext, useEffect } from "react";

export default function Loader() {
  const { isLoading } = useContext(LoaderContext);
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!isLoading && currentPath !== "/") {
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [isLoading]);
  return (
    <>
      <div className={`loader ${!isLoading ? "loader--hidden" : ""}`}>
        <div className="loader__content">
          <GuitarSvg></GuitarSvg>
        </div>
      </div>
    </>
  );
}
