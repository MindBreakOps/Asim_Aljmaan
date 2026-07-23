"use client";
import React from "react";
import { motion } from "framer-motion";
import CloseButton from "./CloseButton";
import Backdrop from "./Backdrop";

export default function SkillsOverlay({ onClose }: { onClose: () => void }) {
  const categories = [
    {
      title: "ERP & Systems",
      items: ["OPERIX Architecture", "HRIS Design", "ANPR / IoT Integration", "Financial Flow Design"]
    },
    {
      title: "Development",
      items: ["React / Next.js", "Supabase / PostgreSQL", "Oracle SQL", "Power BI Analytics"]
    },
    {
      title: "Operations",
      items: ["Operational Recovery", "Workforce Scaling", "SOP Development", "Team Leadership"]
    },
    {
      title: "Tools",
      items: ["Figma Prototyping", "GitHub / Git", "Azure Devops", "Project Management"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none"
    >
      <Backdrop onClick={onClose} />
      <CloseButton onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-navy/80 border border-gold/10 p-12 md:p-20 pointer-events-auto flex flex-col shadow-2xl backdrop-blur-3xl z-10">
        <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-6">
                Technical Matrix / Skillset
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-ivory tracking-tighter">
                CAPABILITIES
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="font-display font-bold text-lg text-gold mb-8 border-b border-gold/10 pb-4 tracking-widest uppercase">
                {cat.title}
              </h3>
              <ul className="space-y-6">
                {cat.items.map((item, j) => (
                  <li key={j} className="group flex items-center gap-4 cursor-default">
                    <div className="w-1 h-1 bg-gold/20 group-hover:bg-gold transition-colors" />
                    <span className="font-mono text-[10px] tracking-widest text-ivory/60 group-hover:text-ivory group-hover:translate-x-2 transition-all duration-300 uppercase">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
