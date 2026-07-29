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
import Article from "./Apps/Article";
import SystemManual from "./Apps/SystemManual";
import Gallery from "./Apps/Gallery";
import SystemsShowcase from "./SystemsShowcase";
import SystemSettings from "./SystemSettings";
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
    { id: "gallery", label: "Gallery", icon: "/applications.jpeg", appName: "Gallery" },
    { id: "nova", label: "Nova", icon: "/nova.jpeg", appName: "Nova Editor" },
    { id: "preview", label: "Preview", icon: "/preview.jpeg", appName: "Preview" },
    { id: "manual", label: "Solutions", icon: "/preview.jpeg", appName: "Tech Solutions" },
    { id: "terminal", label: "Terminal", icon: "/terminal.jpeg", appName: "Terminal" },
    { id: "mail", label: "Mail", icon: "/mails.jpeg", appName: "Mail" },
    { id: "skills", label: "Settings", icon: "/settings.jpeg", appName: "System Settings" },
  ];

  const organizedApps = [
    {
      category: "Business Apps",
      apps: [
        { name: "HRIS", icon: "/apps/hro.svg", url: "https://hris.operix-solutions.online" },
        { name: "FMIS", icon: "/apps/fmis.png", url: "https://www.fmis.operix-solutions.online" },
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
        { name: "Education", icon: "/apps/edu.png", url: "https://www.edu.operix-solutions.online" },
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
    if (id === 'gallery' && !data) {
        openApp('gallery', {
            items: [
                '/projects/hris.png',
                '/projects/fmis.png',
                '/projects/ops.png',
                '/projects/care.png',
                '/projects/abbas.png',
                '/projects/naseem.png',
                '/projects/valet.png',
                '/projects/mamey.png',
                '/projects/ops-dash.png',
                '/projects/opx-sud.jpeg',
                '/projects/opx-edu-cover.jpeg'
            ]
        });
    } else {
        openApp(id, data);
    }
  };

  const renderApp = (id: AppID) => {
    switch (id) {
      case 'safari': return <Safari />;
      case 'terminal': return <Terminal />;
      case 'finder': return <Finder />;
      case 'preview': return <Preview />;
      case 'systems': return <SystemsShowcase />;
      case 'skills': return <SystemSettings />;
      case 'education': return <AcademicFoundation />;
      case 'mail': return <ContactPortal />;
      case 'nova': return <Nova />;
      case 'article': return <Article />;
      case 'manual': return <SystemManual />;
      case 'gallery': return <Gallery />;
      default: return null;
    }
  };

  const menus = [
    { id: 'apple', label: <img src="/logo.svg" className="size-4 brightness-0" alt="" />, items: [
      { label: "About Asim OS", action: () => handleAppOpen('preview') },
      { label: "Tech Solutions", action: () => handleAppOpen('manual') },
      { label: "Article Insight", action: () => handleAppOpen('article') },
      { label: "System Settings...", action: () => handleAppOpen('skills') },
      { label: "Restart...", action: () => window.location.reload() },
      { label: "Shut Down...", action: () => document.body.style.backgroundColor = 'black' },
    ]},
    { id: 'file', label: "File", items: [
      { label: "New Window", action: () => handleAppOpen('finder') },
      { label: "Open Archive", action: () => handleAppOpen('finder') },
      { label: "Close Window", action: () => focusedWindow && useOSStore.getState().closeWindow(focusedWindow) },
      { label: "Close All Apps", action: () => closeAll() },
    ]},
    { id: 'view', label: "View", items: [
      { label: "Launchpad", action: () => setShowAppGrid(true) },
      { label: "Enter Full Screen", action: () => document.documentElement.requestFullscreen() },
    ]},
    { id: 'windows', label: "Windows", items: Object.values(openWindows).filter(w => w && w.id).map(w => ({
        label: `Focus ${w!.id.toUpperCase()}`,
        action: () => focusWindow(w!.id)
    }))},
  ];

  return (
    <div
        className={`fixed inset-0 w-full h-full overflow-hidden flex flex-col ${isAr ? "rtl font-cairo" : "ltr font-sans"}`}
        style={{
            backgroundColor: "#F5F5F7",
        }}
    >

      {/* GLOBAL TOUCH/CLICK BACKGROUND HANDLER */}
      <div className="absolute inset-0 z-0" onClick={() => { setActiveMenu(null); setShowAppGrid(false); }} onTouchStart={() => { setActiveMenu(null); setShowAppGrid(false); }} />

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
                      {menu.items.length > 0 ? menu.items.map((item, i) => (
                        <div key={i} onClick={(e) => { e.stopPropagation(); item.action(); setActiveMenu(null); }} className="mac-dropdown-item">
                          {item.label}
                        </div>
                      )) : (
                        <div className="px-3 py-2 text-[11px] text-black/20 font-bold uppercase tracking-widest italic">No Open Windows</div>
                      )}
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
        <div className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-6 z-[2000] bg-white/70 backdrop-blur-md border-b border-black/5">
             <span className="font-black text-sm tracking-tight text-black">{formatTime(time)}</span>
             <div className="flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); setLocale(locale === "en" ? "ar" : "en"); }} className="h-7 px-3 rounded-full bg-black/5 text-black text-[10px] font-black border border-black/10 uppercase active:scale-95 transition-transform">
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
      <div className={`relative z-10 w-full h-full overflow-hidden ${!isMobile ? "pt-7" : "pt-14"}`}>
        {children}

        {/* WINDOWS */}
        <AnimatePresence>
            {Object.values(openWindows).filter(win => win && win.id).map((win) => (
                <Window key={win!.id} id={win!.id} title={win!.id.toUpperCase()} icon={dockItems.find(i => i.id === win!.id)?.icon || "📄"}>
                    {renderApp(win!.id)}
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
                    className="fixed inset-0 z-[3000] flex items-center justify-center p-6 md:p-20 bg-white/20 backdrop-blur-3xl"
                    onClick={() => setShowAppGrid(false)}
                >
                    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 overflow-y-auto max-h-[80vh] custom-scrollbar p-4" onClick={e => e.stopPropagation()}>
                        {organizedApps.map((cat, i) => (
                            <div key={i} className="space-y-4 md:space-y-8">
                                <h3 className="text-[10px] md:text-sm font-black text-black/40 uppercase tracking-[0.3em] border-b border-black/5 pb-2 md:pb-4">{cat.category}</h3>
                                <div className="grid grid-cols-2 gap-4 md:gap-8">
                                    {cat.apps.map((app, j) => (
                                        <button
                                            key={j}
                                            onClick={() => handleAppOpen('safari', { url: app.url })}
                                            className="flex flex-col items-center gap-2 md:gap-3 group active:scale-95 transition-transform"
                                        >
                                            <div className="size-16 md:size-20 bg-white/40 rounded-[22%] flex items-center justify-center shadow-xl md:shadow-2xl group-hover:scale-110 transition-transform p-3 md:p-4 backdrop-blur-md border border-white/20">
                                                <img src={app.icon} className="w-full h-full object-contain rounded-[22%]" alt={app.name} />
                                            </div>
                                            <span className="text-[9px] md:text-[11px] font-bold text-black group-hover:text-mac-blue transition-colors uppercase tracking-widest">{app.name}</span>
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
              onClick={(e) => handleAppOpen(item.id)}
              className={`relative group h-12 w-12 flex items-center justify-center rounded-[12px] transition-all duration-300 hover:scale-125 hover:-translate-y-3 ${
                focusedWindow === item.id ? "bg-black/10 shadow-inner" : "hover:bg-black/5"
              }`}
            >
              <img src={item.icon} className="size-10 object-contain drop-shadow-md rounded-[22%]" alt={item.label} />
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
              <img src="/applications.jpeg" className="size-10 object-contain drop-shadow-md rounded-[22%]" alt="Applications" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl px-3 py-1 rounded-md text-[11px] font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-black/10 shadow-lg whitespace-nowrap">
                Applications
              </div>
            </button>
        </div>
      )}

      {/* iOS TAB BAR */}
      {isMobile && (
        <div className="ios-tabbar shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            {dockItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleAppOpen(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 active:scale-110 ${
                  focusedWindow === item.id ? "text-mac-blue" : "text-black/30"
                }`}
              >
                <img src={item.icon} className="size-8 object-contain rounded-[22%]" alt={item.label} />
                <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
              </button>
            ))}
             <button
                onClick={() => setShowAppGrid(!showAppGrid)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 active:scale-110 ${
                  showAppGrid ? "text-mac-blue" : "text-black/30"
                }`}
              >
                <img src="/applications.jpeg" className="size-8 object-contain rounded-[22%]" alt="Apps" />
                <span className="text-[10px] font-bold uppercase tracking-tight">Apps</span>
              </button>
        </div>
      )}
    </div>
  );
}
