"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "./CloseButton";
import Backdrop from "./Backdrop";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutOverlay({ onClose }: { onClose: () => void }) {
  const { t, locale } = useLanguage();
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none p-4"
    >
      <Backdrop onClick={onClose} />
      <CloseButton onClick={onClose} />

      <div className="relative w-full max-w-6xl aspect-[4/3] flex items-center justify-center pointer-events-auto">

        {/* Main Binder Background */}
        <motion.div
            className="absolute inset-0 bg-[#121212] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-linen.png')" }}
        >
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-black/40 border-r border-white/5" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-black/40 border-l border-white/5" />
        </motion.div>

        {/* --- LAYER 1: Blue Folder (Base Summary) --- */}
        <motion.div
            layout
            className="absolute z-10 w-[70%] h-[80%] bg-[#2a3a4a] shadow-2xl p-12 overflow-hidden flex flex-col"
            style={{
                left: "10%", top: "10%",
                backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%, 5% 0%)"
            }}
        >
            <div className="mb-12 border-b border-white/10 pb-8 flex justify-between items-end">
                <div>
                    <div className="font-mono text-[10px] text-white/40 tracking-[0.5em] mb-4">ARCHIVE_DOSSIER / ASIM_AHMED</div>
                    <h2 className="font-display text-5xl font-black text-white tracking-tighter uppercase">{t("cv.name")}</h2>
                </div>
                <div className="text-right">
                    <img
                        src="/profile.jpg"
                        alt=""
                        className="w-24 aspect-[4/5] object-cover border-4 border-white shadow-xl rotate-3 grayscale contrast-125"
                    />
                </div>
            </div>

            <div className="grow space-y-8 max-w-2xl">
                <p className="font-sans text-xl leading-relaxed text-white/90 font-light border-l-4 border-gold pl-8">
                    {t("cv.summary.text")}
                </p>
                <div className="grid grid-cols-2 gap-8 font-mono text-[10px] uppercase text-white/40 tracking-widest pt-8 border-t border-white/5">
                    <div>LOCATION: RIYADH, KSA</div>
                    <div>STATUS: ACTIVE_OPERATIONS</div>
                </div>
            </div>
        </motion.div>

        {/* --- LAYER 2: Black Package Card (Experience) --- */}
        <motion.div
            layout
            onClick={() => setActiveCard(activeCard === "exp" ? null : "work")}
            animate={{
                x: activeCard === "work" ? "10%" : "45%",
                y: activeCard === "work" ? "0%" : "5%",
                zIndex: activeCard === "work" ? 50 : 20,
                scale: activeCard === "work" ? 1.05 : 1
            }}
            className="absolute w-[45%] h-[75%] bg-[#111] shadow-2xl p-10 border border-white/10 cursor-pointer group"
            style={{
                backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')"
            }}
        >
            <div className="flex justify-between items-center mb-12">
                <h3 className="font-display text-4xl text-white font-black tracking-tighter">PACKAGE</h3>
                <div className="font-mono text-[9px] text-gold tracking-widest">{t("cv.exp1.date")}</div>
            </div>

            <div className="font-mono text-[8px] text-white/20 tracking-[0.4em] mb-8 break-all">
                ********************************************************************************
            </div>

            <div className="space-y-12">
                <div>
                    <div className="font-mono text-[10px] text-gold uppercase mb-2">Systems Architect</div>
                    <div className="font-display text-xl text-white font-bold tracking-tight mb-4">OPERIX SOLUTIONS</div>
                    <p className="text-xs text-white/50 leading-relaxed italic">
                        {t("cv.exp1.desc")}
                    </p>
                </div>

                <div className="pt-8 border-t border-white/5">
                    <div className="font-mono text-[10px] text-white/30 uppercase mb-2 tracking-widest">Client: Link Expert</div>
                    <div className="font-display text-lg text-white font-bold tracking-tight mb-4">Majdoul Tower Ops</div>
                    <p className="text-[10px] text-white/40 leading-relaxed">
                        Transitioned from 10% to 100% operational presence within 60 days.
                    </p>
                </div>
            </div>

            <div className="absolute bottom-8 right-10">
                <span className="font-mono text-[9px] text-gold border-b border-gold/20 pb-1">VIEW_FULL_RECORD</span>
            </div>
        </motion.div>

        {/* --- LAYER 3: White FAQ Note (Education/Skills) --- */}
        <motion.div
            layout
            onClick={() => setActiveCard(activeCard === "edu" ? null : "edu")}
            animate={{
                x: activeCard === "edu" ? "-15%" : "55%",
                y: activeCard === "edu" ? "10%" : "40%",
                zIndex: activeCard === "edu" ? 50 : 30,
                scale: activeCard === "edu" ? 1.05 : 1
            }}
            className="absolute w-[40%] h-[60%] bg-[#fafaf5] shadow-2xl p-10 border border-black/5 cursor-pointer"
        >
            {/* Binder Clip */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-16 pointer-events-none z-50 overflow-visible">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#333]">
                    <path d="M10 20 H90 V80 H10 Z" fill="currentColor" />
                    <rect x="15" y="30" width="70" height="2" fill="white" opacity="0.2" />
                    <rect x="15" y="40" width="70" height="2" fill="white" opacity="0.2" />
                    {/* Clip handle */}
                    <path d="M50 20 C 50 5, 80 5, 80 20" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M50 80 C 50 95, 80 95, 80 80" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
            </div>

            <h3 className="font-display text-4xl text-navy font-black tracking-tighter mb-8 italic underline decoration-gold decoration-4 underline-offset-8">FAQ</h3>

            <div className="space-y-6">
                <div className="space-y-1">
                    <div className="font-mono text-[9px] text-navy/40 uppercase tracking-widest">Q: Academic foundation?</div>
                    <div className="font-sans text-xs font-bold text-navy">B.S. Information Systems (Honors) — 3.06 GPA</div>
                </div>
                <div className="space-y-1 pt-4 border-t border-navy/5">
                    <div className="font-mono text-[9px] text-navy/40 uppercase tracking-widest">Q: Technical capabilities?</div>
                    <div className="font-sans text-[10px] text-navy font-bold leading-tight">
                        Oracle SQL, Power BI, Python, Fullstack JS, ERP Architecture.
                    </div>
                </div>
                <div className="space-y-1 pt-4 border-t border-navy/5">
                    <div className="font-mono text-[9px] text-navy/40 uppercase tracking-widest">Q: Operational specialty?</div>
                    <div className="font-sans text-[10px] text-navy font-bold leading-tight uppercase tracking-tighter">
                        RECOVERY_PLANNING / PROCESS_OPTIMIZATION
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-8 flex justify-between items-end opacity-20 font-mono text-[8px] tracking-widest">
                <span>FORM_REF: EDU-2024</span>
                <span>COPYRIGHT_2026</span>
            </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
