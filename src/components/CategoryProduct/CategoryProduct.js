import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { Base_Url } from "../../Config/config";

const CategoryCard = React.memo(({ category, navigate }) => (
  <Col key={category._id}>
    <Card height={80} onClick={() => navigate(`/category/${category._id}`)}>
      <div>
        <Card.Img variant="top" height={60} src={category.image} />
        <p style={{ textAlign: "center", marginBottom: "0" }}>
          {category.name}
        </p>
      </div>
    </Card>
  </Col>
));

const CategoryProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${Base_Url}/api/CreateCategory`);
      // console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="mt-2">
      <h3 className="p-3 m-3 text-center show">Browse By Category</h3>
      <div className="container">
        <Row xs={4} md={6} height={60} lg={8} sm={5} className="g-1 md:g-5">
          {categories.map((c) => (
            <CategoryCard key={c._id} category={c} navigate={navigate} />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CategoryProduct;
