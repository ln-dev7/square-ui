"use client";

import { storageData } from "@/mock-data/files";
import { Image, Video, FileText, Archive, File } from "lucide-react";

const iconMap = {
  Images: Image,
  Videos: Video,
  Documents: FileText,
  Archives: Archive,
  Other: File,
};

export function StorageCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {storageData.breakdown.map((item) => {
        const Icon = iconMap[item.type as keyof typeof iconMap] || File;
        const percentage = ((item.size / storageData.total) * 100).toFixed(0);
        
        return (
          <div
            key={item.type}
            className="p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
          >
            <div
              className="size-10 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <Icon
                className="size-5"
                style={{ color: item.color }}
              />
            </div>
            <p className="font-medium text-sm mb-0.5">{item.type}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {item.size} GB
              </span>
              <span className="text-xs text-muted-foreground">
                {percentage}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

