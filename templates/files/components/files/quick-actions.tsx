"use client";

import { Upload, FolderPlus, Link2, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const actions = [
  { icon: Upload, label: "Upload File", shortcut: "⌘U" },
  { icon: FolderPlus, label: "New Folder", shortcut: "⌘N" },
  { icon: Link2, label: "Share Link", shortcut: "⌘L" },
  { icon: FileUp, label: "Import", shortcut: "⌘I" },
];

export function QuickActions() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 p-1 rounded-xl border bg-card">
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-lg"
              >
                <action.icon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="flex items-center gap-2">
              <span>{action.label}</span>
              <kbd className="px-1.5 py-0.5 text-[10px] rounded border border-muted-foreground/50">
                {action.shortcut}
              </kbd>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

