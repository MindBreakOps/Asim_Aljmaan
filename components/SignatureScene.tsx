"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkOverlay from "./overlays/WorkOverlay";
import AboutOverlay from "./overlays/AboutOverlay";
import ContactOverlay from "./overlays/ContactOverlay";
import ProjectOverlay from "./overlays/ProjectOverlay";
import SkillsOverlay from "./overlays/SkillsOverlay";
import EducationOverlay from "./overlays/EducationOverlay";

export type SceneType = "none" | "work" | "about" | "contact" | "skills" | "education" | "projects";

interface SignatureSceneProps {
  activeScene: SceneType;
  setActiveScene: (scene: SceneType) => void;
}

export default function SignatureScene({ activeScene, setActiveScene }: SignatureSceneProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isLampOn, setIsLampOn] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Office Ambience Fallback
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.1;

    const hintTimer = setTimeout(() => setShowHint(false), 8000);
    return () => {
      clearTimeout(hintTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) audioRef.current.play().catch(() => {});
      else audioRef.current.pause();
      setIsMuted(!isMuted);
    }
  };

  const handleInteraction = (scene: SceneType) => {
    setActiveScene(scene);
    setShowHint(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      <motion.div
        animate={{
          scale: activeScene === "none" ? 1 : 1.05,
          filter: activeScene === "none"
            ? `blur(0px) brightness(${isLampOn ? 1 : 0.15}) saturate(${isLampOn ? 1 : 0.3}) contrast(${isLampOn ? 1 : 1.1})`
            : "blur(25px) brightness(0.1)"
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/scene-hub.jpg"
          alt="Digital Signature Scene"
          className="w-full h-full object-cover pointer-events-none"
        />

        {isLampOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
                background: "radial-gradient(circle at 12% 40%, rgba(201, 168, 76, 0.2) 0%, transparent 45%)"
            }}
          />
        )}

        {activeScene === "none" && (
          <div className="absolute inset-0 z-10">
            <Hotspot
              top="18%" left="33%" width="26%" height="24%"
              label="Interactive Hub"
              onClick={() => handleInteraction("projects")}
              pulse={showHint}
            />

            <Hotspot
              top="22%" left="64%" width="15%" height="28%"
              label="Academic Path"
              onClick={() => handleInteraction("education")}
            />

            <Hotspot
              top="55%" left="38%" width="12%" height="8%"
              label="Professional CV"
              onClick={() => handleInteraction("about")}
              pulse={showHint}
            />

            <Hotspot
              top="46%" left="53%" width="6%" height="9%"
              label="Inquiry Terminal"
              onClick={() => handleInteraction("contact")}
            />

            <Hotspot
              top="34%" left="7%" width="12%" height="42%"
              label={isLampOn ? "Switch Off" : "Switch On"}
              onClick={() => { setIsLampOn(!isLampOn); setShowHint(false); }}
              pulse={showHint}
            />
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {activeScene !== "none" && (
            <div className="fixed inset-0 z-[150] pointer-events-none">
                {activeScene === "about" && <AboutOverlay onClose={() => setActiveScene("none")} />}
                {activeScene === "contact" && <ContactOverlay onClose={() => setActiveScene("none")} />}
                {activeScene === "projects" && <ProjectOverlay onClose={() => setActiveScene("none")} />}
                {activeScene === "skills" && <SkillsOverlay onClose={() => setActiveScene("none")} />}
                {activeScene === "education" && <EducationOverlay onClose={() => setActiveScene("none")} />}
            </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeScene === "none" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-24 left-16 z-20 pointer-events-none"
          >
            <h1 className="font-display text-5xl md:text-7xl text-ivory font-light leading-tight tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Digital experiences<br />
              <span className="text-gold/90 drop-shadow-[0_2px_10px_rgba(201,168,76,0.3)] font-semibold">for operations that scale.</span>
            </h1>
            <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-16 bg-gold/50" />
                <span className="font-mono font-medium text-gold/60 text-[10px] tracking-[0.6em] uppercase">
                    EXPLORE THE WORKSPACE / 공간 탐색
                </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHint && activeScene === "none" && (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="fixed bottom-12 right-12 z-[200] bg-gold p-6 text-navy shadow-2xl max-w-xs pointer-events-auto"
            >
                <h4 className="font-display font-black text-xl mb-2 tracking-tighter uppercase">Interface Guide</h4>
                <p className="font-sans text-xs leading-relaxed font-bold uppercase tracking-tight opacity-70">
                    Interact with physical objects on the desk to navigate through the portfolio. Try clicking the Monitor or the Tablet.
                </p>
                <button
                    onClick={() => setShowHint(false)}
                    className="mt-6 font-mono text-[9px] font-black border-b-2 border-navy/20 pb-0.5 hover:border-navy transition-all uppercase"
                >
                    Dismiss Guide
                </button>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed left-8 top-8 z-[200]">
        <button
          onClick={toggleSound}
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
    </div>
  );
}

function Hotspot({ top, left, width, height, label, onClick, pulse }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      style={{ top, left, width, height }}
      className="absolute group z-10"
    >
      {pulse && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-2 border-gold rounded-full"
          />
      )}

      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 bg-gold/0 group-hover:bg-gold/10 transition-all duration-500 rounded-sm" />
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-90 group-hover:scale-100">
        <span className="font-mono text-[9px] font-bold text-gold tracking-[0.4em] uppercase whitespace-nowrap bg-black/90 px-4 py-2 backdrop-blur-md border border-gold/20 shadow-2xl">
          {label}
        </span>
      </div>
    </motion.button>
  );
}
