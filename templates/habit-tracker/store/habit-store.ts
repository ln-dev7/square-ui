import { create } from "zustand";
import {
  initialHabits,
  generateHistory,
  getTodayString,
  type Habit,
  type HabitColor,
} from "@/mock-data/habits";

type Completions = Record<string, Record<string, boolean>>;

function buildInitialCompletions(): Completions {
  const result: Completions = {};
  for (const habit of initialHabits) {
    result[habit.id] = generateHistory(habit.id);
  }
  return result;
}

interface HabitStore {
  habits: Habit[];
  completions: Completions;
  selectedHabitId: string | null;
  newHabitName: string;
  newHabitIcon: string;
  newHabitColor: HabitColor;

  selectHabit: (id: string | null) => void;
  toggleCompletion: (habitId: string, date: string) => void;
  addHabit: () => void;
  deleteHabit: (id: string) => void;
  setNewHabitName: (name: string) => void;
  setNewHabitIcon: (icon: string) => void;
  setNewHabitColor: (color: HabitColor) => void;
  isCompletedToday: (habitId: string) => boolean;
  resetNewHabit: () => void;
}

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: initialHabits,
  completions: buildInitialCompletions(),
  selectedHabitId: null,
  newHabitName: "",
  newHabitIcon: "⭐",
  newHabitColor: "violet",

  selectHabit: (id) => set({ selectedHabitId: id }),

  toggleCompletion: (habitId, date) =>
    set((state) => {
      const current = state.completions[habitId] ?? {};
      return {
        completions: {
          ...state.completions,
          [habitId]: { ...current, [date]: !current[date] },
        },
      };
    }),

  addHabit: () => {
    const { newHabitName, newHabitIcon, newHabitColor, habits, completions } = get();
    if (!newHabitName.trim()) return;
    const id = `h${Date.now()}`;
    const newHabit: Habit = {
      id,
      name: newHabitName.trim(),
      icon: newHabitIcon,
      color: newHabitColor,
      targetDays: [0, 1, 2, 3, 4, 5, 6],
      createdAt: getTodayString(),
    };
    set({
      habits: [...habits, newHabit],
      completions: { ...completions, [id]: {} },
      newHabitName: "",
      newHabitIcon: "⭐",
      newHabitColor: "violet",
    });
  },

  deleteHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((h) => h.id !== id),
      selectedHabitId: state.selectedHabitId === id ? null : state.selectedHabitId,
    })),

  setNewHabitName: (name) => set({ newHabitName: name }),
  setNewHabitIcon: (icon) => set({ newHabitIcon: icon }),
  setNewHabitColor: (color) => set({ newHabitColor: color }),

  resetNewHabit: () => set({ newHabitName: "", newHabitIcon: "⭐", newHabitColor: "violet" }),

  isCompletedToday: (habitId) => {
    const { completions } = get();
    return !!completions[habitId]?.[getTodayString()];
  },
}));
