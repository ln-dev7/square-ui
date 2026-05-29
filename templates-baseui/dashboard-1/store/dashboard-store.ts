import { create } from "zustand";
import { mockPeople, type Person } from "@/mock-data/people";
import { mockDocuments, type Document } from "@/mock-data/documents";
import { mockChartData, type ChartDataPoint } from "@/mock-data/chart";
import { mockStats, type StatCard } from "@/mock-data/stats";

interface DashboardState {
  people: Person[];
  documents: Document[];
  chartData: ChartDataPoint[];
  stats: StatCard[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getFilteredPeople: () => Person[];
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  people: mockPeople,
  documents: mockDocuments,
  chartData: mockChartData,
  stats: mockStats,
  searchQuery: "",
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
  getFilteredPeople: () => {
    const { people, searchQuery } = get();
    if (!searchQuery) return people;
    const query = searchQuery.toLowerCase();
    return people.filter(
      (person) =>
        person.name.toLowerCase().includes(query) ||
        person.email.toLowerCase().includes(query) ||
        person.jobTitle.toLowerCase().includes(query) ||
        person.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  },
}));

