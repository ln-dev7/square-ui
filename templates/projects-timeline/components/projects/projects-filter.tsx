"use client";

import { useState } from "react";
import { Filter, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useProjectsStore } from "@/store/projects-store";
import { cn } from "@/lib/utils";

export function ProjectsFilter() {
  const [open, setOpen] = useState(false);
  const { priorityFilter, setPriorityFilter } = useProjectsStore();

  const priorities: Array<{
    value: "all" | "high" | "medium" | "low";
    label: string;
  }> = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const isSelected = (priority: string) => {
    if (priority === "all") {
      return priorityFilter === null;
    }
    return priorityFilter === priority;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 h-8">
          <Filter className="size-4" />
          <span className="text-xs">Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1" align="end">
        <div className="py-1">
          {priorities.map((priority) => (
            <button
              key={priority.value}
              onClick={() => {
                setPriorityFilter(
                  priority.value === "all" ? null : priority.value
                );
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent flex items-center justify-between transition-colors",
                isSelected(priority.value) && "bg-accent"
              )}
            >
              <span className="capitalize">{priority.label}</span>
              {isSelected(priority.value) && (
                <Check className="size-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
