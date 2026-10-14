import { useState } from "react";
import { translations } from "../contents/translations";
import type { I_lecturers, I_assistant, I_alumni } from "../contents/memberList";
import { PreviewSectionLayout } from "./PreviewSectionLayout";
import { PersonModal } from "./PersonModal";

interface MembersSectionProps {
  preview?: boolean;
}

// Small L-shaped tick — one at each corner of the frame. The signature of
// the "blueprint" treatment.
function CornerTicks() {
  const base = "pointer-events-none absolute h-3 w-3 border-zinc-400 dark:border-zinc-500";
  return (
    <>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

interface PersonCardProps {
  name: string;
  role: string;
  image?: string;
  initials: string;
  year?: string;
  delay: number;
  onClick: () => void;
}

function PersonCard({ name, role, image, initials, year, delay, onClick }: PersonCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full flex-col text-left animate-fade-in focus:outline-none"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative aspect-[4/5] w-full bg-zinc-200 dark:bg-zinc-900">
        <CornerTicks />
        <div className="absolute inset-2 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="absolute inset-0 block h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-800 font-display text-4xl font-bold text-white">
              {initials}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 w-full">
        <span className="block h-px w-6 bg-zinc-300 transition-all duration-300 group-hover:w-full group-hover:bg-zinc-900 dark:bg-zinc-700 dark:group-hover:bg-zinc-100" />
        <p className="mt-3 font-display text-base font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
          {name}
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          {role}
        </p>
        {year && (
          <p className="mt-0.5 font-mono text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">
            {year}
          </p>
        )}
      </div>
    </button>
  );
}

interface GroupProps {
  numeral: string;
  label: string;
  count: number;
  children: React.ReactNode;
}

function Group({ numeral, label, count, children }: GroupProps) {
  return (
    <div className="relative">
      <div className="relative mb-12 flex items-end gap-5">
        <span
          aria-hidden="true"
          className="pointer-events-none -mb-6 select-none font-display text-[6rem] font-bold leading-none text-zinc-200/70 md:text-[8rem] dark:text-white/5"
        >
          {numeral}
        </span>
        <div className="relative z-10 pb-1">
          <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl dark:text-zinc-100">
            {label}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
            {count} people
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {children}
      </div>
    </div>
  );
}

export function MembersSection({ preview = false }: MembersSectionProps = {}) {
  const t = translations.members;
  const [selectedLecturer, setSelectedLecturer] = useState<I_lecturers | null>(null);
  const [selectedAssistant, setSelectedAssistant] = useState<I_assistant | null>(null);
  const [selectedAlumni, setSelectedAlumni] = useState<I_alumni | null>(null);

  if (preview) {
    return (
      <PreviewSectionLayout
        id="members"
        sectionLabel={t.sectionLabel}
        heading={t.heading}
        headingAccent={t.headingAccent}
        body={t.body}
        ctaTo="/members"
        ctaLabel={t.viewAll}
        imagePosition="right"
        image={t.image}
        imageAlt={t.heading}
      />
    );
  }

  return (
    <section id="members" className="section-padding relative">
      <div className="mx-auto w-full max-w-[85rem]">
        {/* Header */}
        <header className="section-header">
          <h2 className="section-heading max-w-2xl text-4xl md:text-6xl">
            {t.heading} <span className="text-zinc-400 dark:text-zinc-600">{t.headingAccent}</span>
          </h2>
          <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            {t.body}
          </p>
        </header>

        <div className="space-y-28">
          <Group numeral="I" label={t.lecturersLabel} count={t.lecturers.length}>
            {t.lecturers.map((lecturer, idx) => (
              <PersonCard
                key={lecturer.name}
                name={lecturer.name}
                role={lecturer.role}
                image={lecturer.image}
                initials={lecturer.initials}
                delay={0.05 * idx}
                onClick={() => setSelectedLecturer(lecturer)}
              />
            ))}
          </Group>

          <Group numeral="II" label={t.activeMembersLabel} count={t.assistants.length}>
            {t.assistants.map((assistant, idx) => (
              <PersonCard
                key={idx}
                name={assistant.name}
                role={assistant.role}
                image={assistant.image}
                initials={assistant.initials}
                delay={0.03 * idx}
                onClick={() => setSelectedAssistant(assistant)}
              />
            ))}
          </Group>

          <Group numeral="III" label={t.alumniLabel} count={t.alumni.length}>
            {t.alumni.map((person, idx) => (
              <PersonCard
                key={idx}
                name={person.name}
                role={person.role}
                image={"image" in person ? person.image : undefined}
                initials={person.initials}
                year={person.year}
                delay={0.05 * idx}
                onClick={() => setSelectedAlumni(person)}
              />
            ))}
          </Group>
        </div>
      </div>

      {selectedLecturer && (
        <PersonModal
          person={{
            name: selectedLecturer.name,
            initials: selectedLecturer.initials,
            image: selectedLecturer.image,
            role: selectedLecturer.role,
            specialty: selectedLecturer.specialty,
            education: selectedLecturer.education,
            expertise: selectedLecturer.expertise,
          }}
          educationLabel={t.modalEducationLabel}
          researchLabel={t.modalResearchLabel}
          onClose={() => setSelectedLecturer(null)}
        />
      )}

      {selectedAssistant && (
        <PersonModal
          person={{
            name: selectedAssistant.name,
            initials: selectedAssistant.initials,
            image: selectedAssistant.image,
            role: selectedAssistant.role,
            education: selectedAssistant.education,
            expertise: selectedAssistant.expertise,
            experience: selectedAssistant.experience,
            achievements: selectedAssistant.achievements,
            contact: selectedAssistant.contact,
          }}
          educationLabel={t.modalEducationLabel}
          researchLabel={t.modalResearchLabel}
          experienceLabel={t.modalExperienceLabel}
          achievementsLabel={t.modalAchievementsLabel}
          contactLabel={t.modalContactLabel}
          onClose={() => setSelectedAssistant(null)}
        />
      )}

      {selectedAlumni && (
        <PersonModal
          person={{
            name: selectedAlumni.name,
            initials: selectedAlumni.initials,
            image: selectedAlumni.image,
            role: selectedAlumni.role,
            education: selectedAlumni.education,
            thesis: selectedAlumni.thesis,
            experience: selectedAlumni.experience,
            achievements: selectedAlumni.achievements,
            contact: selectedAlumni.contact,
          }}
          educationLabel={t.modalEducationLabel}
          researchLabel={t.modalResearchLabel}
          thesisLabel={t.modalThesisLabel}
          experienceLabel={t.modalExperienceLabel}
          achievementsLabel={t.modalAchievementsLabel}
          contactLabel={t.modalContactLabel}
          onClose={() => setSelectedAlumni(null)}
        />
      )}
    </section>
  );
}
