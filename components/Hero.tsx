"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-svh flex flex-col items-start justify-center px-9 xl:px-32 overflow-hidden bg-transparent">
      {/* GrowOn style tagline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-12"
      >
        <span className="font-sans text-base md:text-lg font-light tracking-wide text-ivory/80">
          Setting the scene…
        </span>
      </motion.div>

      <div className="relative z-10 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-display text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-ivory font-light leading-[1.1] tracking-tight"
        >
          Systems architecture<br />
          <span className="text-gold/90">for operations that scale.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 font-sans font-thin text-lg md:text-xl lg:text-2xl text-ivory/60 max-w-3xl leading-relaxed"
        >
          Building intelligent ERP ecosystems anchored by one memorable signature scene.
          Architecting the future of operational recovery.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-16 left-9 xl:left-32"
      >
        <div className="flex items-center gap-6">
            <div className="h-px w-24 bg-gold/30" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase">
                Asim Aljma'an · 2026
            </span>
        </div>
      </motion.div>

      {/* Background Signature Text (Faded) */}
      <div className="absolute top-[15%] right-[-10%] pointer-events-none opacity-[0.02] select-none rotate-90 origin-right">
        <h2 className="font-display font-black text-[25vw] leading-none text-gold">
          OPERIX
        </h2>
      </div>
    </section>
  );
}
