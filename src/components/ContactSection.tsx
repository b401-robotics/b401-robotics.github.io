import { translations } from "../contents/translations";

const CONTACT_ICONS = [
  // Location
  <svg key="loc" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>,
  // Email
  <svg key="email" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>,
  // Clock
  <svg key="clock" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

interface ContactSectionProps {
  preview?: boolean;
}

export function ContactSection(_props: ContactSectionProps = {}) {
  const t = translations.contact;

  const contactItems = [
    { label: t.locationLabel, value: t.locationValue },
    { label: t.emailLabel, value: t.emailValue },
    { label: t.hoursLabel, value: t.hoursValue },
  ];

  return (
    <section id="contact" className="section-padding relative min-h-[calc(100vh-4.75rem)] flex flex-col">
      <div className="max-w-[85rem] w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in relative" style={{ animationDelay: "0.1s" }}>
          <h2 className="section-heading mb-5 text-4xl md:text-6xl">
            {t.heading} <span className="text-zinc-400 dark:text-zinc-600">{t.headingAccent}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg max-w-2xl mx-auto">{t.body}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <div className="space-y-5">
            {contactItems.map((item, idx) => (
              <div
                key={item.label}
                className="border border-zinc-200 bg-white p-6 flex items-start gap-4 animate-fade-in dark:border-white/10 dark:bg-white/[0.04]"
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                <div className="w-10 h-10 border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
                  {CONTACT_ICONS[idx]}
                </div>
                <div>
                  <p className="kicker mb-1">{item.label}</p>
                  <p className="text-zinc-900 dark:text-zinc-100 text-sm whitespace-pre-line leading-relaxed">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="border border-zinc-200 bg-white p-8 animate-fade-in dark:border-white/10 dark:bg-white/[0.04]" style={{ animationDelay: "0.4s" }}>
            <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-xl mb-6">{t.formTitle}</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-zinc-600 dark:text-zinc-300 text-sm mb-1.5">
                    {t.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-zinc-600 dark:text-zinc-300 text-sm mb-1.5">
                    {t.emailFormLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors duration-200"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-zinc-600 dark:text-zinc-300 text-sm mb-1.5">
                  {t.subjectLabel}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder={t.subjectPlaceholder}
                  className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-zinc-600 dark:text-zinc-300 text-sm mb-1.5">
                  {t.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors duration-200 resize-none"
                />
              </div>
              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full py-3.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-xs uppercase tracking-[0.16em] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-[opacity,transform] duration-300 hover:-translate-y-0.5"
              >
                {t.sendBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}