import { useDialog } from "../hooks/useDialog";

interface PdfViewerModalProps {
  title: string;
  url: string;
  onClose: () => void;
}

export function PdfViewerModal({ title, url, onClose }: PdfViewerModalProps) {
  const modalRef = useDialog<HTMLDivElement>(onClose);

  // Normalize Google Drive /view URLs to /preview for embedded iframe
  const embedUrl = url.includes("drive.google.com/file/d/")
    ? url.replace(/\/view(\?.*)?$/, "/preview")
    : url;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in"
      style={{ animationDuration: "0.15s", animationDelay: "0s" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl h-[92vh] bg-white dark:bg-zinc-900 overflow-hidden flex flex-col border border-zinc-200 dark:border-white/10 shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/80 shrink-0">
          <div className="min-w-0 pr-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] fg-meta block">
              Practicum Module Document
            </span>
            <h3
              id="pdf-modal-title"
              className="font-display font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 truncate"
            >
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Open in external tab link */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors"
              title="Open original document in new tab"
            >
              <span>External</span>
              <span aria-hidden="true">↗</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100"
              aria-label="Close dialog"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Frame */}
        <div className="flex-1 w-full h-full bg-zinc-100 dark:bg-zinc-950 relative">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}
