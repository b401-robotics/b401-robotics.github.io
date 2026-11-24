import { researchPapers, type ResearchPaper } from "../contents/researchPapers";
import { alumni, assistants, lecturers } from "../contents/memberList";

/**
 * Normalize names for consistent matching.
 * Handles capitalization, punctuation, and diacritics.
 */
const normalizeName = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * Remove academic titles from lecturer names before comparing them
 * with publication author names.
 */
const lecturerAuthorNames = lecturers
  .map(({ name }) =>
    normalizeName(
      name.replace(
        /\b(?:prof(?:essor)?|dr|ir|s\.?t|m\.?sc|m\.?t|m\.?eng)\b\.?/gi,
        " "
      )
    )
  )
  .filter(Boolean);

/**
 * Non-lecturer laboratory members:
 * - Current laboratory assistants
 * - Laboratory alumni
 */
const nonLecturerMemberNames = [
  ...assistants.map(({ name }) => name),
  ...alumni.map(({ name }) => name),

  // Author abbreviation used in the quadruped movement-plan publication.
  "V. G. A. B. M. Putu",
]
  .map(normalizeName)
  .filter(Boolean);

/**
 * Checks whether at least one known author name appears in the
 * publication's author list.
 */
const hasMatchingAuthor = (
  authors: string,
  knownNames: string[]
): boolean => {
  const normalizedAuthors = ` ${normalizeName(authors)} `;

  return knownNames.some((name) =>
    normalizedAuthors.includes(` ${name} `)
  );
};

/**
 * Checks explicit publication affiliation metadata.
 * This deliberately does not inspect the venue or description.
 */
const hasComputerEngineeringAffiliation = (
  paper: ResearchPaper
): boolean =>
  paper.affiliations?.some((affiliation) => {
    const normalized = normalizeName(affiliation);

    return (
      normalized.includes("department of computer engineering") ||
      normalized.includes("departemen teknik komputer")
    );
  }) ?? false;

/**
 * Publication inclusion criteria:
 *
 * 1. Department attribution:
 *    The publication explicitly identifies the Department of Computer
 *    Engineering AND at least one of the six laboratory lecturers
 *    appears in its author list.
 *
 * 2. Non-lecturer laboratory member:
 *    At least one current laboratory assistant or alumnus appears
 *    in the author list.
 *
 * Lecturer authorship alone is NOT sufficient.
 */
const sortedResearchPapers = researchPapers
  .filter((paper) => {
    const departmentAndLecturer =
      hasComputerEngineeringAffiliation(paper) &&
      hasMatchingAuthor(paper.authors, lecturerAuthorNames);

    const laboratoryMemberPublication = hasMatchingAuthor(
      paper.authors,
      nonLecturerMemberNames
    );

    return departmentAndLecturer || laboratoryMemberPublication;
  })
  .sort((a, b) => b.year - a.year);

const lecturerProfiles = [
  {
    name: "Ahmad Zaini",
    url: "https://scholar.its.ac.id/en/persons/ahmad-zaini/",
  },
  {
    name: "Muhtadin",
    url: "https://scholar.its.ac.id/en/persons/muhtadin/",
  },
  {
    name: "Eko Pramunanto",
    url: "https://scholar.its.ac.id/en/persons/eko-pramunanto/",
  },
  {
    name: "Hany Boedinugroho",
    url: "https://garuda.kemdiktisaintek.go.id/author/view/7621988",
  },
  {
    name: "Mauridhi Hery Purnomo",
    url: "https://scholar.its.ac.id/en/persons/mauridhi-hery-purnomo/",
  },
  {
    name: "Atar Fuady Babgei",
    url: "https://scholar.its.ac.id/en/persons/atar-fuady-babgei/",
  },
];

export function ResearchPapersSection() {
  const years = sortedResearchPapers.map((paper) => paper.year);
  const hasYears = years.length > 0;
  const newestYear = hasYears ? Math.max(...years) : 0;
  const oldestYear = hasYears ? Math.min(...years) : 0;

  return (
    <section id="research-papers" className="section-padding flex flex-col">
      <div className="max-w-[85rem] w-full mx-auto">
        {/* Section Header */}
        <div
          className="mb-10 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="section-heading mb-3 text-2xl md:text-3xl">
            Research Papers{" "}
            <span className="fg-muted">& Publications</span>
          </h2>

          <p className="fg-muted text-sm md:text-base max-w-2xl leading-relaxed">
            Explore research publications authored by members of the Robotics
            and Intelligent Systems Laboratory and researchers affiliated with
            the Department of Computer Engineering at ITS. These works cover
            robotics, artificial intelligence, computer vision, embedded
            systems, autonomous systems, and intelligent automation.
          </p>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] fg-muted">
            {sortedResearchPapers.length} PUBLICATIONS
            {hasYears ? ` · ${oldestYear}–${newestYear}` : ""} · NEWEST FIRST
          </p>
        </div>

        {/* Publications Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {sortedResearchPapers.map((paper, index) => (
            <article
              key={`${paper.year}-${paper.title}`}
              className="group flex flex-col border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5 md:p-6 transition-all duration-300 hover:border-zinc-400 dark:hover:border-white/30 hover:bg-white dark:hover:bg-zinc-900/70"
            >
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] fg-meta">
                  {paper.category}
                </span>

                <span className="fg-meta">•</span>

                <span className="font-mono text-[10px] fg-muted">
                  {paper.year}
                </span>

                <span className="fg-meta">•</span>

                <span className="font-mono text-[10px] fg-muted">
                  #{index + 1}
                </span>
              </div>

              {/* Paper Title */}
              <h3 className="font-display font-bold text-lg md:text-xl tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 leading-snug group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                {paper.title}
              </h3>

              {/* Authors */}
              <div className="mb-4">
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] fg-muted mb-1.5">
                  AUTHORS
                </span>

                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {paper.authors}
                </p>
              </div>

              {/* Description */}
              <p className="fg-muted text-sm leading-relaxed mb-5">
                {paper.description}
              </p>

              {/* Venue and Link */}
              <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-white/10">
                <p className="text-[11px] fg-muted leading-relaxed mb-4">
                  {paper.venue}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider fg-muted border border-zinc-300 dark:border-white/15 px-2 py-1">
                    {paper.linkLabel}
                  </span>

                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open publication: ${paper.title}`}
                    className="inline-flex items-center gap-2 min-h-[44px] text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
                  >
                    View Paper
                    <span
                      aria-hidden="true"
                      className="text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Lecturer Publication Profiles */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-white/10">
          <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-3">
            Lecturer Publication Profiles
          </h3>

          <p className="fg-muted text-sm leading-relaxed mb-5 max-w-3xl">
            Browse the indexed research outputs of the six lecturers. Their
            profiles may contain additional publications beyond the
            laboratory-related papers listed above.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lecturerProfiles.map((profile) => (
              <a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 border border-zinc-200 dark:border-white/10 px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-white/30 transition-colors"
              >
                <span>{profile.name}</span>
                <span aria-hidden="true" className="shrink-0">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Access Note */}
        <p className="mt-8 text-[11px] md:text-xs fg-muted leading-relaxed">
          Links lead to publisher pages, DOI records, official ITS research
          records, conference program books, journal pages, or directly
          accessible PDFs. A publication record may be publicly viewable even
          when the publisher restricts access to the full-text paper.
          Publications are included when they explicitly identify the
          Department of Computer Engineering and list one of its lecturers as
          an author, or when at least one non-lecturer laboratory member or
          alumnus is listed as an author.
        </p>
      </div>
    </section>
  );
}