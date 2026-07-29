"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { AppID, useOSStore } from "@/store/useOSStore";

interface WindowProps {
  id: AppID;
  title: string;
  children: React.ReactNode;
  icon?: string;
}

export default function Window({ id, title, children, icon }: WindowProps) {
  const { openWindows, focusWindow, closeWindow, minimizeWindow, focusedWindow } = useOSStore();
  const windowState = openWindows[id];
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!windowState || !windowState.isOpen || windowState.isMinimized) return null;

  const mobileVariants = {
    initial: { y: "100%", opacity: 1 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 1 }
  };

  const desktopVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };

  return (
    <motion.div
      drag={!isMobile}
      dragMomentum={false}
      onMouseDown={() => focusWindow(id)}
      initial={isMobile ? "initial" : "initial"}
      variants={isMobile ? mobileVariants : desktopVariants}
      animate="animate"
      exit="exit"
      transition={isMobile ? { type: "spring", damping: 30, stiffness: 300 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        zIndex: windowState.zIndex,
        ...(isMobile ? {
            position: 'fixed',
            inset: 0,
            maxWidth: '100vw',
            height: '100vh',
            margin: 0,
            borderRadius: 0,
            paddingTop: '3.5rem', // Space for status bar
            paddingBottom: '5.5rem' // Space for tab bar
        } : {})
      }}
      className={`fixed inset-0 m-auto w-full max-w-4xl h-[75vh] os-window flex flex-col pointer-events-auto ${
        focusedWindow === id ? "shadow-[0_40px_100px_rgba(0,0,0,0.8)]" : "opacity-90"
      }`}
    >
      {/* Title Bar - iOS Style hide? No, keep it as navigation header */}
      <div className={`h-10 bg-[#F6F6F6] border-b border-black/5 flex items-center px-4 justify-between shrink-0 cursor-default ${isMobile ? "fixed top-14 left-0 right-0 z-[1001]" : ""}`}>
        <div className="flex gap-2 group/traffic">
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="size-3 rounded-full bg-mac-red transition-all relative flex items-center justify-center overflow-hidden active:brightness-75"
          >
             <span className="text-[9px] text-black/60 opacity-0 group-hover/traffic:opacity-100">✕</span>
          </button>
          {!isMobile && (
              <>
                <button
                    onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                    className="size-3 rounded-full bg-mac-yellow transition-all relative flex items-center justify-center overflow-hidden active:brightness-75"
                >
                    <span className="text-[12px] text-black/60 opacity-0 group-hover/traffic:opacity-100 font-bold">−</span>
                </button>
                <div className="size-3 rounded-full bg-mac-green" />
              </>
          )}
        </div>

        <div className="flex items-center gap-2">
            {icon && <img src={icon} className="size-4 object-contain" alt="" />}
            <span className="font-sans text-[11px] font-bold text-black/70 uppercase tracking-widest">
                {title}
            </span>
        </div>

        <div className="w-12" />
      </div>

      {/* Window Content */}
      <div className={`flex-1 overflow-hidden relative bg-white ${isMobile ? "mt-10" : ""}`}>
        {children}
      </div>

      {/* Footer */}
      {!isMobile && (
        <div className="h-6 bg-[#F6F6F6] border-t border-black/5 flex items-center justify-between px-4 font-mono text-[8px] text-black/20 uppercase tracking-widest font-black">
            <span>ASIM_OS_STABLE_V4.2</span>
            <span>BUILD_A26</span>
        </div>
      )}
    </motion.div>
  );
}
