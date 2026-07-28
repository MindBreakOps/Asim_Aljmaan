"use client";
import React, { useState, useRef, useEffect } from "react";
import { useOSStore } from "@/store/useOSStore";
import { useLanguage } from "@/context/LanguageContext";

export default function Terminal() {
  const { t } = useLanguage();
  const { openApp } = useOSStore();
  const [history, setHistory] = useState<string[]>([
    "Asim OS Terminal v4.2.0-stable",
    "Type 'help' for available commands",
    ""
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, `asim@macbook ~ % ${input}`];

    switch (cmd) {
      case 'help':
        newHistory.push("Available commands:", "  ls       - List directory", "  open     - Open application (usage: open [app_name])", "  clear    - Clear screen", "  whoami   - Current user info", "  projects - Launch project showcase");
        break;
      case 'ls':
        newHistory.push("Applications/", "Documents/", "System/", "OPERIX_Ecosystem.pkg", "CV_Dossier.pdf");
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      case 'whoami':
        newHistory.push("Asim Ahmed", "Systems Architect & Operations Specialist", "Location: Riyadh, KSA");
        break;
      case 'open projects':
      case 'projects':
        openApp('systems');
        newHistory.push("Launching SystemsShowcase...");
        break;
      case 'open cv':
        openApp('preview');
        newHistory.push("Opening CV Preview...");
        break;
      default:
        newHistory.push(`zsh: command not found: ${cmd}`);
    }

    setHistory([...newHistory, ""]);
    setInput("");
  };

  return (
    <div className="w-full h-full bg-[#121212] p-6 font-mono text-[13px] text-[#A2E3A2] overflow-y-auto custom-scrollbar" onClick={() => document.getElementById('term-input')?.focus()}>
      <div className="space-y-1">
        {history.map((line, i) => (
          <div key={i} className="min-h-[1.2rem] whitespace-pre-wrap">{line}</div>
        ))}
        <form onSubmit={handleCommand} className="flex gap-2">
          <span className="text-white opacity-40 shrink-0">asim@macbook ~ %</span>
          <input
            id="term-input"
            autoFocus
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none p-0 text-[#A2E3A2]"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
