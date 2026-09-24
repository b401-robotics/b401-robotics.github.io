interface FacilityModalProps {
  facility: {
    name: string;
    category: string;
    imageUrl?: string;
    info: string;
  };
  onClose: () => void;
}

export function FacilityModal({ facility, onClose }: FacilityModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      style={{ animationDuration: "0.15s", animationDelay: "0s" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-zinc-200 dark:border-white/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Large image */}
        <div className="w-full aspect-video bg-zinc-100 dark:bg-white/5 shrink-0">
          {facility.imageUrl ? (
            <img
              src={facility.imageUrl}
              alt={facility.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-sm">
              No image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 sm:p-8 overflow-y-auto scrollbar-hide">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 mb-2">
            {facility.category}
          </p>
          <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-zinc-900 dark:text-zinc-100 leading-tight mb-4">
            {facility.name}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
            {facility.info}
          </p>
        </div>
      </div>
    </div>
  );
}