import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import en from "./en";
import ar from "./ar";

type Lang = "en" | "ar";
const dict = { en, ar };

interface I18nContextType {
  lang: Lang;
  t: (key: keyof typeof en) => string;
  switchLang: () => void;
}

const I18nContext = createContext<I18nContextType>(null!);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved && ["en", "ar"].includes(saved)) setLang(saved);
  }, []);

  const switchLang = () => {
    const next = lang === "en" ? "ar" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const t = (key: keyof typeof en) => {
    return dict[lang][key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, t, switchLang }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>{children}</div>
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
