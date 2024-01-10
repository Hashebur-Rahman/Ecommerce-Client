import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../components/product/ProductImageFixed";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Paginator from "react-hooks-paginator";
import { Base_Url } from "../../Config/config";
import clsx from "clsx";

import RelatedProduct from "./RelatedProduct";

const ProductDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  console.log(id);
  let { pathname } = useLocation();
  //initalp details
  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling animation
    });
  }, []);

  // ...

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const wishlistItem = wishlistItems.find((item) => item.id === product.id);
  const compareItem = compareItems.find((item) => item.id === product.id);

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +product.price;
  const finalDiscountedPrice = +discountedPrice;

  // console.log(relatedProducts);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${Base_Url}/api/product/${id}`);
      console.log(data);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(product);
  return (
    <Fragment>
      <SEO
        titleTemplate="Shop Page"
        description="Shop page of  shahoDokan react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Product Description",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
          <div className="container mt-20">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                {/* product image gallery */}
                {galleryType === "leftThumb" ? (
                  <ProductImageGallerySideThumb
                    product={product}
                    thumbPosition="left"
                  />
                ) : galleryType === "rightThumb" ? (
                  <ProductImageGallerySideThumb product={product} />
                ) : galleryType === "fixedImage" ? (
                  <ProductImageFixed product={product} />
                ) : (
                  <ProductImageGallery product={product} />
                )}
              </div>
              <div className="col-lg-6 col-md-6">
                {/* product description info */}
                <ProductDescriptionInfo
                  product={product}
                  discountedPrice={discountedPrice}
                  finalDiscountedPrice={finalDiscountedPrice}
                  finalProductPrice={finalProductPrice}
                  cartItems={cartItems}
                  wishlistItem={wishlistItem}
                  compareItem={compareItem}
                />
              </div>
            </div>
          </div>
        </div>
        <RelatedProduct category={product.category} />
      </LayoutOne>
    </Fragment>
  );
};

ProductDescription.prototype = {
  galleryType: PropTypes.string,
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductDescription;
