import { create } from "zustand";
import { LeadType, LeadStatus, LeadSource } from "@/mock-data/dashboard";

interface DashboardStore {
  searchQuery: string;
  typeFilter: LeadType | "all";
  statusFilter: LeadStatus | "all";
  sourceFilter: LeadSource | "all";
  sortBy: "name" | "email" | "followUp" | "status" | "score";
  sortOrder: "asc" | "desc";
  chartPeriod: "last_week" | "last_month" | "last_quarter";
  currentPage: number;
  itemsPerPage: number;
  setSearchQuery: (query: string) => void;
  setTypeFilter: (filter: LeadType | "all") => void;
  setStatusFilter: (filter: LeadStatus | "all") => void;
  setSourceFilter: (filter: LeadSource | "all") => void;
  setSortBy: (sort: "name" | "email" | "followUp" | "status" | "score") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setChartPeriod: (period: "last_week" | "last_month" | "last_quarter") => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  clearFilters: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  searchQuery: "",
  typeFilter: "all",
  statusFilter: "all",
  sourceFilter: "all",
  sortBy: "name",
  sortOrder: "asc",
  chartPeriod: "last_month",
  currentPage: 1,
  itemsPerPage: 10,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setTypeFilter: (filter) => set({ typeFilter: filter, currentPage: 1 }),
  setStatusFilter: (filter) => set({ statusFilter: filter, currentPage: 1 }),
  setSourceFilter: (filter) => set({ sourceFilter: filter, currentPage: 1 }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setChartPeriod: (period) => set({ chartPeriod: period }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items, currentPage: 1 }),
  clearFilters: () =>
    set({
      searchQuery: "",
      typeFilter: "all",
      statusFilter: "all",
      sourceFilter: "all",
      sortBy: "name",
      sortOrder: "asc",
      currentPage: 1,
    }),
}));


