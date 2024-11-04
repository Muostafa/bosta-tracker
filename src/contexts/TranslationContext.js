import React, { createContext, useContext, useState } from "react";
import { translations } from "../translations/translations";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "ar" : "en"));
  };

  const translate = (text) => {
    if (!text) return "";
    if (!language || !translations[language]) {
      return text;
    }
    return translations[language][text.toLowerCase()] || text;
  };

  return (
    <TranslationContext.Provider
      value={{ translate, toggleLanguage, language }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};
