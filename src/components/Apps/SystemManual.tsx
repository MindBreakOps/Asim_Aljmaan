"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const solutions = [
  {
    title: "OPERIX Operations",
    subtitle: "FLEET & WORKFORCE MATRIX",
    desc: "The core operations hub replacing manual logbooks. Features comprehensive ANPR parking, valet management, and real-time gig workforce deployment tracking.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "INTERACTIVE",
    badge: "CORE HUB",
    url: "https://ops.operix-solutions.online"
  },
  {
    title: "OPERIX FMIS",
    subtitle: "FINANCE & RETAIL ERP",
    desc: "Complete financial management ecosystem, corporate ledger reconciliation, Retail & POS operations, and ZATCA Phase 2 integration.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "9 Screens",
    badge: "ZATCA READY",
    url: "https://www.fmis.operix-solutions.online"
  },
  {
    title: "OPERIX HRIS",
    subtitle: "HUMAN CAPITAL INFRASTRUCTURE",
    desc: "Complete HR automation — GPS-enforced attendance tracking, automated salary deductions, and employee self-service pipelines.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "7 Screens",
    badge: "AUTOMATED",
    url: "https://hris.operix-solutions.online"
  },
  {
    title: "OPERIX Health Care",
    subtitle: "CLINICAL MANAGEMENT CORE",
    desc: "Advanced hospital management ecosystem. End-to-end clinical workflow from intake to surgical treasury.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "12 Screens",
    badge: "MEDICAL",
    url: "https://care.operix-solutions.online"
  },
  {
    title: "OPERIX Edu",
    subtitle: "SCHOOL MANAGEMENT PLATFORM",
    desc: "Cloud-based platform built for academic governance and school leadership empowerment.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "7 Screens",
    badge: "ACADEMIC",
    url: "https://www.edu.operix-solutions.online"
  },
  {
    title: "Abdullah Bin Abbas",
    subtitle: "INSTITUTIONAL PORTAL",
    desc: "Administrative portal for resource planning and community outreach tracking.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "COMMUNITY",
    badge: "PORTAL",
    url: "https://www.binabbas.operix-solutions.online"
  },
  {
    title: "Hasad Hub",
    subtitle: "SMART COMMUNITY PLATFORM",
    desc: "Real estate management handling resident requests and billing cycles.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "REAL ESTATE",
    badge: "PLATFORM",
    url: "https://www.hasad.operix-solutions.online"
  }
];

export default function SystemManual() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <div className="w-full h-full bg-[#f5f5f7] overflow-y-auto custom-scrollbar p-6 md:p-12 text-black selection:bg-mac-blue/20">
      <div className={`max-w-6xl mx-auto space-y-12 ${isAr ? "text-right" : "text-left"}`}>

        <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-black/5 pb-10">
            <div className="space-y-2">
                <div className="font-mono text-[10px] text-mac-blue font-black uppercase tracking-[0.4em]">Product_Portfolio // 2026</div>
                <h1 className="text-4xl font-black tracking-tight uppercase">Tech_Solutions_Archive</h1>
            </div>
            <div className="font-mono text-[10px] text-black/20 uppercase font-bold">Encrypted_Transmission_Stable</div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((item, i) => (
                <div key={i} className="bg-white border border-black/5 rounded-2xl p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group">
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-mac-blue uppercase tracking-widest">{item.subtitle}</p>
                                <h3 className="text-2xl font-black uppercase tracking-tight">{item.title}</h3>
                            </div>
                            <span className="px-2 py-1 bg-black/5 rounded text-[8px] font-black uppercase text-black/40">{item.badge}</span>
                        </div>

                        <p className="text-[13px] font-medium text-black/60 leading-relaxed min-h-[60px]">
                            {item.desc}
                        </p>

                        <div className="space-y-2">
                            {item.features.map((f, j) => (
                                <div key={j} className="flex items-center gap-3 text-[11px] font-bold text-black/40">
                                    <div className="size-1 rounded-full bg-mac-green" />
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-10">
                        <a
                            href={item.url}
                            target="_blank"
                            className="flex-1 bg-mac-blue text-white text-[11px] font-black uppercase tracking-widest h-10 flex items-center justify-center rounded-lg hover:brightness-110 active:scale-95 transition-all"
                        >
                            Launch Platform
                        </a>
                        <button className="flex-1 border border-black/5 text-black/40 text-[11px] font-black uppercase tracking-widest h-10 flex items-center justify-center rounded-lg hover:bg-black/5 active:scale-95 transition-all">
                            Preview UI
                        </button>
                    </div>
                </div>
            ))}
        </div>

        <footer className="pt-20 opacity-20 font-mono text-[9px] uppercase font-black text-center tracking-[0.5em]">
            System_Architecture_By_Asim_Ahmed // BUILD_A26
        </footer>
      </div>
    </div>
  );
}
