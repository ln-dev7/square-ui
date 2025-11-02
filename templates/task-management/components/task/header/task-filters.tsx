"use client";

import * as React from "react";
import { SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const priorities = [
  { id: "all", name: "All priorities" },
  { id: "urgent", name: "Urgent" },
  { id: "high", name: "High" },
  { id: "medium", name: "Medium" },
  { id: "low", name: "Low" },
];

const assignees = [
  { id: "all", name: "All assignees" },
  { id: "me", name: "Assigned to me" },
  { id: "unassigned", name: "Unassigned" },
];

export function TaskFilters() {
  const [open, setOpen] = React.useState(false);
  const [selectedPriority, setSelectedPriority] = React.useState("all");
  const [selectedAssignee, setSelectedAssignee] = React.useState("all");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm" className="sm:gap-2">
          <SlidersHorizontal className="size-4" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Priority</h4>
            <div className="space-y-1">
              {priorities.map((priority) => (
                <Button
                  key={priority.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between h-8"
                  onClick={() => setSelectedPriority(priority.id)}
                >
                  <span className="text-sm">{priority.name}</span>
                  {selectedPriority === priority.id && (
                    <Check className="size-4" />
                  )}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Assignee</h4>
            <div className="space-y-1">
              {assignees.map((assignee) => (
                <Button
                  key={assignee.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between h-8"
                  onClick={() => setSelectedAssignee(assignee.id)}
                >
                  <span className="text-sm">{assignee.name}</span>
                  {selectedAssignee === assignee.id && (
                    <Check className="size-4" />
                  )}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              setSelectedPriority("all");
              setSelectedAssignee("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

