import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";
import { PreviewSectionLayout } from "./PreviewSectionLayout";

export function HighlightSection() {
  const { lang } = useLanguage();
  const t = translations[lang].highlight;

  return (
    <PreviewSectionLayout
      id="highlight"
      sectionLabel={t.sectionLabel}
      heading={t.heading}
      headingAccent={t.headingAccent}
      body={t.body}
      ctaTo={`/${lang}/highlight`}
      ctaLabel={t.viewAll}
      imagePosition="left"
    />
  );
}