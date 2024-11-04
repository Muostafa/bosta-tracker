import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import styles from "../styles/navbar.module.css"; // Add custom styling here
import ArabicLogo from "./ArabicLogo";
import EnglishLogo from "./EnglishLogo";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const { toggleLanguage, language, translate } = useTranslation();
  const navigate = useNavigate();
  return (
    <nav
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
      className={styles.navbar}
    >
      <div className={styles.navbarContainer}>
        <button className={styles.navbarLogo} onClick={() => navigate("/")}>
          {language === "ar" ? <ArabicLogo /> : <EnglishLogo />}
        </button>
        <ul className={styles.navbarLinks}>
          <li>
            <button onClick={() => navigate("/")}>{translate("Main")}</button>
          </li>
          <li>
            <button>{translate("Prices")}</button>
          </li>
          <li>
            <button>{translate("Call Sales")}</button>
          </li>
        </ul>
        <div
          style={{ direction: language === "ar" ? "rtl" : "ltr" }}
          className={styles.navbarLanguage}
        >
          <div>
            <button>{translate("Track your shipment")}</button>
          </div>
          <div className="screen">
            <button>{translate("Login")}</button>
          </div>
          <div className={styles.languageButton}>
            {language === "en" ? (
              <button onClick={() => toggleLanguage("ar")}>عربي</button>
            ) : (
              <button onClick={() => toggleLanguage("en")}>ENG</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
