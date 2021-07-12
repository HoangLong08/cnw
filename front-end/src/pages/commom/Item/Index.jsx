import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";

import "../Item/style.css";


const { Meta } = Card;

function Index(props) {
  const { id, name, image, price, sale } = props;
  return (
    <>
      <div className="wrap-item">
        <Link to={`/product/${id}`}>
          <Card hoverable cover={<img alt="example" src={image} />}>
            <Meta
              title={name}
              description={
                <>
                  <div className="item-price">
                    {sale > 0 ? (
                      <>
                        <p className="item-price-sale">
                          <strike>
                            {price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </strike>
                        </p>
                        <p>
                          {(price - (price * sale) / 100).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </>
                    ) : (
                      <p>
                        {price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    )}
                  </div>
                  <p
                    className="item-sale"
                    style={{ display: sale === 0 && "none" }}
                  >
                    Giảm {sale} %
                  </p>
                </>
              }
            />
          </Card>
        </Link>
      </div>
    </>
  );
}

export default Index;
