import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
// import { Helmet } from "react-helmet";

import Header from "../commom/Header/Index.jsx";
import Footer from "../commom/Footer/Index.jsx";

import banner from "../../images/banner-home.jpg";
import iconGiaoHang from "../../images/icon-giao-hang.png";
import iconThanhToan from "../../images/icon-payment.png";
import iconDichVu from "../../images/icon-service.png";
import iconEasyChange from "../../images/icon-change-easy.png";

import "../Home/style.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from "../commom/Item/Index.jsx";

import {
  getProductListAction,
  getProductNewAction,
  getProductMostAction,
} from "../../redux/actions";

function Index({
  productList,
  productNewList,
  productMostList,
  getProductList,
  getProductNewList,
  getProductMostList,
}) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  useEffect(() => {
    getProductList();
    getProductNewList();
    getProductMostList();
  }, [getProductList, getProductNewList, getProductMostList]);

  function renderProductList() {
    return productList.data.map((item, index) => {
      return (
        <Item
          key={index}
          id={item.id}
          name={item.name}
          image={item.image[0]?.img}
          price={item.price}
          sale={item.sale}
        />
      );
    });
  }

  function renderProductNewList() {
    return productNewList.data.map((item, index) => {
      return (
        <Item
          key={index}
          id={item.id}
          name={item.name}
          image={item.image[0]?.img}
          price={item.price}
          sale={item.sale}
        />
      );
    });
  }

  function renderProductMostList() {
    return productMostList.data.map((item, index) => {
      return (
        <Item
          key={index}
          id={item.id}
          name={item.name}
          image={item.image[0]?.img}
          price={item.price}
          sale={item.sale}
        />
      );
    });
  }

  return (
    <>
      {/* <Helmet>
        <title data-rh="true">Shop bán giày</title>
      </Helmet> */}
      <Header />

      <div className="wrap-home">
        <div className="wrap-home-top">
          <div className="banner">
            <img src={banner} alt="banner" />
          </div>
          <div className="box">
            <Row gutter={[16, 16]}>
              <Col md={6}>
                <div className="content-box">
                  <div className="box-image">
                    <img src={iconGiaoHang} alt="" />
                  </div>
                  <div className="box-title">
                    <p>GIAO HÀNG TOÀN QUỐC</p>
                  </div>
                  <div className="box-des">
                    <p>Vận chuyển khắp Việt Nam</p>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="content-box">
                  <div className="box-image">
                    <img src={iconThanhToan} alt="" />
                  </div>
                  <div className="box-title">
                    <p>GIAO HÀNG TOÀN QUỐC</p>
                  </div>
                  <div className="box-des">
                    <p>Vận chuyển khắp Việt Nam</p>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="content-box">
                  <div className="box-image">
                    <img src={iconDichVu} alt="" />
                  </div>
                  <div className="box-title">
                    <p>GIAO HÀNG TOÀN QUỐC</p>
                  </div>
                  <div className="box-des">
                    <p>Vận chuyển khắp Việt Nam</p>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="content-box">
                  <div className="box-image">
                    <img src={iconEasyChange} alt="" />
                  </div>
                  <div className="box-title">
                    <p>GIAO HÀNG TOÀN QUỐC</p>
                  </div>
                  <div className="box-des">
                    <p>Vận chuyển khắp Việt Nam</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="wrap-home-title">
          <h1>Tất cả các sản phẩm</h1>
        </div>

        <div className="wrap-product-slick">
          <div className="content-product-top">
            <p>Xem tất cả</p>
          </div>
          <div className="content-product-slick">
            <Slider {...settings}>{renderProductList()}</Slider>
          </div>
        </div>
        <div className="wrap-home-title">
          <h1>Top sản phẩm mới nhất</h1>
        </div>

        <div className="wrap-product-slick">
          <div className="content-product-top">
            <p>Xem tất cả</p>
          </div>
          <div className="content-product-slick">
            <Slider {...settings}>{renderProductNewList()}</Slider>
          </div>
        </div>

        <div className="wrap-home-title">
          <h1>Top sản phẩm bán chạy nhất</h1>
        </div>

        <div className="wrap-product-slick">
          <div className="content-product-top">
            <p>Xem tất cả</p>
          </div>
          <div className="content-product-slick">
            <Slider {...settings}>{renderProductMostList()}</Slider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  const { productList, productNewList, productMostList } = state.productReducer;
  return {
    productList: productList,
    productNewList: productNewList,
    productMostList: productMostList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: () => dispatch(getProductListAction()),
    getProductNewList: () => dispatch(getProductNewAction()),
    getProductMostList: () => dispatch(getProductMostAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
