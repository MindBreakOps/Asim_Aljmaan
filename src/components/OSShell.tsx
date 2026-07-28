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
    { id: "systems", label: "App Store", icon: "/appstore.jpeg", appName: "App Store" },
    { id: "mail", label: "Mail", icon: "/mails.jpeg", appName: "Mail" },
    { id: "skills", label: "Settings", icon: "/settings.jpeg", appName: "System Settings" },
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(locale === "ar" ? "ar-SA" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const isAr = locale === "ar";

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
      default: return null;
    }
  };

  const menus = [
    { id: 'apple', label: <img src="/logo.svg" className="size-4 brightness-0" alt="" />, items: [
      { label: "About Asim OS", action: () => openApp('preview') },
      { label: "System Settings...", action: () => openApp('skills') },
      { label: "Restart...", action: () => window.location.reload() },
      { label: "Shut Down...", action: () => document.body.style.backgroundColor = 'black' },
    ]},
    { id: 'file', label: "File", items: [
      { label: "New Window", action: () => openApp('finder') },
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
      <div className="absolute inset-0 z-0" onClick={closeAll} onTouchStart={closeAll} />

      {/* macOS MENU BAR */}
      {!isMobile && (
        <div className="mac-menubar" ref={menubarRef}>
          <div className="flex items-center gap-1 h-full">
            {menus.map(menu => (
              <div key={menu.id} className="relative h-full flex items-center">
                <button
                  onClick={() => setActiveMenu(activeMenu === menu.id ? null : menu.id)}
                  onMouseEnter={() => activeMenu && setActiveMenu(menu.id)}
                  className={`px-3 py-1 rounded-[4px] transition-colors ${activeMenu === menu.id ? "bg-mac-blue text-white" : "hover:bg-black/5"}`}
                >
                  {menu.label}
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
                        <div key={i} onClick={() => { item.action(); setActiveMenu(null); }} className="mac-dropdown-item">
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
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
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

      {/* CONTENT AREA */}
      <div className={`relative z-10 w-full h-full overflow-hidden ${!isMobile ? "pt-7" : "pt-14"}`}>
        {children}

        {/* WINDOWS */}
        <AnimatePresence>
            {Object.values(openWindows).map((win) => (
                <Window key={win.id} id={win.id} title={win.id.toUpperCase()} icon={dockItems.find(i => i.id === win.id)?.icon || "📄"}>
                    {renderApp(win.id)}
                </Window>
            ))}
        </AnimatePresence>
      </div>

      {/* DOCK */}
      {!isMobile && (
        <div className="mac-dock">
          {dockItems.map((item) => (
            <button
              key={item.id}
              onClick={() => openApp(item.id)}
              className={`relative group h-12 w-12 flex items-center justify-center rounded-[12px] transition-all duration-300 hover:scale-125 hover:-translate-y-3 ${
                focusedWindow === item.id ? "bg-black/10 shadow-inner" : "hover:bg-black/5"
              }`}
            >
              {item.icon.endsWith('.jpeg') ? (
                <img src={item.icon} className="size-10 object-contain drop-shadow-md" alt={item.label} />
              ) : (
                <span className="text-2xl">{item.icon}</span>
              )}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl px-3 py-1 rounded-md text-[11px] font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-black/10 shadow-lg whitespace-nowrap">
                {item.appName}
              </div>
              {openWindows[item.id] && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-black/60" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* iOS TAB BAR */}
      {isMobile && (
        <div className="ios-tabbar">
            {dockItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => openApp(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  focusedWindow === item.id ? "text-mac-blue scale-110" : "text-black/30"
                }`}
              >
                {item.icon.endsWith('.jpeg') ? (
                    <img src={item.icon} className="size-8 object-contain" alt={item.label} />
                ) : (
                    <span className="text-2xl">{item.icon}</span>
                )}
                <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
