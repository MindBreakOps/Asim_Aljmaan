"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "./CloseButton";
import Backdrop from "./Backdrop";
import { useLanguage } from "@/context/LanguageContext";

const projects = [
  {
    id: "fmis",
    name: "OPERIX FMIS",
    type: "Financial Ecosystem",
    desc: "A proprietary Financial Management Information System designed for real-time asset tracking and automated P&L reporting.",
    folder: "fmis",
    images: ["dash-fmis.png", "fmis-prod.png", "opx-ai-fmis.png"]
  },
  {
    id: "hris",
    name: "OPERIX HRIS",
    type: "Workforce Architecture",
    desc: "Intelligent Human Resource Information System featuring AI scanning, automated payroll, and workforce pipelines.",
    folder: "hris",
    images: ["emp-pro-hris.png", "ai-scanner-hris.png", "pipline-hris.png"]
  },
  {
    id: "ops",
    name: "OPERIX OPERATIONS",
    type: "Core Field Control",
    desc: "Real-time operational oversight integrating live camera feeds, ANPR, and executive performance analytics.",
    folder: "ops",
    images: ["exe-dash.png", "analyticsandreports-ops.png", "performance-ops.png"]
  },
  {
    id: "care",
    name: "OPERIX CARE",
    type: "Health Information",
    desc: "A specialized Health Information System managing patient triage, clinic workflows, and pharmacy inventory.",
    folder: "care",
    images: ["doc-workspace-care.png", "nurse-triage-quee-care.png", "patients-files-care.png"]
  },
  {
    id: "edu",
    name: "OPERIX EDU",
    type: "Education Management",
    desc: "A comprehensive educational platform for student life-cycle management and academic documentation.",
    folder: "edu",
    images: ["edu-dash.png", "edu-studs.png", "edu-fees.png"]
  }
];

export default function ProjectOverlay({ onClose }: { onClose: () => void }) {
  const { locale } = useLanguage();
  const [index, setIndex] = useState(0);
  const current = projects[index];

  const next = () => setIndex((i) => (i + 1) % projects.length);
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none"
    >
      <Backdrop onClick={onClose} />
      <CloseButton onClick={onClose} />

      <div className="relative w-full h-full max-w-[90vw] pointer-events-auto flex flex-col justify-center gap-12 overflow-hidden z-10">

        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.6em] text-gold font-bold uppercase mb-4 shadow-text">
                    {locale === "en" ? "Interactive Archive / System Showcase" : "أرشيف الأنظمة التفاعلي"}
                </div>
                <h2 className="font-display text-6xl md:text-8xl text-white tracking-tighter leading-none shadow-text font-black uppercase">
                    {current.name}
                </h2>
            </div>

            <div className="flex items-center gap-6 pb-2">
                <button onClick={prev} className="size-16 rounded-full border border-white/10 hover:border-gold transition-all flex items-center justify-center text-white group">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <div className="font-mono text-[10px] text-white/40 tracking-[0.5em]">0{index + 1} / 05</div>
                <button onClick={next} className="size-16 rounded-full border border-white/10 hover:border-gold transition-all flex items-center justify-center text-white group">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start h-[60vh]">
            {/* Main Info */}
            <div className="lg:col-span-4 space-y-12 flex flex-col h-full justify-center">
                <div className="space-y-4">
                    <div className="font-mono text-[9px] text-gold uppercase tracking-widest">{current.type}</div>
                    <p className="font-sans text-2xl text-white leading-relaxed font-light border-l-2 border-gold pl-8">
                        {current.desc}
                    </p>
                </div>

                <div className="pt-12 border-t border-white/5 space-y-4">
                    <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">Technology Stack</div>
                    <div className="flex flex-wrap gap-3">
                        {["Oracle SQL", "Next.js", "Supabase", "System Logic"].map(t => (
                            <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-white/60 uppercase tracking-widest">{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cinematic Gallery */}
            <div className="lg:col-span-8 relative h-full flex items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="grid grid-cols-2 gap-8 w-full"
                    >
                        <div className="col-span-2 aspect-[21/9] bg-black border border-white/10 shadow-2xl overflow-hidden group relative rounded-sm">
                            <img
                                src={`/projects/${current.folder}/${current.images[0]}`}
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-8 font-mono text-[10px] text-gold uppercase tracking-[0.5em]">Primary_Interface.cfg</div>
                        </div>
                        <div className="aspect-video bg-black border border-white/10 shadow-2xl overflow-hidden group relative rounded-sm">
                            <img
                                src={`/projects/${current.folder}/${current.images[1]}`}
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                            />
                        </div>
                        <div className="aspect-video bg-black border border-white/10 shadow-2xl overflow-hidden group relative rounded-sm">
                            <img
                                src={`/projects/${current.folder}/${current.images[2]}`}
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
