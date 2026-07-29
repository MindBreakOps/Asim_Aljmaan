"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Article() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <div className="w-full h-full bg-[#fcfcfc] overflow-y-auto custom-scrollbar p-8 md:p-20 text-black selection:bg-mac-blue/20">
      <article className={`max-w-3xl mx-auto space-y-12 ${isAr ? "text-right" : "text-left"}`}>

        <header className="space-y-6">
            <div className="font-mono text-xs text-mac-blue font-black uppercase tracking-[0.4em]">Professional_Insight // 01</div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
                {isAr ? "هندسة الأنظمة في استعادة العمليات" : "Systems Architecture in Operational Recovery"}
            </h1>
            <div className="flex items-center gap-4 text-black/40 font-bold text-sm">
                <span>By Asim Ahmed</span>
                <span className="size-1.5 rounded-full bg-black/10" />
                <span>July 2026</span>
            </div>
        </header>

        <section className="space-y-8 text-lg leading-relaxed text-black/80 font-medium">
            <p className="first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left">
                {isAr
                    ? "في المشهد التقني المتسارع اليوم، لم تعد الأنظمة مجرد أدوات، بل أصبحت العمود الفقري لاستمرارية العمليات. عندما تواجه المشاريع تحديات تشغيلية كبرى، تبرز الحاجة إلى معمارية أنظمة ذكية قادرة على سد الفجوة بين الواقع الميداني والحلول التقنية."
                    : "In today's rapidly evolving technical landscape, systems are no longer just tools—they are the backbone of operational continuity. When projects face severe operational challenges, the need for intelligent systems architecture becomes critical to bridge the gap between field reality and technical solutions."}
            </p>

            <h2 className="text-3xl font-black pt-6">The "Operix" Philosophy</h2>
            <p>
                {isAr
                    ? "جوهر فلسفة Operix يكمن في البساطة المعقدة. بناء 9 وحدات متخصصة في خادم واحد موحد يضمن المزامنة الفورية والمساءلة المطلقة. إنها ليست مجرد مسألة برمجية، بل هي مسألة استراتيجية تشغيلية."
                    : "The core of the Operix philosophy lies in complex simplicity. Building 9 specialized modules on a single unified server ensures real-time synchronization and absolute accountability. It is not merely a software concern; it is an operational strategy."}
            </p>

            <blockquote className="border-l-4 border-mac-blue pl-8 py-4 italic text-2xl font-light text-black/60 bg-black/5 rounded-r-lg">
                "Architecture is about making the invisible visible through data-driven precision."
            </blockquote>

            <p>
                {isAr
                    ? "لقد أثبتت التجربة أن استعادة المشاريع المتعثرة تتطلب أكثر من مجرد إصلاحات مؤقتة؛ إنها تتطلب إعادة هيكلة شاملة لكيفية تدفق البيانات وتفاعل الفرق. من خلال الجمع بين إدارة العمليات وتطوير الأنظمة، يمكننا بناء أدوات لا تحل المشاكل فحسب، بل تمنع حدوثها مستقبلاً."
                    : "Experience has shown that rescuing underperforming projects requires more than temporary fixes; it demands a total restructuring of how data flows and how teams interact. By combining operational management with systems development, we build tools that don't just solve problems—they prevent them from happening."}
            </p>
        </section>

        <footer className="pt-20 border-t border-black/5 flex justify-between items-center opacity-30 font-mono text-[10px] uppercase font-black tracking-widest">
            <span>End of Transmission</span>
            <span>Ref: ARCH-2026-A</span>
        </footer>
      </article>
    </div>
  );
}
