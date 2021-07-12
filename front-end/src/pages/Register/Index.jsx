import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../commom/Header/Index";
import Footer from "../commom/Footer/Index";

import { registerUserAction } from "../../redux/actions";
import "../Register/style.css";
import { connect } from "react-redux";

function Index({ postRegister }) {
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [values, setValues] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChangeRegister(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmitRegister() {
    let isValue = true;

    const errorValue = {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (values.lastName === "") {
      isValue = false;
      errorValue.lastName = "Vui lòng nhập họ của bạn";
    } else if (values.lastName.length > 8) {
      errorValue.lastName = "Họ của bạn không được dài nhất 8 ký tự";
    } else {
      errorValue.lastName = "";
    }

    if (values.firstName === "") {
      isValue = false;
      errorValue.firstName = "Vui lòng nhập tên của bạn";
    } else if (values.firstName.length > 8) {
      isValue = false;
      errorValue.firstName = "Tên của bạn không được dài quá 8 ký tự";
    } else {
      errorValue.firstName = "";
    }

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
    }
    if (values.password.length < 6) {
      isValue = false;
      errorValue.password = "Mật khẩu có ít nhất 6 ký tự";
    } else {
      errorValue.password = "";
    }

    if (values.confirmPassword === "") {
      isValue = false;
      errorValue.confirmPassword = "Vui lòng xác nhận lại mật khẩu của bạn";
    } else {
      errorValue.confirmPassword = "";
    }

    if (values.confirmPassword !== values.password) {
      isValue = false;
      errorValue.confirmPassword = "Mật khẩu không trùng khớp";
    }

    if (isValue) {
      setErrors({ ...errorValue });
      postRegister(values);
    } else {
      setErrors({ ...errorValue });
    }
  }

  return (
    <>
      <Header />
      <div className="wrap-register">
        <div className="content-register">
          <h3>Đăng ký</h3>
          <div className="form-groups">
            <input
              type="text"
              placeholder="Nhập họ của bạn"
              name="lastName"
              value={values.lastName}
              onChange={(e) => handleChangeRegister(e)}
            />
            {errors.lastName.length > 0 && (
              <small className="error">{errors.lastName}</small>
            )}
          </div>
          <div className="form-groups ">
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              name="firstName"
              value={values.firstName}
              onChange={(e) => handleChangeRegister(e)}
            />

            {errors.firstName.length > 0 && (
              <small className="error">{errors.firstName}</small>
            )}
          </div>
          <div className="form-groups">
            <input
              type="text"
              placeholder="Nhập email của bạn"
              name="email"
              value={values.email}
              onChange={(e) => handleChangeRegister(e)}
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
              onChange={(e) => handleChangeRegister(e)}
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
          <div className="form-groups form-password">
            <input
              type={isPasswordConfirm ? "text" : "password"}
              placeholder="Xác nhận mật khẩu của bạn"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={(e) => handleChangeRegister(e)}
            />
            <i
              className={`fas ${
                isPasswordConfirm ? "fa-eye-slash" : "fa-eye"
              } eye-password-icon`}
              onClick={() => setIsPasswordConfirm(!isPasswordConfirm)}
            ></i>
            {errors.confirmPassword.length > 0 && (
              <small className="error">{errors.confirmPassword}</small>
            )}
          </div>
          <div className="form-group-button">
            <button
              onClick={() => {
                handleSubmitRegister();
              }}
            >
              Đăng ký
            </button>
          </div>
          <div className="form-groups-bonus">
            <p>
              <Link to="/forgot-password">Quên mật khẩu</Link>
            </p>
            <p>
              <Link to="/login">Đăng nhập</Link>
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
    postRegister: (params) => dispatch(registerUserAction(params)),
  };
};

export default connect(null, mapDispatchToProps)(Index);
