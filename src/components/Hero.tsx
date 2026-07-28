"use client";
import React from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <div className="w-full h-full flex items-center justify-center p-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center space-y-8"
      >
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-black leading-none uppercase">
          {t("hero.title")}
        </h1>
        <p className="text-2xl md:text-3xl text-black/40 font-light max-w-3xl mx-auto uppercase tracking-widest font-mono">
          {t("hero.subtitle")}
        </p>
        <div className="pt-12">
            <div className="inline-flex items-center gap-4 bg-black/5 px-6 py-3 rounded-full border border-black/5 backdrop-blur-md">
                <span className="size-2 bg-mac-blue rounded-full animate-pulse" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-black/60">
                    System_Ready // Archive_Active
                </span>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
