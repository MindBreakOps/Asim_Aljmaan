"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[1000] bg-navy flex flex-col items-center justify-center gap-6"
    >
      <div className="absolute inset-0 bg-[url(/scene-hub.jpg)] bg-cover bg-center opacity-10 blur-xl" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display text-ivory text-xl tracking-widest font-light"
        >
          Setting the scene…
        </motion.span>

        <div className="w-64 h-px bg-ivory/10 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            className="h-full bg-gold origin-left w-full"
          />
        </div>

        <span className="font-mono text-[9px] text-gold/40 tracking-[0.5em] uppercase">
          Initializing Hub {Math.round(progress)}%
        </span>
      </div>
    </motion.div>
  );
}
