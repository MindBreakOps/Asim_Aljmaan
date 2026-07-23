"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <section id="education" className="w-full py-40 px-6 bg-navy2 border-y border-gold/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">

          <div className="lg:w-1/3">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <div className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-6">04 — Foundation</div>
                <h2 className="font-display font-black text-6xl text-ivory tracking-tighter mb-8">
                    ACADEMIC<br />PATH
                </h2>
                <p className="font-sans text-sm text-ivory/40 leading-relaxed font-light">
                    An Information Systems foundation built on the intersection of management and technology.
                </p>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <EducationCard
                title="B.S. Information Systems"
                org="Bayan University · 2021 – 2025"
                desc="Operations-focused IS degree with 3.06 GPA. Graduation thesis focused on operational recovery using the OPERIX ecosystem."
                tags={["Riyadh", "3.06 GPA", "Graduate"]}
            />
            <EducationCard
                title="Applied Certifications"
                org="Continuous Development"
                desc="Focused on ERP Architecture, Operations Management, and Human Resource Information Systems."
                tags={["ERP", "Operations", "HRIS"]}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function EducationCard({ title, org, desc, tags }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-10 border border-gold/5 bg-navy3/20 hover:border-gold/20 transition-all duration-500"
    >
      <h3 className="font-display font-bold text-2xl text-ivory mb-2">{title}</h3>
      <div className="font-mono text-[10px] text-gold tracking-widest uppercase mb-8">{org}</div>
      <p className="font-sans text-xs text-ivory/50 leading-relaxed mb-8 font-light">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string) => (
          <span key={tag} className="px-2 py-1 bg-ivory/5 border border-ivory/10 text-ivory/40 font-mono text-[8px] tracking-widest uppercase">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
