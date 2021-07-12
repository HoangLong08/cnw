import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import Header from "../commom/Header/Index.jsx";
import Footer from "../commom/Footer/Index.jsx";
import {
  incProductCartAction,
  decProductCartAction,
  removeProductCartAction,
} from "../../redux/actions";
import history from "../../utils/history.js";
import "../Cart/style.css";

function Index({ shoppingCart, incCart, decCart, removeCart }) {
  var totalMoneyCart = 0;
  
  function renderCart() {
    if (shoppingCart.data.length > 0) {
      return shoppingCart?.data.map((item, index) => {
        totalMoneyCart +=
          (item.price - (item.price * item.sale) / 100) * item.quantity;
        return (
          <div className="content-cart" key={index}>
            <div className="cart-image">
              <img aria-hidden src={item.image} alt={item.name} />
            </div>
            <div className="cart-name-price">
              <div className="cart-name">
                <Link
                  to={"/product/" + item.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </Link>
                <p>
                  Size: {item.size} và giảm giá: {item.sale}%
                </p>
              </div>
              <div className="cart-price">
                <p>
                  <strike>
                    {item.price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strike>
                </p>
                <p>
                  {(item.price - (item.price * item.sale) / 100).toLocaleString(
                    "vi",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </p>
              </div>
            </div>
            <div className="cart-action">
              <div className="cart-quanty">
                <button
                  className="btn-quantity"
                  onClick={() => {
                    decCart({
                      id: item.id,
                      idColor: item.idColor,
                      size: item.size,
                      inventoryShoes: item.inventoryShoes,
                    });
                  }}
                >
                  <span>-</span>
                </button>

                <input
                  type="number"
                  className="content-quantity"
                  value={item.quantity}
                  readOnly
                  style={{ marginLeft: "10px" }}
                />

                <button
                  className="btn-quantity"
                  onClick={() => {
                    incCart({
                      id: item.id,
                      idColor: item.idColor,
                      size: item.size,
                      inventoryShoes: item.inventoryShoes,
                    });
                  }}
                >
                  <span>+</span>
                </button>
              </div>
              <div className="cart-remove">
                <button
                  className="btn-remove"
                  onClick={() => {
                    removeCart({
                      id: item.id,
                      idColor: item.idColor,
                      size: item.size,
                      inventoryShoes: item.inventoryShoes,
                    });
                  }}
                >
                  <i className="fal fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  return (
    <>
      <Header />
      <div className="wrap-cart">
        <div className="cart-toolbar">
          <ul className="menu-toolbar">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <i className="fas fa-chevron-right"></i>
            </li>
            <li>
              <Link to="/cart">Giỏ hàng</Link>
            </li>
          </ul>
        </div>
        {shoppingCart?.data.length === 0 ? (
          <>
            <h1> Không có sản phẩm nào trong giỏ hàng</h1>
            <button
              className="btn-cart-empty"
              onClick={() => history.push("/")}
            >
              Mua sắm ngay
            </button>
          </>
        ) : (
          <Row gutter={[16, 16]}>
            <Col md={16}>
              <h3>Giỏ hàng</h3>
              <div className="wrap-cart-left">{renderCart()}</div>
            </Col>
            <Col md={8}>
              <h3>Thanh toán</h3>
              <div className="wrap-cart-right">
                <div className="content-payment">
                  <div>
                    <p>Tạm tính</p>
                    <p>
                      {totalMoneyCart.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div>
                    <p>Phí ship</p>
                    <p>
                      {(50000).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div>
                    <p>Tạm tính</p>
                    <p>
                      {(totalMoneyCart + 50000).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn-payment"
                      onClick={() => history.push("/payment")}
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  const { shoppingCart } = state.cartReducer;
  return {
    shoppingCart: shoppingCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    decCart: (params) => dispatch(decProductCartAction(params)),
    incCart: (params) => dispatch(incProductCartAction(params)),
    removeCart: (params) => dispatch(removeProductCartAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
