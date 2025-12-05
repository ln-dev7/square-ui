import { create } from "zustand";

export type LayoutOption = "default" | "compact" | "expanded";

interface LayoutState {
  layout: LayoutOption;
  showCharts: boolean;
  showFilters: boolean;
  setLayout: (layout: LayoutOption) => void;
  setShowCharts: (show: boolean) => void;
  setShowFilters: (show: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  layout: "default",
  showCharts: true,
  showFilters: true,
  setLayout: (layout) => set({ layout }),
  setShowCharts: (show) => set({ showCharts: show }),
  setShowFilters: (show) => set({ showFilters: show }),
}));

