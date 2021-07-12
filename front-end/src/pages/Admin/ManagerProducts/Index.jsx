import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Modal } from "antd";

import Header from "../Common/Header/Index.jsx";
import Sidebar from "../Common/SideBar/Index.jsx";

import {
  getProductListAdminAction,
  deleteProductAdminAction,
  getDetailProductAdminAction,
} from "../../../redux/actions";
import "../ManagerProducts/style.css";

const columns = [
  { title: "Tên sản phẩm", dataIndex: "nameProduct", key: "nameProduct" },
  { title: "Hình ảnh", dataIndex: "imageProduct", key: "imageProduct" },
  { title: "Giá gốc", dataIndex: "priceProduct", key: "priceProduct" },
  { title: "Sale", dataIndex: "saleProduct", key: "saleProduct" },
  { title: "Action", dataIndex: "actionProduct", key: "actionProduct" },
];

function Index({
  productListAdmin,
  deleteProduct,
  productDetail,
  getProductListAdminTask,
  deleteProductAdminTask,
  getDetailProductAdminTask,
}) {
  const {
    name,
    category,
    des,
    price,
    productOptionColors,
    productOptionSizes,
    sale,
    sortDes,
    supplier,
  } = productDetail.data;

  const [isModalVisibleDeleteProduct, setIsModalVisibleDeleteProduct] =
    useState(false);
  const [contentInfoModal, setContentInfoModal] = useState({});

  const [productList, setProductList] = useState(productListAdmin.data);

  const [isModalVisibleShowProduct, setIsModalVisibleShowProduct] =
    useState(false);

  useEffect(() => {
    if (!deleteProduct.load) {
      getProductListAdminTask();
    }
  }, [deleteProduct, getProductListAdminTask]);

  useEffect(() => {
    if (!deleteProduct.load) {
      setProductList(productListAdmin.data);
    }
  }, [deleteProduct, productListAdmin.data]);

  function showModal() {
    setIsModalVisibleDeleteProduct(true);
  }

  const handleOk = () => {
    deleteProductAdminTask(contentInfoModal);
    setIsModalVisibleDeleteProduct(false);
  };

  const handleCancel = () => {
    setIsModalVisibleDeleteProduct(false);
  };

  //  ---------------------

  function showModalShowProduct() {
    setIsModalVisibleShowProduct(true);
  }

  const handleOkShowProduct = () => {
    setIsModalVisibleShowProduct(false);
  };

  const handleCancelShowProduct = () => {
    setIsModalVisibleShowProduct(false);
  };

  function createMarkup() {
    return {
      __html: des,
    };
  }

  function renderImageList(arrImg) {
    return arrImg.map((item, index) => {
      return <img src={item} alt="hello" key={index + 100} />;
    });
  }

  function renderOptionColorProduct() {
    return productOptionColors?.map((item, index) => {
      return (
        <div key={index}>
          <img src={item.img} alt="hello" />
          {renderImageList(item.list_detail_img)}
        </div>
      );
    });
  }

  function renderOptionSize() {
    return productOptionSizes?.map((item, index) => {
      return (
        <p key={index}>
          <span>{item.size}</span> số lượng còn {item.number}
        </p>
      );
    });
  }

  function renderListProduct() {
    return productList?.map((item, index) => {
      return {
        key: index,
        nameProduct: item.name,
        imageProduct: (
          <div className="item-image-admin">
            <img src={item.image[0].img} alt={item.name} />
          </div>
        ),
        priceProduct: item.price.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        }),
        saleProduct: item.sale,
        actionProduct: (
          <div className="action-product-admin">
            <div>
              <button
                onClick={() => {
                  showModalShowProduct();
                  getDetailProductAdminTask({ id: item.id });
                }}
              >
                <i className="fas fa-eye"></i>
              </button>
            </div>
            <div>
              <Link to={`/area-admin/manager-product/edit-product/${item.id}`}>
                <button>
                  <i className="fas fa-pen"></i>
                </button>
              </Link>
            </div>
            <div>
              <button
                className="btn-delete-admin"
                onClick={() => {
                  showModal();
                  setContentInfoModal({
                    nameProduct: item.name,
                    idProduct: item.id,
                  });
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ),
      };
    });
  }

  return (
    <div className="wrap-website">
      <Sidebar />
      <Header />
      <div className="content-website">
        <h1>Manager product</h1>
        <Table
          columns={columns}
          dataSource={renderListProduct()}
          size="middle"
        />
        ,
      </div>
      <Modal
        title="Thông báo"
        visible={isModalVisibleDeleteProduct}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Bạn có xóa sản phẩm có tên {contentInfoModal.nameProduct} này không ?
        </p>
      </Modal>

      <Modal
        title={`Xem chi tiết sản phẩm: ${name}`}
        visible={isModalVisibleShowProduct}
        onOk={handleOkShowProduct}
        onCancel={handleCancelShowProduct}
        width={1000}
      >
        <p>{category}</p>
        <p>{sortDes}</p>
        <p>{price}</p>
        <div className="content-image-admin">{renderOptionColorProduct()}</div>
        <div>{renderOptionSize()}</div>
        <p>{sale}</p>
        <p>{supplier}</p>
        <div
          className="des-product-content"
          dangerouslySetInnerHTML={createMarkup()}
        />
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { productListAdmin, deleteProduct, productDetail } =
    state.productAdminReducer;
  return {
    productListAdmin: productListAdmin,
    deleteProduct: deleteProduct,
    productDetail: productDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductListAdminTask: () => dispatch(getProductListAdminAction()),
    deleteProductAdminTask: (params) =>
      dispatch(deleteProductAdminAction(params)),
    getDetailProductAdminTask: (params) =>
      dispatch(getDetailProductAdminAction(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
