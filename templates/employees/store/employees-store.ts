import { create } from "zustand";
import { employees as initialEmployees, Employee, EmployeeStatus, Department } from "@/mock-data/employees";

export type DateFilter = "all" | "today" | "yesterday" | "last7days" | "last30days";

interface EmployeesState {
  employees: Employee[];
  searchQuery: string;
  statusFilter: EmployeeStatus | "all";
  dateFilter: DateFilter;
  departmentFilter: Department | "all";
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: EmployeeStatus | "all") => void;
  setDateFilter: (date: DateFilter) => void;
  setDepartmentFilter: (department: Department | "all") => void;
  clearAllFilters: () => void;
}

export const useEmployeesStore = create<EmployeesState>((set) => ({
  employees: initialEmployees,
  searchQuery: "",
  statusFilter: "all",
  dateFilter: "all",
  departmentFilter: "all",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setDateFilter: (date) => set({ dateFilter: date }),
  setDepartmentFilter: (department) => set({ departmentFilter: department }),
  clearAllFilters: () => set({ 
    searchQuery: "", 
    statusFilter: "all", 
    dateFilter: "all",
    departmentFilter: "all"
  }),
}));

