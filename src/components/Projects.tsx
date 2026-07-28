"use client";

import { motion } from "framer-motion";
import { ExternalLink, Database, Cpu, Layout } from "lucide-react";

export default function Projects() {
  return (
    <section className="py-24 px-6 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Flagship Project</h2>
          <p className="text-neutral-400 font-mono tracking-widest uppercase text-sm">OPERIX Ecosystem</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase">
                  9 Modules
                </div>
                <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase">
                  1 Unified Server
                </div>
              </div>
              <h3 className="text-4xl font-bold mb-6">OPERIX ERP Architecture</h3>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                Built from the ground up for the Riyadh market, this ecosystem provides end-to-end operational coverage from Finance to Education. Anchored by a unified server architecture for maximum efficiency and scalability.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-cyan-500 mt-1" />
                  <div>
                    <p className="font-bold">FMIS / HRIS</p>
                    <p className="text-sm text-neutral-500">Financial & Human Resources</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Layout className="w-5 h-5 text-cyan-500 mt-1" />
                  <div>
                    <p className="font-bold">Ops / Care</p>
                    <p className="text-sm text-neutral-500">Operations & Client Services</p>
                  </div>
                </div>
              </div>

              <a
                href="https://founder.operix-solutions.online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
              >
                View Live System <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="relative aspect-square lg:aspect-video rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden">
               {/* This would ideally be a 3D model or a cinematic screenshot */}
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
               <Cpu className="w-32 h-32 text-neutral-800 animate-pulse" />
               <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/5">
                 <p className="text-xs font-mono text-cyan-400 mb-1">Architecture Node 01</p>
                 <div className="h-1 bg-neutral-800 w-full rounded-full overflow-hidden">
                   <motion.div
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-full bg-cyan-500"
                   />
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
