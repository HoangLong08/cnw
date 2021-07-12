import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../../../Admin/Common/Header/style.css";

function Index({ infoAdmin }) {
  const token = sessionStorage.getItem("infoAdmin");
  if (!infoAdmin.load) {
    if (token === null) {
      return <Redirect to="/area-admin/login" />;
    }
  }

  return (
    <div className="wrap-header-admin">
      <div className="header-section-admin">
        <div className="header-section-2-admin">
          <ul className="menu-main-center-admin">
            <li>
              <div className="srch_sb_cnt">
                <input
                  type="text"
                  name="text_bar"
                  id=""
                  className="sech_txt_inpt"
                  placeholder="Type to search..."
                />
                <button className="srch_btn">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div className="header-section-3-admin">
          {infoAdmin && (
            <div className="avatar-user-admin">
              <Link to="/area-admin/profile">
                {/* <i className="far fa-user"></i> */}
                <img src={infoAdmin.data?.account?.image} alt="avatar" />
                <span>
                  {infoAdmin.data?.account?.firstName !== ""
                    ? infoAdmin?.data?.account?.firstName
                    : "Admin"}
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { infoAdmin } = state.authAdminReducer;
  return {
    infoAdmin: infoAdmin,
  };
};

export default connect(mapStateToProps, null)(Index);
