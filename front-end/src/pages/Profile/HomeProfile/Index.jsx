import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Card } from "antd";

import Header from "../../commom/Header/Index.jsx";
import Footer from "../../commom/Footer/Index.jsx";

import ChangeInfo from "../ChangeInfoUser/Index.jsx";
import ChangePassword from "../ChangePassword/Index.jsx";
import ListOrdered from "../ListOrdered/Index.jsx";

const tabListNoTitle = [
  {
    key: "changeInfo",
    tab: "Thông tin cá nhân",
  },
  {
    key: "changePassword",
    tab: "Thay đổi mật khẩu",
  },
  {
    key: "listOrdered",
    tab: "Lịch sử giao hàng",
  },
];

const contentListNoTitle = {
  changeInfo: <ChangeInfo />,
  changePassword: <ChangePassword />,
  listOrdered: <ListOrdered />,
};

function Index() {
  const [tab, setTab] = useState({
    noTitleKey: "changeInfo",
  });

  function onTabChange(key, type) {
    setTab({ [type]: key });
  }

  const token = sessionStorage.getItem("infoUser")
    ? JSON.parse(sessionStorage.getItem("infoUser"))
    : null;

  if (token?.token === null || token === null) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header />
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={setTab.noTitleKey}
        onTabChange={(key) => {
          onTabChange(key, "noTitleKey");
        }}
      >
        {contentListNoTitle[tab.noTitleKey]}
      </Card>
      <Footer />
    </>
  );
}

export default Index;
