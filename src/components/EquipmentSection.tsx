import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";
import { PreviewSectionLayout } from "./PreviewSectionLayout";
import { FacilityModal } from "./FacilityModal";

interface EquipmentSectionProps {
  preview?: boolean;
}

export function EquipmentSection({ preview = false }: EquipmentSectionProps = {}) {
  const { lang } = useLanguage();
  const t = translations[lang].equipment;

  if (preview) {
    return (
      <PreviewSectionLayout
        id="equipment"
        sectionLabel={t.sectionLabel}
        heading={t.heading}
        headingAccent={t.headingAccent}
        body={t.body}
        ctaTo={`/${lang}/equipment`}
        ctaLabel={t.viewAll}
        imagePosition="right"
      />
    );
  }

  return (
    <section id="equipment" className="relative">
      {/* ============================================================ */}
      {/* Header                                                        */}
      {/* ============================================================ */}
      <div className="px-6 md:px-10 lg:px-14 pt-12 pb-10 md:pt-16 md:pb-16 animate-fade-in">
        <div className="max-w-[85rem] w-full mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-zinc-900 dark:text-zinc-100 mb-3 leading-tight">
            {t.heading}{" "}
            <span className="text-zinc-900 dark:text-zinc-100">{t.headingAccent}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {t.body}
          </p>
          <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-white/10" />
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
  readonly imageUrl: string;
  readonly info: string;
}

interface LabRoomProps {
  room: {
    readonly code: string;
    readonly name: string;
    readonly desc: string;
    readonly imageUrl: string;
    readonly facilities: readonly Facility[];
  };
  facilitiesLabel: string;
  clickForMoreInfo: string;
}

function LabRoom({ room, facilitiesLabel, clickForMoreInfo }: LabRoomProps) {
  const [selected, setSelected] = useState<Facility | null>(null);

  return (
    <div className="min-h-[calc(100vh-4.75rem)] flex items-center px-6 md:px-10 lg:px-14 py-16">
      <div className="max-w-[85rem] w-full mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
        {/* Image — height matches the right column (header top edge to list bottom edge) */}
        <div className="w-full lg:w-1/2 flex">
          <div className="w-full bg-zinc-200/60 dark:bg-white/5 overflow-hidden flex-1 min-h-[280px] lg:min-h-0">
            {room.imageUrl ? (
              <img
                src={room.imageUrl}
                alt={room.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : null}
          </div>
        </div>

        {/* Info + facilities */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 mb-3">
            {room.code}
          </p>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 mb-5 leading-tight">
            {room.name}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed mb-8">
            {room.desc}
          </p>

          {/* Facility list — scrollbar always visible */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 mb-1">
              {facilitiesLabel}
            </h4>
            <div className="flex flex-col max-h-[320px] overflow-y-auto scrollbar-fade">
              {room.facilities.map((f, i) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setSelected(f)}
                  className={`group relative flex items-center gap-4 py-3 text-left w-full transition-colors duration-200 focus:outline-none ${
                    i !== 0 ? "border-t border-zinc-200/70 dark:border-white/10" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 shrink-0 bg-zinc-200/60 dark:bg-white/5 overflow-hidden">
                    {f.imageUrl ? (
                      <img
                        src={f.imageUrl}
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
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-2">
                      <span>{f.category}</span>
                      {/* Click-for-more-info — italic text, appears on hover */}
                      <span className="italic text-zinc-500 dark:text-zinc-400 text-xs whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
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