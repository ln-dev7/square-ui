"use client";

import { Status } from "@/mock-data/statuses";
import { Task } from "@/mock-data/tasks";
import { TaskCard } from "./task-card";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskColumnProps {
  status: Status;
  tasks: Task[];
}

export function TaskColumn({ status, tasks }: TaskColumnProps) {
  const StatusIcon = status.icon;

  return (
    <div className="shrink-0 w-[300px] lg:w-[360px] flex flex-col h-full flex-1">
      <div className="rounded-lg border border-border p-3 bg-muted/70 dark:bg-muted/50 flex flex-col max-h-full">
        <div className="flex items-center justify-between mb-2 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="size-4 flex items-center justify-center">
              <StatusIcon />
            </div>
            <span className="text-sm font-medium">{status.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto h-full">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}

          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs h-auto py-1 px-0 self-start hover:bg-background"
          >
            <Plus className="size-4" />
            <span>Add task</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

