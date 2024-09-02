import LayoutOne from "../../layouts/LayoutOne";
import React, { Fragment } from "react";
import SEO from "../seo";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Accordion } from "react-bootstrap";

const FAQ = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="FAQs"
        description="Frequently Asked Questions page of Shohoj Dokan Online Shop BD."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb>
          <Breadcrumb.Item href={process.env.PUBLIC_URL + "/"}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active>FAQs</Breadcrumb.Item>
        </Breadcrumb>
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              What payment methods are accepted?
            </Accordion.Header>
            <Accordion.Body>
              We accept various payment methods including Cash on Delivery
              (COD), bKash, Nagad, Rocket, and major credit/debit cards (Visa,
              MasterCard).
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>How long does delivery take?</Accordion.Header>
            <Accordion.Body>
              Delivery within Dhaka typically takes 1-3 business days, while
              outside Dhaka may take 3-5 business days, depending on your
              location.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              How much is the delivery charge?
            </Accordion.Header>
            <Accordion.Body>
              The delivery charge is BDT 60 within Dhaka and Kurigram, and BDT
              80 for other locations across Bangladesh.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Can I track my order?</Accordion.Header>
            <Accordion.Body>
              Yes, once your order is shipped, we will provide you with a
              tracking number via SMS or email, which you can use to track your
              order on our website.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>What is your return policy?</Accordion.Header>
            <Accordion.Body>
              We offer a 7-day return policy for most products. If you receive a
              damaged or incorrect item, please contact our support team
              immediately to initiate the return process.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>How can I return a product?</Accordion.Header>
            <Accordion.Body>
              To return a product, please contact our customer service within 7
              days of receiving your order. We will guide you through the return
              process, including how to send the product back to us.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>Are there any hidden charges?</Accordion.Header>
            <Accordion.Body>
              No, there are no hidden charges. The prices listed on the website
              are final, and the only additional cost would be the delivery
              charge, if applicable.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>Can I cancel my order?</Accordion.Header>
            <Accordion.Body>
              Yes, you can cancel your order before it is shipped. Once the
              order is shipped, cancellation is not possible, but you may return
              the product after delivery according to our return policy.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="8">
            <Accordion.Header>
              Do you offer discounts or promotions?
            </Accordion.Header>
            <Accordion.Body>
              Yes, we regularly offer discounts and promotions. You can
              subscribe to our newsletter or follow us on social media to stay
              updated on the latest deals.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="9">
            <Accordion.Header>How do I apply a coupon code?</Accordion.Header>
            <Accordion.Body>
              During checkout, you will find an option to apply a coupon code.
              Enter your code in the provided field and click "Apply" to see the
              discount reflected in your total.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </LayoutOne>
    </Fragment>
  );
};

export default FAQ;
