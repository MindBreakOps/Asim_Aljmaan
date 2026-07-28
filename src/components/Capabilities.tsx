"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Capabilities() {
  const { t, locale } = useLanguage();

  const categories = [
    { title: "ERP & Systems", items: ["OPERIX Architecture", "HRIS Design", "ANPR / IoT Integration", "Financial Flow Design"] },
    { title: "Development", items: ["React / Next.js", "Supabase / PostgreSQL", "Oracle SQL", "Power BI Analytics"] },
    { title: "Operations", items: ["Operational Recovery", "Workforce Scaling", "SOP Development", "Team Leadership"] },
    { title: "Tools", items: ["Figma Prototyping", "GitHub / Git", "Azure Devops", "Project Management"] }
  ];

  return (
    <div className="w-full h-full bg-white/80 backdrop-blur-3xl p-12 md:p-24 overflow-y-auto custom-scrollbar text-black">
        <div className="max-w-7xl mx-auto">
            <div className="mb-24">
                <div className="font-mono text-xs tracking-[0.6em] text-[#004BB3] font-black uppercase mb-6 shadow-text">TECHNICAL_STACK // MATRIX</div>
                <h2 className="font-display text-7xl md:text-9xl text-black tracking-tighter font-black uppercase leading-none">{t("sections.capabilities")}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
              {categories.map((cat, i) => (
                <div key={i} className={`border-[#004BB3]/20 pl-10 hover:border-[#004BB3] transition-colors duration-500 ${locale === "ar" ? "border-r-2 pr-10 pl-0 text-right" : "border-l-2 text-left"}`}>
                  <h3 className="font-display font-black text-2xl text-black mb-12 uppercase">{cat.title}</h3>
                  <ul className="space-y-10">
                    {cat.items.map((item, j) => (
                      <li key={j} className="group flex items-center gap-6 cursor-default">
                        <div className="size-1.5 bg-[#004BB3]/20 group-hover:bg-[#004BB3] transition-all duration-500 rounded-full" />
                        <span className="font-mono text-xs tracking-[0.2em] text-black/40 group-hover:text-black group-hover:translate-x-3 transition-all duration-500 uppercase font-black">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        </div>
    </div>
  );
}
