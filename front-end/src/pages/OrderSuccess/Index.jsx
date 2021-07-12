import React from "react";
import { Redirect } from "react-router-dom";

import Header from "../commom/Header/Index.jsx";
import Footer from "../commom/Footer/Index.jsx";

import history from "../../utils/history.js";
import "../OrderSuccess/style.css";

function Index() {
  if (sessionStorage.getItem("infoUser") === null) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Header />
      <div className="wrap-order-success">
        <h1>Cảm ơn bạn đã đặt hàng</h1>
        <button className="btn-order-success" onClick={() => history.push("/")}>
          Tiếp tục mua sắm
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Index;
