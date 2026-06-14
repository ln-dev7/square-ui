"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { FileExportIcon, ArrowDown01Icon, Add01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ActionButtons() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" className="gap-2">
        <HugeiconsIcon icon={FileExportIcon} className="size-4" />
        Export
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              size="sm"
              className="gap-2 bg-foreground text-background hover:bg-foreground/90"
            >
              New
              <div className="h-4 w-px bg-background/20" />
              <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <HugeiconsIcon icon={Add01Icon} className="size-4 mr-2" />
            New Payroll
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Add01Icon} className="size-4 mr-2" />
            Bulk Import
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <HugeiconsIcon icon={Add01Icon} className="size-4 mr-2" />
            Schedule Payroll
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
