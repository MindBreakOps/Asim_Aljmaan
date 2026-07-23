"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Skills() {
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
    <section id="skills" className="w-full py-40 px-6 bg-navy relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <h3 className="font-display font-bold text-lg text-gold mb-10 border-b border-gold/10 pb-6 tracking-[0.2em] uppercase">
                {cat.title}
              </h3>
              <ul className="space-y-6">
                {cat.items.map((item, j) => (
                  <li key={j} className="group flex items-center gap-4 cursor-default">
                    <div className="w-1.5 h-1.5 bg-gold/20 group-hover:bg-gold transition-colors" />
                    <span className="font-mono text-xs tracking-widest text-ivory/60 group-hover:text-ivory group-hover:translate-x-2 transition-all duration-300 uppercase">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
