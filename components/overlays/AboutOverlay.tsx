"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "./CloseButton";
import Backdrop from "./Backdrop";

export default function AboutOverlay({ onClose }: { onClose: () => void }) {
  const [page, setPage] = useState(1);

  const pages = [
    { id: 1, label: "SUMMARY" },
    { id: 2, label: "EXPERIENCE" },
    { id: 3, label: "FOUNDATION" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-6 pointer-events-none"
    >
      <Backdrop onClick={onClose} />
      <CloseButton onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, rotateY: -10, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        exit={{ scale: 0.9, rotateY: 10, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl h-[85vh] bg-[#fdfdfb] text-navy pointer-events-auto flex shadow-[0_50px_100px_rgba(0,0,0,0.4)] rounded-sm overflow-hidden z-10"
        style={{ perspective: "1500px" }}
      >
        {/* Book Left Margin Decor */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-[#1a1a1a] border-r border-white/5 flex flex-col items-center py-12 gap-8 z-30 shadow-2xl">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="size-2 rounded-full bg-white/5 ring-1 ring-white/10" />
            ))}
        </div>

        {/* The Pages Container */}
        <div className="flex w-full h-full relative ml-16 overflow-hidden">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-40 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            {/* Spine shadow effect */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/10 to-transparent z-20 pointer-events-none" />

            <div className="flex w-full h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={page}
                        initial={{ rotateY: 45, opacity: 0, originX: "left" }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -45, opacity: 0, originX: "left" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full"
                    >
                        {page === 1 && <Page1 />}
                        {page === 2 && <Page2 />}
                        {page === 3 && <Page3 />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Physical Side Tabs (Right Edge) */}
            <div className="absolute right-0 top-24 bottom-24 w-12 flex flex-col gap-1 z-30">
                {pages.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setPage(p.id)}
                        className={`group relative h-32 w-full transition-all duration-500 origin-right flex items-center justify-center ${
                            page === p.id
                            ? "bg-gold text-navy -translate-x-2 shadow-[-4px_0_15px_rgba(201,168,76,0.3)]"
                            : "bg-navy/5 text-navy/40 hover:bg-navy/10 hover:-translate-x-1"
                        }`}
                    >
                        <span className="font-mono text-[9px] font-black tracking-widest vertical-text uppercase">
                            {p.label}
                        </span>
                        {/* Tab shadow */}
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10" />
                    </button>
                ))}
            </div>
        </div>

        {/* Footer controls */}
        <div className="absolute bottom-8 right-24 flex items-center gap-12 z-30">
            <button
                onClick={() => setPage(p => Math.max(p-1, 1))}
                className={`font-mono text-[9px] font-bold tracking-[0.4em] uppercase transition-all ${page === 1 ? "opacity-0" : "opacity-30 hover:opacity-100"}`}
            >
                ← TURN BACK
            </button>
            <div className="font-mono text-[9px] font-black text-navy/10 tracking-[1em]">
                {page} / 3
            </div>
            <button
                onClick={() => setPage(p => Math.min(p+1, 3))}
                className={`font-mono text-[9px] font-bold tracking-[0.4em] uppercase transition-all ${page === 3 ? "opacity-0" : "opacity-30 hover:opacity-100"}`}
            >
                TURN PAGE →
            </button>
        </div>

        <style jsx>{`
            .vertical-text {
                writing-mode: vertical-rl;
                text-orientation: mixed;
                transform: rotate(180deg);
            }
        `}</style>
      </motion.div>
    </motion.div>
  );
}

function Page1() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 w-full h-full p-12 md:p-24 gap-16 overflow-y-auto scrollbar-hide">
            <div className="md:col-span-5 flex flex-col">
                {/* Profile Photo - Pinned aesthetic */}
                <div className="relative w-full aspect-[4/5] bg-[#eee] border-8 border-white shadow-xl mb-12 transform -rotate-2 hover:rotate-0 transition-transform duration-700">
                    <div className="absolute inset-0 bg-navy/5 mix-blend-multiply" />
                    <img
                        src="/profile.jpg"
                        alt="Asim Ahmed"
                        className="w-full h-full object-cover grayscale contrast-110"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {/* Placeholder text if image missing */}
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-navy/20 p-8 text-center">
                        [PHOTO_PINNED_HERE]<br />Ref: Asim_Ahmed_Portrait
                    </div>
                    {/* Tape effect */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 backdrop-blur-sm border border-black/5 rotate-3" />
                </div>

                <div className="space-y-2 mt-auto">
                    <div className="font-mono text-[9px] tracking-widest text-gold font-bold uppercase">Identification</div>
                    <h2 className="font-display text-4xl font-black text-navy leading-none tracking-tighter">ASIM AHMED</h2>
                </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-center gap-12">
                <div className="space-y-4">
                    <div className="font-mono text-[9px] tracking-[0.4em] text-navy/30 uppercase">Dossier / Summary</div>
                    <p className="font-sans text-xl leading-relaxed text-navy font-light border-l-2 border-gold pl-8">
                        Dynamic Systems Developer and Operations Manager with a Bachelor of Honors in Information Systems.
                        Adept at leveraging technical proficiency in system architecture to build scalable, user-centric tools.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 font-mono text-[9px] uppercase tracking-widest text-navy/60">
                    <div className="space-y-3">
                        <div className="text-gold font-black">Location</div>
                        <div>Riyadh, Saudi Arabia</div>
                        <div className="text-navy/20">Valid Iqama</div>
                    </div>
                    <div className="space-y-3">
                        <div className="text-gold font-black">Connectivity</div>
                        <div>asim.aljmaan@gmail.com</div>
                        <div>+966 500 823 643</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Page2() {
    return (
        <div className="w-full h-full p-12 md:p-24 flex flex-col overflow-y-auto scrollbar-hide">
            <div className="mb-16 border-b border-navy/5 pb-8">
                <div className="font-mono text-[9px] tracking-[0.5em] text-navy/30 uppercase mb-4">Professional Record / Experience</div>
                <h3 className="font-display text-4xl font-black text-navy tracking-tighter">THE TIMELINE</h3>
            </div>

            <div className="space-y-16">
                <div className="relative pl-12 border-l-2 border-gold/40">
                    <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-gold border-4 border-white shadow-lg" />
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="font-display font-bold text-2xl uppercase tracking-tight text-navy">Systems Developer & Ops Manager</h4>
                            <div className="font-mono text-[11px] text-gold font-black uppercase mt-1 tracking-widest">OPERIX SOLUTIONS</div>
                        </div>
                        <span className="font-mono text-[10px] bg-navy/5 px-2 py-1 text-navy/40">03/2026 – PRESENT</span>
                    </div>
                    <p className="text-sm font-light text-navy/80 leading-relaxed max-w-2xl">
                        Architected, developed, and deployed the comprehensive OPERIX Solutions ERP ecosystem from the ground up, functioning as both lead technical architect and operational head.
                    </p>
                </div>

                <div className="relative pl-12 border-l-2 border-navy/5">
                    <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-navy/20 border-4 border-white shadow-lg" />
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="font-display font-bold text-2xl uppercase tracking-tight text-navy">Deputy Operations Manager</h4>
                            <div className="font-mono text-[11px] text-navy/40 font-black uppercase mt-1 tracking-widest">LINK EXPERT — MAJDOUL TOWER</div>
                        </div>
                        <span className="font-mono text-[10px] bg-navy/5 px-2 py-1 text-navy/40">08/2025 – 02/2026</span>
                    </div>
                    <p className="text-sm font-light text-navy/80 leading-relaxed max-w-2xl">
                        Managed mission-critical operations for a high-profile Riyadh project. Rescued staffing and performance issues, restoring client satisfaction within 60 days.
                    </p>
                </div>
            </div>
        </div>
    );
}

function Page3() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full p-12 md:p-24 gap-20 overflow-y-auto scrollbar-hide">
            <div className="flex flex-col gap-12">
                <section>
                    <div className="font-mono text-[9px] tracking-[0.4em] text-navy/30 uppercase mb-8">Academic Foundation</div>
                    <div className="space-y-4">
                        <h4 className="font-display font-bold text-2xl text-navy leading-tight">B.S. Information Systems (Honors)</h4>
                        <p className="font-mono text-[10px] text-navy/40 uppercase">Bayan University of Science · 2019 – 2024</p>
                        <div className="pt-6 flex gap-6">
                            <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-gold uppercase mb-1">GPA</span>
                                <span className="font-display text-3xl font-black text-navy">3.06 <span className="text-sm text-navy/20">/ 4.00</span></span>
                            </div>
                            <div className="flex flex-col border-l border-navy/10 pl-6">
                                <span className="font-mono text-[10px] text-navy/20 uppercase mb-1">Status</span>
                                <span className="font-mono text-xs font-black text-navy/60 mt-1">VERY GOOD</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-navy/5 p-8 border-l-4 border-gold shadow-sm">
                    <div className="font-mono text-[10px] text-gold font-black uppercase mb-6 tracking-widest">Languages</div>
                    <div className="space-y-4">
                        <div className="flex justify-between font-display text-sm font-bold">
                            <span>ARABIC</span>
                            <span className="text-gold tracking-widest">NATIVE</span>
                        </div>
                        <div className="flex justify-between font-display text-sm font-bold opacity-40">
                            <span>ENGLISH</span>
                            <span className="tracking-widest">ADVANCED</span>
                        </div>
                    </div>
                </section>
            </div>

            <div className="flex flex-col">
                <div className="font-mono text-[9px] tracking-[0.4em] text-navy/30 uppercase mb-12 text-right">Technical Matrix</div>
                <div className="space-y-12">
                    <div>
                        <h4 className="font-mono text-[10px] font-black uppercase tracking-widest text-gold mb-6 border-b border-navy/5 pb-2">Ops & Management</h4>
                        <ul className="space-y-3 text-xs font-light text-navy/80">
                            <li>• Operations Planning & Control</li>
                            <li>• Process Improvement & Audit</li>
                            <li>• Client Relations & Resolution</li>
                            <li>• Workforce Scaling & Scaling</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] font-black uppercase tracking-widest text-gold mb-6 border-b border-navy/5 pb-2">Systems & Analytics</h4>
                        <ul className="space-y-3 text-xs font-light text-navy/80">
                            <li>• Oracle Database & SQL</li>
                            <li>• Fullstack (JS, React, Python)</li>
                            <li>• Power BI Data Visualization</li>
                            <li>• ERP Architecture Design</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
