"use client";
import React from "react";
import { motion } from "framer-motion";
import CloseButton from "./CloseButton";
import Backdrop from "./Backdrop";

export default function WorkOverlay({ onClose }: { onClose: () => void }) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-6 md:p-12 pointer-events-none"
    >
      <Backdrop onClick={onClose} />
      <CloseButton onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-6xl aspect-video bg-navy/90 border border-gold/20 backdrop-blur-3xl p-12 pointer-events-auto flex flex-col shadow-2xl z-10"
      >
        <div className="mb-12">
          <div className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-4">
            Project Hub / Operix Ecosystem
          </div>
          <h2 className="font-display text-5xl text-ivory tracking-tighter">
            9 MODULE ARCHITECTURE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-gold/10 grow">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-navy p-6 hover:bg-navy3 transition-colors flex flex-col"
            >
              <div className="font-mono text-[9px] text-gold/40 mb-4 uppercase">Module {mod.id}</div>
              <h3 className="font-display font-bold text-lg text-ivory mb-2">{mod.name}</h3>
              <p className="font-sans text-xs text-ivory/40 leading-relaxed">{mod.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-end border-t border-gold/10 pt-8">
            <p className="font-serif italic text-gold/60 max-w-sm text-sm">
                "One unified server. Real-time sync across all operational units."
            </p>
            <div className="font-mono text-[9px] text-ivory/20 tracking-widest uppercase">
                Asim Aljma'an · OPERIX architect
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
