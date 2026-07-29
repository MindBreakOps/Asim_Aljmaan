import { create } from 'zustand';

export type AppID = 'finder' | 'safari' | 'terminal' | 'preview' | 'systems' | 'skills' | 'education' | 'mail' | 'nova' | 'article' | 'manual' | 'gallery' | 'none';
export type FolderID = 'Desktop' | 'Documents' | 'Downloads' | 'Applications';

interface WindowState {
  id: AppID;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  data?: any;
}

interface OSStore {
  openWindows: Partial<Record<AppID, WindowState>>;
  focusedWindow: AppID | null;
  maxZIndex: number;
  activeFolder: FolderID;
  activeMenu: string | null;

  openApp: (id: AppID, data?: any) => void;
  closeWindow: (id: AppID) => void;
  focusWindow: (id: AppID) => void;
  minimizeWindow: (id: AppID) => void;
  setActiveFolder: (folder: FolderID) => void;
  setActiveMenu: (menu: string | null) => void;
  closeAll: () => void;
}

export const useOSStore = create<OSStore>((set, get) => ({
  openWindows: {} as Record<AppID, WindowState>,
  focusedWindow: null,
  maxZIndex: 100,
  activeFolder: 'Desktop',
  activeMenu: null,

  openApp: (id, data) => {
    if (id === 'none') return;
    const { openWindows, maxZIndex } = get();
    const newZ = maxZIndex + 1;

    set({
      openWindows: {
        ...openWindows,
        [id]: { id, isOpen: true, isMinimized: false, zIndex: newZ, data }
      },
      focusedWindow: id,
      maxZIndex: newZ,
      activeMenu: null
    });
  },

  closeWindow: (id) => {
    const { openWindows } = get();
    const newWindows = { ...openWindows };
    delete newWindows[id];
    set({ openWindows: newWindows, focusedWindow: null });
  },

  focusWindow: (id) => {
    const { openWindows, maxZIndex, focusedWindow } = get();
    if (focusedWindow === id) return;

    const newZ = maxZIndex + 1;
    set({
      openWindows: {
        ...openWindows,
        [id]: { ...openWindows[id], zIndex: newZ, isMinimized: false }
      },
      focusedWindow: id,
      maxZIndex: newZ,
      activeMenu: null
    });
  },

  minimizeWindow: (id) => {
    const { openWindows } = get();
    set({
      openWindows: {
        ...openWindows,
        [id]: { ...openWindows[id], isMinimized: true }
      },
      focusedWindow: null
    });
  },

  setActiveFolder: (folder) => set({ activeFolder: folder }),
  setActiveMenu: (menu) => set({ activeMenu: menu }),

  closeAll: () => set({ openWindows: {} as Record<AppID, WindowState>, focusedWindow: null, activeMenu: null })
}));
