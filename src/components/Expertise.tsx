"use client";

import { motion } from "framer-motion";
import { Server, Zap, Code, BarChart3 } from "lucide-react";

const skills = [
  {
    title: "Systems Architecture",
    description: "Designing scalable, resilient infrastructure for complex operations.",
    icon: Server,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Operations Recovery",
    description: "Restoring and optimizing failing environments into high-performance ecosystems.",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  },
  {
    title: "Full-Stack Development",
    description: "Building production-grade digital solutions with React, Python, and JS.",
    icon: Code,
    color: "text-green-400",
    bg: "bg-green-400/10"
  },
  {
    title: "Data Intelligence",
    description: "Transforming raw data into actionable insights with Oracle SQL and Power BI.",
    icon: BarChart3,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  }
];

export default function Expertise() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Expertise</h2>
        <div className="h-1 w-20 bg-cyan-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all group"
          >
            <div className={`w-12 h-12 rounded-lg ${skill.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <skill.icon className={`w-6 h-6 ${skill.color}`} />
            </div>
            <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
            <p className="text-neutral-400 leading-relaxed">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
