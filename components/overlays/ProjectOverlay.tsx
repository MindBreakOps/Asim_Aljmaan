"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "./CloseButton";
import Backdrop from "./Backdrop";

const projects = [
  {
    id: "fmis",
    name: "OPERIX FMIS",
    desc: "Financial Management Information System. Real-time assets, expenses, and automated P&L reporting.",
    folder: "fmis",
    images: ["dash-fmis.png", "fmis-prod.png", "opx-ai-fmis.png", "fmis-pos.png"]
  },
  {
    id: "hris",
    name: "OPERIX HRIS",
    desc: "Human Resource Information System. AI-powered scanning, workforce pipeline, and visa management.",
    folder: "hris",
    images: ["emp-pro-hris.png", "ai-scanner-hris.png", "pipline-hris.png", "visa-mgm-hris.png"]
  },
  {
    id: "ops",
    name: "OPERIX OPERATIONS",
    desc: "Core operational control. Performance analytics, facility training, and executive dashboards.",
    folder: "ops",
    images: ["exe-dash.png", "analyticsandreports-ops.png", "performance-ops.png", "it-ops.png"]
  },
  {
    id: "care",
    name: "OPERIX CARE",
    desc: "Health Information System. Comprehensive patient management, triage queuing, and lab integration.",
    folder: "care",
    images: ["doc-workspace-care.png", "nurse-triage-quee-care.png", "patients-files-care.png", "lab-path-care.png"]
  },
  {
    id: "edu",
    name: "OPERIX EDU",
    desc: "Educational Management System. Student tracking, fee management, and academic documentation.",
    folder: "edu",
    images: ["edu-dash.png", "edu-studs.png", "edu-fees.png", "edu-dox.png"]
  }
];

export default function ProjectOverlay({ onClose }: { onClose: () => void }) {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none"
    >
      <Backdrop onClick={onClose} />
      <CloseButton onClick={onClose} />

      <div className="relative w-full h-full max-w-7xl flex flex-col pointer-events-auto p-8 md:p-24 overflow-hidden z-10">
        <div className="mb-12">
            <div className="font-mono text-[10px] tracking-[0.6em] text-gold font-bold uppercase mb-4 shadow-text">
                System Hub / Interactive Archive
            </div>
            <h2 className="font-display text-7xl md:text-8xl text-white tracking-tighter leading-none shadow-text font-black">
                THE SYSTEMS
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 grow overflow-hidden">
            {/* Project List */}
            <div className="lg:col-span-4 flex flex-col gap-3 overflow-y-auto pr-4 scrollbar-hide">
                {projects.map((proj) => (
                    <button
                        key={proj.id}
                        onClick={() => setSelectedProject(proj)}
                        className={`group p-8 text-left border-l-4 transition-all duration-500 backdrop-blur-md ${
                            selectedProject.id === proj.id
                            ? "bg-gold text-navy border-gold translate-x-4 shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                            : "bg-navy/40 text-ivory/60 border-white/5 hover:border-gold/30 hover:text-white"
                        }`}
                    >
                        <div className={`font-mono text-[9px] uppercase tracking-widest mb-1 ${selectedProject.id === proj.id ? "text-navy/60" : "text-gold/40"}`}>
                            Code: OPX-{proj.id.toUpperCase()}
                        </div>
                        <h3 className="font-display text-2xl font-black tracking-tight">{proj.name}</h3>
                    </button>
                ))}
            </div>

            {/* Project Display */}
            <div className="lg:col-span-8 relative bg-navy/60 border border-white/10 p-12 flex flex-col gap-12 overflow-y-auto scrollbar-hide backdrop-blur-xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedProject.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-12"
                    >
                        <p className="font-sans text-2xl text-white/90 leading-relaxed font-medium border-l-4 border-gold pl-8">
                            {selectedProject.desc}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {selectedProject.images.map((img, i) => (
                                <div key={i} className="aspect-video bg-black border border-white/10 group overflow-hidden relative rounded-sm shadow-2xl">
                                    <img
                                        src={`/projects/${selectedProject.folder}/${img}`}
                                        alt={selectedProject.name}
                                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.opacity = '0';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all bg-gold text-navy px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest translate-y-2 group-hover:translate-y-0">
                                        Data_Frame_{i+1}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-white/10 flex justify-between items-center">
                            <div className="font-mono text-[10px] text-gold font-bold uppercase tracking-[0.4em]">Proprietary Architecture · Riyadh HQ</div>
                            <div className="flex gap-3">
                                <div className="size-2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
                                <div className="size-2 rounded-full bg-gold/20" />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
