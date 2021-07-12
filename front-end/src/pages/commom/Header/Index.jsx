import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

// import history from "../../../utils/history.js";
import Logo from "../../../images/xshop-black.png";
import "../Header/style.css";

function Index({ infoUser, numberCart, searchTask }) {
  const history = useHistory();
  const [infoUsers, setInfoUsers] = useState(infoUser);
  const [searchValue, setSearchValue] = useState({
    search: "",
  });

  useEffect(() => {
    const infoUserStorage = JSON.parse(sessionStorage.getItem("infoUser"));
    if (infoUser) {
      setInfoUsers(infoUserStorage);
    }
  }, [infoUser]);

  function handleChangeSearch(e) {
    const { name, value } = e.target;
    setSearchValue({
      ...searchValue,
      [name]: value,
    });
  }

  function handleSubmitSearch() {
    history.push(`/search?q=` + searchValue.search.trim().split(" ").join("+"));
  }

  return (
    <>
      <div className="wrap-header">
        <div className="header-section">
          <div className="header-section-1">
            <div className="site-logo">
              <Link to="/">
                <img className="header-image" src={Logo} alt="logo shop" />
              </Link>
            </div>
          </div>

          <div className="header-section-2">
            <ul className="menu-main-center">
              <li>
                <Link to="/category/giay-nike">GIÀY NIKE</Link>
              </li>
              <li>
                <Link to="/category/giay-adidas">GIÀY ADIDAS</Link>
              </li>
              <li>
                <Link to="/category/giay-vans">GIÀY VANS</Link>
              </li>
              {/* <li>
                <Link to="/category/giay-fashion">GIÀY THỜI TRANG</Link>
              </li> */}
            </ul>
          </div>

          <div className="header-section-3">
            <ul className="menu-main-right">
              <li className="wrap-search-header">
                {/* <Link to="/"> */}
                <i className="fas fa-search"></i>
                <div className="content-search-header">
                  <input
                    type="text"
                    name="search"
                    value={searchValue.search}
                    onChange={(e) => handleChangeSearch(e)}
                  />
                  <button
                    onClick={() => {
                      handleSubmitSearch();
                    }}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                {/* </Link> */}
              </li>
              <li className="number-cart">
                <Link to="/cart">
                  <i className="far fa-shopping-bag"></i>
                </Link>
                <span className="content-number-cart">{numberCart}</span>
              </li>
              {infoUsers ? (
                <>
                  <li className="avatar-user">
                    <Link to="/profile">
                      {/* <i className="far fa-user"></i> */}
                      <img src={infoUsers?.account?.image} alt="avatar" />
                      <span>
                        {infoUsers?.account?.firstName !== ""
                          ? infoUsers?.account?.firstName
                          : "User"}
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <i className="far fa-sign-in-alt"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <i className="far fa-book"></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { infoUser } = state.authReducer;
  const { numberCart } = state.cartReducer;
  return {
    infoUser: infoUser,
    numberCart: numberCart,
  };
};

export default connect(mapStateToProps, null)(Index);
