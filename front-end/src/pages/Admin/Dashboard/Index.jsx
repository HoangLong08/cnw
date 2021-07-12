import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "../Common/Header/Index.jsx";
import Sidebar from "../Common/SideBar/Index.jsx";

import { getDataDashboardAdminAction } from "../../../redux/actions";

import "../Dashboard/style.css";

function Index({ dataDashboard, getDataDashboardAdminTask }) {
  const { topCustomer, topProduct, totalCustomer, totalOrder, totalSale } =
    dataDashboard.data;

  useEffect(() => {
    getDataDashboardAdminTask();
  }, [getDataDashboardAdminTask]);

  function renderTopCustomer() {
    return topCustomer?.map((item, index) => {
      let tmp = parseInt(item.sum);
      return (
        <tr key={index}>
          <td className="truncate">
            <p>{item.email}</p>
          </td>
          <td>{item.name}</td>
          <td>
            {tmp.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </td>
        </tr>
      );
    });
  }

  function renderTopProduct() {
    return topProduct?.map((item, index) => {
      let tmp = parseInt(item.price);
      return (
        <tr key={index}>
          <td className="truncate">
            <p>{item.name}</p>
          </td>
          <td>
            {tmp.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </td>
          <td>{item.sale}</td>
          <td>{item.sup}</td>
        </tr>
      );
    });
  }

  return (
    <div className="wrap-website">
      <Sidebar />
      <Header />
      <div className="content-website">
        <h1>Dashboard</h1>
        <div className="wrap-top-dashboard-admin">
          <div className="content-total-sale-dashboard-admin">
            <div>
              <h3>Total Sales</h3>
              <p>
                {totalSale?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
            <p>
              <i className="fas fa-dollar-sign"></i>
            </p>
          </div>
          <div className="content-total-order-dashboard-admin">
            <div>
              <h3>Total Order</h3>
              <p>{totalOrder}</p>
            </div>
            <p>
              <i className="fas fa-shopping-cart"></i>
            </p>
          </div>
          <div className="content-total-customer-dashboard-admin">
            <div>
              <h3>Total Customer</h3>
              <p>{totalCustomer}</p>
            </div>
            <p>
              <i className="fas fa-users"></i>
            </p>
          </div>
        </div>

        <div className="wrap-bottom-dashboard-admin">
          <div className="content-table-top-customer">
            <h1>Top customer</h1>
            <table>
              <thead className="thead">
                <tr className="tr-table">
                  <td className="text-nowrap">
                    <p>Email</p>
                  </td>
                  <td className="text-nowrap">
                    <p>Name Customer</p>
                  </td>
                  <td className="text-nowrap">
                    {" "}
                    <p>Total spending</p>
                  </td>
                </tr>
              </thead>
              <tbody>{renderTopCustomer()}</tbody>
            </table>
          </div>
          <div className="content-table-top-sale">
            <h1>Top most sold product </h1>
            <table>
              <thead className="thead">
                <tr className="tr-table">
                  <td>Name product</td>
                  <td>Price</td>
                  <td>Sale</td>
                  <td>Supplier</td>
                </tr>
              </thead>
              <tbody>{renderTopProduct()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { dataDashboard } = state.userAdminReducer;
  return {
    dataDashboard: dataDashboard,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDataDashboardAdminTask: () => dispatch(getDataDashboardAdminAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
