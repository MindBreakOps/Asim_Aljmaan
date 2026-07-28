"use client";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Nova() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  const [code, setCode] = useState(`// Asim Ahmed - Systems Architect
// Initializing OPERIX Ecosystem...

class SystemNode {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.status = 'ACTIVE';
    this.load = Math.random() * 100;
  }

  process() {
    console.log(\`Node \${this.id} processing at \${this.load.toFixed(2)}% capacity\`);
  }
}

const nodes = [
  new SystemNode('HRIS', 'Management'),
  new SystemNode('FMIS', 'Finance'),
  new SystemNode('OPS', 'Field Control')
];

nodes.forEach(node => node.process());`);

  return (
    <div className="w-full h-full flex flex-col bg-[#FFFFFF] text-[#333333] font-mono selection:bg-mac-blue/20">
      {/* Nova Header */}
      <div className="h-12 bg-[#F6F6F6] border-b border-black/5 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-4">
           <img src="/nova.jpeg" className="size-5 rounded" alt="" />
           <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest">Main_Controller.js</span>
        </div>
        <div className="flex gap-2">
            <div className="px-3 py-1 bg-mac-blue text-white rounded text-[10px] font-black uppercase tracking-widest cursor-pointer hover:brightness-110">Run_Node</div>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div className="w-12 bg-[#F9F9F9] border-r border-black/5 flex flex-col items-center py-4 text-[10px] text-black/20 select-none">
            {Array.from({length: 30}).map((_, i) => (
                <div key={i} className="h-5">{i + 1}</div>
            ))}
        </div>

        {/* Code Area */}
        <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className={`flex-1 p-4 bg-white outline-none border-none resize-none text-[13px] leading-5 font-medium ${isAr ? "text-right" : "text-left"}`}
            style={{ fontFamily: 'var(--font-mono)' }}
        />
      </div>

      {/* Footer */}
      <div className="h-6 bg-[#F6F6F6] border-t border-black/5 px-4 flex items-center justify-between text-[9px] font-black text-black/30 uppercase tracking-[0.2em]">
        <span>Ln 14, Col 32</span>
        <span>UTF-8 // JavaScript</span>
      </div>
    </div>
  );
}
