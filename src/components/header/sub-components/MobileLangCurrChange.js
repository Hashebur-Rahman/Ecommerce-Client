import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const MobileLangCurrChange = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguageTrigger = (e) => {
    const languageCode = e.target.value;
    i18n.changeLanguage(languageCode);
    closeMobileMenu();
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.remove("active");
  };

  return (
    <div className="mobile-menu-middle">
      <div className="lang-curr-style">
        <span className="title mb-2">{t("Choose Language")} </span>
        <select value={i18n.resolvedLanguage} onChange={changeLanguageTrigger}>
          <option value="en">English</option>
          <option value="bn">বাংলা</option>
          {/* <option value="de">Germany</option> */}
        </select>
      </div>
    </div>
  );
};

export default MobileLangCurrChange;
