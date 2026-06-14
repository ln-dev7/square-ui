import { create } from "zustand";
import { Project, projects, Priority } from "@/mock-data/projects";
import { startOfWeek } from "date-fns";

interface ProjectsState {
  projects: Project[];
  searchQuery: string;
  priorityFilter: Priority | null;
  currentWeekStart: Date;
  showAvatars: boolean;
  showPriority: boolean;
  setSearchQuery: (query: string) => void;
  setPriorityFilter: (priority: Priority | null) => void;
  setShowAvatars: (show: boolean) => void;
  setShowPriority: (show: boolean) => void;
  goToNextWeek: () => void;
  goToPreviousWeek: () => void;
  goToToday: () => void;
  goToDate: (date: Date) => void;
  filteredProjects: () => Project[];
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: projects,
  searchQuery: "",
  priorityFilter: null,
  currentWeekStart: startOfWeek(new Date(), { weekStartsOn: 1 }),
  showAvatars: true,
  showPriority: true,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setPriorityFilter: (priority) => set({ priorityFilter: priority }),

  setShowAvatars: (show) => set({ showAvatars: show }),

  setShowPriority: (show) => set({ showPriority: show }),

  goToNextWeek: () => {
    const { currentWeekStart } = get();
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    set({ currentWeekStart: nextWeek });
  },

  goToPreviousWeek: () => {
    const { currentWeekStart } = get();
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    set({ currentWeekStart: prevWeek });
  },

  goToToday: () => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    set({ currentWeekStart: weekStart });
  },

  goToDate: (date: Date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    set({ currentWeekStart: weekStart });
  },

  filteredProjects: () => {
    const { projects, searchQuery, priorityFilter } = get();
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priorityFilter) {
      filtered = filtered.filter(
        (project) => project.priority === priorityFilter
      );
    }

    return filtered;
  },

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  updateProject: (projectId, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      ),
    })),

  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
}));
