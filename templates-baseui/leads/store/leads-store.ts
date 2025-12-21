import { create } from "zustand";

export type LeadStatus = "new" | "contacted" | "qualified" | "negotiation" | "inactive" | "recycled";
export type LeadSource = "website" | "paid_ads" | "referral" | "social" | "email";
export type DateFilter = "all" | "today" | "yesterday" | "last_7_days" | "last_30_days" | "this_month";

interface LeadsState {
  searchQuery: string;
  statusFilter: LeadStatus | "all";
  sourceFilter: LeadSource | "all";
  ownerFilter: string;
  dateFilter: DateFilter;
  currentPage: number;
  itemsPerPage: number;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: LeadStatus | "all") => void;
  setSourceFilter: (filter: LeadSource | "all") => void;
  setOwnerFilter: (filter: string) => void;
  setDateFilter: (filter: DateFilter) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  clearFilters: () => void;
}

export const useLeadsStore = create<LeadsState>((set) => ({
  searchQuery: "",
  statusFilter: "all",
  sourceFilter: "all",
  ownerFilter: "all",
  dateFilter: "this_month",
  currentPage: 1,
  itemsPerPage: 10,
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setStatusFilter: (filter) => set({ statusFilter: filter, currentPage: 1 }),
  setSourceFilter: (filter) => set({ sourceFilter: filter, currentPage: 1 }),
  setOwnerFilter: (filter) => set({ ownerFilter: filter, currentPage: 1 }),
  setDateFilter: (filter) => set({ dateFilter: filter, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items, currentPage: 1 }),
  clearFilters: () =>
    set({
      searchQuery: "",
      statusFilter: "all",
      sourceFilter: "all",
      ownerFilter: "all",
      dateFilter: "this_month",
      currentPage: 1,
    }),
}));
