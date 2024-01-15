import React, { Fragment, useEffect, useState } from "react";
import SectionTitle from "../../components/section-title/SectionTitle";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Base_Url } from "../../Config/config";
import ProductRating from "../../components/product/sub-components/ProductRating";

export default function RelatedProduct({ category, spaceBottomClass }) {
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get(`${Base_Url}/api/getProduct`);
        // console.log(data);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProduct();
  }, []);

  const relatedprosuct = product.filter(
    (item) => item.category === `${category}`
  );

  const limetedProduct = relatedprosuct.slice(0.3);

  console.log(relatedprosuct);
  console.log(category);
  console.log(product);
  return (
    <div className={clsx("related-product-area", spaceBottomClass)}>
      <div className="container">
        <SectionTitle
          titleText="Related Products"
          positionClass="text-center"
          spaceClass="mb-50 mt-50"
        />
        <Row xs={2} sm={3} md={4} lg={4} className="xs:g-2 g-2 h-75">
          {limetedProduct.map((p) => (
            <Col className={clsx("product-wrap")} key={p._id}>
              <Card onClick={() => navigate(`/products/${p._id}`)}>
                <div className="product-img">
                  <Link to={process.env.PUBLIC_URL + "/product/" + p.id}>
                    <img className="default-img " src={p.image} alt="" />
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
                <div className="product-content text-center">
                  <h3>
                    <Link to={process.env.PUBLIC_URL + "/product/" + p.id}>
                      {p.name}
                    </Link>
                  </h3>
                  {p.rating && p.rating > 0 ? (
                    <div className="product-rating">
                      <ProductRating ratingValue={p.rating} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="product-price">
                    {p.price !== null ? (
                      <Fragment>
                        {Math.round(p.price - (p.price / 100) * p.discount)}

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
    </div>
  );
}

RelatedProduct.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};
