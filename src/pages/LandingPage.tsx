import { useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { HomeSheets } from "../components/HomeSheets";

import { ResearchSection } from "../components/ResearchSection";
import { PracticumsSection } from "../components/PracticumsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { MembersSection } from "../components/MembersSection";
import { EquipmentSection } from "../components/EquipmentSection";
import { AchievementSection } from "../components/AchievementSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { LanguageProvider, SUPPORTED_LANGS, type Language } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

let isFirstLoad = true;
const isReload = typeof performance !== "undefined" && 
  performance.getEntriesByType("navigation").length > 0 && 
  (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type === "reload";

export function LandingPage() {
  const { lang, section } = useParams<{ lang: string; section?: string }>();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Redirect to home if it's the very first load and the user reloaded on a section
  if (isFirstLoad && isReload && section) {
    isFirstLoad = false;
    return <Navigate to={`/${lang}`} replace />;
  }
  isFirstLoad = false;

  // Redirect any unknown lang slug to English
  if (!lang || !SUPPORTED_LANGS.includes(lang as Language)) {
    return <Navigate to="/en" replace />;
  }

  const resolvedLang = lang as Language;

  return (
    <LanguageProvider lang={resolvedLang}>
      <Helmet>
        <title>B401 Robotics & Intelligent Systems Lab</title>
        <meta name="description" content="Welcome to the B401 Robotics and Intelligent Systems Laboratory. Discover our research, projects, and state-of-the-art equipment." />
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 transition-colors duration-500 relative overflow-hidden">
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pt-[4.75rem]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={section || "home"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {(!section || section === "home") && <HomeSheets />}

                {section === "research" && <ResearchSection />}
                {section === "practicums" && <PracticumsSection />}
                {section === "projects" && <ProjectsSection />}
                {section === "members" && <MembersSection />}
                {section === "equipment" && <EquipmentSection />}
                {section === "achievements" && <AchievementSection />}
                {section === "contact" && <ContactSection />}
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}
