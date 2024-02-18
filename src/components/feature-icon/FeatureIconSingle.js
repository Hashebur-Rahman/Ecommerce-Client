import PropTypes from "prop-types";

const FeatureIconSingle = ({ singleFeature }) => {
  return (
    <div className="support-wrap gap-0  ">
      <div className="support-icon">
        <img
          className="animated w-50 h-50 "
          src={process.env.PUBLIC_URL + singleFeature.image}
          alt=""
        />
      </div>
      <div className="support-content ">
        <h6 className="fw-bold">{singleFeature.title}</h6>
        <h6>{singleFeature.subtitle}</h6>
      </div>
    </div>
  );
};

FeatureIconSingle.propTypes = {
  singleFeature: PropTypes.shape({}),
};

export default FeatureIconSingle;
