import { createContext, useContext } from "react";

export type Language = "en" | "id";

export const SUPPORTED_LANGS: Language[] = ["en", "id"];

interface LanguageContextType {
  lang: Language;
}

const LanguageContext = createContext<LanguageContextType>({ lang: "en" });

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Language;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
