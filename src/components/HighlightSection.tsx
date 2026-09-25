import { translations } from "../contents/translations";
import { PreviewSectionLayout } from "./PreviewSectionLayout";

export function HighlightSection() {
  const t = translations.highlight;

  return (
    <PreviewSectionLayout
      id="highlight"
      sectionLabel={t.sectionLabel}
      heading={t.heading}
      headingAccent={t.headingAccent}
      body={t.body}
      ctaTo="/highlight"
      ctaLabel={t.viewAll}
      imagePosition="left"
    />
  );
}