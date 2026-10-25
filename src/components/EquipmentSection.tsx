import { useState } from "react";
import { Link } from "react-router-dom";
import { translations } from "../contents/translations";
import { FacilityModal } from "./FacilityModal";

interface EquipmentSectionProps {
  preview?: boolean;
}

export function EquipmentSection({ preview = false }: EquipmentSectionProps = {}) {
  const t = translations.equipment;

  if (preview) {
    return (
      <section id="equipment" className="section-padding flex flex-col justify-center">
        <div className="max-w-[85rem] w-full mx-auto">
          {/* Header */}
          <div className="mb-10 shrink-0 animate-fade-in relative" style={{ animationDelay: "0.1s" }}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="section-heading text-4xl md:text-6xl">
                  {t.heading} <span className="fg-muted">{t.headingAccent}</span>
                </h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-300">
                {t.body}
              </p>
            </div>
            <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-white/10" />
          </div>

          {/* 3 Dedicated Laboratory Spaces — Pure Names */}
          <div
            className="border-y border-zinc-200 dark:border-white/10 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-white/10 grid grid-cols-1 md:grid-cols-3 mb-10 animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            {t.labRooms.map((room, idx) => {
              const img = room.images?.[0];
              return (
                <div
                  key={room.code}
                  className="flex flex-col group"
                >
                  {/* Room image */}
                  <div className="corner-frame aspect-[4/3] w-full">
                    {img ? (
                      <img
                        src={img}
                        alt={room.name}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="h-full w-full bg-zinc-100 dark:bg-zinc-900" />
                    )}
                  </div>
                  {/* Label + name */}
                  <div className="py-8 px-6 md:px-8 flex flex-col gap-3 border-t border-zinc-200 dark:border-white/10 hover:bg-zinc-900/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] fg-muted">
                      LAB 0{idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900 dark:text-zinc-100">
                      {room.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Link */}
          <div className="flex justify-start pt-2">
            <Link
              to="/equipment"
              className="inline-flex items-center gap-3 border border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-[opacity,transform] duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 group dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:focus:ring-zinc-100"
            >
              {t.viewAll}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="equipment" className="relative pb-16 md:pb-24 lg:pb-32">
      {/* ============================================================ */}
      {/* Header                                                        */}
      {/* ============================================================ */}
      <div className="px-6 md:px-10 lg:px-14 pt-12 pb-0 md:pt-16 animate-fade-in">
        <div className="max-w-[85rem] w-full mx-auto">
          <header className="section-header">
            <div>
              <h2 className="section-heading text-4xl md:text-6xl">
                {t.heading}{" "}
                <span className="fg-muted">{t.headingAccent}</span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-300">
              {t.body}
            </p>
          </header>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Lab rooms — each one fills a full browser window              */}
      {/* ============================================================ */}
      {t.labRooms.map((room, idx) => (
        <LabRoom
          key={room.code}
          room={room}
          first={idx === 0}
          facilitiesLabel={t.facilitiesLabel}
          clickForMoreInfo={t.clickForMoreInfo}
        />
      ))}
    </section>
  );
}

interface Facility {
  readonly name: string;
  readonly category: string;
  readonly image: string;
  readonly description: string;
}

interface LabRoomProps {
  room: {
    readonly code: string;
    readonly name: string;
    readonly description: string;
    readonly image?: string;
    readonly images?: readonly string[];
    readonly facilities: readonly Facility[];
  };
  first?: boolean;
  facilitiesLabel: string;
  clickForMoreInfo: string;
}

function LabRoom({ room, first = false, facilitiesLabel, clickForMoreInfo }: LabRoomProps) {
  const [selected, setSelected] = useState<Facility | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const images: readonly string[] =
    room.images && room.images.length > 0
      ? room.images
      : room.image
      ? [room.image]
      : [];
  const imgCount = images.length;

  return (
    <div className={`flex px-6 md:px-10 lg:px-14 pb-8 ${first ? "pt-0" : "pt-8"} animate-fade-in`} style={{ animationDelay: "0.2s" }}>
      <div className="max-w-[85rem] w-full mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
        {/* Image — height matches the right column (header top edge to list bottom edge) */}
        <div className="w-full lg:w-1/2 flex">
          <div className="corner-frame group relative w-full overflow-hidden flex-1 min-h-[280px] lg:min-h-0">
            {imgCount > 0 ? (
              <>
                <img
                  src={images[imgIndex % imgCount]}
                  alt={room.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  loading="lazy"
                  decoding="async"
                />
                {imgCount > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setImgIndex((prev) => (prev - 1 + imgCount) % imgCount)}
                      aria-label="Previous image"
                      className="absolute top-1/2 left-3 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white opacity-100 pointer-events-auto sm:opacity-0 sm:pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto focus:opacity-100 focus:pointer-events-auto"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M15 6l-6 6 6 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImgIndex((prev) => (prev + 1) % imgCount)}
                      aria-label="Next image"
                      className="absolute top-1/2 right-3 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white opacity-100 pointer-events-auto sm:opacity-0 sm:pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto focus:opacity-100 focus:pointer-events-auto"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-xs">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setImgIndex(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          className="w-11 h-11 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
                        >
                          <span
                            className={`block h-2 rounded-full transition-all ${
                              i === (imgIndex % imgCount) ? "bg-white w-4" : "bg-white/50 w-2 hover:bg-white/75"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : null}
          </div>
        </div>

        {/* Info + facilities */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h3 className="section-heading mb-5 text-2xl md:text-3xl">
            {room.name}
          </h3>
          <p className="fg-muted text-sm md:text-base leading-relaxed mb-8">
            {room.description}
          </p>

          {/* Facility list — scrollbar always visible */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <h4 className="kicker">{facilitiesLabel}</h4>
              {room.facilities.length > 5 && (
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] fg-meta">
                  {room.facilities.length} items ↕
                </span>
              )}
            </div>
            {/* Gradient fade at bottom signals overflow */}
            <div className="relative">
              <div className="flex flex-col md:max-h-[320px] md:overflow-y-auto scrollbar-fade">
                {room.facilities.map((f, i) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setSelected(f)}
                  className={`group relative flex items-center gap-4 py-3 text-left w-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 ${
                    i !== 0 ? "border-t border-zinc-200/70 dark:border-white/10" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 shrink-0 bg-zinc-200/60 dark:bg-white/5 overflow-hidden">
                    {f.image ? (
                      <img
                        src={f.image}
                        alt={f.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>

                  {/* Name + category */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
                      {f.name}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="kicker">{f.category}</span>
                      {/* Click-for-more-info — appears on hover */}
                      <span className="kicker whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
                        {clickForMoreInfo}
                      </span>
                    </div>
                  </div>

                  {/* Bottom underline animation */}
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-zinc-900 dark:bg-zinc-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </button>
                ))}
              </div>
              {/* Bottom fade — only renders when list is clipped (md+) */}
              {room.facilities.length > 5 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 hidden md:block bg-gradient-to-t from-white dark:from-zinc-950 to-transparent"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Facility detail modal */}
      {selected && <FacilityModal facility={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}