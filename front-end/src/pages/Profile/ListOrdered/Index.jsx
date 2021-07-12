import React, { useEffect } from "react";
import { Table } from "antd";
import { connect } from "react-redux";

import { getProductHistoryOrderAction } from "../../../redux/actions";

import "../ListOrdered/style.css";

const columns = [
  { title: "Tên khách hàng", dataIndex: "nameCustomer", key: "nameCustomer" },
  { title: "Địa chỉ", dataIndex: "addressCustomer", key: "addressCustomer" },
  { title: "Điện thoai", dataIndex: "phoneCustomer", key: "phoneCustomer" },
  { title: "Thành tiền", dataIndex: "totalMoney", key: "totalMoney" },
  { title: "Thời gian đặt hàng", dataIndex: "timeOrder", key: "timeOrder" },
  { title: "Chú ý", dataIndex: "note", key: "note" },
  { title: "Tình trạng", dataIndex: "status", key: "status" },
];

const columnTwo = [
  { title: "Tên sản phẩm", dataIndex: "nameProduct", key: "nameProduct" },
  { title: "Hình ảnh", dataIndex: "imageProduct", key: "imageProduct" },
  { title: "Kích thước", dataIndex: "sizeProduct", key: "sizeProduct" },
  { title: "Số lượng", dataIndex: "quantityProduct", key: "quantityProduct" },
  { title: "Giá", dataIndex: "priceProduct", key: "priceProduct" },
];

function Index({ productOrderHistoryList, getProductOrderHistoryList }) {

  useEffect(() => {
    getProductOrderHistoryList();
  }, [getProductOrderHistoryList]);

  function renderProductHistory() {
    return productOrderHistoryList?.data.map((item, index) => {
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
        note: item.note,
        status: item.nameStatus,
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
    <div className="wrap-history">
      <Table
        pagination={false}
        columns={columns}
        scroll={{ x: 1024 }}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              pagination={false}
              columns={columnTwo}
              dataSource={record.infoProduct}
            />
          ),
        }}
        dataSource={renderProductHistory()}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { productOrderHistoryList } = state.productReducer;
  return {
    productOrderHistoryList: productOrderHistoryList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductOrderHistoryList: () => dispatch(getProductHistoryOrderAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
