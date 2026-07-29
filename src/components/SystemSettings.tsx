"use client";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Capabilities() {
  const { t, locale, setLocale } = useLanguage();
  const [activeTab, setActiveTab] = useState("General");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [resolution, setResolution] = useState("Default");

  const settingsSidebar = [
    { id: "General", name: "General", icon: "⚙️" },
    { id: "Appearance", name: "Appearance", icon: "🎨" },
    { id: "Language", name: "Language & Region", icon: "🌐" },
    { id: "Display", name: "Display", icon: "🖥️" },
    { id: "Storage", name: "Storage", icon: "💽" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Appearance":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xl font-black uppercase tracking-tight">Appearance Settings</h3>
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-black/5 rounded-xl border border-black/5">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm">Dark Mode</span>
                        <span className="text-[10px] text-black/40 font-medium">Toggle system-wide dark theme</span>
                    </div>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-mac-blue' : 'bg-black/10'}`}
                    >
                        <div className={`absolute top-1 size-4 bg-white rounded-full shadow-md transition-all ${isDarkMode ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>
            </div>
          </div>
        );
      case "Language":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xl font-black uppercase tracking-tight">Language & Region</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/5 rounded-xl border border-black/5">
                    <span className="font-bold text-sm">System Language</span>
                    <select
                        value={locale}
                        onChange={(e) => setLocale(e.target.value as any)}
                        className="bg-white border border-black/10 rounded-md px-3 py-1 text-xs font-bold outline-none cursor-pointer"
                    >
                        <option value="en">English (United States)</option>
                        <option value="ar">العربية (Arabic)</option>
                    </select>
                </div>
            </div>
          </div>
        );
      case "Display":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xl font-black uppercase tracking-tight">Display Settings</h3>
            <div className="space-y-6">
                <div className="p-4 bg-black/5 rounded-xl border border-black/5 space-y-4">
                    <span className="font-bold text-sm block">Resolution</span>
                    <div className="flex gap-2">
                        {["Default", "Scaled (Large)", "Scaled (Small)"].map((res) => (
                            <button
                                key={res}
                                onClick={() => setResolution(res)}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${resolution === res ? 'bg-mac-blue text-white' : 'bg-white text-black/60 hover:bg-white/80 border border-black/5'}`}
                            >
                                {res}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/5 rounded-xl border border-black/5">
                    <span className="font-bold text-sm">Night Shift</span>
                    <div className="w-12 h-6 rounded-full bg-black/10 relative cursor-not-allowed opacity-50">
                        <div className="absolute top-1 left-1 size-4 bg-white rounded-full shadow-md" />
                    </div>
                </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-6">
                <div className="size-20 bg-mac-blue rounded-2xl flex items-center justify-center text-4xl text-white shadow-2xl">⚙️</div>
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">General</h2>
                    <p className="text-[10px] font-mono text-black/40 uppercase tracking-[0.4em] font-black">Asim_OS // System Settings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { label: "Software Update", value: "Up to date", icon: "⚡" },
                    { label: "Storage", value: "512GB (42GB Used)", icon: "💾" },
                    { label: "AirDrop", value: "Contacts Only", icon: "📡" },
                    { label: "Security", value: "Biometric Active", icon: "🔒" }
                ].map((item, i) => (
                    <div key={i} className="p-4 bg-black/5 hover:bg-black/10 transition-colors border border-black/5 rounded-xl flex items-center gap-4 cursor-default">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex flex-col">
                            <span className="text-xs font-black uppercase tracking-tight">{item.label}</span>
                            <span className="text-[10px] font-medium text-black/40">{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full bg-white/95 backdrop-blur-3xl flex overflow-hidden text-black font-sans selection:bg-mac-blue selection:text-white">
        {/* Settings Sidebar */}
        <div className="w-64 bg-black/5 border-r border-black/5 p-4 flex flex-col gap-1 shrink-0 pt-12">
            {settingsSidebar.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${activeTab === item.id ? 'bg-mac-blue text-white shadow-lg scale-105 font-bold' : 'hover:bg-black/5 text-black/60 font-medium'}`}
                >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs uppercase tracking-tight">{item.name}</span>
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-12 md:p-20 overflow-y-auto custom-scrollbar relative">
            <div className="max-w-2xl mx-auto">
                {renderContent()}
            </div>
        </div>
    </div>
  );
}
