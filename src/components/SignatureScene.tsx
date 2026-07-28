"use client";
import React, { useState, useEffect, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
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
  const { locale } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const [isLampOn, setIsLampOn] = useState(true);

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
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none flex items-center justify-center">

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
    </div>
  );
}
