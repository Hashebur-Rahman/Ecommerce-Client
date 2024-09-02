import { Fragment, useEffect, useState } from "react";
import SEO from "../seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation, useParams } from "react-router-dom";
import clsx from "clsx";
import Rating from "../../components/product/sub-components/ProductRating";
import React from "react";
import axios from "axios";
import { Base_Url } from "../../Config/config";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import ShopSearch from "../product/ShopSearch";
import Spinner from "../Spinner/Spinner";

export default function ShowCategortyProduct({
  spaceTopClass,
  spaceBottomClass,
}) {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get(`${Base_Url}/api/getProduct`);
        // console.log(data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProduct();
  }, []);

  console.log(id);
  const categoryProduct = product.filter((item) => item.category === `${id}`);

  console.log(categoryProduct);
  // console.log(id);

  const handleClick = (id, name) => {
    navigate(`/products/${id}/${name}`);
    window.location.reload();
  };

  return (
    <Fragment>
      <SEO
        titleTemplate={id}
        description="Category pages of  Shohoj Dokan Online Shop BD."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Category", path: process.env.PUBLIC_URL + "/" },
            {
              label: id,
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />

        {loading ? (
          <Spinner />
        ) : (
          <div className="container mb-20">
            {categoryProduct.length === 0 ? (
              <p className="text-center">
                No items found for the selected category.
              </p>
            ) : (
              <Fragment>
                <ShopSearch />
                <div
                  className={clsx("shop-area", spaceTopClass, spaceBottomClass)}
                >
                  <Row
                    xs={2}
                    sm={3}
                    md={4}
                    lg={4}
                    className="xs:g-2 g-2 container  h-75"
                  >
                    {categoryProduct.map((p) => (
                      <Col className={clsx("product-wrap")} key={p._id}>
                        <Card onClick={() => handleClick(p._id, p.name)}>
                          <div className="product-img img-fluid">
                            <Link
                              to={process.env.PUBLIC_URL + "/products/" + p._id}
                            >
                              {/* Display placeholder initially */}
                              <img
                                className="default-img"
                                src={`${process.env.PUBLIC_URL}/shohojdokan-product-loader.png`}
                                alt={p.name}
                                style={{ display: "block" }}
                              />
                              {/* Once loaded, show the actual image */}
                              <img
                                className="default-img"
                                src={p.image}
                                alt={p.name}
                                onLoad={(e) =>
                                  (e.currentTarget.previousSibling.style.display =
                                    "none")
                                }
                                style={{ display: "block" }}
                              />
                            </Link>
                            {p.discount || p.new ? (
                              <div className="product-img-badges">
                                {p.discount ? (
                                  <span className="pink">-{p.discount}%</span>
                                ) : (
                                  ""
                                )}
                                {p.new ? (
                                  <span className="purple">New</span>
                                ) : (
                                  ""
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="product-content text-center mb-3">
                            <h3>
                              <Link
                                to={
                                  process.env.PUBLIC_URL + "/products/" + p._id
                                }
                              >
                                {p.name.slice(0, 16)}{" "}
                                {p.name.length > 17 ? ".." : ""}
                              </Link>
                            </h3>
                            {p.rating && p.rating > 0 ? (
                              <div className="product-rating">
                                <Rating ratingValue={p.rating} />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="product-price">
                              {p.price !== null ? (
                                <Fragment>
                                  <span>
                                    ৳{" "}
                                    {Math.round(
                                      p.price - (p.price / 100) * p.discount
                                    )}
                                  </span>

                                  <span className="old">৳ {p.price}</span>
                                </Fragment>
                              ) : (
                                <span>৳{p.price} </span>
                              )}
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Fragment>
            )}
          </div>
        )}
      </LayoutOne>
    </Fragment>
  );
}
