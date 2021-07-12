import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col, Radio, DatePicker } from "antd";

import { URL } from "../../../constants/app";
import {
  changeInfoUserAction,
  changeImageUserAction,
} from "../../../redux/actions";

import history from "../../../utils/history.js";
import "../ChangeInfoUser/style.css";

function Index({ infoUser, changeInfoTask, changeImageAvatar }) {
  const { account } = infoUser.data;

  const [values, setValues] = useState({
    token: infoUser?.data?.token,
    image: account?.image,
    email: account?.email,
    lastName: account?.lastName,
    firstName: account?.firstName,
    gender: account?.gender !== "" ? account?.gender : "Nam",
    birthDay: account?.birthDay ? account?.birthDay : moment().format("L"),
    phone: account?.phone,
    city: "",
    district: "",
    street: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    lastName: "",
    firstName: "",
    gender: "",
    birthDay: "",
    phone: "",
    city: "",
    district: "",
    street: "",
    address: "",
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("infoUser"));
    if (user.id) {
      setValues((values) => [...values]);
    }
  }, [infoUser.data]);

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

  function handleChangeImageAvatar(e) {
    changeImageAvatar({
      type: e.target.files[0],
      image: e.target.files[0].name,
    });
  }

  function handleChangeDate(date, dateString) {
    // console.log("dateString dateString: ", dateString);
    setValues({ ...values, date: dateString });
  }

  function handleChangeInfo(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmitChangeInfo() {
    let isValue = true;
    const errorValue = {
      email: "",
      lastName: "",
      firstName: "",
      gender: "",
      birthDay: "",
      phone: "",
      city: "",
      district: "",
      street: "",
      address: "",
    };

    if (values.email.length === 0) {
      isValue = false;
      errorValue.email = "Vui lòng nhập email !";
    } else if (!/.+@.+\.[A-Za-z]+$/.test(values.email)) {
      isValue = false;
      errorValue.email = "Email không hợp lệ";
    } else {
      errorValue.email = "";
    }

    if (values.lastName.length === 0) {
      isValue = false;
      errorValue.lastName = "Vui lòng nhập tên tài khoản !";
    } else if (values.lastName.length > 6) {
      isValue = false;
      errorValue.lastName = "Tên tài khoản nhiều nhất là 6 ký tự";
    } else {
      errorValue.lastName = "";
    }

    if (values.firstName.length === 0) {
      isValue = false;
      errorValue.firstName = "Vui lòng nhập tên tài khoản !";
    } else if (values.firstName.length > 6) {
      isValue = false;
      errorValue.firstName = "Tên tài khoản nhiều nhất là 6 ký tự";
    } else {
      errorValue.firstName = "";
    }

    if (values.phone.length === 0) {
      isValue = false;
      errorValue.phone = "Vui lòng nhập số điện thoại !";
    } else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(values.phone)) {
      isValue = false;
      errorValue.phone = "Số điện thoại không hợp lệ";
    } else {
      errorValue.phone = "";
    }

    if (values.city.length === 0) {
      isValue = false;
      errorValue.city = "Vui lòng chọn thành phố hoặc tỉnh !";
    } else {
      errorValue.city = "";
    }

    if (values.district.length === 0) {
      isValue = false;
      errorValue.district = "Vui lòng chọn quận hoặc huyện !";
    } else {
      errorValue.district = "";
    }

    if (values.street.length === 0) {
      isValue = false;
      errorValue.street = "Vui lòng chọn xã hoặc phường !";
    } else {
      errorValue.street = "";
    }

    if (values.address.length === 0) {
      isValue = false;
      errorValue.address = "Vui lòng nhập địa chỉ chi tiết !";
    } else {
      errorValue.address = "";
    }

    if (isValue) {
      setErrors({ ...errorValue });
      changeInfoTask({
        ...values,
        city: values.city.split("/")[0],
        district: values.district.split("/")[0],
        street: values.street.split("/")[0],
      });
    } else {
      setErrors({ ...errorValue });
    }
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col md={10}>
          <div className="left-wrap-info">
            <div className="info-image">
              <img src={account?.image} alt="" />
              <div className="upload-btn-wrapper">
                <button className="btn">
                  <i className="fas fa-camera"></i>
                </button>
                <input
                  type="file"
                  name="myfile"
                  onChange={(e) => handleChangeImageAvatar(e)}
                />
              </div>
            </div>
            <div className="info-name">
              <p>{account?.lastName + " " + account?.firstName}</p>
            </div>
            <div className="info-button">
              <button
                className="btn-logout"
                onClick={() => {
                  sessionStorage.removeItem("infoUser");
                  history.push("/");
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </Col>
        <Col md={14}>
          <div className="right-wrap-info">
            <Row gutter={[16, 16]}>
              <Col md={12}>
                <div className="form-groups">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    placeholder="Nhập email của bạn"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChangeInfo(e)}
                  />
                  {errors.email.length > 0 && (
                    <small className="error">{errors.email}</small>
                  )}
                </div>
                <div className="form-groups">
                  <label htmlFor="">Họ của bạn</label>
                  <input
                    type="text"
                    placeholder="Nhập họ của bạn"
                    name="lastName"
                    value={values.lastName}
                    onChange={(e) => handleChangeInfo(e)}
                  />
                  {errors.lastName.length > 0 && (
                    <small className="error">{errors.lastName}</small>
                  )}
                </div>
                <div className="form-groups">
                  <label htmlFor="">Giới tính</label>
                  <div>
                    <Radio.Group
                      onChange={(e) => handleChangeInfo(e)}
                      defaultValue={
                        values.gender === "" ? "Nam" : values.gender
                      }
                      value={values.gender === "" ? "Nam" : values.gender}
                      name="gender"
                    >
                      <Radio value={"Nam"}>Nam</Radio>
                      <Radio value={"Nữ"}>Nữ</Radio>
                      <Radio value={"Khác"}>Khác</Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className="form-groups">
                  <select
                    name="city"
                    onChange={(e) => handleChangeInfo(e)}
                    value={values.city}
                  >
                    <option value="">Chọn thành phố / tỉnh</option>
                    {renderCity()}
                  </select>
                  {errors.city.length > 0 && (
                    <small className="error">{errors.city}</small>
                  )}
                </div>
                <div className="form-groups">
                  <select
                    name="street"
                    onChange={(e) => handleChangeInfo(e)}
                    value={values.street}
                  >
                    <option value="">Chọn xã / phường</option>
                    {renderWard()}
                  </select>
                  {errors.street.length > 0 && (
                    <small className="error">{errors.street}</small>
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div className="form-groups">
                  <label htmlFor="">Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại của bạn"
                    name="phone"
                    value={values.phone}
                    onChange={(e) => handleChangeInfo(e)}
                  />
                  {errors.phone.length > 0 && (
                    <small className="error">{errors.phone}</small>
                  )}
                </div>
                <div className="form-groups">
                  <label htmlFor="">Tên của bạn</label>
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn"
                    name="firstName"
                    value={values.firstName}
                    onChange={(e) => handleChangeInfo(e)}
                  />
                  {errors.firstName.length > 0 && (
                    <small className="error">{errors.firstName}</small>
                  )}
                </div>
                <div>
                  <label htmlFor="" style={{ display: "block" }}>
                    Ngày sinh
                  </label>
                  <DatePicker
                    defaultValue={moment(moment().format("L"), "DD/MM/YYYY")}
                    onChange={handleChangeDate}
                    format="DD/MM/YYYY"
                  />
                </div>
                <div className="form-groups">
                  <select
                    name="district"
                    onChange={(e) => handleChangeInfo(e)}
                    value={values.district}
                  >
                    <option value="">Chọn quận / huyện</option>
                    {renderDistrict()}
                  </select>
                  {errors.district.length > 0 && (
                    <small className="error">{errors.district}</small>
                  )}
                </div>
                <div className="form-groups">
                  <input
                    type="text"
                    placeholder="Địa chỉ chi tiết. Ví dụ: 99A hoặc Tổ 6"
                    name="address"
                    value={values.address}
                    onChange={(e) => handleChangeInfo(e)}
                  />
                  {errors.address.length > 0 && (
                    <small className="error">{errors.address}</small>
                  )}
                </div>
              </Col>
            </Row>
            <div className="content-button-info">
              <button
                className="button-info"
                onClick={() => {
                  handleSubmitChangeInfo();
                }}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const { infoUser } = state.authReducer;
  return {
    infoUser: infoUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeInfoTask: (params) => dispatch(changeInfoUserAction(params)),
    changeImageAvatar: (params) => dispatch(changeImageUserAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
