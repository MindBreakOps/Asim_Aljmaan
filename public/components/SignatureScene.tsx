"use client";
import React, { useState, useEffect, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import WorkOverlay from "./overlays/WorkOverlay";
import AboutOverlay from "./overlays/AboutOverlay";
import ContactOverlay from "./overlays/ContactOverlay";
import ProjectOverlay from "./overlays/ProjectOverlay";
import SkillsOverlay from "./overlays/SkillsOverlay";
import EducationOverlay from "./overlays/EducationOverlay";
import { useLanguage } from "@/context/LanguageContext";
import DeskScene from "./DeskScene";

export type SceneType = "none" | "work" | "about" | "contact" | "skills" | "education" | "projects";

interface SignatureSceneProps {
  activeScene: SceneType;
  setActiveScene: (scene: SceneType) => void;
}

const SFX = {
  click: "/sounds/desktop.mp3",
  laptop: "/sounds/labtop.mp3",
  switch: "/sounds/lamp-off-on.mp3",
  clink: "/sounds/mugg.mp3",
  tap: "/sounds/tablet.mp3",
};

export default function SignatureScene({ activeScene, setActiveScene }: SignatureSceneProps) {
  const { t, locale } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const [isLampOn, setIsLampOn] = useState(true);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Hide hint after 8 seconds or interaction
    const hintTimer = setTimeout(() => setShowHint(false), 8000);
    return () => clearTimeout(hintTimer);
  }, []);

  const playSFX = useCallback((type: string) => {
    if (!isMuted) {
      try {
        const sfxUrl = SFX[type as keyof typeof SFX] || SFX.click;
        const sfx = new Audio(sfxUrl);
        sfx.volume = 0.4;
        sfx.play().catch(() => {});
      } catch (e) {
        console.error("SFX Error", e);
      }
    }
  }, [isMuted]);

  const onToggleSound = () => {
    setIsMuted((prev) => !prev);
  };

  const handleInteraction = (scene: SceneType, sfx: string) => {
    playSFX(sfx);
    setActiveScene(scene);
    setShowHint(false);
  };

  return (
    <div className="relative w-full h-screen bg-[#040712] overflow-hidden select-none flex items-center justify-center">

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 2.5, 7], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <DeskScene
              activeScene={activeScene}
              onInteract={handleInteraction}
              isLampOn={isLampOn}
              setIsLampOn={(val) => {
                playSFX("switch");
                setIsLampOn(val);
              }}
              locale={locale}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 2D UI Layer */}
      <div className="relative z-10 w-full h-full pointer-events-none">

        {/* Interface Controls */}
        <div className="fixed left-8 top-8 z-[200] pointer-events-auto flex items-center gap-4">
            <button
            onClick={onToggleSound}
            className={`size-14 rounded-full border flex items-center justify-center transition-all duration-500 backdrop-blur-xl ${
                isMuted ? "border-white/10 bg-navy/20 text-white/20" : "border-gold/40 bg-gold text-navy shadow-[0_0_30px_rgba(201,168,76,0.3)]"
            }`}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2V15H6L11 19V5Z" />
                    {!isMuted && (
                        <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                </svg>
            </button>
        </div>

        {/* Hero Text */}
        <AnimatePresence>
            {activeScene === "none" && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`absolute top-24 z-20 pointer-events-none hidden md:block ${locale === "ar" ? "right-16 text-right" : "left-16 text-left"}`}
            >
                <h1 className="font-display text-5xl md:text-7xl text-ivory font-light leading-tight tracking-tight shadow-text">
                {t("hero.title")}<br />
                <span className="text-gold font-sans font-semibold italic">
                    {t("hero.subtitle")}
                </span>
                </h1>
                <div className={`mt-8 flex items-center gap-4 ${locale === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className="h-px w-16 bg-gold/30" />
                    <span className="font-mono font-medium text-gold/60 text-[10px] tracking-[0.6em] uppercase">
                        {t("hero.explore")}
                    </span>
                </div>
            </motion.div>
            )}
        </AnimatePresence>

        {/* Educational Hint */}
        <AnimatePresence>
            {showHint && activeScene === "none" && (
                <motion.div
                    initial={{ opacity: 0, x: locale === "ar" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: locale === "ar" ? -20 : 20 }}
                    className={`fixed bottom-12 z-[200] bg-gold p-6 text-navy shadow-2xl max-w-xs pointer-events-auto rounded-sm border border-navy/10 ${locale === "ar" ? "left-12 text-right" : "right-12 text-left"}`}
                >
                    <h4 className="font-display font-black text-xl mb-2 tracking-tighter uppercase leading-none">{t("guide.title")}</h4>
                    <p className="font-sans text-xs leading-relaxed font-bold uppercase tracking-tight opacity-70">
                        {t("guide.desc")}
                    </p>
                    <button
                        onClick={() => setShowHint(false)}
                        className="mt-6 font-mono text-[9px] font-black border-b-2 border-navy/20 pb-0.5 hover:border-navy transition-all uppercase"
                    >
                        {t("guide.dismiss")}
                    </button>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Overlays */}
        <AnimatePresence>
            {activeScene !== "none" && (
                <div className="fixed inset-0 z-[150] pointer-events-auto">
                    {activeScene === "about" && <AboutOverlay onClose={() => setActiveScene("none")} />}
                    {activeScene === "contact" && <ContactOverlay onClose={() => setActiveScene("none")} />}
                    {activeScene === "projects" && <ProjectOverlay onClose={() => setActiveScene("none")} />}
                    {activeScene === "skills" && <SkillsOverlay onClose={() => setActiveScene("none")} />}
                    {activeScene === "education" && <EducationOverlay onClose={() => setActiveScene("none")} />}
                </div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
