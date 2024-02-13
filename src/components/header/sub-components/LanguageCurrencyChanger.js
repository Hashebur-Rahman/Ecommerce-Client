import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
 

const LanguageCurrencyChanger = ({ currency }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    i18n.changeLanguage(languageCode);
  };

  

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency language-style">
        <span>
          {i18n.resolvedLanguage === "en"
            ? "English"
            : i18n.resolvedLanguage === "bn"
            ? "বাংলা"
            // : i18n.resolvedLanguage === "fn"
            // ? "French"
            // : i18n.resolvedLanguage === "de"
            // ? "Germany"
            : ""}{" "}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="en" onClick={e => changeLanguageTrigger(e)}>
                English
              </button>
            </li>
            <li>
              <button value="bn" onClick={e => changeLanguageTrigger(e)}>
              বাংলা
              </button>
            </li>
            {/* <li>
              <button value="de" onClick={e => changeLanguageTrigger(e)}>
                Germany
              </button>
            </li> */}
          </ul>
        </div>
      </div>
      
      <div className="same-language-currency use-style">
        {/* <span>
          {currency.currencyName} <i className="fa fa-angle-down" />
        </span> */}
       
      </div> 

      <div className="same-language-currency">
        <p>Call Us +8801995534634</p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  currency: PropTypes.shape({}),
};

export default LanguageCurrencyChanger;
