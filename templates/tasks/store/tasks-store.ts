import { create } from "zustand";
import { Task, tasks, groupTasksByStatus } from "@/mock-data/tasks";
import { Status, statuses } from "@/mock-data/statuses";

interface TasksState {
  tasks: Task[];
  tasksByStatus: Record<string, Task[]>;
  searchQuery: string;
  priorityFilter: "low" | "medium" | "urgent" | null;
  setSearchQuery: (query: string) => void;
  setPriorityFilter: (priority: "low" | "medium" | "urgent" | null) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  updateTaskStatus: (taskId: string, status: Status) => void;
  getFilteredTasks: () => Task[];
  getFilteredTasksByStatus: () => Record<string, Task[]>;
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: tasks,
  tasksByStatus: groupTasksByStatus(tasks),
  searchQuery: "",
  priorityFilter: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setPriorityFilter: (priority) => set({ priorityFilter: priority }),

  addTask: (task) =>
    set((state) => {
      const newTasks = [...state.tasks, task];
      return {
        tasks: newTasks,
        tasksByStatus: groupTasksByStatus(newTasks),
      };
    }),

  updateTask: (taskId, updates) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      );
      return {
        tasks: newTasks,
        tasksByStatus: groupTasksByStatus(newTasks),
      };
    }),

  deleteTask: (taskId) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== taskId);
      return {
        tasks: newTasks,
        tasksByStatus: groupTasksByStatus(newTasks),
      };
    }),

  updateTaskStatus: (taskId, status) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      );
      return {
        tasks: newTasks,
        tasksByStatus: groupTasksByStatus(newTasks),
      };
    }),

  getFilteredTasks: () => {
    const { tasks, searchQuery, priorityFilter } = get();
    let filtered = tasks;

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.project.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priorityFilter) {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    return filtered;
  },

  getFilteredTasksByStatus: () => {
    const filteredTasks = get().getFilteredTasks();
    return statuses.reduce<Record<string, Task[]>>((acc, status) => {
      acc[status.id] = filteredTasks.filter(
        (task) => task.status.id === status.id
      );
      return acc;
    }, {});
  },
}));
