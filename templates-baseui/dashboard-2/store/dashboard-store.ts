import { create } from "zustand";

interface DashboardState {
  searchQuery: string;
  stageFilter: string;
  ownerFilter: string;
  valueFilter: string;
  setSearchQuery: (query: string) => void;
  setStageFilter: (filter: string) => void;
  setOwnerFilter: (filter: string) => void;
  setValueFilter: (filter: string) => void;
  clearFilters: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  searchQuery: "",
  stageFilter: "all",
  ownerFilter: "all",
  valueFilter: "all",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStageFilter: (filter) => set({ stageFilter: filter }),
  setOwnerFilter: (filter) => set({ ownerFilter: filter }),
  setValueFilter: (filter) => set({ valueFilter: filter }),
  clearFilters: () =>
    set({
      searchQuery: "",
      stageFilter: "all",
      ownerFilter: "all",
      valueFilter: "all",
    }),
}));
