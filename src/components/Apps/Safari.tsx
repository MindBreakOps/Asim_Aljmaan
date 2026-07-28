"use client";
import React, { useState } from "react";
import { useOSStore } from "@/store/useOSStore";

export default function Safari() {
  const { openWindows } = useOSStore();
  const safariData = openWindows['safari']?.data;
  const initialUrl = safariData?.url || "https://operix-solutions.com";
  const [url, setUrl] = useState(initialUrl);

  // Sync url if data changes (new app opened)
  React.useEffect(() => {
    if (safariData?.url) setUrl(safariData.url);
  }, [safariData?.url]);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Safari Controls */}
      <div className="h-12 bg-[#F6F6F6] border-b border-black/10 flex items-center px-4 gap-4">
        <div className="flex gap-4">
            <div className="size-6 rounded flex items-center justify-center hover:bg-black/5 cursor-pointer opacity-40">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg>
            </div>
            <div className="size-6 rounded flex items-center justify-center hover:bg-black/5 cursor-pointer opacity-40">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
        </div>

        <div className="flex-1 max-w-2xl h-8 bg-white border border-black/5 rounded-md flex items-center px-3 gap-2">
            <span className="text-xs text-black/40">🔒</span>
            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent text-[11px] text-black outline-none font-sans"
            />
        </div>

        <div className="w-12" />
      </div>

      <div className="flex-1 w-full bg-white relative">
        <iframe
          src={url}
          className="w-full h-full border-none"
          title="Safari Browser"
        />
        {/* Loading Overlay if needed */}
      </div>
    </div>
  );
}
