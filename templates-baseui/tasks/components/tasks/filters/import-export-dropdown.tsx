"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  Upload01Icon,
  Download01Icon,
  Table01Icon,
  Csv02Icon,
} from "@hugeicons/core-free-icons";

export function ImportExportDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="h-9 gap-2">
            <span className="text-xs">Import/Export</span>
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <HugeiconsIcon icon={Upload01Icon} className="size-4" />
          Import from CSV
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <HugeiconsIcon icon={Table01Icon} className="size-4" />
          Import from Excel
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <HugeiconsIcon icon={Download01Icon} className="size-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <HugeiconsIcon icon={Csv02Icon} className="size-4" />
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
