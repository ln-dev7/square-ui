"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Image01Icon,
  Video01Icon,
  File01Icon,
  FolderZipIcon,
  MusicNote01Icon,
  SourceCodeIcon,
  FileAttachmentIcon,
} from "@hugeicons/core-free-icons";
import { FileType } from "@/mock-data/files";
import { cn } from "@/lib/utils";

interface FileIconProps {
  type: FileType;
  className?: string;
}

const iconMap = {
  image: { icon: Image01Icon, color: "text-violet-500" },
  video: { icon: Video01Icon, color: "text-pink-500" },
  document: { icon: File01Icon, color: "text-amber-500" },
  archive: { icon: FolderZipIcon, color: "text-emerald-500" },
  audio: { icon: MusicNote01Icon, color: "text-cyan-500" },
  code: { icon: SourceCodeIcon, color: "text-blue-500" },
  other: { icon: FileAttachmentIcon, color: "text-muted-foreground" },
};

export function FileIcon({ type, className }: FileIconProps) {
  const { icon, color } = iconMap[type] || iconMap.other;

  return (
    <HugeiconsIcon icon={icon} className={cn("size-5", color, className)} />
  );
}

