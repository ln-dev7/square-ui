"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FileExportIcon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";

export function AlertBanner() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-4">
        <span className="text-4xl">🗒️</span>
        <p className="text-sm sm:text-base leading-relaxed">
          <span className="text-muted-foreground">You have </span>
          <span className="font-semibold">12 Pending Leave Requests,</span>
          <span> and </span>
          <span className="font-semibold">5 Overtime Approvals</span>
          <span className="text-muted-foreground"> that need action!</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2">
          <HugeiconsIcon icon={FileExportIcon} className="size-4" />
          Export
        </Button>
        <Button size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          New
          <span className="h-4 w-px bg-background/20" />
          <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
        </Button>
      </div>
    </div>
  );
}

