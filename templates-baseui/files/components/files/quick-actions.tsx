"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Upload01Icon,
  FolderAddIcon,
  Link01Icon,
  FileImportIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const actions = [
  { icon: Upload01Icon, label: "Upload File", shortcut: "⌘U" },
  { icon: FolderAddIcon, label: "New Folder", shortcut: "⌘N" },
  { icon: Link01Icon, label: "Share Link", shortcut: "⌘L" },
  { icon: FileImportIcon, label: "Import", shortcut: "⌘I" },
];

export function QuickActions() {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl border bg-card">
      {actions.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-lg"
              >
                <HugeiconsIcon icon={action.icon} className="size-4" />
              </Button>
            }
          />
          <TooltipContent side="bottom" className="flex items-center gap-2">
            <span>{action.label}</span>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded border border-muted-foreground/50">
              {action.shortcut}
            </kbd>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

