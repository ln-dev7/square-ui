export interface Label {
  id: string;
  name: string;
  color: string;
}

export const labels: Label[] = [
  {
    id: "work",
    name: "Work",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  },
  {
    id: "personal",
    name: "Personal",
    color: "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
  },
  {
    id: "important",
    name: "Important",
    color: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
  },
];

