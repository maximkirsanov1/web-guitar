import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import HomeComponent from "../components/Home/HomeComponent";
import { useState } from "react";
export default function Hello() {

  return (
    <>
      <div className="wrapper">
        <div className="wrapper__content">
          <HomeComponent></HomeComponent>
          <Modal></Modal>
        </div>
      </div>
    </>
  );
}
