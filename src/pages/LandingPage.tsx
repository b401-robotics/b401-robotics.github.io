import { useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";

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

      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 relative overflow-hidden">
        {/* Subtle, cool-toned background blobs for glassmorphism to blur */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-200/40 dark:bg-blue-900/20 blur-[100px] animate-float pointer-events-none transition-colors duration-500" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-[120px] animate-float pointer-events-none transition-colors duration-500" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-teal-200/40 dark:bg-teal-900/20 blur-[80px] animate-float pointer-events-none transition-colors duration-500" style={{ animationDelay: "4s" }} />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pt-24">
            <AnimatePresence mode="wait">
              <motion.div 
                key={section || "home"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {(!section || section === "home") && <HeroSection />}

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
