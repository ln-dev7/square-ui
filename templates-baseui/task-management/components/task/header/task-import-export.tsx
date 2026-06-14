"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  Download01Icon,
  Upload01Icon,
  SourceCodeSquareIcon,
  Csv02Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TaskImportExport() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2 hidden lg:flex">
            Import / Export
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <HugeiconsIcon icon={Download01Icon} className="size-4" />
            Export
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <HugeiconsIcon icon={SourceCodeSquareIcon} className="size-4" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HugeiconsIcon icon={Csv02Icon} className="size-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HugeiconsIcon icon={File01Icon} className="size-4" />
          Export as Markdown
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <HugeiconsIcon icon={Upload01Icon} className="size-4" />
            Import
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <HugeiconsIcon icon={SourceCodeSquareIcon} className="size-4" />
          Import from JSON
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HugeiconsIcon icon={Csv02Icon} className="size-4" />
          Import from CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
