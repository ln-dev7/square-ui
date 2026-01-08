"use client";

import { Bookmark, Star, Tag, FolderOpen } from "lucide-react";
import { useBookmarksStore } from "@/store/bookmarks-store";
import { collections, tags } from "@/mock-data/bookmarks";

const stats = [
  {
    label: "Total Bookmarks",
    icon: Bookmark,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    label: "Favorites",
    icon: Star,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    label: "Collections",
    icon: FolderOpen,
    color: "bg-violet-500/10 text-violet-500",
  },
  {
    label: "Tags Used",
    icon: Tag,
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

export function StatsCards() {
  const { bookmarks } = useBookmarksStore();

  const values = [
    bookmarks.length,
    bookmarks.filter((b) => b.isFavorite).length,
    collections.length - 1,
    tags.length,
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 p-4 rounded-xl border bg-card"
        >
          <div
            className={`size-10 rounded-lg ${stat.color} flex items-center justify-center`}
          >
            <stat.icon className="size-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{values[index]}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

