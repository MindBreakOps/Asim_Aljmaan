"use client";
import React from "react";

export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed right-8 top-8 z-[200] group pointer-events-auto"
      aria-label="Close"
    >
      <div className="relative grid size-14 place-items-center rounded-full border border-ivory/20 bg-navy/20 backdrop-blur-md transition-all duration-500 hover:border-gold/60">
        <div className="absolute inset-0 rounded-full bg-gold/5 scale-0 group-hover:scale-100 transition-transform duration-500" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.25">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </button>
  );
}
