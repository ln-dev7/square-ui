"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, Download, Upload } from "lucide-react";
import { useLeadsStore, DateFilter } from "@/store/leads-store";

const dateFilterLabels: Record<DateFilter, string> = {
  all: "All Time",
  today: "Today",
  yesterday: "Yesterday",
  last_7_days: "Last 7 Days",
  last_30_days: "Last 30 Days",
  this_month: "This Month",
};

export function FilterSection() {
  const { dateFilter, setDateFilter } = useLeadsStore();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <span>{dateFilterLabels[dateFilter]}</span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {Object.entries(dateFilterLabels).map(([key, label]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => setDateFilter(key as DateFilter)}
              className={dateFilter === key ? "bg-accent" : ""}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2 sm:gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <span>Import/Export</span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Upload className="size-4 mr-2" />
              Import Leads
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="size-4 mr-2" />
              Export to CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="size-4 mr-2" />
              Export to Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          <Plus className="size-4" />
          <span>Create New</span>
        </Button>
      </div>
    </div>
  );
}

