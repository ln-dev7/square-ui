export type HabitColor =
  | "emerald"
  | "violet"
  | "amber"
  | "rose"
  | "sky"
  | "orange"
  | "teal";

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: HabitColor;
  targetDays: number[];
  createdAt: string;
}

export const HABIT_COLORS: Record<HabitColor, { light: string; bg: string; text: string; ring: string }> = {
  emerald: {
    light: "oklch(0.65 0.17 160)",
    bg: "bg-emerald-500/15 dark:bg-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/30",
  },
  violet: {
    light: "oklch(0.6 0.22 290)",
    bg: "bg-violet-500/15 dark:bg-violet-500/20",
    text: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-500/30",
  },
  amber: {
    light: "oklch(0.75 0.2 80)",
    bg: "bg-amber-500/15 dark:bg-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-500/30",
  },
  rose: {
    light: "oklch(0.65 0.22 10)",
    bg: "bg-rose-500/15 dark:bg-rose-500/20",
    text: "text-rose-600 dark:text-rose-400",
    ring: "ring-rose-500/30",
  },
  sky: {
    light: "oklch(0.65 0.17 220)",
    bg: "bg-sky-500/15 dark:bg-sky-500/20",
    text: "text-sky-600 dark:text-sky-400",
    ring: "ring-sky-500/30",
  },
  orange: {
    light: "oklch(0.7 0.2 50)",
    bg: "bg-orange-500/15 dark:bg-orange-500/20",
    text: "text-orange-600 dark:text-orange-400",
    ring: "ring-orange-500/30",
  },
  teal: {
    light: "oklch(0.65 0.17 185)",
    bg: "bg-teal-500/15 dark:bg-teal-500/20",
    text: "text-teal-600 dark:text-teal-400",
    ring: "ring-teal-500/30",
  },
};

export const initialHabits: Habit[] = [
  {
    id: "h1",
    name: "Meditate",
    icon: "🧘",
    color: "violet",
    targetDays: [0, 1, 2, 3, 4, 5, 6],
    createdAt: "2025-09-01",
  },
  {
    id: "h2",
    name: "Workout",
    icon: "💪",
    color: "emerald",
    targetDays: [1, 2, 3, 5],
    createdAt: "2025-09-01",
  },
  {
    id: "h3",
    name: "Read",
    icon: "📚",
    color: "amber",
    targetDays: [0, 1, 2, 3, 4, 5, 6],
    createdAt: "2025-10-15",
  },
  {
    id: "h4",
    name: "No screens before bed",
    icon: "🌙",
    color: "sky",
    targetDays: [0, 1, 2, 3, 4, 5, 6],
    createdAt: "2025-11-01",
  },
  {
    id: "h5",
    name: "Cold shower",
    icon: "🚿",
    color: "teal",
    targetDays: [1, 2, 3, 4, 5],
    createdAt: "2025-12-01",
  },
  {
    id: "h6",
    name: "Journal",
    icon: "✍️",
    color: "rose",
    targetDays: [0, 1, 2, 3, 4, 5, 6],
    createdAt: "2026-01-01",
  },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function generateHistory(habitId: string, daysBack = 365): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  const today = new Date();
  const habitIndex = parseInt(habitId.replace("h", ""));

  for (let i = 0; i < daysBack; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const seed = habitIndex * 1000 + i;

    let probability: number;
    if (i < 14) {
      probability = 0.82;
    } else if (i < 60) {
      probability = 0.72;
    } else if (i < 180) {
      probability = 0.62;
    } else {
      probability = 0.5;
    }

    result[dateStr] = seededRandom(seed) < probability;
  }

  const todayStr = today.toISOString().split("T")[0];
  delete result[todayStr];

  return result;
}

export function getStreak(history: Record<string, boolean>): number {
  const today = new Date();
  let streak = 0;
  let current = new Date(today);
  current.setDate(current.getDate() - 1);

  for (let i = 0; i < 365; i++) {
    const dateStr = current.toISOString().split("T")[0];
    if (history[dateStr]) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function getCompletionRate(history: Record<string, boolean>, days = 30): number {
  const today = new Date();
  let completed = 0;
  for (let i = 1; i <= days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    if (history[dateStr]) completed++;
  }
  return Math.round((completed / days) * 100);
}

export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}
