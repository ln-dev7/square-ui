"use client";

import { Task } from "@/mock-data/tasks";
import { Status } from "@/mock-data/statuses";
import { TaskCard } from "./task-card";
import { Badge } from "@/components/ui/badge";

interface TaskColumnProps {
  status: Status;
  tasks: Task[];
}

export function TaskColumn({ status, tasks }: TaskColumnProps) {
  const StatusIcon = status.icon;
  // "shrink-0 w-[300px] lg:w-[360px] flex flex-col h-full flex-1";
  return (
    <div className="shrink-0 w-[300px] lg:w-[340px] flex flex-col h-full flex-1">
      <div className="rounded-2xl border border-border/50 p-2 bg-muted/70 dark:bg-muted/50 flex flex-col max-h-full space-y-2">
        <div className="flex items-center gap-2 justify-between">
          <div
            className="flex items-center gap-2 rounded-full bg-muted px-2.5 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: `${status.color}20`,
            }}
          >
            <StatusIcon style={{ color: status.color }} />
            <span
              className="text-xs font-medium"
              style={{ color: status.color }}
            >
              {status.name}
            </span>
          </div>
          <Badge
            variant="secondary"
            className="rounded-full text-xs p-0 size-7 font-medium bg-background"
          >
            {tasks.length}
          </Badge>
        </div>

        {tasks.length > 0 && (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
