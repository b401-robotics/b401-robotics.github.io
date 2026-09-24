interface PersonModalProps {
  person: {
    name: string;
    initials: string;
    imageUrl?: string;
    role: string;
    specialty?: string;
    education?: string[];
    expertise?: string;
  };
  educationLabel: string;
  researchLabel: string;
  onClose: () => void;
}

export function PersonModal({
  person,
  educationLabel,
  researchLabel,
  onClose,
}: PersonModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      style={{ animationDuration: "0.15s", animationDelay: "0s" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-zinc-200 dark:border-white/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-zinc-800 dark:text-zinc-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image / Initials Area */}
        <div className="w-full md:w-2/5 md:min-h-[400px] shrink-0 bg-zinc-100 dark:bg-white/5">
          {person.imageUrl ? (
            <img
              src={person.imageUrl}
              alt={person.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full min-h-[250px] bg-zinc-800 flex items-center justify-center text-white font-display font-bold text-7xl">
              {person.initials}
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <h3 className="font-display font-bold text-xl md:text-2xl text-zinc-900 dark:text-zinc-100 leading-tight mb-2">
            {person.name}
          </h3>
          <p className="text-zinc-500 font-medium text-sm mb-6 pb-6 border-b border-zinc-200 dark:border-white/10">
            {person.role}
            {person.specialty ? ` • ${person.specialty}` : ""}
          </p>

          <div className="space-y-6">
            {person.education && person.education.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-3">
                  {educationLabel}
                </h4>
                <ul className="space-y-2">
                  {person.education.map((edu, i) => (
                    <li
                      key={i}
                      className="text-sm text-zinc-600 dark:text-zinc-300 flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {person.expertise && (
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-3">
                  {researchLabel}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {person.expertise}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}