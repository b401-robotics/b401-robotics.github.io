import { translations } from "../contents/translations";
import { PreviewSectionLayout } from "./PreviewSectionLayout";

export function ResearchSection() {
  const r = translations.research;

  return (
    <PreviewSectionLayout
      id="research"
      sectionLabel={r.sectionLabel}
      heading={r.heading}
      headingAccent={r.headingAccent}
      body={r.body}
      ctaTo="/research"
      ctaLabel={r.viewAll}
      imagePosition="right"
      image={r.image}
      imageAlt={r.heading}
    />
  );
}