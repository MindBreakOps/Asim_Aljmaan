"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useOSStore } from "@/store/useOSStore";

const solutions = [
  {
    id: "ops",
    title: "OPERIX Operations",
    subtitle: "FLEET & WORKFORCE MATRIX",
    desc: "The core operations hub replacing manual logbooks. Features comprehensive ANPR parking, valet management, and real-time gig workforce deployment tracking.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "INTERACTIVE",
    badge: "CORE HUB",
    url: "https://ops.operix-solutions.online",
    images: [
        "/systems/ops/ai-email-ops.png",
        "/systems/ops/analyticsandreports-ops.png",
        "/systems/ops/crm-ops.png",
        "/systems/ops/doc-generateandsendemail-ops.png",
        "/systems/ops/exe-dash.png",
        "/systems/ops/external-standaloneapps-ops.png",
        "/systems/ops/facilitandtraining-ops.png",
        "/systems/ops/hr-ops.png",
        "/systems/ops/it-ops.png",
        "/systems/ops/performance-ops.png",
        "/systems/ops/projects-acc-ops.png",
        "/systems/ops/setshift-ops.png",
        "/systems/ops/ops-dash.mp4"
    ]
  },
  {
    id: "fmis",
    title: "OPERIX FMIS",
    subtitle: "FINANCE & RETAIL ERP",
    desc: "Complete financial management ecosystem, corporate ledger reconciliation, Retail & POS operations, and ZATCA Phase 2 integration.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "9 Screens",
    badge: "ZATCA READY",
    url: "https://www.fmis.operix-solutions.online",
    images: [
        "/systems/fmis/dash-fmis.png",
        "/systems/fmis/fmis-prod.png",
        "/systems/fmis/help-fmis.png",
        "/systems/fmis/fmis-gl.png",
        "/systems/fmis/fmis-purchase.png",
        "/systems/fmis/opx-ai-fmis.png",
        "/systems/fmis/fmis-pos.png",
        "/systems/fmis/fmis-supplier.png",
        "/systems/fmis/quot-fmis.png"
    ]
  },
  {
    id: "hris",
    title: "OPERIX HRIS",
    subtitle: "HUMAN CAPITAL INFRASTRUCTURE",
    desc: "Complete HR automation — GPS-enforced attendance tracking, automated salary deductions, and employee self-service pipelines.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "7 Screens",
    badge: "AUTOMATED",
    url: "https://hris.operix-solutions.online",
    images: [
        "/systems/hris/ai-scanner-hris.png",
        "/systems/hris/external-apps-hris.png",
        "/systems/hris/visa-mgm-hris.png",
        "/systems/hris/doc-hris.png",
        "/systems/hris/pipline-hris.png",
        "/systems/hris/emp-pro-hris.png",
        "/systems/hris/resutl-ats-hris.png"
    ]
  },
  {
    id: "care",
    title: "OPERIX Health Care",
    subtitle: "CLINICAL MANAGEMENT CORE",
    desc: "Advanced hospital management ecosystem. End-to-end clinical workflow from intake to surgical treasury.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "12 Screens",
    badge: "MEDICAL",
    url: "https://care.operix-solutions.online",
    images: [
        "/systems/care/admin-care.png",
        "/systems/care/lab-path-care.png",
        "/systems/care/appoint-care.png",
        "/systems/care/nurse-check-care.png",
        "/systems/care/bloodbank-care.png",
        "/systems/care/nurse-triage-quee-care.png",
        "/systems/care/chemist-care.png",
        "/systems/care/ops-care.png",
        "/systems/care/doc-care.png",
        "/systems/care/path-lab-history-care.png",
        "/systems/care/doc-workspace-care.png",
        "/systems/care/patients-files-care.png",
        "/systems/care/financial-care.png",
        "/systems/care/pharm-inven-care.png",
        "/systems/care/hr-files-care.png",
        "/systems/care/radio-lab-care.png",
        "/systems/care/inside-file-care.png",
        "/systems/care/reception-care.png"
    ]
  },
  {
    id: "edu",
    title: "OPERIX Edu",
    subtitle: "SCHOOL MANAGEMENT PLATFORM",
    desc: "Cloud-based platform built for academic governance and school leadership empowerment.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "7 Screens",
    badge: "ACADEMIC",
    url: "https://www.edu.operix-solutions.online",
    images: [
        "/systems/edu/edu-dash.png",
        "/systems/edu/edu-fees.png",
        "/systems/edu/edu-res.png",
        "/systems/edu/edu-sub.png",
        "/systems/edu/edu-dox.png",
        "/systems/edu/edu-par.png",
        "/systems/edu/edu-studs.png"
    ]
  },
  {
    id: "binabbas",
    title: "Abdullah Bin Abbas",
    subtitle: "INSTITUTIONAL PORTAL",
    desc: "Administrative portal for resource planning and community outreach tracking.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "COMMUNITY",
    badge: "PORTAL",
    url: "https://www.binabbas.operix-solutions.online",
    images: ["/systems/binabbas/dash.png"]
  },
  {
    id: "hasad",
    title: "Hasad Hub",
    subtitle: "SMART COMMUNITY PLATFORM",
    desc: "Real estate management handling resident requests and billing cycles.",
    features: ["Real-time Cloud Integration", "Bank-grade Operational Security"],
    screens: "REAL ESTATE",
    badge: "PLATFORM",
    url: "https://www.hasad.operix-solutions.online",
    images: ["/systems/hasad/dash.png"]
  }
];

export default function SystemManual() {
  const { locale } = useLanguage();
  const { openApp } = useOSStore();
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
                            <div className="flex flex-col items-end gap-1">
                                <span className="px-2 py-1 bg-black/5 rounded text-[8px] font-black uppercase text-black/40">{item.badge}</span>
                                <span className="text-[9px] font-bold text-black/20 uppercase tracking-tighter italic">{item.screens}</span>
                            </div>
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
                        <button
                            onClick={() => openApp('gallery', { items: item.images })}
                            className="flex-1 border border-black/5 text-black/40 text-[11px] font-black uppercase tracking-widest h-10 flex items-center justify-center rounded-lg hover:bg-black/5 active:scale-95 transition-all"
                        >
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
