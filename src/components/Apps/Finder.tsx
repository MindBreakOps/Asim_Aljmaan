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
        { id: "solutions", name: "Tech_Solutions.app", icon: "/preview.jpeg", app: "manual" },
        { id: "archive", name: "Dossier_Archive", icon: "/folder.jpeg", app: "finder" },
    ],
    Documents: [
        { id: "op_ops", name: "OPERIX_Operations.webloc", icon: "/apps/ops.svg", app: "safari", url: "https://ops.operix-solutions.online" },
        { id: "op_fmis", name: "OPERIX_FMIS.webloc", icon: "/apps/fmis.png", app: "safari", url: "https://www.fmis.operix-solutions.online" },
        { id: "op_hris", name: "OPERIX_HRIS.webloc", icon: "/apps/hro.svg", app: "safari", url: "https://hris.operix-solutions.online" },
        { id: "op_care", name: "OPERIX_Health_Care.webloc", icon: "/apps/care.svg", app: "safari", url: "https://care.operix-solutions.online" },
        { id: "op_edu", name: "OPERIX_Edu.webloc", icon: "/apps/edu.png", app: "safari", url: "https://www.edu.operix-solutions.online" },
        { id: "binabbas", name: "BinAbbas_Portal.webloc", icon: "/apps/binabbas.png", app: "safari", url: "https://www.binabbas.operix-solutions.online" },
        { id: "hasad", name: "Hasad_Hub.webloc", icon: "/apps/hasad.png", app: "safari", url: "https://www.hasad.operix-solutions.online" },
        { id: "data_analysis", name: "Data_Analysis_Insight.zip", icon: "/zip.jpeg", app: "download_all" },
    ],
    Downloads: [
        { id: "setup", name: "OPERIX_Installer.pkg", icon: "/zip.jpeg", app: "none" },
    ],
    Applications: [
        { id: "safari", name: "Safari.app", icon: "/safari.jpeg", app: "safari" },
        { id: "terminal", name: "Terminal.app", icon: "/terminal.jpeg", app: "terminal" },
        { id: "nova", name: "Nova.app", icon: "/nova.jpeg", app: "nova" },
        { id: "op_care", name: "OPERIX_Care.app", icon: "/apps/care.svg", app: "safari", url: "https://care.operix-solutions.online" },
        { id: "op_hris", name: "OPERIX_HRIS.app", icon: "/apps/hro.svg", app: "safari", url: "https://hris.operix-solutions.online" },
        { id: "op_ops", name: "OPERIX_Ops.app", icon: "/apps/ops.svg", app: "safari", url: "https://ops.operix-solutions.online" },
        { id: "op_hasad", name: "Hasad_Systems.app", icon: "/apps/hasad.png", app: "safari", url: "https://www.hasad.operix-solutions.online" },
        { id: "op_binabbas", name: "BinAbbas_Group.app", icon: "/apps/binabbas.png", app: "safari", url: "https://www.binabbas.operix-solutions.online" },
        { id: "op_edu", name: "OPERIX_Edu.app", icon: "/apps/edu.png", app: "safari", url: "https://www.edu.operix-solutions.online" },
        { id: "op_fmis", name: "OPERIX_FMIS.app", icon: "/apps/fmis.png", app: "safari", url: "https://www.fmis.operix-solutions.online" },
    ]
  };

  const handleFileAction = (file: any) => {
    if (file.app === 'none') return;

    if (file.app === 'download_all') {
        // Trigger multi download: CV and Article (Article.tsx content simulated as PDF if needed, but here we trigger link)
        const links = ['/Asim_Ahmed_CV.pdf', '/Asim_Ahmed_CV.pdf']; // Article PDF placeholder
        links.forEach((url, i) => {
            setTimeout(() => {
                const a = document.createElement('a');
                a.href = url;
                a.download = url.split('/').pop() || 'document.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }, i * 500);
        });
        return;
    }

    if (file.app === 'safari' && file.url) {
        openApp('safari', { url: file.url });
    } else {
        openApp(file.app as any);
    }
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
                    <img src={item.icon} className="size-5 object-contain rounded-[22%]" alt="" />
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
            onDoubleClick={() => handleFileAction(file)}
            onClick={() => {
                if (window.innerWidth < 768) handleFileAction(file);
            }}
            className="flex flex-col items-center gap-2 group cursor-default p-2 rounded-lg hover:bg-black/5 border border-transparent transition-all"
          >
            <img src={file.icon} className="size-16 drop-shadow-md group-hover:scale-105 transition-transform rounded-[22%]" alt={file.name} />
            <span className="text-[12px] font-medium text-center break-all px-1 leading-tight">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
