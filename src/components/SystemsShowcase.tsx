"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const projects = [
  { id: "fmis", name: "OPERIX FMIS", type: "Financial Ecosystem", desc: "A proprietary Financial Management Information System designed for real-time asset tracking and automated P&L reporting.", folder: "fmis", images: ["dash-fmis.png"] },
  { id: "hris", name: "OPERIX HRIS", type: "Workforce Architecture", desc: "Intelligent Human Resource Information System featuring AI scanning, automated payroll, and workforce pipelines.", folder: "hris", images: ["emp-pro-hris.png"] },
  { id: "ops", name: "OPERIX OPERATIONS", type: "Core Field Control", desc: "Real-time operational oversight integrating live camera feeds, ANPR, and executive performance analytics.", folder: "ops", images: ["exe-dash.png"] },
  { id: "care", name: "OPERIX CARE", type: "Health Information", desc: "A specialized Health Information System managing patient triage, clinic workflows, and pharmacy inventory.", folder: "care", images: ["doc-workspace-care.png"] },
  { id: "edu", name: "OPERIX EDU", type: "Education Management", desc: "A comprehensive educational platform for student life-cycle management and academic documentation.", folder: "edu", images: ["edu-dash.png"] }
];

const modules = [
  { id: "01", name: "HRIS", desc: "Workforce & Payroll" },
  { id: "02", name: "Operations", desc: "Core Field Control" },
  { id: "03", name: "FMIS", desc: "Financial Dashboards" },
  { id: "04", name: "IT Assets", desc: "Inventory & Tickets" },
  { id: "05", name: "Executive", desc: "C-Level Reporting" },
  { id: "06", name: "Planner", desc: "Kanban & Milestones" },
  { id: "07", name: "Fields", desc: "GPS Dispatch" },
  { id: "08", name: "Marketing", desc: "Lead Pipelines" },
  { id: "09", name: "Studio", desc: "Dev Automation" },
];

export default function SystemsShowcase() {
  const { locale, t } = useLanguage();
  const [index, setIndex] = useState(0);
  const current = projects[index];
  const isAr = locale === "ar";

  const next = () => setIndex((i) => (i + 1) % projects.length);
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <div className="w-full h-full bg-white/80 backdrop-blur-3xl p-8 md:p-16 overflow-y-auto custom-scrollbar text-black">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="flex flex-col">
                <div className="font-mono text-xs tracking-[0.6em] text-mac-blue font-black uppercase mb-4 shadow-text">
                    {isAr ? "أرشيف الأنظمة" : "ARCHIVE_PORTAL"}
                </div>
                <h2 className="font-display text-6xl md:text-8xl text-black tracking-tighter font-black uppercase">
                    {current.name}
                </h2>
            </div>

            <div className="flex items-center gap-6 pb-4">
                <button onClick={prev} className="size-14 rounded-full border border-black/10 hover:border-mac-blue hover:bg-mac-blue/5 transition-all flex items-center justify-center text-black active:scale-90">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <div className="font-mono text-xs text-black font-black tracking-[0.5em]">0{index + 1}</div>
                <button onClick={next} className="size-14 rounded-full border border-black/10 hover:border-mac-blue hover:bg-mac-blue/5 transition-all flex items-center justify-center text-black active:scale-90">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
            <div className={`lg:col-span-5 space-y-10 ${isAr ? "text-right" : "text-left"}`}>
                <div className="space-y-6">
                    <div className="font-mono text-[11px] text-[#004BB3] uppercase tracking-[0.4em] font-black">{current.type}</div>
                    <p className={`font-sans text-2xl md:text-3xl text-black/80 leading-tight font-light border-[#004BB3] pl-8 ${isAr ? "border-r-4 pl-0 pr-8" : "border-l-4"}`}>
                        {current.desc}
                    </p>
                </div>
                <div className="pt-10 border-t border-black/10 flex flex-wrap gap-3">
                    {["Oracle SQL", "Next.js", "Supabase"].map(t => (
                        <span key={t} className="px-3 py-1 bg-black/5 border border-black/10 text-[10px] font-mono text-black/60 uppercase tracking-widest font-black">{t}</span>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-7 aspect-[16/10] bg-black border border-black/10 rounded-xl overflow-hidden relative shadow-2xl">
                 <img
                    src={`/projects/${current.folder}/${current.images[0]}`}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    alt=""
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                 <div className="absolute bottom-6 left-8 font-mono text-[10px] text-white uppercase tracking-[0.5em] font-black">LINK_NODE_{current.id.toUpperCase()}_STABLE</div>
            </div>
        </div>

        <div className="border-t border-black/10 pt-20">
            <h3 className="font-display text-4xl text-black font-black mb-16 uppercase tracking-tighter">{t("projects.arch_map")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-black/5 border border-black/5">
              {modules.map((mod, i) => (
                <div key={i} className="bg-white p-10 hover:bg-black/5 transition-all group">
                   <div className="font-mono text-[10px] text-[#004BB3] mb-6 uppercase tracking-[0.2em] group-hover:text-mac-blue transition-colors font-black">MOD_{mod.id}</div>
                   <h4 className="text-xl font-bold text-black mb-3 group-hover:text-[#004BB3] transition-colors font-black uppercase tracking-tight">{mod.name}</h4>
                   <p className="text-xs text-black/60 group-hover:text-black transition-colors uppercase font-black tracking-tight">{mod.desc}</p>
                </div>
              ))}
            </div>
        </div>
    </div>
  );
}
