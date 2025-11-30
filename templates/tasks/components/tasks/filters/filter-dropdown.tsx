"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconFilter } from "@tabler/icons-react";
import { useTasksStore } from "@/store/tasks-store";

export function FilterDropdown() {
  const { priorityFilter, setPriorityFilter } = useTasksStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 gap-2">
          <IconFilter className="size-4" />
          <span className="text-xs">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs">Filter by Priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={priorityFilter === null}
          onCheckedChange={() => setPriorityFilter(null)}
          className="text-xs"
        >
          All Priorities
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={priorityFilter === "urgent"}
          onCheckedChange={() => setPriorityFilter(priorityFilter === "urgent" ? null : "urgent")}
          className="text-xs"
        >
          Urgent
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={priorityFilter === "medium"}
          onCheckedChange={() => setPriorityFilter(priorityFilter === "medium" ? null : "medium")}
          className="text-xs"
        >
          Medium
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={priorityFilter === "low"}
          onCheckedChange={() => setPriorityFilter(priorityFilter === "low" ? null : "low")}
          className="text-xs"
        >
          Low
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

