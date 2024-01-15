import LayoutOne from "../../layouts/LayoutOne";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import { Base_Url } from "../../Config/config";

const Thanks = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const result = await axios(`${Base_Url}/api/getOrder/${id}`);
        setOrder(result.data.order);
        setProduct(result.data.order.products);
      } catch (error) {
        console.error("Error fetching  Order:", error);
      }
    };
    getPosts();
  }, [id]);

  console.log(order);

  return (
    <Fragment>
      <LayoutOne headerTop="visible">
        <div className="container">
          <div>
            <p className="text-center fw-bold display-6  ">
              Shohoj Dokan Online Shop
            </p>
            <p className="text-center fw-bold    "> Order Details</p>
            <p className="text-uppercase text-danger text-center d-flex justify-content-center gap-2">
              <span> Order Id: </span> <p>SD{id.slice(-6)} </p>
            </p>

            <Card className="mx-auto">
              <table class="table">
                <thead>
                  <tr>
                    <td>Status</td>

                    <td>
                      :{" "}
                      <Badge
                        bg={
                          order.status === "pending"
                            ? "secondary"
                            : order.status === "cancel"
                            ? "danger"
                            : "success"
                        }
                      >
                        {" "}
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">Your Name</th>
                    <th scope="col"> : {order?.name} </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-medium">Phone</td>
                    <td>: {order?.phone}</td>
                  </tr>
                  <tr>
                    <td>Division </td>
                    <td>: {order?.selectedDivision}</td>
                  </tr>
                  <tr>
                    <td>District </td>
                    <td>: {order?.selectedDistrict}</td>
                  </tr>
                  <tr>
                    <td>Address </td>
                    <td>: {order?.address}</td>
                  </tr>
                  <tr>
                    <td>Create Order Time</td>
                    <td>: {new Date(order.createdAt).toLocaleString()}</td>
                  </tr>

                  <tr>
                    <td className="fw-bold"> Shaping Charge </td>
                    <td className="fw-bold">:৳ {order?.deliveryCharge}</td>
                  </tr>

                  <tr>
                    <td className="fw-bold">Total Amount </td>
                    <td className="fw-bold">
                      :৳ {Math.round(order?.subTotal)}
                    </td>
                  </tr>
                  {order.couponTotal && (
                    <tr>
                      <td className="fw-bold">Coupon Discount</td>
                      <td className="fw-bold">: ৳ {order.couponTotal}</td>
                    </tr>
                  )}

                  <tr>
                    <td className="fw-bold">Total Payable Amount </td>
                    <td className="fw-bold">
                      :৳ {Math.round(order?.totalWithDelivery)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="container">
                <p className="display-6 text-center">Order Summary</p>

                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Photo</th>
                      <th scope="col">Size</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  {Product.map((p, index) => (
                    <tbody key={index}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {" "}
                          <img
                            height={50}
                            className="cart-image"
                            src={p.image}
                            alt=""
                          />{" "}
                        </td>

                        <td>{p.selectedProductSize}</td>
                        <td>{p.quantity}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </Card>
          </div>

          {/* <div className="d-flex w-100 justify-content-center mb-3">
          <img
            style={{ objectFit: "contain", width: "50%" }}
            src="/ecchenir.jpg"
            alt=""
          />
        </div> */}
          <div>
            <p className="display-6 mt-3 text-center">Thanks for Shopping</p>
          </div>
          <div className="text-center mt-3 mb-3">
            <button onClick={() => navigate("/")} className="btn btn-success">
              Continue Shopping
            </button>
          </div>
          <p className="text-center">Please tack slingshot</p>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Thanks;
