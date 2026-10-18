import { useState } from "react";
import { translations } from "../contents/translations";
import { PreviewSectionLayout } from "./PreviewSectionLayout";
import { FacilityModal } from "./FacilityModal";

interface EquipmentSectionProps {
  preview?: boolean;
}

export function EquipmentSection({ preview = false }: EquipmentSectionProps = {}) {
  const t = translations.equipment;

  if (preview) {
    return (
      <PreviewSectionLayout
        id="equipment"
        sectionLabel={t.sectionLabel}
        heading={t.heading}
        headingAccent={t.headingAccent}
        body={t.body}
        ctaTo="/equipment"
        ctaLabel={t.viewAll}
        imagePosition="right"
        image={t.image}
        imageAlt={t.heading}
      />
    );
  }

  return (
    <section id="equipment" className="relative">
      {/* ============================================================ */}
      {/* Header                                                        */}
      {/* ============================================================ */}
      <div className="px-6 md:px-10 lg:px-14 pt-10 pb-4 md:pt-12 md:pb-6 animate-fade-in">
        <div className="max-w-[85rem] w-full mx-auto">
          <header className="section-header">
            <div>
              <p className="kicker mb-3">{t.sectionLabel}</p>
              <h2 className="section-heading text-4xl md:text-6xl">
                {t.heading}{" "}
                <span className="text-zinc-400 dark:text-zinc-600">{t.headingAccent}</span>
              </h2>
            </div>
            <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              {t.body}
            </p>
          </header>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Lab rooms — each one fills a full browser window              */}
      {/* ============================================================ */}
      {t.labRooms.map((room) => (
        <LabRoom
          key={room.code}
          room={room}
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
  facilitiesLabel: string;
  clickForMoreInfo: string;
}

function LabRoom({ room, facilitiesLabel, clickForMoreInfo }: LabRoomProps) {
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
    <div className="flex px-6 md:px-10 lg:px-14 py-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="max-w-[85rem] w-full mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
        {/* Image — height matches the right column (header top edge to list bottom edge) */}
        <div className="w-full lg:w-1/2 flex">
          <div className="corner-frame group relative w-full overflow-hidden flex-1 min-h-[280px] lg:min-h-0">
            {imgCount > 0 ? (
              <>
                <img
                  src={images[imgIndex % imgCount]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  loading="lazy"
                />
                {imgCount > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setImgIndex((prev) => (prev - 1 + imgCount) % imgCount)}
                      aria-label="Previous image"
                      className="absolute top-1/2 left-3 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 focus:outline-none opacity-0 group-hover:opacity-100"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M15 6l-6 6 6 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImgIndex((prev) => (prev + 1) % imgCount)}
                      aria-label="Next image"
                      className="absolute top-1/2 right-3 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 focus:outline-none opacity-0 group-hover:opacity-100"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xs">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setImgIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === (imgIndex % imgCount) ? "bg-white w-4" : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
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
          <p className="kicker mb-3">
            {room.code}
          </p>
          <h3 className="section-heading mb-5 text-2xl md:text-3xl">
            {room.name}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed mb-8">
            {room.description}
          </p>

          {/* Facility list — scrollbar always visible */}
          <div>
            <h4 className="kicker mb-1">
              {facilitiesLabel}
            </h4>
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
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
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
          </div>
        </div>
      </div>

      {/* Facility detail modal */}
      {selected && <FacilityModal facility={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}