"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useOSStore, AppID } from "@/store/useOSStore";
import Window from "./OS/Window";
import Safari from "./Apps/Safari";
import Terminal from "./Apps/Terminal";
import Finder from "./Apps/Finder";
import Preview from "./Apps/Preview";
import Nova from "./Apps/Nova";
import SystemsShowcase from "./SystemsShowcase";
import Capabilities from "./Capabilities";
import AcademicFoundation from "./AcademicFoundation";
import ContactPortal from "./ContactPortal";

export default function OSShell({ children }: { children: React.ReactNode }) {
  const { locale, t, setLocale } = useLanguage();
  const { openWindows, openApp, focusWindow, focusedWindow, activeMenu, setActiveMenu, closeAll } = useOSStore();
  const [isMobile, setIsMobile] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showAppGrid, setShowAppGrid] = useState(false);
  const menubarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const timer = setInterval(() => setTime(new Date()), 1000);

    const handleClickOutside = (e: MouseEvent) => {
      if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousedown", handleClickOutside);
      clearInterval(timer);
    };
  }, []);

  const dockItems: { id: AppID; label: string; icon: string; appName: string }[] = [
    { id: "finder", label: "Finder", icon: "/finder.jpeg", appName: "Finder" },
    { id: "safari", label: "Safari", icon: "/safari.jpeg", appName: "Safari" },
    { id: "nova", label: "Nova", icon: "/nova.jpeg", appName: "Nova Editor" },
    { id: "preview", label: "Preview", icon: "/preview.jpeg", appName: "Preview" },
    { id: "terminal", label: "Terminal", icon: "/terminal.jpeg", appName: "Terminal" },
    { id: "mail", label: "Mail", icon: "/mails.jpeg", appName: "Mail" },
    { id: "skills", label: "Settings", icon: "/settings.jpeg", appName: "System Settings" },
  ];

  const organizedApps = [
    {
      category: "Business Apps",
      apps: [
        { name: "HRIS", icon: "/apps/hro.svg", url: "https://hris.operix-solutions.online" },
        { name: "FMIS", icon: "/apps/fmis.png", url: "https://fmis.operix-solutions.online" },
        { name: "Operations", icon: "/apps/ops.svg", url: "https://ops.operix-solutions.online" },
      ]
    },
    {
      category: "Medical",
      apps: [
        { name: "Care", icon: "/apps/care.svg", url: "https://care.operix-solutions.online" },
      ]
    },
    {
      category: "Academic",
      apps: [
        { name: "Education", icon: "/apps/edu.png", url: "https://edu.operix-solutions.online" },
      ]
    },
    {
      category: "Community",
      apps: [
        { name: "BinAbbas", icon: "/apps/binabbas.png", url: "https://www.binabbas.operix-solutions.online" },
        { name: "Hasad", icon: "/apps/hasad.png", url: "https://www.hasad.operix-solutions.online" },
      ]
    }
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(locale === "ar" ? "ar-SA" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const isAr = locale === "ar";

  const handleAppOpen = (id: AppID, data?: any) => {
    setShowAppGrid(false);
    openApp(id, data);
  };

  const renderApp = (id: AppID) => {
    switch (id) {
      case 'safari': return <Safari />;
      case 'terminal': return <Terminal />;
      case 'finder': return <Finder />;
      case 'preview': return <Preview />;
      case 'systems': return <SystemsShowcase />;
      case 'skills': return <Capabilities />;
      case 'education': return <AcademicFoundation />;
      case 'mail': return <ContactPortal />;
      case 'nova': return <Nova />;
      default: return null;
    }
  };

  const menus = [
    { id: 'apple', label: <img src="/logo.svg" className="size-4 brightness-0" alt="" />, items: [
      { label: "About Asim OS", action: () => handleAppOpen('preview') },
      { label: "System Settings...", action: () => handleAppOpen('skills') },
      { label: "Restart...", action: () => window.location.reload() },
      { label: "Shut Down...", action: () => document.body.style.backgroundColor = 'black' },
    ]},
    { id: 'file', label: "File", items: [
      { label: "New Window", action: () => handleAppOpen('finder') },
      { label: "Open", action: () => {} },
      { label: "Close Window", action: () => focusedWindow && useOSStore.getState().closeWindow(focusedWindow) },
    ]},
    { id: 'edit', label: "Edit", items: [
      { label: "Undo", action: () => {} },
      { label: "Redo", action: () => {} },
      { label: "Cut", action: () => {} },
      { label: "Copy", action: () => {} },
      { label: "Paste", action: () => {} },
    ]},
    { id: 'view', label: "View", items: [
      { label: "As Icons", action: () => {} },
      { label: "As List", action: () => {} },
      { label: "Enter Full Screen", action: () => document.documentElement.requestFullscreen() },
    ]},
  ];

  return (
    <div
        className={`fixed inset-0 w-full h-full overflow-hidden flex flex-col ${isAr ? "rtl font-cairo" : "ltr font-sans"}`}
        style={{
            backgroundColor: "#F5F5F7",
            backgroundImage: "url('/desk.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
    >

      {/* GLOBAL TOUCH/CLICK BACKGROUND HANDLER */}
      <div className="absolute inset-0 z-0" onClick={() => { closeAll(); setActiveMenu(null); setShowAppGrid(false); }} onTouchStart={() => { closeAll(); setActiveMenu(null); setShowAppGrid(false); }} />

      {/* macOS MENU BAR */}
      {!isMobile && (
        <div className="mac-menubar" ref={menubarRef}>
          <div className="flex items-center gap-1 h-full">
            {menus.map(menu => (
              <div key={menu.id} className="relative h-full flex items-center">
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === menu.id ? null : menu.id); }}
                  onMouseEnter={() => activeMenu && setActiveMenu(menu.id)}
                  className={`px-3 py-1 rounded-[4px] transition-colors ${activeMenu === menu.id ? "bg-mac-blue text-white" : "hover:bg-black/5"}`}
                >
                  {menu.label as any}
                </button>
                <AnimatePresence>
                  {activeMenu === menu.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.1 }}
                      className="mac-dropdown"
                    >
                      {menu.items.map((item, i) => (
                        <div key={i} onClick={(e) => { e.stopPropagation(); item.action(); setActiveMenu(null); }} className="mac-dropdown-item">
                          {item.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); setLocale(locale === "en" ? "ar" : "en"); }}
              className="px-2 py-0.5 rounded hover:bg-black/5 transition-colors font-bold text-[11px]"
            >
              {locale === "en" ? "EN" : "AR"}
            </button>
            <div className="flex items-center gap-2 font-bold text-[13px] text-black/80">
               {formatTime(time)}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE iOS STATUS BAR */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-10 z-[500] bg-black/5 backdrop-blur-md border-b border-black/5">
             <span className="font-black text-sm tracking-tight text-black">{formatTime(time)}</span>
             <div className="flex items-center gap-4">
                <button onClick={(e) => { e.stopPropagation(); setLocale(locale === "en" ? "ar" : "en"); }} className="h-7 px-3 rounded-full bg-black/5 text-black text-[10px] font-black border border-black/10 uppercase">
                    {locale === "en" ? "AR" : "EN"}
                </button>
                <div className="flex gap-1 items-end opacity-40">
                    <div className="w-1 h-2.5 bg-black rounded-full" />
                    <div className="w-1 h-3.5 bg-black rounded-full" />
                    <div className="w-1 h-4.5 bg-black rounded-full" />
                </div>
                <div className="w-7 h-3.5 border border-black/20 rounded-[4px] relative p-[1.5px] opacity-40">
                    <div className="h-full w-[85%] bg-black rounded-[2px]" />
                </div>
             </div>
        </div>
      )}

      {/* CONTENT AREA */}
      <div className={`relative z-10 w-full h-full overflow-hidden ${!isMobile ? "pt-7" : ""}`}>
        {children}

        {/* WINDOWS */}
        <AnimatePresence>
            {Object.values(openWindows).map((win) => (
                <Window key={win.id} id={win.id!} title={win.id!.toUpperCase()} icon={dockItems.find(i => i.id === win.id)?.icon || "📄"}>
                    {renderApp(win.id!)}
                </Window>
            ))}
        </AnimatePresence>

        {/* ORGANIZED APP GRID (LAUNCHPAD STYLE) */}
        <AnimatePresence>
            {showAppGrid && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 z-[1000] flex items-center justify-center p-20 bg-white/20 backdrop-blur-3xl"
                    onClick={() => setShowAppGrid(false)}
                >
                    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" onClick={e => e.stopPropagation()}>
                        {organizedApps.map((cat, i) => (
                            <div key={i} className="space-y-8">
                                <h3 className="text-sm font-black text-black/40 uppercase tracking-[0.3em] border-b border-black/5 pb-4">{cat.category}</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    {cat.apps.map((app, j) => (
                                        <button
                                            key={j}
                                            onClick={() => handleAppOpen('safari', { url: app.url })}
                                            className="flex flex-col items-center gap-3 group"
                                        >
                                            <div className="size-20 bg-white/40 rounded-[22%] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform p-4 backdrop-blur-md border border-white/20">
                                                <img src={app.icon} className="w-full h-full object-contain" alt={app.name} />
                                            </div>
                                            <span className="text-[11px] font-bold text-black group-hover:text-mac-blue transition-colors uppercase tracking-widest">{app.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* DOCK */}
      {!isMobile && (
        <div className="mac-dock">
          {dockItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleAppOpen(item.id)}
              className={`relative group h-12 w-12 flex items-center justify-center rounded-[12px] transition-all duration-300 hover:scale-125 hover:-translate-y-3 ${
                focusedWindow === item.id ? "bg-black/10 shadow-inner" : "hover:bg-black/5"
              }`}
            >
              <img src={item.icon} className="size-10 object-contain drop-shadow-md" alt={item.label} />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl px-3 py-1 rounded-md text-[11px] font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-black/10 shadow-lg whitespace-nowrap">
                {item.appName}
              </div>
              {openWindows[item.id] && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-black/60" />
              )}
            </button>
          ))}
          <div className="w-px h-8 bg-black/10 mx-2" />
          <button
              onClick={() => setShowAppGrid(!showAppGrid)}
              className={`relative group h-12 w-12 flex items-center justify-center rounded-[12px] transition-all duration-300 hover:scale-125 hover:-translate-y-3 ${
                showAppGrid ? "bg-black/10 shadow-inner" : "hover:bg-black/5"
              }`}
            >
              <img src="/applications.jpeg" className="size-10 object-contain drop-shadow-md" alt="Applications" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl px-3 py-1 rounded-md text-[11px] font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-black/10 shadow-lg whitespace-nowrap">
                Applications
              </div>
            </button>
        </div>
      )}

      {/* iOS TAB BAR */}
      {isMobile && (
        <div className="ios-tabbar shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-black/5">
            {dockItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => handleAppOpen(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  focusedWindow === item.id ? "text-mac-blue scale-110" : "text-black/30"
                }`}
              >
                <img src={item.icon} className="size-8 object-contain" alt={item.label} />
                <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
