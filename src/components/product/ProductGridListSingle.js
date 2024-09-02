import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

const ProductGridListSingle = ({
  product,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +product.price.toFixed(2);
  const finalDiscountedPrice = +discountedPrice.toFixed(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductClick = (id,name,) => {
    navigate(`/products/${id}/${name}`);
    console.log(name,id);
  };

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div
          onClick={() => handleProductClick(product._id, product.name)}
          className="product-img"
        >
          <Link>
            {/* Display placeholder initially */}
            <img
              className="default-img"
              src={`${process.env.PUBLIC_URL}/shohojdokan-product-loader.png`}
              alt={product.name}
              style={{ display: "block" }}
            />
            {/* Once loaded, show the actual image */}
            <img
              className="default-img"
              src={product.image}
              alt={product.name}
              onLoad={(e) =>
                (e.currentTarget.previousSibling.style.display = "none")
              }
              style={{ display: "block" }}
            />
          </Link>
          {(product.discount || product.new) && (
            <div className="product-img-badges">
              {product.discount && (
                <span className="pink">-{product.discount}%</span>
              )}
              {product.new && <span className="purple">New</span>}
            </div>
          )}
          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem ? "active" : ""}
                disabled={!!wishlistItem}
                title={wishlistItem ? "Added to wishlist" : "Add to wishlist"}
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              <Link to={`${process.env.PUBLIC_URL}/products/${product._id}`}>
                Select Option
              </Link>
            </div>
            <div className="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center mb-3">
          <h3>
            <Link to={`${process.env.PUBLIC_URL}/products/${product._id}`}>
              {product.name.length > 20
                ? `${product.name.slice(0, 20)}...`
                : product.name}
            </Link>
          </h3>
          {product.rating > 0 && (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          )}
          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span>৳ {Math.round(finalDiscountedPrice)}</span>{" "}
                <span className="old">৳ {Math.round(finalProductPrice)}</span>
              </Fragment>
            ) : (
              <span>৳ {Math.round(finalProductPrice)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="shop-list-wrap mb-30">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-sm-6">
            <div className="product-list-image-wrap">
              <div className="product-img">
                <Link to={`${process.env.PUBLIC_URL}/products/${product._id}`}>
                  {/* Display placeholder initially */}
                  <img
                    className="default-img"
                    src={`${process.env.PUBLIC_URL}/shohojdokan-product-loader.png`}
                    alt={product.name}
                    style={{ display: "block" }}
                  />
                  {/* Once loaded, show the actual image */}
                  <img
                    className="default-img"
                    src={product.image}
                    alt={product.name}
                    onLoad={(e) =>
                      (e.currentTarget.previousSibling.style.display = "none")
                    }
                    style={{ display: "block" }}
                  />
                </Link>
                {(product.discount || product.new) && (
                  <div className="product-img-badges">
                    {product.discount && (
                      <span className="pink">-{product.discount}%</span>
                    )}
                    {product.new && <span className="purple">N</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-sm-6">
            <div className="shop-list-content">
              <h3>
                <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`}>
                  {product.name}
                </Link>
              </h3>
              <div className="product-list-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>{Math.round(finalDiscountedPrice)}</span>{" "}
                    <span className="old">{Math.round(finalProductPrice)}</span>
                  </Fragment>
                ) : (
                  <span>{Math.round(finalProductPrice)}</span>
                )}
              </div>
              {product.rating > 0 && (
                <div className="rating-review">
                  <div className="product-list-rating">
                    <Rating ratingValue={product.rating} />
                  </div>
                </div>
              )}
              {product.shortDescription && <p>{product.shortDescription}</p>}
              <div className="shop-list-actions d-flex align-items-center">
                <div className="shop-list-btn btn-hover">
                  {product.affiliateLink ? (
                    <a
                      href={product.affiliateLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Buy now
                    </a>
                  ) : product.variation && product.variation.length > 0 ? (
                    <Link
                      to={`${process.env.PUBLIC_URL}/product/${product._id}`}
                    >
                      Select Option
                    </Link>
                  ) : product.stock > 0 ? (
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className={
                        cartItem && cartItem.quantity > 0 ? "active" : ""
                      }
                      disabled={cartItem && cartItem.quantity > 0}
                      title={cartItem ? "Added to cart" : "Add to cart"}
                    >
                      <i className="pe-7s-cart" />
                      {cartItem && cartItem.quantity > 0
                        ? "Added"
                        : "Add to cart"}
                    </button>
                  ) : (
                    <button disabled className="active">
                      Out of Stock
                    </button>
                  )}
                </div>
                <div className="shop-list-wishlist ml-10">
                  <button
                    className={wishlistItem ? "active" : ""}
                    disabled={!!wishlistItem}
                    title={
                      wishlistItem ? "Added to wishlist" : "Add to wishlist"
                    }
                    onClick={() => dispatch(addToWishlist(product))}
                  >
                    <i className="pe-7s-like" />
                  </button>
                </div>
                <div className="shop-list-compare ml-10">
                  <button
                    className={compareItem ? "active" : ""}
                    disabled={!!compareItem}
                    title={compareItem ? "Added to compare" : "Add to compare"}
                    onClick={() => dispatch(addToCompare(product))}
                  >
                    <i className="pe-7s-shuffle" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number,
    shortDescription: PropTypes.string,
    stock: PropTypes.number,
    new: PropTypes.bool,
    affiliateLink: PropTypes.string,
    variation: PropTypes.array,
  }).isRequired,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridListSingle;
