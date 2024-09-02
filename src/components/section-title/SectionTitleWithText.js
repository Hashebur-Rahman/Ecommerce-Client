import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Shohojdokan</h1>
          <p>
            At Shohojdokan, we are committed to providing you with an effortless
            and enjoyable shopping experience. We offer a wide range of products
            to cater to your everyday needs, combining convenience with quality.
            Our aim is to make online shopping simple, reliable, and accessible
            to everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
