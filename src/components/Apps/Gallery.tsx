"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "@/store/useOSStore";

export default function Gallery() {
  const { openWindows } = useOSStore();
  const galleryData = openWindows['gallery']?.data;
  const items = galleryData?.items || [];
  const [index, setIndex] = useState(0);

  // Reset index when items change
  useEffect(() => {
    setIndex(0);
  }, [items]);

  if (!items || items.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-white/40 font-mono text-xs uppercase tracking-widest">
        No Media Loaded
      </div>
    );
  }

  const current = items[index];
  const isVideo = current.endsWith('.mp4');

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <div className="w-full h-full bg-[#1A1A1A] flex flex-col relative overflow-hidden group select-none">

      {/* Top Bar / Filename */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/60 to-transparent z-20 flex items-center justify-center px-4">
        <span className="text-[11px] font-bold text-white/80 uppercase tracking-[0.2em]">
            {current.split('/').pop()} ({index + 1} / {items.length})
        </span>
      </div>

      {/* Media Container */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-12 relative">
        <AnimatePresence mode="wait">
            <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-full max-h-full flex items-center justify-center"
            >
                {isVideo ? (
                    <video
                        src={current}
                        controls
                        autoPlay
                        className="max-w-full max-h-full rounded-lg shadow-2xl border border-white/5"
                    />
                ) : (
                    <img
                        src={current}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/5 pointer-events-none"
                        alt=""
                    />
                )}
            </motion.div>
        </AnimatePresence>

        {/* Navigation Overlays */}
        {items.length > 1 && (
            <>
                <button
                    onClick={prev}
                    className="absolute left-6 size-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40 active:scale-90"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                    onClick={next}
                    className="absolute right-6 size-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40 active:scale-90"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            </>
        )}
      </div>

      {/* Bottom Thumbnails Strip (Visual only for now) */}
      <div className="h-20 bg-black/40 backdrop-blur-2xl border-t border-white/5 flex items-center justify-center gap-2 px-6 overflow-x-auto custom-scrollbar">
          {items.map((item: string, i: number) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`h-12 w-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${i === index ? 'border-mac-blue scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                  {item.endsWith('.mp4') ? (
                      <div className="w-full h-full bg-black flex items-center justify-center text-[10px] text-white font-black italic">VIDEO</div>
                  ) : (
                      <img src={item} className="w-full h-full object-cover" alt="" />
                  )}
              </div>
          ))}
      </div>
    </div>
  );
}
