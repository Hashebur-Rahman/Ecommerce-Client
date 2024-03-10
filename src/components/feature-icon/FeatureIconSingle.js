import PropTypes from "prop-types";

const FeatureIconSingle = ({ singleFeature }) => {
  return (
    <div className="support-wrap">
      <div className="support-icon">
        <img
          className="animated"
          src={process.env.PUBLIC_URL + singleFeature.image}
          alt=""
        />
      </div>
      <div className="support-content ">
        <h6 className="fw-bold" >{singleFeature.title}</h6>
        <h6>{singleFeature.subtitle}</h6>
      </div>
    </div>
  );
};

FeatureIconSingle.propTypes = {
  singleFeature: PropTypes.shape({}),
};

export default FeatureIconSingle;
