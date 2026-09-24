import { useState } from "react";
import { useLanguage, type Language } from "../context/LanguageContext";
import { translations } from "../contents/translations";
import type { I_lecturers, I_assistant, I_alumni } from "@/contents/MembersContent/memberList";
import { PreviewSectionLayout } from "./PreviewSectionLayout";
import { PersonModal } from "./PersonModal";

interface MembersSectionProps {
  preview?: boolean;
}

export function MembersSection({ preview = false }: MembersSectionProps = {}) {
  const { lang } = useLanguage();
  const t = translations[lang].members;
  const [selectedLecturer, setSelectedLecturer] = useState<I_lecturers | null>(null);
  const [selectedAssistant, setSelectedAssistant] = useState<I_assistant | null>(null);
  const [selectedAlumni, setSelectedAlumni] = useState<I_alumni | null>(null);

  function handleLecturerLang(language: Language, lecturer: I_lecturers) {
    if (language === "en") {
      return { role: lecturer.role.en, specialty: lecturer.specialty.en };
    }
    return { role: lecturer.role.id, specialty: lecturer.specialty.id };
  }

  function handleAssistantLang(language: Language, assistant: I_assistant) {
    if (language === "en") {
      return { role: assistant.role.en };
    }
    return { role: assistant.role.id };
  }

  function handleAlumniLang(language: Language, person: I_alumni) {
    if (language === "en") {
      return { role: person.role.en };
    }
    return { role: person.role.id };
  }

  if (preview) {
    return (
      <PreviewSectionLayout
        id="members"
        sectionLabel={t.sectionLabel}
        heading={t.heading}
        headingAccent={t.headingAccent}
        body={t.body}
        ctaTo={`/${lang}/members`}
        ctaLabel={t.viewAll}
        imagePosition="left"
      />
    );
  }

  return (
    <section id="members" className="section-padding relative">
      <div className="max-w-[85rem] w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in relative" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 mb-5">
            {t.heading} <span className="text-zinc-900 dark:text-zinc-100">{t.headingAccent}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-lg max-w-2xl mx-auto">{t.body}</p>
        </div>

        {/* ============================================================ */}
        {/* Section 1 — Lecturers & Supervisors                           */}
        {/* ============================================================ */}
        <div className="mb-20">
          <div className="mb-8">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 mb-3">
              {t.lecturersLabel}
            </h3>
            <div className="h-px w-full bg-zinc-200 dark:bg-white/10" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.lecturers.map((lecturer, idx) => (
              <div
                key={lecturer.name}
                onClick={() => setSelectedLecturer(lecturer)}
                className="card-glass rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 hover:border-zinc-300 hover:ring-2 hover:ring-zinc-300/50 transition-all duration-300 flex flex-col animate-fade-in cursor-pointer group shadow-sm hover:shadow-md"
                style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
              >
                <div className="aspect-[4/5] w-full bg-zinc-200 relative overflow-hidden">
                  {lecturer.imageUrl ? (
                    <img
                      src={lecturer.imageUrl}
                      alt={lecturer.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white font-display font-bold text-3xl md:text-4xl">
                      {lecturer.initials}
                    </div>
                  )}
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-zinc-900 dark:text-zinc-100 font-semibold text-xs leading-snug">{lecturer.name}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{handleLecturerLang(lang, lecturer)?.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* Section 2 — Active Lab Members                                */}
        {/* ============================================================ */}
        <div className="mb-20">
          <div className="mb-8">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 mb-3">
              {t.activeMembersLabel}
            </h3>
            <div className="h-px w-full bg-zinc-200 dark:bg-white/10" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {t.assistants.map((assistant, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedAssistant(assistant)}
                className="card-glass rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 hover:border-zinc-300 hover:ring-2 hover:ring-zinc-300/50 transition-all duration-300 flex flex-col animate-fade-in cursor-pointer group shadow-sm hover:shadow-md"
                style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
              >
                <div className="aspect-[4/5] w-full bg-zinc-200 relative overflow-hidden">
                  {assistant.imageUrl ? (
                    <img
                      src={assistant.imageUrl}
                      alt={assistant.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white font-display font-bold text-3xl md:text-4xl">
                      {assistant.initials}
                    </div>
                  )}
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-zinc-900 dark:text-zinc-100 font-semibold text-xs leading-snug">{assistant.name}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{handleAssistantLang(lang, assistant)?.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* Section 3 — Lab Alumni                                        */}
        {/* ============================================================ */}
        <div>
          <div className="mb-8">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 mb-3">
              {t.alumniLabel}
            </h3>
            <div className="h-px w-full bg-zinc-200 dark:bg-white/10" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {t.alumni.map((person, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedAlumni(person)}
                className="card-glass rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 hover:border-zinc-300 hover:ring-2 hover:ring-zinc-300/50 transition-all duration-300 flex flex-col animate-fade-in cursor-pointer group shadow-sm hover:shadow-md"
                style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
              >
                <div className="aspect-[4/5] w-full bg-zinc-200 relative overflow-hidden">
                  {person.imageUrl ? (
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white font-display font-bold text-3xl md:text-4xl">
                      {person.initials}
                    </div>
                  )}
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-zinc-900 dark:text-zinc-100 font-semibold text-xs leading-snug">{person.name}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{handleAlumniLang(lang, person)?.role}</p>
                    {person.year && (
                      <p className="text-zinc-400 text-xs mt-0.5">{person.year}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lecturer Details Modal */}
      {selectedLecturer && (
        <PersonModal
          person={{
            name: selectedLecturer.name,
            initials: selectedLecturer.initials,
            imageUrl: selectedLecturer.imageUrl,
            role: handleLecturerLang(lang, selectedLecturer)?.role ?? "",
            specialty: handleLecturerLang(lang, selectedLecturer)?.specialty,
            education: selectedLecturer.education,
            expertise: selectedLecturer.expertise,
          }}
          educationLabel={t.modalEducationLabel}
          researchLabel={t.modalResearchLabel}
          onClose={() => setSelectedLecturer(null)}
        />
      )}

      {/* Active Member Details Modal */}
      {selectedAssistant && (
        <PersonModal
          person={{
            name: selectedAssistant.name,
            initials: selectedAssistant.initials,
            imageUrl: selectedAssistant.imageUrl,
            role: handleAssistantLang(lang, selectedAssistant)?.role ?? "",
            education: selectedAssistant.education,
            expertise: selectedAssistant.expertise,
          }}
          educationLabel={t.modalEducationLabel}
          researchLabel={t.modalResearchLabel}
          onClose={() => setSelectedAssistant(null)}
        />
      )}

      {/* Alumni Details Modal */}
      {selectedAlumni && (
        <PersonModal
          person={{
            name: selectedAlumni.name,
            initials: selectedAlumni.initials,
            imageUrl: selectedAlumni.imageUrl,
            role: handleAlumniLang(lang, selectedAlumni)?.role ?? "",
            education: selectedAlumni.education,
            expertise: selectedAlumni.expertise,
          }}
          educationLabel={t.modalEducationLabel}
          researchLabel={t.modalResearchLabel}
          onClose={() => setSelectedAlumni(null)}
        />
      )}
    </section>
  );
}