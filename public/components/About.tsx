"use client";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="w-full py-40 px-6 bg-navy2 relative z-10 border-y border-gold/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left Column - Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-6 flex items-center gap-4">
                <span className="h-[1px] w-12 bg-gold/30"></span>
                01 — The Operator
              </div>
              <h2 className="font-display font-black text-6xl md:text-7xl text-ivory tracking-tighter mb-12">
                RECOVERING<br />OPERATIONS
              </h2>

              <div className="font-sans text-lg text-ivory/70 leading-relaxed space-y-8 font-light max-w-xl">
                <p>
                  I specialize in walking into broken environments and building self-sustaining systems that outlast my presence.
                  My background in Information Systems is coupled with a deep intuition for operational flow.
                </p>
                <p>
                  The <span className="text-gold italic font-serif">OPERIX Ecosystem</span> is a direct result of this philosophy—a 9-module infrastructure I architected to solve real-world operational gaps in Riyadh, connecting every department to a single source of truth.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-4">
              {[
                {
                  stat: "40+",
                  title: "Workforce Restored",
                  desc: "Scaled from 12 to 40+ active employees in 60 days."
                },
                {
                  stat: "100%",
                  title: "Digital Compliance",
                  desc: "Zero-baseline to full system adoption across all units."
                },
                {
                  stat: "4/5",
                  title: "Leadership Efficiency",
                  desc: "Supervisors trained to lead without daily oversight."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group p-8 border border-gold/5 bg-navy3/20 hover:bg-navy3/40 hover:border-gold/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-8">
                    <div className="font-display font-black text-5xl text-gold/80 group-hover:text-gold transition-colors">
                      {item.stat}
                    </div>
                    <div>
                      <h3 className="font-mono text-[10px] tracking-widest text-ivory uppercase mb-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-ivory/40 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
