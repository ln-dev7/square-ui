"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  Add01Icon,
  Download01Icon,
  Upload01Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";

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
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-2 sm:gap-3 h-8 sm:h-9 text-xs sm:text-sm">
                <span className="hidden xs:inline">Import/Export</span>
                <span className="xs:hidden">
                  <HugeiconsIcon icon={Download01Icon} className="size-4" />
                </span>
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  className="size-3 sm:size-4 text-muted-foreground"
                />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <HugeiconsIcon icon={Upload01Icon} className="size-4 mr-2" />
              Import CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Upload01Icon} className="size-4 mr-2" />
              Import Excel
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Download01Icon} className="size-4 mr-2" />
              Export CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={File01Icon} className="size-4 mr-2" />
              Export PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="sm" className="gap-2 sm:gap-3 h-8 sm:h-9 text-xs sm:text-sm bg-linear-to-b from-foreground to-foreground/90 text-background">
          <HugeiconsIcon icon={Add01Icon} className="size-3 sm:size-4" />
          <span className="hidden xs:inline">Create New</span>
          <span className="xs:hidden">New</span>
        </Button>
      </div>
    </div>
  );
}
