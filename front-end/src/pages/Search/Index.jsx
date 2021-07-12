import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { Row, Col } from "antd";

import Header from "../commom/Header/Index.jsx";
import Footer from "../commom/Footer/Index.jsx";
import Item from "../commom/Item/Index.jsx";
import {
  getProductCategoryAction,
  getProductSearchAction,
} from "../../redux/actions";

import "../Search/style.css";

function Index({ productSearchList, searchTask, categoryTask, match }) {
  console.log("productSearchList: ", productSearchList);
  console.log("match: ", match.params.name);
  const parsed = queryString.parse(window.location.search);
  console.log("parsed: ", parsed);

  const categoryName = match.params.name?.split("-")[1];
  console.log("categoryName: ", categoryName);

  const [listProducts, setListProducts] = useState(productSearchList.data);
  console.log("listProducts: ", listProducts);

  useEffect(() => {
    if (categoryName) {
      categoryTask({ categoryName: categoryName });
    }
  }, [categoryName, categoryTask]);

  useEffect(() => {
    setListProducts(productSearchList.data);
  }, [productSearchList.data]);

  useEffect(() => {
    if (parsed.q) {
      searchTask({ search: parsed.q });
    }
  }, [parsed.q, searchTask]);

  function sortASC() {
    const dataToSort = [...listProducts];
    return dataToSort.sort(function (a, b) {
      return a.price - b.price;
    });
  }

  function sortDESC() {
    const dataToSort = [...listProducts];
    return dataToSort.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  function renderListProduct() {
    return listProducts?.map((item, index) => {
      return (
        <Col md={6} key={index}>
          <Item
            id={item.id}
            name={item.name}
            image={item.image[0]?.img}
            price={item.price}
            sale={item.sale}
          />
        </Col>
      );
    });
  }

  return (
    <>
      <Header />
      <div className="wrap-search">
        <Row gutter={[16, 16]}>
          <Col md={6}>
            <h3>Danh mục sản phẩm</h3>
            <ul className="product-categories">
              <li>Giày Adidas</li>
              <li>Giày đôi</li>
              <li>Giày nam</li>
              <li>Giày Nike</li>
              <li>Giày nữ</li>
              <li>Giày Thời Trang</li>
              <li>Giày Vans</li>
            </ul>
          </Col>
          <Col md={18}>
            <div className="subnav">
              <span className="subnavbtn">
                Sắp xếp <i className="fa fa-caret-down"></i>
              </span>
              <ul className="subnav-content">
                <li
                  onClick={() => {
                    setListProducts(sortASC());
                  }}
                >
                  Sắp xếp giá tăng dần
                </li>
                <li
                  onClick={() => {
                    setListProducts(sortDESC());
                  }}
                >
                  Sắp xếp giá giảm dần
                </li>
              </ul>
            </div>

            <Row gutter={[16, 16]}>{renderListProduct()}</Row>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  const { productSearchList } = state.productReducer;
  return {
    productSearchList: productSearchList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchTask: (params) => dispatch(getProductSearchAction(params)),
    categoryTask: (params) => dispatch(getProductCategoryAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
