import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Table, Select } from "antd";
import Header from "../Common/Header/Index.jsx";
import Sidebar from "../Common/SideBar/Index.jsx";
import {
  getOrderListAdminAction,
  changeStatusOrderAdminAction,
} from "../../../redux/actions";
import "./style.css";

const columns = [
  { title: "Tên khách hàng", dataIndex: "nameCustomer", key: "nameCustomer" },
  { title: "Địa chỉ", dataIndex: "addressCustomer", key: "addressCustomer" },
  { title: "Điện thoai", dataIndex: "phoneCustomer", key: "phoneCustomer" },
  { title: "Thành tiền", dataIndex: "totalMoney", key: "totalMoney" },
  { title: "Thời gian đặt hàng", dataIndex: "timeOrder", key: "timeOrder" },
  { title: "Tình trạng", dataIndex: "status", key: "status" },
  { title: "Action", dataIndex: "actionOrder", key: "actionOrder" },
];

const columnTwo = [
  { title: "Tên sản phẩm", dataIndex: "nameProduct", key: "nameProduct" },
  { title: "Hình ảnh", dataIndex: "imageProduct", key: "imageProduct" },
  { title: "Kích thước", dataIndex: "sizeProduct", key: "sizeProduct" },
  { title: "Số lượng", dataIndex: "quantityProduct", key: "quantityProduct" },
  { title: "Giá", dataIndex: "priceProduct", key: "priceProduct" },
];

const { Option } = Select;

function Index({
  orderListAdmin,
  getOrderListAdminTask,
  postChangeStatusOrderTask,
}) {
  console.log("orderListAdmin: ", orderListAdmin);

  useEffect(() => {
    getOrderListAdminTask();
  }, [getOrderListAdminTask]);

  const [valueStatus, setValueStatus] = useState({
    id: 0,
    status: 1,
  });

  function handleEditStatus(value, id) {
    setValueStatus({ ...valueStatus, id: id, status: value });
  }

  useEffect(() => {
    if (valueStatus.id) {
      postChangeStatusOrderTask(valueStatus);
    }
  }, [valueStatus, postChangeStatusOrderTask]);

  console.log("valueStatus: ", valueStatus);

  function renderListOrder() {
    return orderListAdmin?.data.map((item, index) => {
      return {
        key: index,
        nameCustomer: item.name,
        addressCustomer:
          item.address +
          " - " +
          item.street +
          " - " +
          item.district +
          " - " +
          item.city,

        totalMoney: item.totallMoneyOrderList.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        }),

        phoneCustomer: item.phone,
        timeOrder: item.createdAt,
        status: item.nameStatus,
        note: item.note,
        actionOrder: (
          <div className="action-product-admin">
            <div>
              <Select
                defaultValue={item.idStatus}
                style={{ width: 180 }}
                onChange={(e) => handleEditStatus(e, item.id)}
              >
                <Option value={1}>Đợi xét duyệt</Option>
                <Option value={2}>Đang đóng gói</Option>

                <Option value={3}>Đã xuất kho</Option>
                <Option value={4}>Đang vận chuyển</Option>
                <Option value={5}>Đợi thanh toán</Option>
                <Option value={6}>Đã thanh toán</Option>
                <Option value={7}>Hủy đơn hàng</Option>
              </Select>
            </div>
          </div>
        ),
        infoProduct: item.detail.map((itemProduct, indexProduct) => {
          return {
            key: indexProduct + 1,
            nameProduct: itemProduct.proName,
            imageProduct: (
              <div className="history-image">
                <img
                  src={itemProduct.color}
                  alt={itemProduct.proName}
                  aria-hidden
                />
              </div>
            ),
            sizeProduct: itemProduct.size,
            quantityProduct: itemProduct.quantity,
            priceProduct: itemProduct.total.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            }),
          };
        }),
      };
    });
  }

  return (
    // 527
    <div className="wrap-website">
      <Sidebar />
      <Header />
      <div className="content-website">
        <h1>Manager order</h1>
        <Table
          pagination={true}
          columns={columns}
          scroll={{ x: 1024 }}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <p style={{ fontSize: "16px" }}>
                  {" "}
                  <span style={{ color: "red" }}>Chú ý đơn hàng:</span>{" "}
                  {record.note}
                </p>
                <Table
                  pagination={false}
                  columns={columnTwo}
                  dataSource={record.infoProduct}
                />
              </>
            ),
          }}
          dataSource={renderListOrder()}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { orderListAdmin } = state.orderAdminReducer;
  return {
    orderListAdmin: orderListAdmin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getOrderListAdminTask: () => dispatch(getOrderListAdminAction()),
    postChangeStatusOrderTask: (params) =>
      dispatch(changeStatusOrderAdminAction(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
