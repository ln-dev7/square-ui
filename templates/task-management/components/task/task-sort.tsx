"use client";

import * as React from "react";
import { ListFilter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sortOptions = [
  { id: "status", name: "Sort by status" },
  { id: "priority", name: "Sort by priority" },
  { id: "date", name: "Sort by date" },
  { id: "assignee", name: "Sort by assignee" },
  { id: "alphabetical", name: "Sort alphabetically" },
];

export function TaskSort() {
  const [selectedSort, setSelectedSort] = React.useState("status");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="sm:gap-2">
          <ListFilter className="size-4" />
          <span className="hidden sm:inline">Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {sortOptions.map((option, index) => (
          <React.Fragment key={option.id}>
            <DropdownMenuItem
              onClick={() => setSelectedSort(option.id)}
              className="flex items-center justify-between"
            >
              <span>{option.name}</span>
              {selectedSort === option.id && <Check className="size-4" />}
            </DropdownMenuItem>
            {index === 0 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
