import React from "react";
import { NavLink } from "react-router-dom";
import { SideBarContent } from "../SideBarContent/Index.js";

import Logo from "../../../../images/xshop-black.png";
import "./style.css";

function Index() {
  return (
    <div className="wrap-side-bar-admin">
      <div className="content-side-bar-admin">
        <div className="image-logo-admin">
          <img src={Logo} alt="logo" />
        </div>
        <ul className="main-menu-admin">
          {SideBarContent.map((item, index) => {
            return (
              <li key={index} >
                <NavLink
                  to={`/area-admin/${item.link}`}
                  activeClassName="active-link-admin"
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Index;
