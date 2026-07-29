"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SystemManual() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  const sections = [
    {
      title: "System Architecture",
      items: [
        "Core: Next.js 15 App Router Architecture",
        "State: Zustand Reactive OS Store",
        "UI: Tailwind CSS 4 Glassmorphism",
        "Anim: Framer Motion Physics Engine"
      ]
    },
    {
      title: "Interface Standards",
      items: [
        "Theme: macOS 26 Sequoia Light Protocol",
        "Font: Inter (Global) / Cairo (Arabic Script)",
        "Icons: Rounded [22%] Squircle Convention",
        "Mobile: iOS 18 Fullscreen Transition"
      ]
    },
    {
      title: "Security & Stability",
      items: [
        "Process: Isolated Window Contexts",
        "Auth: Transmission Handshake Encryption",
        "Stability: BUILD_A26 Error Recovery",
        "Links: Unified SSL Reverse Proxy"
      ]
    }
  ];

  return (
    <div className="w-full h-full flex bg-[#f5f5f7] text-black font-sans">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-black/5 border-r border-black/5 p-6 space-y-8 shrink-0 hidden md:block">
        <div className="space-y-1">
            <h2 className="text-[10px] font-black text-black/30 uppercase tracking-widest pl-2 mb-4">Manual_Sections</h2>
            {sections.map((s, i) => (
                <div key={i} className={`px-3 py-2 rounded-lg text-[13px] font-semibold cursor-default ${i === 0 ? "bg-white shadow-sm text-mac-blue" : "hover:bg-black/5 text-black/60"}`}>
                    {s.title}
                </div>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-16 bg-white">
        <div className={`max-w-3xl space-y-16 ${isAr ? "text-right" : "text-left"}`}>

            <header className="space-y-4">
                <h1 className="text-4xl font-black tracking-tight">
                    {isAr ? "دليل تشغيل Asim_OS" : "Asim_OS Operating Manual"}
                </h1>
                <p className="text-lg text-black/40 font-medium">Technical documentation for the v4.2 Stable Environment.</p>
            </header>

            <div className="grid grid-cols-1 gap-12">
                {sections.map((section, idx) => (
                    <section key={idx} className="space-y-6">
                        <h3 className="text-sm font-black text-mac-blue uppercase tracking-[0.3em] border-b border-black/5 pb-2">{section.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.items.map((item, i) => (
                                <div key={i} className="p-4 bg-[#f9f9f9] border border-black/5 rounded-xl flex items-center gap-4 group hover:border-mac-blue/20 transition-colors">
                                    <div className="size-2 rounded-full bg-mac-blue/40 group-hover:bg-mac-blue" />
                                    <span className="text-[13px] font-bold text-black/70">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <section className="bg-mac-blue/5 p-8 rounded-2xl border border-mac-blue/10 space-y-4">
                <h4 className="font-black text-mac-blue uppercase text-xs tracking-widest">Architect's Note</h4>
                <p className="text-sm leading-relaxed font-medium text-mac-blue/80 italic">
                    "This system was engineered to embody the intersection of operational management and high-end software development. Every pixel serves the workflow."
                </p>
            </section>
        </div>
      </div>
    </div>
  );
}
