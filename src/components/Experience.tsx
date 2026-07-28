"use client";

import { motion } from "framer-motion";

const history = [
  {
    date: "08/2025 – 02/2026",
    role: "Deputy Operations Manager",
    company: "LINK Expert – Burj Majdul Project",
    highlights: [
      "Workforce Recovery: 10% → 100% operational capacity in 60 days.",
      "Digital Transformation: Digitized attendance and asset tracking systems.",
      "Client Trust: Rebuilt client confidence through data-driven reporting."
    ]
  },
  {
    date: "07/2020 – PRESENT",
    role: "Systems Developer & Operations Manager",
    company: "OPERIX Solutions",
    highlights: [
      "Developed and deployed the comprehensive OPERIX Solutions ERP from scratch.",
      "Lead systems developer and operations manager simultaneously.",
      "Pivoted from operations management to integrated systems development."
    ]
  }
];

export default function Experience() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Professional History</h2>
        <div className="h-1 w-20 bg-cyan-500" />
      </div>

      <div className="space-y-12 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-neutral-800 ml-4 pl-8">
        {history.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-black" />
            <span className="text-sm font-mono text-cyan-500 mb-2 block">{item.date}</span>
            <h3 className="text-2xl font-bold mb-1">{item.role}</h3>
            <p className="text-neutral-400 mb-6">{item.company}</p>

            <ul className="space-y-4">
              {item.highlights.map((highlight, hIndex) => (
                <li key={hIndex} className="flex items-start gap-3 text-neutral-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-2" />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
