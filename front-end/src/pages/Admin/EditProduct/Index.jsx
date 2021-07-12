import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";

import Header from "../Common/Header/Index.jsx";
import Sidebar from "../Common/SideBar/Index.jsx";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ClassicEditor from "../../../../ckeditor5/packages/ckeditor5-build-classic";
import { getDetailProductAdminAction } from "../../../redux/actions";

import "../EditProduct/style.css";

function Index({ productDetail, getDetailProductAdminTask, match }) {
  console.log("match: ", match.params.id);
  const idProduct = match.params.id;
  console.log("productDetail: ", productDetail);

  const {
    name,
    price,
    des,
    sale,
    sortDes,
    supplier,
    productOptionColors,
    productOptionSizes,
  } = productDetail.data;

  const [values, setValues] = useState({
    name: name,
    price: "",
    des: "",
    sale: "",
    sortDes: "",
    supplier: "",
    productOptionColors: "",
    productOptionSizes: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    des: "",
    sale: "",
    sortDes: "",
    supplier: "",
    productOptionColors: "",
    productOptionSizes: "",
  });

  const [inputListOptionSize, setInputListOptionSize] = useState([
    { id: "", size: "", number: "" },
  ]);

  useEffect(() => {
    getDetailProductAdminTask({ id: idProduct });
  }, [getDetailProductAdminTask, idProduct]);

  useEffect(() => {
    if (!productDetail.load) {
      setValues((values) => ({
        ...values,
        name: name,
        price: price,
        des: des,
        sale: sale,
        sortDes: sortDes,
        supplier: supplier,
        productOptionColors,
      }));
      setInputListOptionSize(productOptionSizes);
    }
  }, [
    productDetail,
    name,
    price,
    des,
    sale,
    sortDes,
    supplier,
    productOptionSizes,
    productOptionColors,
  ]);

  // useEffect(() => {
  //   if (!productDetail.load) {
  //     setLoloo(lolo);
  //     setUploadMultiImage((uploadMultiImage) => ({
  //       ...uploadMultiImage,
  //       fileList: lolo,
  //       // fileList: [
  //       //   {
  //       //     name: "5image.png",
  //       //     status: "done",
  //       //     uid: 4,
  //       //     url: "https://giayxshop.vn/wp-content/uploads/2021/06/z2534509130546_38bfbabe4fab36886001c0b1348f0b4b-150x150.jpg",
  //       //   },
  //       // ],
  //     }));
  //   }
  // }, [productDetail]);

  console.log("productOptionColors: ", productOptionColors);

  const [inputListOptionColor, setInputListOptionColor] = useState([]);

  function renderOptionColor() {
    return productOptionColors?.map((item, index) => {
      return (
        <div className="item-image-option-admin" key={index}>
          <img src={item.img} alt="ảnh" />
        </div>
      );
    });
  }

  function handleChangeEditProduct(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleChangeEditProductOptionSize(e, index) {
    const { name, value } = e.target;
    const list = [...inputListOptionSize];
    list[index][name] = value;
    setInputListOptionSize(list);
  }

  const handleAddClickOptionSize = () => {
    setInputListOptionSize([
      ...inputListOptionSize,
      { id: "", size: "", number: "" },
    ]);
  };

  const handleRemoveClickOptionSize = (index) => {
    const list = [...inputListOptionSize];
    list.splice(index, 1);
    setInputListOptionSize(list);
  };

  function handleSubmitEditProduct() {
    let isValue = true;
    const errorValue = {
      name: "",
      price: "",
      des: "",
      sale: "",
      sortDes: "",
      supplier: "",
      productOptionColors: "",
      productOptionSizes: "",
    };

    if (isValue) {
      setErrors({ ...errorValue });
    } else {
      setErrors({ ...errorValue });
    }
  }

  return (
    <div className="wrap-website">
      <Sidebar />
      <Header />
      <div className="content-website">
        <h1>Edit</h1>
        {productDetail.load ? (
          <h1>Loading ...</h1>
        ) : (
          <Row gutter={[16, 16]}>
            <Col md={12}>
              <div className="form-groups">
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm của bạn"
                  name="name"
                  value={values.name || ""}
                  onChange={(e) => handleChangeEditProduct(e)}
                />
                {errors.name.length > 0 && (
                  <small className="error">{errors.name}</small>
                )}
              </div>
              <div className="form-groups">
                <input
                  type="text"
                  placeholder="Nhập giá của sản phẩm"
                  name="price"
                  value={values.price || ""}
                  onChange={(e) => handleChangeEditProduct(e)}
                />
                {errors.price.length > 0 && (
                  <small className="error">{errors.price}</small>
                )}
              </div>

              {inputListOptionSize?.map((item, index) => {
                return (
                  <div className="option-size-admin" key={index}>
                    <input
                      type="text"
                      placeholder="Nhập size giày"
                      name="size"
                      value={item.size || ""}
                      onChange={(e) =>
                        handleChangeEditProductOptionSize(e, index)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Số lượng của size giày"
                      name="quantity"
                      value={item.number}
                      onChange={(e) =>
                        handleChangeEditProductOptionSize(e, index)
                      }
                    />
                    {inputListOptionSize.length !== 1 && (
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveClickOptionSize(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                    {inputListOptionSize.length - 1 === index && (
                      <button
                        className="add-btn"
                        onClick={handleAddClickOptionSize}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    )}
                  </div>
                );
              })}
            </Col>
            <Col md={12}>
              <div className="form-groups">
                <input
                  type="text"
                  placeholder="Nhập tên nhà cung cấp của sản phẩm"
                  name="supplier"
                  value={values.supplier || ""}
                  onChange={(e) => handleChangeEditProduct(e)}
                />
                {errors.supplier.length > 0 && (
                  <small className="error">{errors.supplier}</small>
                )}
              </div>
              <div className="form-groups">
                <input
                  type="text"
                  placeholder="Nhập giảm giá của sản phẩm"
                  name="sale"
                  value={values.sale || ""}
                  onChange={(e) => handleChangeEditProduct(e)}
                />

                {errors.sale.length > 0 && (
                  <small className="error">{errors.sale}</small>
                )}
              </div>
              <div>{renderOptionColor()}</div>
              {/* <div>
              <input
                type="text"
                placeholder="Nhập size giày"
                name="size"
                value={values.size}
                onChange={(e) => handleEditProductOptionSize(e)}
              />
              <input
                type="text"
                placeholder="Nhập số lượng của size giày"
                name="quantity"
                value={values.quantity}
                onChange={(e) => handleEditProductOptionSize(e)}
              />
              <button>add</button>
            </div> */}
            </Col>
            <div className="wrap-ckeditor-edit-admin">
              <CKEditor
                config={{
                  ckfinder: {
                    uploadUrl:
                      "../../../../ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json",
                  },
                }}
                // config={{
                //   ckfinder: {
                //     // Upload the images to the server using the CKFinder QuickUpload command
                //     // You have to change this address to your server that has the ckfinder php connector
                //     uploadUrl:
                //       "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
                //   },
                // }}
                className="mt-3 wrap-ckeditor"
                editor={ClassicEditor && ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </div>

            <div>
              <button onClick={() => handleSubmitEditProduct()}>
                Cập nhật
              </button>
            </div>
          </Row>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { productDetail } = state.productAdminReducer;
  return {
    productDetail: productDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProductAdminTask: (params) =>
      dispatch(getDetailProductAdminAction(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
