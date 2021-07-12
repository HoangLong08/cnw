import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../commom/Header/Index";
import Footer from "../commom/Footer/Index";

import { loginUserAction } from "../../redux/actions";
import "../Login/style.css";

function Index({ postLogin }) {
  const [isPassword, setIsPassword] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleChangeLogin(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmitLogin() {
    let isValue = true;

    const errorValue = {
      email: "",
      password: "",
    };

    if (values.email === "") {
      isValue = false;
      errorValue.email = "Vui lòng nhập email của bạn";
    } else if (!/.+@.+\.[A-Za-z]+$/.test(values.email)) {
      isValue = false;
      errorValue.email = "Email không hợp lệ.";
    } else {
      errorValue.email = "";
    }

    if (values.password === "") {
      isValue = false;
      errorValue.password = "Vui lòng nhập mật khẩu của bạn";
    } else {
      errorValue.password = "";
    }

    if (isValue) {
      setErrors({ ...errorValue });
      postLogin(values);
    } else {
      setErrors({ ...errorValue });
    }
  }

  return (
    <>
      <Header />
      <div className="wrap-login">
        <div className="content-login">
          <h3>Đăng nhập</h3>
          <div className="form-groups">
            <input
              type="text"
              placeholder="Nhập email của bạn"
              name="email"
              value={values.email}
              onChange={(e) => handleChangeLogin(e)}
            />
            {errors.email.length > 0 && (
              <small className="error">{errors.email}</small>
            )}
          </div>
          <div className="form-groups form-password">
            <input
              type={isPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu của bạn"
              name="password"
              value={values.password}
              onChange={(e) => handleChangeLogin(e)}
            />
            <i
              className={`fas ${
                isPassword ? "fa-eye-slash" : "fa-eye"
              } eye-password-icon`}
              onClick={() => setIsPassword(!isPassword)}
            ></i>
            {errors.password.length > 0 && (
              <small className="error">{errors.password}</small>
            )}
          </div>
          <div className="form-group-button">
            <button
              onClick={() => {
                handleSubmitLogin();
              }}
            >
              Đăng nhập
            </button>
          </div>
          <div className="form-groups-bonus">
            <p>
              <Link to="/forgot-password">Quên mật khẩu</Link>
            </p>
            <p>
              <Link to="/register">Đăng ký</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    postLogin: (params) => dispatch(loginUserAction(params)),
  };
};

export default connect(null, mapDispatchToProps)(Index);
