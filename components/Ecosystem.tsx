"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Ecosystem() {
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
    <section id="operix" className="w-full py-40 px-6 bg-navy relative z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-6"
          >
            02 — Platform Architecture
          </motion.div>
          <h2 className="font-display font-black text-6xl md:text-7xl text-ivory tracking-tighter mb-8">
            THE OPERIX ECOSYSTEM
          </h2>
          <p className="font-serif italic text-xl text-ivory/50 max-w-2xl mx-auto">
            9 Specialized Modules · 1 Unified Server · Built from the ground up for Riyadh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((module, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`p-10 border border-gold/10 flex flex-col items-center text-center transition-all duration-500 hover:border-gold/40 hover:bg-navy3/30 group ${
                i === 4 ? "md:scale-110 md:bg-navy3/50 md:border-gold/30 md:z-20" : ""
              }`}
            >
              {i === 4 ? (
                /* Central Server Icon */
                <div className="relative mb-8">
                    <svg viewBox="0 0 100 100" className="w-16 h-16 animate-spin-slow text-gold">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 4" />
                        <circle cx="50" cy="50" r="5" fill="currentColor" />
                    </svg>
                    <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full" />
                </div>
              ) : (
                <div className="font-mono text-[10px] text-gold/40 mb-6 tracking-widest group-hover:text-gold transition-colors">
                  MOD — {module.id}
                </div>
              )}

              <h3 className="font-display font-bold text-xl text-ivory mb-2 tracking-wide group-hover:text-gold transition-colors">
                {i === 4 ? "CENTRAL HUB" : module.name}
              </h3>
              <p className="font-sans text-xs text-ivory/40 leading-relaxed max-w-[150px]">
                {i === 4 ? "Unified synchronization and analytics across all modules." : module.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
