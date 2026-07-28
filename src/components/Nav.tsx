"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneType } from "./SignatureScene";
import { useLanguage } from "@/context/LanguageContext";

interface NavProps {
  activeScene: SceneType;
  setActiveScene: (scene: SceneType) => void;
}

const NavColors = {
  navy: "#000000",
  gold: "#C9A84C",
  ivory: "#F5F5F0"
};

export default function Nav({ activeScene, setActiveScene }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  const handleTabClick = (scene: SceneType) => {
    setActiveScene(scene);
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  const menuItems: { label: string; scene: SceneType }[] = [
    { label: t("nav.home"), scene: "none" },
    { label: t("nav.systems"), scene: "projects" },
    { label: t("nav.cv"), scene: "about" },
    { label: t("nav.skills"), scene: "skills" },
    { label: t("nav.academic"), scene: "education" },
    { label: t("nav.contact"), scene: "contact" },
  ];

  return (
    <>
      <nav className="fixed right-8 top-8 z-[300] flex items-center gap-4">
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="size-14 rounded-full border border-white/10 bg-navy/20 backdrop-blur-xl flex items-center justify-center font-mono text-[10px] text-gold font-bold hover:border-gold/40 transition-all uppercase"
        >
          {locale === "en" ? "AR" : "EN"}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`size-14 rounded-full border flex items-center justify-center transition-all duration-500 backdrop-blur-xl group ${
            isOpen ? "border-gold bg-gold text-navy" : "border-white/10 bg-navy/20 text-white/40 hover:border-gold/40"
          }`}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <div className="flex gap-1 group-hover:gap-1.5 transition-all">
                <div className="size-1 rounded-full bg-gold" />
                <div className="size-1 rounded-full bg-gold" />
                <div className="size-1 rounded-full bg-gold" />
            </div>
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            <div className="relative z-10 flex flex-col items-center gap-6 md:gap-10">
                <div className="font-mono text-[9px] tracking-[0.5em] text-gold/40 uppercase mb-8">
                    Navigation / Rapid Access
                </div>

                {menuItems.map((item, i) => (
                    <motion.button
                        key={item.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.6 }}
                        onClick={() => handleTabClick(item.scene)}
                        className={`group relative py-2 overflow-hidden ${
                            activeScene === item.scene ? "text-gold" : "text-ivory/40 hover:text-white"
                        }`}
                    >
                        <span className="font-display text-4xl md:text-7xl font-light tracking-tighter transition-all duration-500 group-hover:tracking-normal group-hover:scale-105 inline-block">
                            {item.label}
                        </span>
                        <div className={`absolute bottom-0 left-0 w-full h-px bg-gold transition-transform duration-500 origin-left ${
                            activeScene === item.scene ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`} />
                    </motion.button>
                ))}
            </div>

            <div className="absolute bottom-12 w-full px-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em]">Asim Aljma'an · System Architect</div>
                <div className="flex gap-8">
                    {["LinkedIn", "GitHub", "WhatsApp"].map(l => (
                        <a key={l} href="#" className="font-mono text-[9px] uppercase tracking-widest hover:text-gold transition-colors">{l}</a>
                    ))}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
