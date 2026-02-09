import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiPost } from "../lib/api.js";
import { useAuth } from "./AuthContext.jsx";

const defaultStrings = {
  title: "Financial Health Assessment Tool",
  subtitle: "AI-driven insights for SME resilience and growth.",
  connectRazorpay: "Connect Razorpay",
  logout: "Logout"
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const { token } = useAuth();
  const [language, setLanguage] = useState("English");
  const [strings, setStrings] = useState(defaultStrings);

  useEffect(() => {
    const translateAll = async () => {
      if (language === "English") {
        setStrings(defaultStrings);
        return;
      }
      try {
        const entries = await Promise.all(
          Object.entries(defaultStrings).map(async ([key, text]) => {
            const res = await apiPost(
              "/api/insights/translate",
              { text, target_language: language },
              token
            );
            return [key, res.translated || text];
          })
        );
        setStrings(Object.fromEntries(entries));
      } catch (err) {
        setStrings(defaultStrings);
      }
    };

    if (token) {
      translateAll();
    } else {
      setStrings(defaultStrings);
    }
  }, [language, token]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key) => strings[key] || defaultStrings[key]
    }),
    [language, strings]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
