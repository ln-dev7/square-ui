import { create } from "zustand";
import {
  files as initialFiles,
  folders as initialFolders,
  FileItem,
  Folder,
} from "@/mock-data/files";

type ViewMode = "grid" | "list";

interface FilesStore {
  files: FileItem[];
  folders: Folder[];
  searchQuery: string;
  viewMode: ViewMode;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleStarred: (fileId: string) => void;
  getFilteredFiles: () => FileItem[];
  getStarredFiles: () => FileItem[];
  getRecentFiles: () => FileItem[];
  getSharedFiles: () => FileItem[];
  getFilesByFolder: (folderId: string) => FileItem[];
}

export const useFilesStore = create<FilesStore>((set, get) => ({
  files: initialFiles,
  folders: initialFolders,
  searchQuery: "",
  viewMode: "list",

  setSearchQuery: (query) => set({ searchQuery: query }),

  setViewMode: (mode) => set({ viewMode: mode }),

  toggleStarred: (fileId) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === fileId ? { ...file, starred: !file.starred } : file
      ),
    })),

  getFilteredFiles: () => {
    const { files, searchQuery } = get();
    let filtered = files;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((file) =>
        file.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  getStarredFiles: () => {
    const { files } = get();
    return files.filter((file) => file.starred);
  },

  getRecentFiles: () => {
    const { files } = get();
    return files.slice(0, 5);
  },

  getSharedFiles: () => {
    const { files } = get();
    return files.filter((file) => file.shared);
  },

  getFilesByFolder: (folderId: string) => {
    const { files } = get();
    return files.filter((file) => file.folderId === folderId);
  },
}));
