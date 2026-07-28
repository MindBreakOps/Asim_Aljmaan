"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const files = [
  { id: "cv", name: "Asim_Ahmed_CV.pdf", icon: "/preview.jpeg", type: "PDF Document" },
  { id: "majdoul", name: "Majdoul_Tower.webloc", icon: "/safari.jpeg", type: "Safari Link" },
  { id: "operix", name: "OPERIX_Ecosystem.app", icon: "/appstore.jpeg", type: "Application" },
  { id: "archive", name: "Dossier_Archive", icon: "/folder.jpeg", type: "Folder" },
];

export default function ExperienceDossier() {
  const { t, locale } = useLanguage();
  const [openFile, setOpenFile] = useState<string | null>(null);
  const constraintsRef = useRef(null);
  const isAr = locale === "ar";

  return (
    <div className="w-full h-full p-12 flex flex-col relative" ref={constraintsRef}>

      {/* DESKTOP ICONS */}
      <div className={`grid grid-cols-1 md:grid-cols-1 gap-12 w-fit ${isAr ? "mr-auto" : "ml-auto"}`}>
        {files.map((file, i) => (
          <motion.div
            key={file.id}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
                if (window.innerWidth < 768) setOpenFile(file.id);
            }}
            onDoubleClick={() => setOpenFile(file.id)}
            className="flex flex-col items-center gap-2 cursor-pointer w-24 group select-none"
          >
            <div className="size-16 flex items-center justify-center transition-all">
              <img src={file.icon} className="w-full h-full object-contain drop-shadow-xl" alt="" />
            </div>
            <span className="text-[10px] font-black text-center text-black bg-white/40 px-2 py-0.5 rounded-sm backdrop-blur-md border border-white/5 uppercase tracking-wider">
              {file.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* OPENED WINDOW */}
      <AnimatePresence>
        {openFile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-4xl h-[70vh] os-window z-[100] flex flex-col pointer-events-auto"
          >
            {/* Title Bar */}
            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <button onClick={() => setOpenFile(null)} className="size-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                <div className="size-3 rounded-full bg-yellow-500 opacity-50" />
                <div className="size-3 rounded-full bg-green-500 opacity-50" />
              </div>
              <span className="font-mono text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">
                {openFile === "cv" ? t("nav.cv") :
                 openFile === "operix" ? "OPERIX_SYS" :
                 openFile === "majdoul" ? "MAJDOUL_OPS" :
                 "ARCHIVE"} // v1.0
              </span>
              <div className="w-12" />
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                {openFile === "cv" && (
                    <div className="w-full h-full flex flex-col gap-10">
                         <div className={`flex justify-between items-start ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                            <div className={isAr ? "text-right" : "text-left"}>
                                <h2 className="text-6xl font-black mb-4 tracking-tighter shadow-text">{t("cv.name")}</h2>
                                <div className="flex items-center gap-3">
                                    <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-gold font-mono text-xs uppercase tracking-widest font-black">Systems Architect // Operations Recovery</p>
                                </div>
                            </div>
                            <img src="/profile.jpg" alt="" className="size-40 rounded-xl object-cover border-4 border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'; }} />
                         </div>

                         <div className={`p-10 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group ${isAr ? "text-right" : "text-left"}`}>
                            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 uppercase tracking-widest">Dossier_Summary_Alpha</div>
                            <p className={`text-3xl font-light leading-snug text-white/90 border-gold ${isAr ? "border-r-4 pr-10" : "border-l-4 pl-10"}`}>
                                {t("cv.summary.text")}
                            </p>
                         </div>

                         <div className="grid grid-cols-2 gap-12 text-[11px] font-mono text-white/40 uppercase tracking-[0.3em] pt-12 border-t border-white/10 font-bold">
                            <div className="flex flex-col gap-2">
                                <span className="text-white/20">LOCATION:</span>
                                <span className="text-white/80">RIYADH_KSA</span>
                            </div>
                            <div className={`flex flex-col gap-2 ${isAr ? "text-left items-start" : "text-right items-end"}`}>
                                <span className="text-white/20">STATUS:</span>
                                <span className="text-gold">ONLINE_ACTIVE</span>
                            </div>
                         </div>
                    </div>
                )}

                {openFile === "operix" && (
                    <div className="space-y-12">
                        <div className="flex justify-between items-end">
                            <div>
                                <h2 className="text-6xl font-black text-gold tracking-tighter shadow-text">OPERIX SOLUTIONS</h2>
                                <div className="font-mono text-xs text-white/40 mt-4 uppercase tracking-[0.4em] font-bold">ESTABLISHED // 2020</div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-black text-white/20 uppercase tracking-tighter leading-none">ALPHA_SYS</div>
                                <div className="text-gold font-mono text-[10px] mt-2">v2.4.0.88</div>
                            </div>
                        </div>

                        <p className="text-3xl leading-snug italic text-white/80 font-light border-l-4 border-gold/40 pl-10 max-w-4xl">
                            {t("cv.exp1.desc")}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-white/5 p-10 border border-white/10 rounded-xl">
                                <h4 className="font-display text-xs font-black text-white/40 mb-10 tracking-[0.5em] uppercase">SYSTEMS_INTEGRATED</h4>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    {["HRIS", "FMIS", "OPS", "CARE", "EDU", "PLANNER"].map(m => (
                                        <div key={m} className="flex items-center gap-4 group">
                                            <div className="size-1.5 bg-gold/40 group-hover:bg-gold rounded-full transition-colors" />
                                            <div className="text-[11px] font-mono text-white/60 group-hover:text-white transition-colors uppercase tracking-widest font-black">NODE_{m}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gold/5 p-10 border border-gold/20 rounded-xl flex flex-col justify-center items-center gap-6">
                                <div className="text-center">
                                    <div className="text-6xl font-black text-gold leading-none">100%</div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 mt-4 font-black">Operational_Presence</p>
                                </div>
                                <div className="h-px w-24 bg-gold/20" />
                                <div className="text-center">
                                    <span className="text-[10px] font-mono text-white/20 uppercase font-black tracking-widest">Client: Link Expert</span>
                                    <p className="text-xs text-white/60 font-bold uppercase tracking-tight mt-1">Majdoul Tower Recovery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {openFile === "majdoul" && (
                    <div className="w-full h-full flex flex-col gap-8">
                        <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg border border-white/10">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">🧭</span>
                                <span className="font-mono text-xs text-white/60">https://majdoul.sa/en/home/</span>
                            </div>
                            <a href="https://majdoul.sa/en/home/" target="_blank" className="text-gold font-black text-[10px] uppercase border border-gold/20 px-3 py-1 rounded hover:bg-gold/10 transition-all">Open In New Tab</a>
                        </div>
                        <iframe
                            src="https://majdoul.sa/en/home/"
                            className="w-full flex-1 rounded-sm border border-white/10 bg-white"
                            title="Majdoul Tower"
                        />
                    </div>
                )}

                {openFile === "archive" && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {["logs.txt", "architecture_final.vsdx", "db_schema.sql", "ops_manual.pdf"].map(item => (
                            <div key={item} className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                                <div className="text-4xl">📄</div>
                                <span className="text-[9px] font-mono uppercase">{item}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-white/5 border-t border-white/10 px-4 flex items-center justify-between font-mono text-[8px] text-white/20">
                <span>4 OBJECTS // 2.4 GB</span>
                <span>SYSTEM_ENCODED_AES_256</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE INSTRUCTION */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none md:hidden">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em]">Touch to interact with dossier files</p>
      </div>
    </div>
  );
}
