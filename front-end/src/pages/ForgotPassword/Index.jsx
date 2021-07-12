import React, { useState, useEffect } from "react";
import { Spin } from "antd";

import Header from "../commom/Header/Index";
import Footer from "../commom/Footer/Index";

import {
  authEmailAction,
  authOtpAction,
  changePasswordForgotAction,
} from "../../redux/actions";

import "../ForgotPassword/style.css";
import { connect } from "react-redux";

function Index({
  resetPassword,
  optUser,
  postResetPasswordTask,
  postEmail,
  postOtp,
}) {
  const [resetPasswords, setResetPasswords] = useState(resetPassword.data);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [optValue, setValueOpt] = useState({
    optInput: "",
  });

  const [optError, setOtpError] = useState({
    optInput: "",
  });

  useEffect(() => {
    setResetPasswords(resetPassword.data);
  }, [resetPassword.data]);

  useEffect(() => {
    if (!resetPassword.load) {
      if (
        values.email === resetPassword?.data?.email &&
        resetPassword?.data?.check === true
      ) {
        setIsLoading(false);
        // contentDiv =>({...contentDiv, contentFirst: false, contentSecond:true})
        setContentDiv((contentDiv) => ({
          ...contentDiv,
          contentFirst: false,
          contentSecond: true,
        }));
      } else {
        setIsLoading(false);
      }
    }
  }, [values, resetPassword]);

  useEffect(() => {
    if (optError.optInput.length === 0) {
      setIsLoading(true);
      if (!optUser.load) {
        if (
          optValue.optInput === optUser?.data?.optInput &&
          optUser?.data?.check === true
        ) {
          setIsLoading(false);
          // contentDiv =>({...contentDiv, contentSecond: false, contentThirst:true})
          setContentDiv((contentDiv) => ({
            ...contentDiv,
            contentSecond: false,
            contentThirst: true,
          }));
        } else {
          setIsLoading(false);
        }
      }
    }
  }, [optError, optValue, optUser]);

  const [valueForm, setValueForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errorForm, setErrorForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [contentDiv, setContentDiv] = useState({
    contentFirst: true,
    contentSecond: false,
    contentThirst: false,
  });

  function handleChangeForgotPassword(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleChangeOpt(e) {
    const { name, value } = e.target;
    setValueOpt({
      ...optValue,
      [name]: value,
    });
  }

  function handleChangePass(e) {
    const { name, value } = e.target;
    setValueForm({
      ...valueForm,
      [name]: value,
    });
  }

  function handleSubmitForgotPassword() {
    let isValue = true;

    const errorValue = {
      email: "",
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

    if (isValue) {
      setIsLoading(true);
      postEmail(values);
      setErrors({ ...errorValue });
    } else {
      setErrors({ ...errorValue });
    }
  }

  function handleSubmitOtp() {
    let isValue = true;
    const errorValue = {
      optInput: "",
    };

    if (optValue.optInput === "") {
      isValue = false;
      errorValue.optInput = "Vui lòng nhập mã xác nhận của bạn";
    } else if (optValue.optInput.length !== 6) {
      isValue = false;
      errorValue.optInput = "Mã xác nhận chỉ bao gồm 6 ký tự";
    } else {
      errorValue.optInput = "";
    }

    if (isValue) {
      setIsLoading(true);
      setOtpError({ ...errorValue });
      postOtp(optValue);
    } else {
      setOtpError({ ...errorValue });
    }
  }

  console.log("isLoading: ", isLoading);

  function handleSubmitPass() {
    let isValue = true;
    const errorValue = {
      password: "",
      confirmPassword: "",
    };

    if (valueForm.password === "") {
      isValue = false;
      errorValue.password = "Vui lòng nhập mật khẩu của bạn";
    } else if (valueForm.password.length < 6) {
      isValue = false;
      errorValue.password = "Mật khẩu có ít nhất 6 ký tự";
    } else {
      errorValue.password = "";
    }

    if (valueForm.confirmPassword === "") {
      isValue = false;
      errorValue.confirmPassword = "Vui lòng nhập lại mật khẩu của bạn";
    } else {
      errorValue.confirmPassword = "";
    }

    if (valueForm.password !== valueForm.confirmPassword) {
      errorValue.confirmPassword = "Mật khẩu không trùng khớp";
    }

    if (isValue) {
      setErrorForm({ ...errorValue });
      postResetPasswordTask({ ...valueForm, code: optUser?.data?.optInput });
    } else {
      setErrorForm({ ...errorValue });
    }
  }

  return (
    <>
      <Header />
      <Spin tip="Loading..." spinning={isLoading}>
        <div className="wrap-forgot-password">
          {contentDiv.contentFirst === true ? (
            <div className="content-forgot-password" key="1">
              <h3>Lấy lại mật khẩu</h3>
              <div className="form-groups">
                <input
                  type="text"
                  placeholder="Nhập email của bạn"
                  name="email"
                  value={values.email}
                  onChange={(e) => handleChangeForgotPassword(e)}
                />
                {errors.email.length > 0 && (
                  <small className="error">{errors.email}</small>
                )}
              </div>
              <div className="form-group-button">
                <button
                  onClick={() => {
                    handleSubmitForgotPassword();
                  }}
                >
                  Gửi
                </button>
              </div>
            </div>
          ) : contentDiv.contentSecond === true ? (
            <div className="content-forgot-password form-forgot" key="2">
              <button
                className="button-back"
                onClick={() => {
                  setContentDiv({
                    ...contentDiv,
                    contentFirst: true,
                    contentSecond: false,
                  });
                }}
              >
                Trở lại
              </button>
              <h2>Vui lòng nhập mã xác nhận</h2>
              <p>Mã xác minh của bạn sẽ được gửi bằng email đến</p>
              <p className="text-name">{resetPasswords?.email}</p>

              <input
                type="text"
                placeholder="Nhập mã otp của bạn"
                name="optInput"
                value={optValue.optInput}
                onChange={(e) => handleChangeOpt(e)}
              />
              {optError.optInput.length > 0 && (
                <small className="error">{optError.optInput}</small>
              )}
              <button
                className="button-back button-pass"
                style={{ width: "100%" }}
                onClick={() => {
                  handleSubmitOtp();
                }}
              >
                Gửi
              </button>
            </div>
          ) : (
            <div className="content-forgot-password form-forgot" key="3">
              <button
                className="button-back"
                onClick={() => {
                  setContentDiv({
                    ...contentDiv,
                    contentSecond: true,
                    contentThirst: false,
                  });
                }}
              >
                Trở lại
              </button>
              <h2>Thiết lập mật khẩu</h2>
              <p>Tạo mật khẩu mới cho</p>
              <p className="text-name">{resetPasswords?.email}</p>
              <div className="form-groups form-password">
                <input
                  type={isPassword ? "text" : "password"}
                  placeholder="Nhập mât khẩu mới của bạn"
                  name="password"
                  value={valueForm.password}
                  onChange={(e) => handleChangePass(e)}
                />
                <i
                  className={`fas ${
                    isPassword ? "fa-eye-slash" : "fa-eye"
                  } eye-password-icon`}
                  onClick={() => setIsPassword(!isPassword)}
                ></i>
                {errorForm.password.length > 0 && (
                  <small className="error">{errorForm.password}</small>
                )}
              </div>
              <div className="form-groups form-password">
                <input
                  type={isPasswordConfirm ? "text" : "password"}
                  placeholder="Xác nhận lại mật khẩu của bạn"
                  name="confirmPassword"
                  value={valueForm.confirmPassword}
                  onChange={(e) => handleChangePass(e)}
                />
                <i
                  className={`fas ${
                    isPasswordConfirm ? "fa-eye-slash" : "fa-eye"
                  } eye-password-icon`}
                  onClick={() => setIsPasswordConfirm(!isPasswordConfirm)}
                ></i>
                {errorForm.confirmPassword.length > 0 && (
                  <small className="error">{errorForm.confirmPassword}</small>
                )}
              </div>

              <button
                className="button-back button-pass"
                style={{ width: "100%" }}
                onClick={() => {
                  handleSubmitPass();
                }}
              >
                Gửi
              </button>
            </div>
          )}
        </div>
      </Spin>

      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  const { resetPassword, optUser } = state.authReducer;
  return {
    resetPassword: resetPassword,
    optUser: optUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postEmail: (params) => dispatch(authEmailAction(params)),
    postOtp: (params) => dispatch(authOtpAction(params)),
    postResetPasswordTask: (params) =>
      dispatch(changePasswordForgotAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
