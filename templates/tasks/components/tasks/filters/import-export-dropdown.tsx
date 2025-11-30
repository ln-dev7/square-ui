"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconChevronDown, IconUpload, IconDownload, IconFileSpreadsheet, IconFileTypeCsv } from "@tabler/icons-react";

export function ImportExportDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 gap-2">
          <span className="text-xs">Import/Export</span>
          <IconChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <IconUpload className="size-4" />
          Import from CSV
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <IconFileSpreadsheet className="size-4" />
          Import from Excel
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <IconDownload className="size-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs gap-2 cursor-pointer">
          <IconFileTypeCsv className="size-4" />
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

