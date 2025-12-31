"use client";

import { 
  Image, 
  Video, 
  FileText, 
  Archive, 
  Music, 
  Code, 
  File 
} from "lucide-react";
import { FileType } from "@/mock-data/files";

const iconConfig: Record<FileType, { icon: React.ElementType; color: string; bg: string }> = {
  image: { icon: Image, color: "#8B5CF6", bg: "#8B5CF615" },
  video: { icon: Video, color: "#EC4899", bg: "#EC489915" },
  document: { icon: FileText, color: "#F59E0B", bg: "#F59E0B15" },
  archive: { icon: Archive, color: "#10B981", bg: "#10B98115" },
  audio: { icon: Music, color: "#06B6D4", bg: "#06B6D415" },
  code: { icon: Code, color: "#6366F1", bg: "#6366F115" },
  other: { icon: File, color: "#6B7280", bg: "#6B728015" },
};

interface FileIconProps {
  type: FileType;
  size?: "sm" | "md" | "lg";
}

export function FileIcon({ type, size = "md" }: FileIconProps) {
  const config = iconConfig[type] || iconConfig.other;
  const Icon = config.icon;

  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
  };

  const iconSizes = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-lg flex items-center justify-center shrink-0`}
      style={{ backgroundColor: config.bg }}
    >
      <Icon
        className={iconSizes[size]}
        style={{ color: config.color }}
      />
    </div>
  );
}

