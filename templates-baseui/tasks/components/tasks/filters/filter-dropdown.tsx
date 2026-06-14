"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon } from "@hugeicons/core-free-icons";
import { useTasksStore } from "@/store/tasks-store";

export function FilterDropdown() {
  const { priorityFilter, setPriorityFilter } = useTasksStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="h-9 gap-2">
            <HugeiconsIcon icon={FilterIcon} className="size-4" />
            <span className="text-xs">Filter</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs">Filter by Priority</DropdownMenuLabel>
        </DropdownMenuGroup>
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
