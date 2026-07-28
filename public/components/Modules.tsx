"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Modules() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="modules" ref={containerRef} className="w-full py-40 bg-navy2 relative z-10 overflow-hidden border-y border-gold/5">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-6 flex items-center gap-4">
                <span className="h-[1px] w-12 bg-gold/30"></span>
                03 — System Gallery
            </div>
            <h2 className="font-display font-black text-6xl md:text-7xl text-ivory tracking-tighter">
                THE MODULES
            </h2>
        </motion.div>
      </div>

      <div className="w-full overflow-x-auto pb-20 px-6 scrollbar-hide">
        <div className="flex gap-8 w-max px-4">
          <ModuleCard
            id="01"
            name="OPERIX HRIS"
            desc="Workforce management with GPS fencing and automated payroll."
            tags={["GPS", "Payroll", "Attendance"]}
            color="text-emerald-400"
          />
          <ModuleCard
            id="02"
            name="Operations"
            desc="Live operational oversight with integrated camera feeds."
            tags={["ANPR", "Valet", "Live Data"]}
            color="text-rose-400"
          />
          <ModuleCard
            id="03"
            name="Financial"
            desc="Asset tracking, expense management, and real-time P&L."
            tags={["Finance", "KPIs", "Assets"]}
            color="text-amber-400"
          />
          <ModuleCard
            id="04"
            name="IT Assets"
            desc="Full infrastructure registry and internal ticketing system."
            tags={["Inventory", "Tickets", "ITSM"]}
            color="text-blue-400"
          />
          <ModuleCard
            id="05"
            name="Executive"
            desc="High-level dashboards and automated board-ready reporting."
            tags={["C-Level", "Dashboards", "PDF"]}
            color="text-gold"
          />
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ id, name, desc, tags, color }: any) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="w-[450px] bg-navy border border-gold/5 hover:border-gold/30 transition-all duration-500 p-10 group"
      data-interactive
    >
      <div className="flex items-center justify-between mb-12">
        <span className="font-mono text-[10px] text-gold tracking-widest">MODULE {id}</span>
        <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')} animate-pulse`} />
      </div>

      <h3 className="font-display font-bold text-3xl text-ivory mb-6 tracking-wide group-hover:text-gold transition-colors">{name}</h3>
      <p className="font-sans text-sm text-ivory/50 mb-12 leading-relaxed font-light min-h-[60px]">{desc}</p>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag: string) => (
          <span key={tag} className="px-3 py-1 bg-gold/5 text-gold/60 font-mono text-[9px] tracking-widest uppercase border border-gold/10">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
