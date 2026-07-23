"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm pointer-events-auto cursor-pointer"
    />
  );
}
