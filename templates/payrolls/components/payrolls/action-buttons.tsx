"use client";

import { FileOutput, ChevronDown, Plus } from "lucide-react";
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
        <FileOutput className="size-4" />
        Export
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="gap-2 bg-foreground text-background hover:bg-foreground/90"
          >
            New
            <div className="h-4 w-px bg-background/20" />
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <Plus className="size-4 mr-2" />
            New Payroll
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus className="size-4 mr-2" />
            Bulk Import
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Plus className="size-4 mr-2" />
            Schedule Payroll
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

