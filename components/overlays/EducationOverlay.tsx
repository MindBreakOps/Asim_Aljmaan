"use client";
import React from "react";
import { motion } from "framer-motion";
import CloseButton from "./CloseButton";
import Backdrop from "./Backdrop";

export default function EducationOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none"
    >
      <Backdrop onClick={onClose} />
      <CloseButton onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-navy/80 border border-gold/10 p-12 md:p-20 pointer-events-auto flex flex-col shadow-2xl backdrop-blur-3xl z-10">
        <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-6">
                Foundation / Academic Path
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-ivory tracking-tighter">
                EDUCATION
            </h2>
        </div>

        <div className="space-y-12">
            <div className="border-l-2 border-gold/40 pl-8 space-y-4">
                <div className="font-mono text-[10px] text-gold tracking-widest uppercase">Bayan University · 2021 – 2025</div>
                <h3 className="font-display text-3xl font-bold text-ivory tracking-tight">B.S. Information Systems</h3>
                <p className="font-sans text-base text-ivory/60 leading-relaxed font-light max-w-2xl">
                    Operations-focused IS degree with 3.06 GPA. Specialized in business systems, ERP theory, and operational process design.
                </p>
                <div className="flex gap-4 pt-4">
                    <span className="px-3 py-1 bg-gold/5 border border-gold/10 text-gold/60 font-mono text-[8px] tracking-widest uppercase">3.06 GPA</span>
                    <span className="px-3 py-1 bg-gold/5 border border-gold/10 text-gold/60 font-mono text-[8px] tracking-widest uppercase">IS Graduate</span>
                </div>
            </div>

            <div className="border-l-2 border-white/5 pl-8 space-y-4">
                <div className="font-mono text-[10px] text-ivory/20 tracking-widest uppercase">Applied Thesis</div>
                <h3 className="font-display text-xl font-bold text-ivory/80 tracking-tight">OPERIX Ecosystem Implementation</h3>
                <p className="font-sans text-sm text-ivory/40 leading-relaxed font-light max-w-xl">
                    Development and live deployment of a 9-module ERP system as a practical application of IS principles in Riyadh.
                </p>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
