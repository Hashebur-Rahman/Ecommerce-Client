import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import Rating from "../../components/product/sub-components/ProductRating";
import { Base_Url } from "../../Config/config";
import Spinner from "../../components/Spinner/Spinner";

export default function TabProduct() {
  const [product, setProduct] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(32);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get(`${Base_Url}/api/getProduct`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getAllProduct();
  }, []);

  const fetchProduct = product.filter((item) => item.sellOption === "bestSell");
  const limitedProducts = fetchProduct.slice(0, displayLimit);

  const showMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 32);
  };

  const handleClick = (id, name) => {
    navigate(`/products/${id}/${name}`);
  };

  return (
    <div className="container mt-3">
      <SectionTitle titleText="DAILY DEALS!" positionClass="text-center" />

      <Tab.Container defaultActiveKey="bestSeller">
        <Nav variant="pills" className="product-tab-list text-center">
          <Nav.Item>
            <Nav.Link eventKey="bestSeller">
              <h4>Top Selling Products</h4>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {loading ? (
            <Spinner />
          ) : (
            <Tab.Pane eventKey="bestSeller">
              <Row xs={2} sm={3} md={4} lg={4} className="xs:g-2 g-2 h-75">
                {limitedProducts.map((p) => (
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
                            {p.new ? <span className="purple">New</span> : ""}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="product-content text-center mb-3">
                        <h3>
                          <Link
                            to={process.env.PUBLIC_URL + "/products/" + p._id}
                          >
                            {p.name.slice(0, 16)}
                            {p.name.length > 16 ? "..." : ""}
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
                                ৳
                                {Math.round(
                                  p.price - (p.price / 100) * p.discount
                                )}
                              </span>
                              <span className="old">৳{p.price}</span>
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

              <div className="d-flex justify-content-center mt-2">
                {limitedProducts.length > 0 &&
                  limitedProducts.length < fetchProduct.length && (
                    <div className="d-flex justify-content-center mt-2">
                      <button className="seemore" onClick={showMore}>
                        Show More
                      </button>
                    </div>
                  )}
              </div>
            </Tab.Pane>
          )}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
