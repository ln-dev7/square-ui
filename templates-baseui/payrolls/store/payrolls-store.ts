import { create } from "zustand";
import { payrolls as initialPayrolls, Payroll, PayrollStatus, PaymentMethod } from "@/mock-data/payrolls";

export type DateFilter = "all" | "today" | "yesterday" | "last7days" | "last30days";

interface PayrollsState {
  payrolls: Payroll[];
  searchQuery: string;
  statusFilter: PayrollStatus | "all";
  dateFilter: DateFilter;
  paymentMethodFilter: PaymentMethod | "all";
  periodFilter: "30days" | "3months" | "1year";
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: PayrollStatus | "all") => void;
  setDateFilter: (date: DateFilter) => void;
  setPaymentMethodFilter: (method: PaymentMethod | "all") => void;
  setPeriodFilter: (period: "30days" | "3months" | "1year") => void;
  clearAllFilters: () => void;
}

export const usePayrollsStore = create<PayrollsState>((set) => ({
  payrolls: initialPayrolls,
  searchQuery: "",
  statusFilter: "all",
  dateFilter: "all",
  paymentMethodFilter: "all",
  periodFilter: "30days",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setDateFilter: (date) => set({ dateFilter: date }),
  setPaymentMethodFilter: (method) => set({ paymentMethodFilter: method }),
  setPeriodFilter: (period) => set({ periodFilter: period }),
  clearAllFilters: () => set({ 
    searchQuery: "", 
    statusFilter: "all", 
    dateFilter: "all",
    paymentMethodFilter: "all"
  }),
}));

