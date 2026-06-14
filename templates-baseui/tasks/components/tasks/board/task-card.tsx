"use client";

import { Task } from "@/mock-data/tasks";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoreHorizontalIcon,
  ArrowMoveDownRightIcon,
  Calendar03Icon,
  Comment01Icon,
  Attachment01Icon,
} from "@hugeicons/core-free-icons";

interface TaskCardProps {
  task: Task;
}

const priorityColors: Record<string, { bg: string; text: string }> = {
  urgent: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
  },
  medium: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-600 dark:text-yellow-400",
  },
  low: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
  },
};

export function TaskCard({ task }: TaskCardProps) {
  const priorityStyle = priorityColors[task.priority] || priorityColors.low;

  return (
    <div className="rounded-2xl border border-border/70 bg-background p-4">
      <div className="flex items-start justify-between mb-4">
        <Badge
          className={`${priorityStyle.bg} ${priorityStyle.text} border-0 text-[10px] font-medium capitalize`}
        >
          {task.priority}
        </Badge>
        <HugeiconsIcon
          icon={MoreHorizontalIcon}
          className="size-4 text-muted-foreground cursor-pointer hover:text-foreground"
        />
      </div>

      <div className="mb-3">
        <h3 className="text-xs font-medium mb-2">{task.title}</h3>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <HugeiconsIcon icon={ArrowMoveDownRightIcon} className="size-[18px]" />
          <span className="text-xs">{task.project}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
        <HugeiconsIcon icon={Calendar03Icon} className="size-4" />
        <span className="text-xs">Due date:</span>
        <span className="text-xs text-foreground">{task.dueDate}</span>
      </div>

      <Separator className="mb-4 opacity-60" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <HugeiconsIcon icon={Comment01Icon} className="size-4" />
            <span className="text-[10px]">{task.comments}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <HugeiconsIcon icon={Attachment01Icon} className="size-4" />
            <span className="text-[10px]">{task.attachments}</span>
          </div>
        </div>

        <div className="flex -space-x-1.5">
          {task.assignees.slice(0, 2).map((assignee) => (
            <Avatar key={assignee.id} className="size-6 border-2 border-card">
              <AvatarImage src={assignee.avatar} alt={assignee.name} />
              <AvatarFallback className="text-[8px]">
                {assignee.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
}
