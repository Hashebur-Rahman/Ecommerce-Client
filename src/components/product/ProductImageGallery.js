import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from "swiper";
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";
import ReactImageMagnify from "react-image-magnify";

const ProductImageGallery = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Ensure `slides` is an array, even if it's a single image
  const slides = Array.isArray(product.image) ? product.image : [product.image];

  // Swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true,
  };

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {/* Display badges */}
        {product.discount || product.new ? (
          <div className="product-img-badges">
            {product.discount && (
              <span className="pink">-{product.discount}%</span>
            )}
            {product.new && <span className="purple">New</span>}
          </div>
        ) : null}

        {/* Display placeholder initially */}
        <img
          className="default-img "
          
          src={`${process.env.PUBLIC_URL}/shohojdokan-product-loader.png`}
          alt={product.name}
          style={{ height:'350px', display: imageLoaded ? "none" : "block" }}
        />

        {/* Once loaded, show the actual image */}
        {slides.length > 0 && (
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: product.name,
                isFluidWidth: true,
                src: slides[0], // Display the first image by default
                onLoad: () => setImageLoaded(true),
              },
              largeImage: {
                src: slides[0], // Display the first image by default
                backgroundColor: "White",
                width: 800,
                height: 1200,
              },
              enlargedImagePosition: "over",
            }}
          />
        )}

        {/* Lightbox and Swiper (if needed) */}
        {slides.length > 1 && (
          <Swiper options={gallerySwiperParams}>
            {slides.map((single, key) => (
              <SwiperSlide key={key}>
                <button
                  className="lightgallery-button"
                  onClick={() => setIndex(key)}
                >
                  <i className="pe-7s-expand1"></i>
                </button>
                <div className="single-image">
                  <img src={single} className="img-fluid" alt={product.name} />
                </div>
              </SwiperSlide>
            ))}
            <AnotherLightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={slides}
              plugins={[Thumbnails, Zoom, Fullscreen]}
            />
          </Swiper>
        )}
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // String or array
    name: PropTypes.string,
    discount: PropTypes.number,
    new: PropTypes.bool,
  }),
};

export default ProductImageGallery;
