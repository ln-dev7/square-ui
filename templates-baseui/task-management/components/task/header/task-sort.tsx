"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  FilterIcon,
  Tick02Icon,
  RecordIcon,
  Flag01Icon,
  Calendar03Icon,
  UserIcon,
  SortingAZ01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sortOptions: { id: string; name: string; icon: IconSvgElement }[] = [
  { id: "status", name: "Sort by status", icon: RecordIcon },
  { id: "priority", name: "Sort by priority", icon: Flag01Icon },
  { id: "date", name: "Sort by date", icon: Calendar03Icon },
  { id: "assignee", name: "Sort by assignee", icon: UserIcon },
  { id: "alphabetical", name: "Sort alphabetically", icon: SortingAZ01Icon },
];

export function TaskSort() {
  const [selectedSort, setSelectedSort] = useState("status");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="secondary" size="sm" className="sm:gap-2">
            <HugeiconsIcon icon={FilterIcon} className="size-4" />
            <span className="hidden sm:inline">Sort</span>
          </Button>
        }
      />
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <HugeiconsIcon icon={FilterIcon} className="size-4" />
            Sort options
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => setSelectedSort(option.id)}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5">
              <HugeiconsIcon
                icon={option.icon}
                className="size-4 text-muted-foreground"
              />
              <span>{option.name}</span>
            </div>
            {selectedSort === option.id && (
              <HugeiconsIcon icon={Tick02Icon} className="size-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
