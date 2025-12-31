"use client";

import { cn } from "@/lib/utils";

const tags = [
  { id: "all", label: "All", count: 12 },
  { id: "images", label: "Images", count: 4 },
  { id: "documents", label: "Documents", count: 5 },
  { id: "videos", label: "Videos", count: 2 },
  { id: "archives", label: "Archives", count: 1 },
];

interface FileTagsProps {
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export function FileTags({ selectedTag, onSelectTag }: FileTagsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onSelectTag(tag.id)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all",
            selectedTag === tag.id
              ? "bg-foreground text-background font-medium"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {tag.label}
          <span
            className={cn(
              "text-xs px-1.5 py-0.5 rounded-full",
              selectedTag === tag.id
                ? "bg-background/20 text-background"
                : "bg-background text-muted-foreground"
            )}
          >
            {tag.count}
          </span>
        </button>
      ))}
    </div>
  );
}

