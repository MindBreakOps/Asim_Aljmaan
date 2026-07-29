"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useOSStore } from "@/store/useOSStore";
import { useLanguage } from "@/context/LanguageContext";

export default function Desktop() {
  const { openApp } = useOSStore();
  const { t, locale } = useLanguage();
  const constraintsRef = useRef(null);
  const isAr = locale === "ar";

  const icons = [
    { id: "cv", name: "Asim_Ahmed_CV.pdf", icon: "/preview.jpeg", app: "preview" },
    { id: "op_hris", name: "OPERIX_HRIS.app", icon: "/apps/hro.svg", app: "safari", url: "https://hris.operix-solutions.online" },
    { id: "op_fmis", name: "OPERIX_FMIS.app", icon: "/apps/fmis.png", app: "safari", url: "https://www.fmis.operix-solutions.online" },
    { id: "op_ops", name: "OPERIX_Ops.app", icon: "/apps/ops.svg", app: "safari", url: "https://ops.operix-solutions.online" },
    { id: "op_care", name: "OPERIX_Care.app", icon: "/apps/care.svg", app: "safari", url: "https://care.operix-solutions.online" },
    { id: "op_edu", name: "OPERIX_Edu.app", icon: "/apps/edu.png", app: "safari", url: "https://www.edu.operix-solutions.online" },
    { id: "op_binabbas", name: "BinAbbas_Group.app", icon: "/apps/binabbas.png", app: "safari", url: "https://www.binabbas.operix-solutions.online" },
    { id: "op_hasad", name: "Hasad_Systems.app", icon: "/apps/hasad.png", app: "safari", url: "https://www.hasad.operix-solutions.online" },
    { id: "nova", name: "Main_Controller.js", icon: "/nova.jpeg", app: "nova" },
    { id: "archive", name: "Dossier_Archive", icon: "/applications.jpeg", app: "finder" },
  ];

  const handleIconClick = (icon: typeof icons[0]) => {
    if (icon.app === 'safari' && icon.url) {
        openApp('safari', { url: icon.url });
    } else {
        openApp(icon.app as any);
    }
  };

  return (
    <div className="w-full h-full p-6 md:p-10 flex flex-col relative" ref={constraintsRef}>
      {/* DESKTOP ICONS GRID - Organized in columns on the right for desktop, centered grid for mobile */}
      <div className={`
        grid grid-flow-row md:grid-flow-col
        grid-cols-2 md:grid-cols-none md:grid-rows-[repeat(auto-fill,110px)]
        gap-x-4 md:gap-x-12 gap-y-8 md:gap-y-6
        w-full md:w-auto
        h-full md:h-fit
        ${isAr ? "md:mr-auto justify-items-end" : "md:ml-auto justify-items-start"}
        pt-16 md:pt-0
        relative z-10
      `}>
        {icons.map((file) => (
          <motion.div
            key={file.id}
            drag={!window.innerWidth || window.innerWidth >= 768}
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onDoubleClick={() => handleIconClick(file)}
            onClick={(e) => {
                if (window.innerWidth < 768) handleIconClick(file);
            }}
            className="flex flex-col items-center gap-2 cursor-pointer w-24 md:w-28 group select-none"
          >
            <div className="size-14 md:size-16 flex items-center justify-center transition-all">
              <img src={file.icon} className="w-full h-full object-contain drop-shadow-xl" alt="" />
            </div>
            <span className="text-[9px] md:text-[10px] font-bold text-center text-white bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10 uppercase tracking-widest shadow-lg group-hover:bg-mac-blue transition-colors max-w-full truncate">
              {file.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Cinematic Wallpaper Elements - Adjusted for Black Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <div className="relative w-full h-full">
            {/* Main Title Sketch */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <h1 className="text-[12vw] font-black tracking-[-0.05em] text-white leading-none select-none">ASIM_OS</h1>
              <p className="font-mono text-sm tracking-[0.8em] text-mac-blue font-black uppercase">SYSTEMS_ARCHITECTURE_DOCKET</p>
            </motion.div>

            {/* Floating "IDE" Window Sketch */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.2, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute top-[15%] left-[10%] w-[400px] h-[300px] bg-white/5 border-2 border-mac-blue/10 rounded-xl p-6 font-mono text-[10px] space-y-2 shadow-2xl backdrop-blur-md"
            >
              <div className="flex gap-1.5 mb-6">
                <div className="size-2 rounded-full bg-white/20" />
                <div className="size-2 rounded-full bg-white/20" />
                <div className="size-2 rounded-full bg-white/20" />
              </div>
              <div className="text-mac-blue font-bold">class OperixEcosystem {"{"}</div>
              <div className="pl-4 text-white/40">constructor() {"{"}</div>
              <div className="pl-8 text-white/60">this.nodes = ["HRIS", "FMIS", "OPS"];</div>
              <div className="pl-8 text-white/60">this.state = "SCALING";</div>
              <div className="pl-4 text-white/40">{"}"}</div>
              <div className="text-mac-blue font-bold">{"}"}</div>
            </motion.div>

            {/* Floating "Terminal" Sketch */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 0.15, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-[20%] right-[15%] w-[350px] h-[220px] bg-black/50 border border-white/10 rounded-xl p-6 font-mono text-[9px] shadow-2xl backdrop-blur-md"
            >
              <div className="text-mac-blue font-bold">asim@architect ~ % ./deploy_operix.sh</div>
              <div className="text-white/30 mt-4 font-medium">Initialising system nodes... [OK]</div>
              <div className="text-white/30 font-medium">Establishing secure link... [OK]</div>
              <div className="text-white/30 font-medium">Syncing database assets... [OK]</div>
              <div className="text-mac-blue mt-4 animate-pulse font-black">_</div>
            </motion.div>

            {/* Abstract Geometry */}
            <div className="absolute top-1/4 right-[20%] size-64 border border-white/5 rounded-full animate-spin-slow opacity-10" />
            <div className="absolute top-1/2 left-[30%] w-px h-96 bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-45 opacity-10" />
            <div className="absolute bottom-1/4 left-[20%] size-32 border-2 border-white/5 rotate-12 opacity-10" />

            {/* Color Blasts */}
            <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-mac-blue/10 blur-[120px] rounded-full pointer-events-none opacity-40" />
            <div className="absolute bottom-[-10%] right-[-10%] size-[600px] bg-gold/10 blur-[150px] rounded-full pointer-events-none opacity-40" />
          </div>
      </div>

      {/* OS VERSION INDICATOR */}
      <div className="absolute bottom-10 right-10 opacity-10 font-mono text-[8px] uppercase tracking-[0.5em] text-black font-black">
        Build: 2026.07.28.A_STABLE
      </div>
    </div>
  );
}
