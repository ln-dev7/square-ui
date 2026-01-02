"use client";

import { Button } from "@/components/ui/button";
import { FileOutput, ChevronDown } from "lucide-react";

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
          <FileOutput className="size-4" />
          Export
        </Button>
        <Button size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          New
          <span className="h-4 w-px bg-background/20" />
          <ChevronDown className="size-4" />
        </Button>
      </div>
    </div>
  );
}

