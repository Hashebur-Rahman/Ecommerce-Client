import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const PaymentMethod = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div className={clsx("copyright", spaceBottomClass, colorClass)}>
      <div className="footer-logo">
        <h3>Payment Methods</h3>
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img height={50} alt="" src="Payment Methods.jpg" />
        </Link>
      </div>
      <p></p>
    </div>
  );
};

PaymentMethod.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default PaymentMethod;
