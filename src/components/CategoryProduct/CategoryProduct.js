import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { Base_Url } from "../../Config/config";
import Spinner from "../Spinner/Spinner";
import SectionTitle from "../section-title/SectionTitle";

const CategoryCard = React.memo(({ category, navigate, handleClick }) => (
  <Col key={category._id}>
    <Card
      height={80}
      onClick={() => {
        navigate(`/category/${category._id}`);
        handleClick();
      }}
    >
      <div>
        <div
          className="bg-cover no-repeat center center fixed"
          style={{
            backgroundImage: `url(${category.image})`,
            height: "100px",
            width: "100%",
          }}
        >
          {/* <img variant="top" height={60} src={category.image} /> */}
        </div>

        <p style={{ textAlign: "center", marginBottom: "0" }}>
          {category.name}
        </p>
      </div>
    </Card>
  </Col>
));

const CategoryProduct = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.location.reload();
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${Base_Url}/api/CreateCategory`);
      // console.log(data);
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="mt-2">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <SectionTitle
            titleText="Browse By Category!"
            positionClass="text-center"
          />
          <div className="container">
            <Row xs={4} md={6} height={60} lg={8} sm={5} className="g-1 md:g-5">
              {categories.map((c) => (
                <CategoryCard
                  key={c._id}
                  category={c}
                  navigate={navigate}
                  handleClick={handleClick}
                />
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
