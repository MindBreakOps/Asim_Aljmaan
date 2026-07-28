"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useOSStore, FolderID } from "@/store/useOSStore";

export default function Finder() {
  const { locale } = useLanguage();
  const { openApp, activeFolder, setActiveFolder } = useOSStore();
  const isAr = locale === "ar";

  const sidebar = [
    { name: "Favorites", items: [
        { id: 'Desktop', name: "Desktop", icon: "/finder.jpeg" },
        { id: 'Documents', name: "Documents", icon: "/documents.jpeg" },
        { id: 'Downloads', name: "Downloads", icon: "/downloads.jpeg" },
        { id: 'Applications', name: "Applications", icon: "/applications.jpeg" }
    ] as { id: FolderID, name: string, icon: string }[] },
  ];

  const content: Record<FolderID, any[]> = {
    Desktop: [
        { id: "cv", name: "Asim_Ahmed_CV.pdf", icon: "/preview.jpeg", app: "preview" },
        { id: "op_main", name: "Operix_Solutions.app", icon: "/main.png", app: "safari" },
        { id: "op_249", name: "Operix_Sudan.app", icon: "/249.png", app: "safari" },
        { id: "op_online", name: "Operix_Reversed.app", icon: "/reversed.png", app: "safari" },
        { id: "archive", name: "Dossier_Archive", icon: "/folder.jpeg", app: "finder" },
    ],
    Documents: [
        { id: "cert1", name: "Cybersecurity_Cert.pdf", icon: "/preview.jpeg", app: "preview" },
        { id: "cert2", name: "Data_Analysis_Cert.zip", icon: "/zip.jpeg", app: "none" },
    ],
    Downloads: [
        { id: "setup", name: "OPERIX_Installer.pkg", icon: "/zip.jpeg", app: "none" },
    ],
    Applications: [
        { id: "safari", name: "Safari.app", icon: "/safari.jpeg", app: "safari" },
        { id: "terminal", name: "Terminal.app", icon: "/terminal.jpeg", app: "terminal" },
        { id: "appstore", name: "App Store.app", icon: "/appstore.jpeg", app: "systems" },
    ]
  };

  return (
    <div className="w-full h-full flex bg-white text-black font-sans">
      {/* Sidebar */}
      <div className="w-48 bg-[#F2F2F7]/50 backdrop-blur-md border-r border-black/5 p-3 flex flex-col gap-6 shrink-0">
        {sidebar.map((group) => (
          <div key={group.name} className="space-y-1">
             <div className="text-[10px] font-bold text-black/30 uppercase tracking-widest pl-2 mb-2">{group.name}</div>
             {group.items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveFolder(item.id)}
                    className={`w-full px-2 py-1.5 rounded-md text-[13px] font-medium flex items-center gap-3 transition-colors ${activeFolder === item.id ? "bg-black/10" : "hover:bg-black/5"}`}
                >
                    <img src={item.icon} className="size-5 object-contain" alt="" />
                    {item.name}
                </button>
             ))}
          </div>
        ))}
      </div>

      {/* Grid Content */}
      <div className="flex-1 p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 overflow-y-auto content-start bg-white">
        {content[activeFolder].map((file) => (
          <div
            key={file.id}
            onDoubleClick={() => file.app !== 'none' && openApp(file.app as any)}
            className="flex flex-col items-center gap-2 group cursor-default p-2 rounded-lg hover:bg-black/5 border border-transparent transition-all"
          >
            <img src={file.icon} className="size-16 drop-shadow-md group-hover:scale-105 transition-transform" alt={file.name} />
            <span className="text-[12px] font-medium text-center break-all px-1 leading-tight">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
