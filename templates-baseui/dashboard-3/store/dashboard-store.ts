import { create } from "zustand";

export type LayoutDensity = "default" | "compact" | "comfortable";

interface DashboardState {
  searchQuery: string;
  departmentFilter: string;
  statusFilter: string;
  setSearchQuery: (query: string) => void;
  setDepartmentFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  clearFilters: () => void;
  
  // Layout options
  showAlertBanner: boolean;
  showStatsCards: boolean;
  showChart: boolean;
  showTable: boolean;
  layoutDensity: LayoutDensity;
  setShowAlertBanner: (show: boolean) => void;
  setShowStatsCards: (show: boolean) => void;
  setShowChart: (show: boolean) => void;
  setShowTable: (show: boolean) => void;
  setLayoutDensity: (density: LayoutDensity) => void;
  resetLayout: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  searchQuery: "",
  departmentFilter: "all",
  statusFilter: "all",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setDepartmentFilter: (filter) => set({ departmentFilter: filter }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  clearFilters: () =>
    set({
      searchQuery: "",
      departmentFilter: "all",
      statusFilter: "all",
    }),
    
  // Layout options
  showAlertBanner: true,
  showStatsCards: true,
  showChart: true,
  showTable: true,
  layoutDensity: "default",
  setShowAlertBanner: (show) => set({ showAlertBanner: show }),
  setShowStatsCards: (show) => set({ showStatsCards: show }),
  setShowChart: (show) => set({ showChart: show }),
  setShowTable: (show) => set({ showTable: show }),
  setLayoutDensity: (density) => set({ layoutDensity: density }),
  resetLayout: () =>
    set({
      showAlertBanner: true,
      showStatsCards: true,
      showChart: true,
      showTable: true,
      layoutDensity: "default",
    }),
}));

