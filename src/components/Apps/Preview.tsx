"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Preview() {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";
  const isEn = locale === "en";
  const cv = translations[isEn ? "en" : "ar"].cv;

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-8 md:p-16 overflow-y-auto custom-scrollbar text-black selection:bg-mac-blue selection:text-white relative">

      {/* EXPORT / DOWNLOAD BAR */}
      <div className="sticky top-0 right-0 flex justify-end mb-8 z-50">
        <a
          href="/Asim_Ahmed_CV.pdf"
          download
          className="mac-button-primary flex items-center gap-3 shadow-xl"
        >
          <span>📥</span>
          <span>EXPORT_TO_PDF</span>
        </a>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl p-12 md:p-20 min-h-[1400px] flex flex-col gap-12 font-sans border border-black/5 rounded-sm">

        {/* HEADER */}
        <header className={`border-b-2 border-black pb-8 flex flex-col gap-6 ${isAr ? "text-right" : "text-left"}`}>
          <h1 className="text-6xl font-black tracking-tight uppercase leading-none">{cv.name}</h1>
          <p className="text-xl font-bold text-black/80 tracking-tight uppercase">{cv.title}</p>

          <div className="space-y-2">
            <div className={`flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] font-black uppercase text-black/50 ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                <span>Portfolio: {cv.portfolio}</span>
                <span>{cv.location}</span>
            </div>
            <div className={`flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] font-black uppercase text-[#004BB3] ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                <span>{cv.phone}</span>
                <span>{cv.email}</span>
                <span>{cv.linkedin}</span>
            </div>
          </div>
        </header>

        {/* SUMMARY */}
        <section className={`space-y-6 ${isAr ? "text-right" : "text-left"}`}>
          <h2 className="font-mono text-xs font-black text-black/40 uppercase tracking-[0.4em] border-b border-black/5 pb-2">{cv.summary_title}</h2>
          <p className="text-lg font-medium leading-relaxed text-black/90">
            {cv.summary_text}
          </p>
        </section>

        {/* EXPERIENCE */}
        <section className={`space-y-10 ${isAr ? "text-right" : "text-left"}`}>
          <h2 className="font-mono text-xs font-black text-black/40 uppercase tracking-[0.4em] border-b border-black/5 pb-2">{cv.exp_title}</h2>

          <div className="space-y-12">
            <div className="space-y-4">
              <div className={`flex justify-between items-baseline ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                <h3 className="text-2xl font-black">{cv.exp1_role}</h3>
                <span className="font-mono text-xs font-black text-[#004BB3]">{cv.exp1_date}</span>
              </div>
              <div className={`flex justify-between items-center ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                <span className="text-lg font-bold italic text-black/60">{cv.exp1_company}</span>
                <span className="font-mono text-[10px] text-black/20">{cv.exp1_url}</span>
              </div>
              <ul className="list-disc list-inside text-base font-medium leading-relaxed text-black/80 space-y-2">
                <li>{cv.exp1_bullet}</li>
              </ul>
            </div>

            <div className="space-y-4 border-t border-black/5 pt-12">
              <div className={`flex justify-between items-baseline ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                <h3 className="text-2xl font-black">{cv.exp2_role}</h3>
                <span className="font-mono text-xs font-black text-[#004BB3]">{cv.exp2_date}</span>
              </div>
              <div className="text-lg font-bold italic text-black/60">{cv.exp2_company} | {cv.exp2_location}</div>
              <ul className="list-disc list-inside text-base font-medium leading-relaxed text-black/80 space-y-2">
                <li>{cv.exp2_bullet}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className={`space-y-6 ${isAr ? "text-right" : "text-left"}`}>
          <h2 className="font-mono text-xs font-black text-black/40 uppercase tracking-[0.4em] border-b border-black/5 pb-2">{cv.edu_title}</h2>
          <div className="space-y-4">
             <div className={`flex justify-between items-baseline ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                <h3 className="text-2xl font-black">{cv.edu_school}</h3>
                <span className="font-mono text-xs font-black text-[#004BB3]">{cv.edu_date}</span>
             </div>
             <p className="text-lg font-bold text-black/70">{cv.edu_degree}</p>
             <p className="text-sm font-black text-[#004BB3] bg-[#004BB3]/5 inline-block px-4 py-2 rounded-full border border-[#004BB3]/10">{cv.edu_gpa}</p>
          </div>
        </section>

        {/* SKILLS */}
        <section className={`space-y-10 ${isAr ? "text-right" : "text-left"}`}>
          <h2 className="font-mono text-xs font-black text-black/40 uppercase tracking-[0.4em] border-b border-black/5 pb-2">{cv.skills_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
                <h4 className="text-sm font-black text-[#004BB3] uppercase tracking-widest">{cv.skills_ops}</h4>
                <ul className="space-y-3 font-bold text-base text-black/80">
                    {cv.skills_ops_list.map((s: string) => <li key={s} className="flex gap-4 items-center"><div className="size-1.5 rounded-full bg-black/10" /> {s}</li>)}
                </ul>
            </div>
            <div className="space-y-6">
                <h4 className="text-sm font-black text-[#004BB3] uppercase tracking-widest">{cv.skills_tech}</h4>
                <ul className="space-y-3 font-bold text-base text-black/80">
                    {cv.skills_tech_list.map((s: string) => <li key={s} className="flex gap-4 items-center"><div className="size-1.5 rounded-full bg-black/10" /> {s}</li>)}
                </ul>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS & LANGUAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-black/5 pt-12">
            <section className={`space-y-4 ${isAr ? "text-right" : "text-left"}`}>
                <h2 className="font-mono text-xs font-black text-black/40 uppercase tracking-[0.4em] border-b border-black/5 pb-2">{cv.achieve_title}</h2>
                <p className="text-base font-bold leading-relaxed text-black/80 italic">
                    {cv.achieve_text}
                </p>
            </section>
            <section className={`space-y-4 ${isAr ? "text-right" : "text-left"}`}>
                <h2 className="font-mono text-xs font-black text-black/40 uppercase tracking-[0.4em] border-b border-black/5 pb-2">{cv.lang_title}</h2>
                <p className="text-base font-black text-[#004BB3] uppercase tracking-widest">{cv.lang_text}</p>
            </section>
        </div>

      </div>
    </div>
  );
}
