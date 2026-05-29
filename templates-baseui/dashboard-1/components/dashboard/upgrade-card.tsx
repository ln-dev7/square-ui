"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function UpgradeCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4">
      <div className="relative space-y-3">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={InformationCircleIcon} className="size-3.5 text-foreground" />
          <span className="text-xs font-medium text-foreground">Square UI</span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Collection of beautifully crafted open-source layouts UI built with
          shadcn/ui.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-full justify-center gap-1.5 text-xs"
          render={<Link href="https://square.lndevui.com" target="_blank" rel="noopener noreferrer" />}
        >
          square.lndevui.com
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
