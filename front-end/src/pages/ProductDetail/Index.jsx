import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Row, Col, Collapse, notification } from "antd";

import Header from "../commom/Header/Index.jsx";
import Footer from "../commom/Footer/Index.jsx";

import {
  getProductDetailAction,
  addProductCartAction,
} from "../../redux/actions";

import history from "../../utils/history";
import "../ProductDetail/style.css";

const { Panel } = Collapse;

const openNotificationWithIcon = (type, stringNotify) => {
  notification[type]({
    message: stringNotify,
    description: "Vui lòng liên hệ cửa hàng. Xin cảm ơn",
  });
};

function Index({ productDetail, getProductDetail, addProductCart, match }) {
  const productId = match.params.id;
  const {
    name,
    price,
    des,
    sale,
    sortDes,
    productOptionColors,
    productOptionSizes,
  } = productDetail.data;

  const [idx, setIdx] = useState(0);

  const [imageSrc, setImageSrc] = useState(
    !productDetail.load && productOptionColors !== undefined
      ? productOptionColors[idx].img
      : ""
  );

  const [viewMore, setViewMore] = useState(false);
  const [activeBorder, setActiveBorder] = useState({
    check: true,
    id: 0,
  });
  const [activeBackground, setActiveBackground] = useState({
    check: true,
    id: 0,
  });

  const [listImgDetail, setListImgDetail] = useState(
    productOptionColors && productOptionColors[0].list_detail_img
  );

  const [shopCart, setShopCart] = useState({
    id: parseInt(productId),
    idColor: 0,
    name: name,
    price: price,
    sale: sale,
    optionColor: "",
    optionSize: 0,
    inventoryShoes: 0,
  });

  useEffect(() => {
    setListImgDetail(
      productOptionColors !== undefined
        ? productOptionColors[0].list_detail_img
        : []
    );
    setImageSrc(
      productOptionColors !== undefined ? productOptionColors[0].img : []
    );

    setShopCart({
      id: parseInt(productId),
      idColor: productOptionColors && productOptionColors[0].id,
      name: name,
      price: price,
      sale: sale,
      optionColor: productOptionColors && productOptionColors[0].img,
      optionSize: productOptionSizes && productOptionSizes[0].size,
      inventoryShoes: productOptionSizes && productOptionSizes[0].number,
    });
  }, [
    productDetail.data,
    productOptionColors,
    productOptionSizes,
    productId,
    name,
    price,
    sale,
  ]);

  useEffect(() => {
    getProductDetail({ id: productId });
  }, [getProductDetail, productId]);

  if (productDetail.load) {
    return <h1>Loading ...</h1>;
  }

  function createMarkup() {
    return {
      __html: des,
    };
  }

  function renderListOptionColors() {
    return productOptionColors?.map((item, index) => {
      return (
        <div
          className="thumbnail-color"
          style={{
            border:
              activeBorder.check === true && index === activeBorder.id
                ? "1px solid red"
                : "",
          }}
          key={index}
          onClick={() => {
            setIdx(index);
            setListImgDetail(productOptionColors[index]?.list_detail_img);
            setImageSrc(productOptionColors[index]?.img);
            setActiveBorder({ ...activeBorder, id: index });
            setShopCart({
              ...shopCart,
              optionColor: productOptionColors[index]?.img,
              idColor: productOptionColors[index]?.id,
            });
          }}
        >
          <img src={item.img} aria-hidden alt="image" />
        </div>
      );
    });
  }

  function renderListOptionSize() {
    return productOptionSizes?.map((item, index) => {
      return (
        <div
          className={
            "thumbnail-size " +
            (activeBackground.check === true && index === activeBackground.id
              ? "active-thumbnail-size"
              : "")
          }
          key={index}
          onClick={() => {
            setActiveBackground({ ...activeBackground, id: index });
            setShopCart({
              ...shopCart,
              optionSize: item.size,
              inventoryShoes: item.number,
            });
            if (item.number === 0) {
              openNotificationWithIcon("error", "Sản phẩm đã hết hàng");
            }
          }}
        >
          <p>{item.size}</p>

          <div className="thumbnail-quanity">
            <p>Số lượng còn: {item.number}</p>
          </div>
        </div>
      );
    });
  }

  function renderListImages() {
    return (
      productOptionColors &&
      listImgDetail?.map((item, index) => {
        return (
          <div className="thumbnail-image" key={index}>
            <img
              src={item}
              aria-hidden
              alt="image"
              onClick={(e) => setImageSrc(e.target.src)}
            />
          </div>
        );
      })
    );
  }

  return (
    <>
      <Header />
      <div className="wrap-detail">
        <div className="wrap-detail-content">
          <div className="product-detail-toolbar">
            <ul className="menu-toolbar">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <i className="fas fa-chevron-right"></i>
              </li>
              <li>Sản phẩm chi tiết</li>
              <li>
                <i className="fas fa-chevron-right"></i>
              </li>
              <li>{name}</li>
            </ul>
          </div>
          <Row gutter={[16, 16]}>
            <Col md={2}>
              <div className="detail-list-image">{renderListImages()}</div>
            </Col>
            <Col md={12}>
              <div className="detail-image-main">
                <img
                  src={
                    listImgDetail !== undefined && !productDetail.load
                      ? imageSrc
                      : null
                  }
                  alt="sản phẩm"
                />
                <div
                  className="detail-product-sale"
                  style={{ display: sale === 0 && "none" }}
                >
                  <span>Giảm {sale} %</span>
                </div>
              </div>
            </Col>
            <Col md={10} className="wrap-detail-info">
              <div className="detail-name">
                <h1>{name}</h1>
              </div>
              <div className="detail-short-des">
                <p>{sortDes}</p>
              </div>
              <div className="detail-price">
                <p>
                  <span style={{ display: sale === 0 && "none" }}>
                    <strike>
                      {price?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strike>
                  </span>
                  <span>
                    {(price - (price * sale) / 100)?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </p>
                {/* <p>{price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p> */}
              </div>
              <div className="div-color">
                <h3>Màu sắc</h3>
              </div>
              <div className="detail-color">{renderListOptionColors()}</div>
              <div className="lable">
                <h3>Kích cỡ</h3>
                <p>HD cách chọn size giày</p>
              </div>
              <div className="detail-size">{renderListOptionSize()}</div>
              <div className="detail-button">
                <button
                  className="btn-buy"
                  onClick={() => {
                    if (shopCart.inventoryShoes === 0) {
                      openNotificationWithIcon(
                        "error",
                        "Sản phẩm giày có kích thước " +
                          shopCart.optionSize +
                          " đã hết hàng"
                      );
                    } else {
                      addProductCart({ shopCart });
                      history.push("/cart");
                    }
                  }}
                >
                  Mua ngay
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="detail-des">
          <Row gutter={[16, 16]}>
            <Col md={14}>
              <div className="detail-title-div">
                <h3>Mô tả</h3>
              </div>
              <div
                className="des-product-content"
                style={{
                  height: viewMore === false ? "90px" : "auto",
                  overflow: viewMore === false ? "hidden" : "auto",
                }}
                dangerouslySetInnerHTML={createMarkup()}
              />
              <div className="view-more">
                <button
                  className="btn-more"
                  onClick={() => setViewMore(!viewMore)}
                >
                  {viewMore === false ? "Xem thêm" : "Thu nhỏ"}
                </button>
              </div>
            </Col>
            <Col md={10}>
              <div className="detail-title-div">
                <h3>Chính sách xshop</h3>
              </div>
              <Collapse accordion>
                <Panel header="CHÍNH SÁCH GIAO HÀNG & ĐỔI TRẢ" key="1">
                  <p>Giao hàng hoàn toàn miễn phí 100%</p>
                  <p>An toàn với nhận hàng và trả tiền tại nhà</p>
                  <p>Bảo hành đổi trả trong vòng 60 ngày</p>
                </Panel>
                <Panel header="HƯỚNG DẪN BẢO QUẢN" key="2">
                  <h4>Khử mùi bên trong giày</h4>
                  <p>
                    Bạn hãy đặt túi đựng viên chống ẩm vào bên trong giày để hút
                    ẩm và rắc phấn rôm (có thể thay bằng cách đặt vào bên trong
                    giày gói trà túi lọc chưa qua sử dụng) để khử mùi, giúp giày
                    luôn khô thoáng. Để hạn chế mùi hôi và sự ẩm ướt cho giày,
                    hãy chọn vớ chân loại tốt, có khả năng thấm hút cao. Ngoài
                    ra, dùng các loại lót giày khử mùi cũng là một phương pháp
                    tốt.
                  </p>
                  <h4>Bảo quản giày khi không sử dụng</h4>
                  <p>
                    Khi sử dụng giày, bạn đừng vội vứt hộp đi mà hãy cất lại để
                    dành. Khi không sử dụng, hãy nhét một ít giấy vụn vào bên
                    trong giày để giữ cho dáng giày luôn chuẩn, đẹp. Sau đó đặt
                    giày vào hộp bảo quản cùng túi hút ẩm.
                  </p>
                </Panel>
                <Panel header="TỔNG ĐÀI BÁN HÀNG  113" key="3">
                  <p>Gọi điện đặt hàng để được hướng dẫn chi tiết nhé :)</p>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  const { productDetail } = state.productReducer;
  return {
    productDetail: productDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    addProductCart: (params) => dispatch(addProductCartAction(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
