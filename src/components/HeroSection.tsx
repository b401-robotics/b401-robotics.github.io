import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../contents/translations";
import Ur5Image from "../assets/img/ur5.webp";
import NrfImage from "../assets/img/nrf.webp";
import DroneImage from "../assets/img/drone.webp";

const BACKGROUNDS = [Ur5Image, NrfImage, DroneImage];
const ROTATION_MS = 5000;
const FADE_MS = 2000;

export function HeroSection() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Rotating background images with crossfade */}
      {BACKGROUNDS.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity ease-in-out ${
            idx === bgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${src})`,
            transitionDuration: `${FADE_MS}ms`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Dim overlay */}
      <div
        className="absolute inset-0 bg-black/35 pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mt-[350px]"
      >
        {/* Kicker */}
        <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-white/80 mb-8">
          {t.kicker}
        </p>

        {/* Slogan */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white">
          {t.slogan}
        </h1>
      </motion.div>
    </section>
  );
}