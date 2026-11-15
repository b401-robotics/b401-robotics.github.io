import { useState } from "react";
import { Link } from "react-router-dom";
import { translations } from "../contents/translations";
import { FacilityModal } from "./FacilityModal";

interface EquipmentSectionProps {
  preview?: boolean;
}

interface Facility {
  readonly name: string;
  readonly category: string;
  readonly room?: string;
  readonly image?: string;
  readonly description: string;
}

export function EquipmentSection({ preview = false }: EquipmentSectionProps = {}) {
  const t = translations.equipment;
  const [selected, setSelected] = useState<Facility | null>(null);

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
      {/* Lab room overview — the three rooms of the lab                */}
      {/* ============================================================ */}
      <div
        className="px-6 md:px-10 lg:px-14 pt-10 animate-fade-in"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="max-w-[85rem] w-full mx-auto">
          <div
            className="border-y border-zinc-200 dark:border-white/10 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-white/10 grid grid-cols-1 md:grid-cols-3"
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
        </div>
      </div>

      {/* ============================================================ */}
      {/* Unified facility catalogue — one list, not split per room     */}
      {/* ============================================================ */}
      <div
        className="px-6 md:px-10 lg:px-14 pt-16 md:pt-20 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="max-w-[85rem] w-full mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-zinc-200 dark:border-white/10 pb-6 mb-8">
            <h3 className="section-heading text-2xl md:text-3xl">
              {t.facilitiesLabel}
            </h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] fg-meta">
              {t.facilities.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.facilities.map((facility) => (
              <button
                key={facility.name}
                type="button"
                onClick={() => setSelected(facility)}
                className="group text-left border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100"
              >
                {/* Thumbnail */}
                <div className="corner-frame aspect-[4/3] w-full bg-zinc-100 dark:bg-white/5 overflow-hidden">
                  {facility.image ? (
                    <img
                      src={facility.image}
                      alt={facility.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-xs">
                      No image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col gap-1">
                  <h4 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100 leading-snug">
                    {facility.name}
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="kicker">{facility.category}</span>
                    {facility.room ? (
                      <span className="kicker text-zinc-400 dark:text-zinc-500">
                        {facility.room}
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Facility detail modal */}
      {selected && <FacilityModal facility={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}