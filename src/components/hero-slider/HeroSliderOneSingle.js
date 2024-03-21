import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const handleClick = () => {
  window.location.reload();
};

const HeroSliderOneSingle = ({ data }) => {
  return (
    <div className="single-slider slider-height-1 bg-purple">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-content  ">
              <h3 className="animated">{data.title}</h3>
              <h1 className="animated">{data.productTitle}</h1>
              <div
                onClick={() => {
                  handleClick();
                }}
                className="slider-btn btn-hover"
              >
                <Link className="animated" to={`/category/${data.category}`}>
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-single-img slider-animated-1">
              <img className="animated img-fluid" src={data.image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderOneSingle.propTypes = {
  data: PropTypes.shape({}),
};

export default HeroSliderOneSingle;
