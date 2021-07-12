import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { Helmet } from "react-helmet";

import { Col, Row } from "antd";

import { orderProductAction } from "../../redux/actions";

import Header from "../commom/Header/Index";
import Footer from "../commom/Footer/Index";

import { URL } from "../../constants/app";

import "../Payment/style.css";

function Index({ shoppingCart, postOrderProduct }) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    city: "", // thanh pho
    district: "", // quận / huyện
    street: "", // phường xã
    address: "", //  (dc chi tiet)
    noteOrder: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
    street: "",
    address: "",
    noteOrder: "",
  });

  const [countries, setCountries] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const fetchCountryData = async () => {
    const response = await fetch(URL + "city");
    const aa = await response.json();
    setCountries(aa);
  };

  async function fetchDistrictData(cityData) {
    const [code] = cityData.split("/");
    const response = await fetch(URL + "district/" + code);
    const bb = await response.json();
    setDistricts(bb);
  }

  async function fetchWardsData(districtData) {
    const [code] = districtData.split("/");
    const response = await fetch(URL + "streets/" + code);
    const cc = await response.json();
    setWards(cc);
  }

  useEffect(() => {
    fetchCountryData();
  }, []);

  useEffect(() => {
    if (values.city !== "") {
      fetchDistrictData(values.city);
    }
  }, [values.city]);

  useEffect(() => {
    if (values.district !== "") {
      fetchWardsData(values.district);
    }
  }, [values.district]);

  const token = sessionStorage.getItem("infoUser")
    ? JSON.parse(sessionStorage.getItem("infoUser"))
    : null;

  if (token?.token === null || token === null) {
    return <Redirect to="/login" />;
  }

  function renderCity() {
    return countries.map((item, index) => {
      return (
        <option key={index} value={item.id + "/" + item.district}>
          {item.district}
        </option>
      );
    });
  }

  function renderDistrict() {
    return districts.map((item, index) => {
      return (
        <option key={index} value={item.id + "/" + item.district}>
          {item.district}
        </option>
      );
    });
  }

  function renderWard() {
    return wards.map((item, index) => {
      return (
        <option key={index} value={item.id + "/" + item.street}>
          {item.street}
        </option>
      );
    });
  }
  var totalMoneyOrder = 0;
  function renderListOrder() {
    return shoppingCart?.data?.map((item, index) => {
      totalMoneyOrder +=
        (item.price - (item.price * item.sale) / 100) * item.quantity;
      return (
        <div className="content-product-order-payment" key={index}>
          <div className="product-order-image">
            <img src={item.image} aria-hidden alt={item.name} />
          </div>
          <div className="product-info-payment">
            <div>
              <p>{item.name} </p>
              <p>
                Số lượng: <span>{item.quantity} </span>
                và size giày: <span>{item.size}</span>
              </p>
            </div>
            <div className="product-info-money">
              <span>
                {(item.price - (item.price * item.sale) / 100).toLocaleString(
                  "vi",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
              </span>
            </div>
          </div>
        </div>
      );
    });
  }

  function handleChangePayment(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmitPayment() {
    let isValue = true;
    const errorValue = {
      name: "",
      phone: "",
      city: "",
      district: "",
      street: "",
      address: "",
      noteOrder: "",
    };

    if (values.name === "") {
      isValue = false;
      errorValue.name = "Vui lòng nhập tên người đặt hàng";
    } else {
      errorValue.name = "";
    }

    if (!values.phone) {
      isValue = false;
      errorValue.phone = "Vui lòng nhập số điện thoại";
    } else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(values.phone)) {
      isValue = false;
      errorValue.phone = "Số điện thoại không hợp lệ";
    } else {
      errorValue.phone = "";
    }

    if (!values.city) {
      isValue = false;
      errorValue.city = "Vui lòng chọn thành phố hoặc tỉnh";
    } else {
      errorValue.city = "";
    }

    if (!values.district) {
      isValue = false;
      errorValue.district = "Vui lòng chọn quận hoặc huyện";
    } else {
      errorValue.district = "";
    }

    if (!values.street) {
      isValue = false;
      errorValue.street = "Vui lòng chọn phường hoặc xã";
    } else {
      errorValue.street = "";
    }

    if (!values.address) {
      isValue = false;
      errorValue.address = "Vui lòng nhập thôn hoặc số nhà";
    } else {
      errorValue.address = "";
    }

    if (isValue) {
      setErrors({ ...errorValue });
      localStorage.removeItem("shoppingCart");
      postOrderProduct({
        city: values.city.split("/")[1],
        district: values.district.split("/")[1],
        street: values.street.split("/")[1],
        address: values.address,
        phone: values.phone,
        note: values.noteOrder,
        name: values.name,
        products: shoppingCart.data,
      });
    } else {
      setErrors({ ...errorValue });
    }
  }

  return (
    <>
      <Header />
      <div className="wrap-payment">
        <div className="product-payment-toolbar">
          <ul className="menu-toolbar">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <i className="fas fa-chevron-right"></i>
            </li>
            <li>Thanh toán</li>
          </ul>
        </div>
        <Row gutter={[16, 16]}>
          <Col md={12}>
            <h3>Thông tin liên hệ</h3>
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Nhập tên của bạn"
                name="name"
                onChange={(e) => handleChangePayment(e)}
                value={values.name}
              />
              <label htmlFor="name" className="form__label">
                Tên
              </label>
            </div>
            {errors.name.length > 0 && (
              <small className="error">{errors.name}</small>
            )}
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Nhập số điện thoại của bạn"
                name="phone"
                onChange={(e) => handleChangePayment(e)}
                value={values.phone}
              />
              <label htmlFor="phone" className="form__label">
                Số điện thoại
              </label>
            </div>
            {errors.phone.length > 0 && (
              <small className="error">{errors.phone}</small>
            )}
            <div className="form__group field">
              <select
                className="form__field"
                name="city"
                onChange={(e) => handleChangePayment(e)}
                value={values.city}
              >
                <option value="">Chọn thành phố / tỉnh</option>
                {renderCity()}
              </select>
            </div>
            {errors.city.length > 0 && (
              <small className="error">{errors.city}</small>
            )}
            <div className="form__group field">
              <select
                className="form__field"
                name="district"
                onChange={(e) => handleChangePayment(e)}
                value={values.district}
              >
                <option value="">Chọn quận / huyện</option>
                {renderDistrict()}
              </select>
            </div>
            {errors.district.length > 0 && (
              <small className="error">{errors.district}</small>
            )}
            <div className="form__group field">
              <select
                className="form__field"
                name="street"
                onChange={(e) => handleChangePayment(e)}
                value={values.street}
              >
                <option value="">Chọn xã / phường</option>
                {renderWard()}
              </select>
            </div>
            {errors.street.length > 0 && (
              <small className="error">{errors.street}</small>
            )}
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Ví dụ Tổ 6 hoặc 99B"
                name="address"
                onChange={(e) => handleChangePayment(e)}
                value={values.address}
              />
              <label htmlFor="address" className="form__label">
                Địa chỉ chi tiết
              </label>
            </div>
            {errors.address.length > 0 && (
              <small className="error">{errors.address}</small>
            )}
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Ghi chú về đơn hàngaa. Ví dụ thời gian nhận hàng, ..."
                name="noteOrder"
                onChange={(e) => handleChangePayment(e)}
                value={values.noteOrder}
              />
              <label htmlFor="noteOrder" className="form__label">
                Ghi chú đơn hàng
              </label>
            </div>
            {errors.noteOrder.length > 0 && (
              <small className="error">{errors.noteOrder}</small>
            )}
          </Col>
          <Col md={12}>
            <h3 style={{ marginBottom: "20px" }}>Đơn hàng của bạn</h3>
            <div className="wrap-order">
              <div className="product-order-payment">{renderListOrder()}</div>
              <div className="product-payment-content">
                <div className="product-payment-money">
                  <p>Tạm tính</p>
                  <p>
                    {totalMoneyOrder.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="product-payment-money">
                  <p>Phí ship</p>
                  <p>
                    {(50000).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="product-payment-money">
                  <p>Thành tiền</p>
                  <p>
                    {(totalMoneyOrder + 50000).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </div>
              <div className="product-payment-button">
                <button
                  className="button-order"
                  onClick={() => {
                    handleSubmitPayment();
                  }}
                >
                  Đặt ngay
                </button>
              </div>
            </div>
          </Col>
        </Row>
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
    postOrderProduct: (params) => dispatch(orderProductAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
