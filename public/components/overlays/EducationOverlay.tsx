"use client";
import React from "react";
import { motion } from "framer-motion";
import CloseButton from "./CloseButton";
import Backdrop from "./Backdrop";
import { useLanguage } from "@/context/LanguageContext";

export default function EducationOverlay({ onClose }: { onClose: () => void }) {
  const { t, locale } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none p-6"
    >
      <Backdrop onClick={onClose} />
      <CloseButton onClick={onClose} />

      <div className={`relative w-full max-w-5xl bg-[#0a0a0a] border border-gold/10 p-12 md:p-20 pointer-events-auto flex flex-col shadow-2xl backdrop-blur-3xl z-10 ${locale === "ar" ? "text-right" : "text-left"}`}>
        <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-6 shadow-text font-bold">
                {locale === "en" ? "Foundation / Academic Path" : "الأساس / المسار الأكاديمي"}
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-white tracking-tighter shadow-text font-black uppercase">
                {t("cv.education.title")}
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 overflow-y-auto scrollbar-hide max-h-[60vh] pr-4">
            <div className="lg:col-span-7 space-y-12">
                <div className="border-l-4 border-gold pl-8 space-y-6">
                    <div className="font-mono text-[10px] text-gold tracking-widest uppercase font-black tracking-widest">{t("cv.edu.school")} · {t("cv.edu.date")}</div>
                    <h3 className="font-display text-3xl font-bold text-white tracking-tight">{t("cv.edu.degree")}</h3>
                    <p className="font-sans text-lg text-white/80 leading-relaxed font-light italic">
                        {t("cv.edu.gpa")}
                    </p>
                    <ul className="space-y-4 text-sm text-white/60 leading-relaxed font-light">
                        <li className="flex gap-4">
                            <span className="text-gold font-black">•</span>
                            <span>{t("cv.edu.bullet1")}</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-gold font-black">•</span>
                            <span>{locale === "en"
                                ? "Earned A and B grades in all technical subjects, demonstrating strong technical foundation."
                                : "الحصول على تقديرات (A) و (B) في جميع المواد التقنية، مما يوضح أساساً تقنياً قوياً."}</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-gold font-black">•</span>
                            <span>{t("cv.edu.bullet2")}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="lg:col-span-5 space-y-12">
                <section>
                    <div className="font-mono text-[9px] tracking-[0.4em] text-gold font-black uppercase mb-8 border-b border-white/5 pb-2">
                      {t("cv.cert.title")}
                    </div>
                    <div className="space-y-8">
                        <div>
                            <div className="font-display font-bold text-xl text-white/90 leading-tight mb-2">{t("cv.cert.org")}</div>
                            <p className="text-[10px] font-mono text-white/30 italic uppercase tracking-wider">{t("cv.cert.accred")}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                "Fundamentals of Cybersecurity",
                                "Data Analysis using Power BI",
                                "Quality Specialist",
                                "Writing Reports & Administrative Letters",
                                "Administrative Communication"
                            ].map(cert => (
                                <div key={cert} className="text-xs font-mono text-white/80 flex items-center gap-4 bg-white/5 p-4 border border-white/5 hover:border-gold/30 transition-all rounded-sm group">
                                    <div className="size-1.5 bg-gold rounded-full shadow-[0_0_10px_rgba(201,168,76,0.8)] group-hover:scale-150 transition-transform" />
                                    {cert}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
