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
      errorValue.email = "Vui l??ng nh???p email c???a b???n";
    } else if (!/.+@.+\.[A-Za-z]+$/.test(values.email)) {
      isValue = false;
      errorValue.email = "Email kh??ng h???p l???.";
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
      errorValue.optInput = "Vui l??ng nh???p m?? x??c nh???n c???a b???n";
    } else if (optValue.optInput.length !== 6) {
      isValue = false;
      errorValue.optInput = "M?? x??c nh???n ch??? bao g???m 6 k?? t???";
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
      errorValue.password = "Vui l??ng nh???p m???t kh???u c???a b???n";
    } else if (valueForm.password.length < 6) {
      isValue = false;
      errorValue.password = "M???t kh???u c?? ??t nh???t 6 k?? t???";
    } else {
      errorValue.password = "";
    }

    if (valueForm.confirmPassword === "") {
      isValue = false;
      errorValue.confirmPassword = "Vui l??ng nh???p l???i m???t kh???u c???a b???n";
    } else {
      errorValue.confirmPassword = "";
    }

    if (valueForm.password !== valueForm.confirmPassword) {
      errorValue.confirmPassword = "M???t kh???u kh??ng tr??ng kh???p";
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
              <h3>L???y l???i m???t kh???u</h3>
              <div className="form-groups">
                <input
                  type="text"
                  placeholder="Nh???p email c???a b???n"
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
                  G???i
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
                Tr??? l???i
              </button>
              <h2>Vui l??ng nh???p m?? x??c nh???n</h2>
              <p>M?? x??c minh c???a b???n s??? ???????c g???i b???ng email ?????n</p>
              <p className="text-name">{resetPasswords?.email}</p>

              <input
                type="text"
                placeholder="Nh???p m?? otp c???a b???n"
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
                G???i
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
                Tr??? l???i
              </button>
              <h2>Thi???t l???p m???t kh???u</h2>
              <p>T???o m???t kh???u m???i cho</p>
              <p className="text-name">{resetPasswords?.email}</p>
              <div className="form-groups form-password">
                <input
                  type={isPassword ? "text" : "password"}
                  placeholder="Nh???p m??t kh???u m???i c???a b???n"
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
                  placeholder="X??c nh???n l???i m???t kh???u c???a b???n"
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
                G???i
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
