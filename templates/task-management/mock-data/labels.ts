export interface Label {
  id: string;
  name: string;
  color: string;
}

export const labels: Label[] = [
  {
    id: "design",
    name: "Design",
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400",
  },
  {
    id: "marketing",
    name: "Marketing",
    color:
      "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
  },
  {
    id: "product",
    name: "Product",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-400",
  },
  {
    id: "new-releases",
    name: "New releases",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
  },
  {
    id: "new-features",
    name: "New features",
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400",
  },
];
