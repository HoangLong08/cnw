import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAdminAction } from "../../../redux/actions";
import "../LoginAdmin/style.css";

function Index({ postLoginAdmin }) {
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
      postLoginAdmin(values);
    } else {
      setErrors({ ...errorValue });
    }
  }
  return (
    <div className="wrap-login-admin">
      <div className="content-login-admin">
        <h3>Đăng nhập</h3>
        <div className="form-groups-admin">
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
        <div className="form-groups-admin form-password-admin">
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
            } eye-password-icon-admin`}
            onClick={() => setIsPassword(!isPassword)}
          ></i>
          {errors.password.length > 0 && (
            <small className="error">{errors.password}</small>
          )}
        </div>
        <div className="form-group-button-admin">
          <button
            onClick={() => {
              handleSubmitLogin();
            }}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    postLoginAdmin: (params) => dispatch(loginAdminAction(params)),
  };
};

export default connect(null, mapDispatchToProps)(Index);
