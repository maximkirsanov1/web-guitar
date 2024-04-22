import React, { useEffect } from "react";
import { useState } from "react";
import MainContent from "../components/MainContent/Main";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import { useCookies } from "react-cookie";
import { verifyToken } from "../../api/verifyToken";
import { getUser } from "../../api/getUser";

export default function Catalog() {
  return (
    <>
      <div className="wrapper">
        <Header activeLink={"catalog"}></Header>
        <div className="container">
          <MainContent></MainContent>
        </div>
        <Modal></Modal>
      </div>
    </>
  );
}
