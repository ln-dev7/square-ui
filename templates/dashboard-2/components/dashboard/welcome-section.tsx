"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, Download, Upload, FileText } from "lucide-react";

export function WelcomeSection() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
      <div className="space-y-2 sm:space-y-5">
        <h2 className="text-lg sm:text-[22px] font-semibold leading-relaxed">
          Welcome Back, John!
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Today you have <span className="text-foreground font-medium">3 new leads</span>,{" "}
          <span className="text-foreground font-medium">2 follow-ups due</span>
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 sm:gap-3 h-8 sm:h-9 text-xs sm:text-sm">
              <span className="hidden xs:inline">Import/Export</span>
              <span className="xs:hidden">
                <Download className="size-4" />
              </span>
              <ChevronDown className="size-3 sm:size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Upload className="size-4 mr-2" />
              Import CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Upload className="size-4 mr-2" />
              Import Excel
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="size-4 mr-2" />
              Export CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="size-4 mr-2" />
              Export PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="sm" className="gap-2 sm:gap-3 h-8 sm:h-9 text-xs sm:text-sm bg-linear-to-b from-foreground to-foreground/90 text-background">
          <Plus className="size-3 sm:size-4" />
          <span className="hidden xs:inline">Create New</span>
          <span className="xs:hidden">New</span>
        </Button>
      </div>
    </div>
  );
}
