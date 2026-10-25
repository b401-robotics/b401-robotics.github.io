import { useEffect, lazy, Suspense } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { HomeSheets } from "../components/HomeSheets";
import { PracticumsSection } from "../components/PracticumsSection";
import { ResearchSection } from "../components/ResearchSection";
import { MembersSection } from "../components/MembersSection";
import { EquipmentSection } from "../components/EquipmentSection";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const HighlightPage = lazy(() =>
  import("./HighlightPage").then((m) => ({ default: m.HighlightPage }))
);
const ResearchPage = lazy(() =>
  import("./ResearchPage").then((m) => ({ default: m.ResearchPage }))
);
const ProjectsSection = lazy(() =>
  import("../components/ProjectsSection").then((m) => ({ default: m.ProjectsSection }))
);
const AchievementSection = lazy(() =>
  import("../components/AchievementSection").then((m) => ({ default: m.AchievementSection }))
);
const ContactSection = lazy(() =>
  import("../components/ContactSection").then((m) => ({ default: m.ContactSection }))
);

export function LandingPage() {
  const { section } = useParams<{ section?: string }>();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.style.scrollBehavior = "auto";
    } else {
      document.documentElement.style.scrollBehavior = "smooth";
    }
    window.scrollTo(0, 0);
  }, [location.pathname, reduceMotion]);

  return (
    <>
      <Helmet>
        <title>B401 Robotics & Intelligent Systems Lab</title>
        <meta
          name="description"
          content="Welcome to the B401 Robotics and Intelligent Systems Laboratory. Discover our research, projects, and state-of-the-art equipment."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 transition-colors duration-500 relative overflow-hidden">
        <div className="relative z-10 flex flex-col min-h-screen">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-3 focus:min-h-[44px] focus:inline-flex focus:items-center focus:bg-zinc-900 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.16em]"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 pt-[4.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={section || "home"}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Suspense
                  fallback={
                    <div className="min-h-[50vh] flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />
                    </div>
                  }
                >
                  {(!section || section === "home") && <HomeSheets />}

                  {section === "research" && <ResearchPage />}

                  {section === "highlight" && <HighlightPage />}

                  {section === "practicums" && <PracticumsSection />}
                  {section === "projects" && <ProjectsSection />}
                  {section === "members" && <MembersSection />}
                  {section === "equipment" && <EquipmentSection />}
                  {section === "achievements" && <AchievementSection />}
                  {section === "contact" && <ContactSection />}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}