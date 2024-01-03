import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";
import { useTranslation } from "react-i18next";

const HeaderTop = ({ borderStyle }) => {
  const currency = useSelector((state) => state.currency);

  const { t } = useTranslation();

  return (
    <div className={clsx("header-top-wap", borderStyle === "fluid-border" && "border-bottom")}>
      <LanguageCurrencyChanger currency={currency} />
      <div className="header-offer">
        <p>
          {t("Free delivery on orders over")} {/* Correct usage of the t function */}
          <span>
            +999
            {/* {currency.currencySymbol + (200 * currency.currencyRate).toFixed(2)} */}
          </span>
        </p>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
};

export default HeaderTop;
