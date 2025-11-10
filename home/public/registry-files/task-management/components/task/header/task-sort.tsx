"use client";

import * as React from "react";
import {
  ListFilter,
  Check,
  CircleDot,
  Flag,
  Calendar,
  User,
  ArrowDownAZ,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sortOptions = [
  { id: "status", name: "Sort by status", icon: CircleDot },
  { id: "priority", name: "Sort by priority", icon: Flag },
  { id: "date", name: "Sort by date", icon: Calendar },
  { id: "assignee", name: "Sort by assignee", icon: User },
  { id: "alphabetical", name: "Sort alphabetically", icon: ArrowDownAZ },
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
        <DropdownMenuLabel className="flex items-center gap-2">
          <ListFilter className="size-4" />
          Sort options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sortOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.id}
              onClick={() => setSelectedSort(option.id)}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="size-4 text-muted-foreground" />
                <span>{option.name}</span>
              </div>
              {selectedSort === option.id && (
                <Check className="size-4 text-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

