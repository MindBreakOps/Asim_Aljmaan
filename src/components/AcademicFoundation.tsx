"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AcademicFoundation() {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";

  const certifications = [
    "Fundamentals of Cybersecurity",
    "Data Analysis using Power BI",
    "Quality Specialist",
    "Writing Reports & Administrative Letters",
    "Administrative Communication"
  ];

  return (
    <div className="w-full h-full bg-white/80 backdrop-blur-3xl p-12 md:p-24 overflow-y-auto custom-scrollbar text-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-24 text-black">
            <div className="flex flex-col">
                <div className="font-mono text-xs tracking-[0.6em] text-[#004BB3] font-bold uppercase mb-6 shadow-text">FOUNDATION // ACADEMIC</div>
                <h2 className="font-display text-7xl md:text-9xl text-black tracking-tighter leading-none font-black uppercase">{t("cv.education.title")}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                <div className="lg:col-span-7">
                    <div className={`border-[#004BB3] space-y-16 ${isAr ? "border-r-4 pr-16 text-right" : "border-l-4 pl-16 text-left"}`}>
                        <div>
                            <div className="font-mono text-xs text-black/40 tracking-[0.4em] uppercase mb-6 font-black">{t("cv.edu.school")} // {t("cv.edu.date")}</div>
                            <h3 className="font-display text-4xl md:text-6xl font-bold text-black tracking-tight mb-8">{t("cv.edu.degree")}</h3>
                            <p className="font-sans text-2xl text-black/80 font-light italic bg-black/5 py-4 px-8 border border-black/10 inline-block rounded-sm">{t("cv.edu.gpa")}</p>
                        </div>
                        <ul className="space-y-8 text-xl text-black/60 font-light max-w-2xl leading-relaxed">
                            {[t("cv.edu.bullet1"), "High technical subject proficiency.", t("cv.edu.bullet2")].map((b, i) => (
                                <li key={i} className="flex gap-8"><span className="text-[#004BB3] font-black mt-1">/</span><span>{b}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:col-span-5 bg-black/5 border border-black/5 p-12 lg:p-16 rounded-xl">
                    <div className="font-mono text-[10px] text-black/40 uppercase tracking-[0.4em] font-black mb-12 border-b border-black/5 pb-4">{t("cv.cert.title")}</div>
                    <div className="space-y-12">
                        <div className={isAr ? "text-right" : "text-left"}>
                            <div className="font-display font-black text-2xl text-black leading-tight mb-4 uppercase tracking-tight">{t("cv.cert.org")}</div>
                            <p className="text-xs font-mono text-black/30 italic uppercase tracking-wider font-bold">{t("cv.cert.accred")}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {certifications.map((cert) => (
                                <div key={cert} className="text-[11px] font-mono text-black/60 flex items-center gap-6 p-4 border border-black/5 bg-white/60 hover:border-[#004BB3] transition-all uppercase tracking-widest font-black rounded-lg">
                                    <div className="size-2 bg-[#004BB3] shadow-[0_0_15px_rgba(0,122,255,0.4)] rounded-full" />
                                    {cert}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
