"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Input } from "@/components/ui/input";
import { useTasksStore } from "@/store/tasks-store";
import { FilterDropdown } from "./filter-dropdown";
import { ImportExportDropdown } from "./import-export-dropdown";
import { AddTaskDialog } from "./add-task-dialog";

export function TasksFilters() {
  const { searchQuery, setSearchQuery } = useTasksStore();

  return (
    <div className="flex items-center justify-between gap-2 flex-wrap w-full px-4 sm:px-6">
      <div className="relative">
        <HugeiconsIcon
          icon={Search01Icon}
          className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-60 sm:w-80 pl-10 h-9 bg-background text-xs"
        />
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <FilterDropdown />
        <ImportExportDropdown />
        <AddTaskDialog />
      </div>
    </div>
  );
}
