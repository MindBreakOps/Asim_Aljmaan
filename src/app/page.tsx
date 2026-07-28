"use client";
import React from "react";
import OSShell from "@/components/OSShell";
import Desktop from "@/components/OS/Desktop";
import { useOSStore } from "@/store/useOSStore";

export default function Home() {
  const { focusWindow } = useOSStore();

  return (
    <OSShell>
      {/* Background click to refocus desktop */}
      <div
        className="fixed inset-0 z-0"
        onClick={() => focusWindow('none' as any)}
      />

      {/* OS Wallpaper Effect */}
      <div className="fixed inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-mac-blue/20 via-black to-black pointer-events-none" />

      {/* Main OS Layer */}
      <div className="relative z-10 w-full h-full">
         <Desktop />
      </div>
    </OSShell>
  );
}
