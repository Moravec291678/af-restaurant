import { useEffect, useState } from "react";
import LanguageContext from "./languageContextBase";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("naan-language");

    return savedLanguage === "en" ? "en" : "cs";
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => {
      const nextLanguage = currentLanguage === "cs" ? "en" : "cs";

      localStorage.setItem("naan-language", nextLanguage);

      return nextLanguage;
    });
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        isEnglish: language === "en",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
