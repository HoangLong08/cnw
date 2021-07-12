import React, { useState } from "react";
import { connect } from "react-redux";

import { changePasswordUserAction } from "../../../redux/actions";
import "../ChangePassword/style.css";

function Index({ changePasswordTask }) {
  const [values, setValues] = useState({
    passwordOld: "",
    passwordNew: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    passwordOld: "",
    passwordNew: "",
    confirmPassword: "",
  });

  function handleChangePassword(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmitChangePassword() {
    let isValue = true;
    const errorValue = {
      passwordOld: "",
      passwordNew: "",
      confirmPassword: "",
    };

    if (values.passwordOld.length === 0) {
      isValue = false;
      errorValue.passwordOld = "Vui lòng nhập mật khẩu cũ của bạn !";
    } else {
      errorValue.passwordOld = "";
    }

    if (values.passwordNew.length === 0) {
      isValue = false;
      errorValue.passwordNew = "Vui lòng nhập mật khẩu mới của bạn !";
    } else if (values.passwordNew.length < 6) {
      isValue = false;
      errorValue.passwordNew = "Tên tài khoản it nhất là 6 ký tự !";
    } else {
      errorValue.passwordNew = "";
    }

    if (values.confirmPassword.length === 0) {
      isValue = false;
      errorValue.confirmPassword = "Vui lòng xác nhận lại mật khẩu của bạn !";
    } else if (values.confirmPassword !== values.passwordNew) {
      isValue = false;
      errorValue.confirmPassword = "Mật khẩu không trùng khớp !";
    } else {
      errorValue.confirmPassword = "";
    }

    if (isValue) {
      setErrors({ ...errorValue });
      changePasswordTask(values);
    } else {
      setErrors({ ...errorValue });
    }
  }

  return (
    <div className="wrap-change-password">
      <div className="form-groups form-change-password">
        <label htmlFor="">Mật khẩu</label>
        <input
          type="text"
          placeholder="Nhập mật khẩu của bạn"
          name="passwordOld"
          value={values.passwordOld}
          onChange={(e) => handleChangePassword(e)}
        />
      </div>
      {errors.passwordOld.length > 0 && (
        <small className="error error-change-password">
          {errors.passwordOld}
        </small>
      )}
      <div className="form-groups form-change-password">
        <label htmlFor="">Mật khẩu mới</label>
        <input
          type="text"
          placeholder="Nhập mật khẩu của bạn"
          name="passwordNew"
          value={values.passwordNew}
          onChange={(e) => handleChangePassword(e)}
        />
      </div>
      {errors.passwordNew.length > 0 && (
        <small className="error error-change-password">
          {errors.passwordNew}
        </small>
      )}
      <div className="form-groups form-change-password">
        <label htmlFor="">Xác nhận mật khẩu</label>
        <input
          type="text"
          placeholder="Xác nhận mật khẩu của bạn"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={(e) => handleChangePassword(e)}
        />
      </div>
      {errors.confirmPassword.length > 0 && (
        <small className="error error-change-password">
          {errors.confirmPassword}
        </small>
      )}
      <div className="content-change-password">
        <button
          className="btn-change-pass"
          onClick={() => {
            handleSubmitChangePassword();
          }}
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePasswordTask: (params) => dispatch(changePasswordUserAction(params)),
  };
};

export default connect(null, mapDispatchToProps)(Index);
