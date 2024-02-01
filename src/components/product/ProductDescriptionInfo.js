import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import cogoToast from "cogo-toast";

import { useNavigate } from "react-router-dom";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {
  const dispatch = useDispatch();
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );

  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,

    selectedProductSize
  );
  const navigate = useNavigate();

  const handleSizeChange = (size) => {
    setSelectedProductSize(size);
  };

  const handleBuyNowClick = () => {
    if (!selectedProductSize) {
      cogoToast.error("Please Select Size");
      return;
    }
    dispatch(
      addToCart({
        ...product,
        quantity: quantityCount,
        selectedProductSize: selectedProductSize
          ? selectedProductSize
          : product.selectedProductSize
          ? product.selectedProductSize
          : null,
      })
    );

    navigate("/cart");
  };

  // console.log(product.selectedOptions);
  return (
    <div className="product-details-content mt-20 ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>{Math.round(finalDiscountedPrice)}</span>{" "}
            <span className="old">{Math.round(finalProductPrice)}</span>
          </Fragment>
        ) : (
          <span>{finalProductPrice} </span>
        )}
      </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      size :
      <div className="pro-details-size-content d-flex gap-3">
        {product.selectedOptions &&
          product.selectedOptions.map((singleSize, key) => (
            <label className={`pro-details-size-content--single`} key={key}>
              <input
                type="radio"
                value={singleSize}
                checked={singleSize === selectedProductSize ? "checked" : ""}
                onChange={() => {
                  setSelectedProductSize(singleSize);
                }}
              />

              <span className="size-name">{singleSize}</span>
            </label>
          ))}
      </div>
      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
            }
            className="dec qtybutton"
          >
            -
          </button>
          <input
            className="cart-plus-minus-box"
            type="text"
            value={quantityCount}
            readOnly
          />
          <button
            onClick={() =>
              setQuantityCount(
                quantityCount - productCartQty
                  ? quantityCount + 1
                  : quantityCount
              )
            }
            className="inc qtybutton"
          >
            +
          </button>
        </div>

        <div className="pro-details-cart1 btn-hover">
          {<button onClick={handleBuyNowClick}>Buy Now</button>}
        </div>
        <div className="pro-details-cart btn-hover">
          {
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    ...product,
                    quantity: quantityCount,
                    selectedProductSize: selectedProductSize
                      ? selectedProductSize
                      : product.selectedProductSize
                      ? product.selectedProductSize
                      : null,
                  })
                )
              }
              disabled={productCartQty > 0}
            >
              {" "}
              Add To Cart{" "}
            </button>
          }
        </div>
      </div>
      <div className="pro-details-list">
        <div dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
      </div>
      <div className="pro-details-social">
        <ul>
          <li>
            <a href="https://www.facebook.com/profile.php?id=61555547074882">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a
              title="facebook Pages"
              href="https://www.facebook.com/shohojdokan1/"
            >
              <i className="fa fa-facebook" />
            </a>
          </li>

          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@shohojdokan?lang=en">
              <i className="fa fa-youtube" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/shohojdokan/?next=%2F">
              <i className="fa fa-instagram" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
