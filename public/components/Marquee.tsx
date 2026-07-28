"use client";
import React from "react";

export default function Marquee() {
  const items = [
    "OPERIX HRIS",
    "OPERIX OPERATIONS",
    "OPERIX FMIS",
    "OPERIX IT",
    "OPERIX EXECUTIVE",
    "OPERIX PLANNER",
    "OPERIX FIELDS",
    "OPERIX MARKETING",
    "OPERIX CODE STUDIO",
    "SYSTEMS DEVELOPER",
    "ERP ARCHITECT",
    "OPERATIONS MANAGER",
  ];

  return (
    <div className="w-full bg-gold py-4 overflow-hidden flex whitespace-nowrap border-y border-gold/20 relative z-20">
      <div className="animate-marquee flex items-center">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-navy font-display font-black text-sm md:text-lg tracking-[0.2em] uppercase mx-12 flex items-center"
          >
            {item} <span className="text-navy/20 ml-12 text-2xl leading-none">·</span>
          </span>
        ))}
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-gold to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-gold to-transparent z-10" />
    </div>
  );
}
