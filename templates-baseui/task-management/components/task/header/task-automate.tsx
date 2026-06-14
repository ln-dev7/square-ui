"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  SparklesIcon,
  FlashIcon,
  Clock01Icon,
  Mail01Icon,
  Notification01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const automationOptions: {
  id: string;
  name: string;
  description: string;
  icon: IconSvgElement;
}[] = [
  {
    id: "auto-assign",
    name: "Auto-assign tasks",
    description: "Automatically assign new tasks to team members",
    icon: FlashIcon,
  },
  {
    id: "due-date",
    name: "Set due date reminders",
    description: "Get notified before tasks are due",
    icon: Clock01Icon,
  },
  {
    id: "email-summary",
    name: "Daily email summary",
    description: "Receive a summary of your tasks every morning",
    icon: Mail01Icon,
  },
  {
    id: "slack-notify",
    name: "Slack notifications",
    description: "Send updates to Slack when tasks change",
    icon: Notification01Icon,
  },
];

export function TaskAutomate() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="secondary" size="sm" className="sm:gap-2">
            <HugeiconsIcon icon={SparklesIcon} className="size-4" />
            <span className="hidden sm:inline">Automate</span>
            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
              Pro
            </span>
          </Button>
        }
      />
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-1">Automation Rules</h3>
            <p className="text-xs text-muted-foreground">
              Upgrade to Pro to unlock automation features
            </p>
          </div>

          <div className="space-y-2">
            {automationOptions.map((option) => (
              <div
                key={option.id}
                className="flex gap-3 p-2.5 rounded-md bg-muted/50 opacity-60"
              >
                <HugeiconsIcon
                  icon={option.icon}
                  className="size-4 shrink-0 mt-0.5 text-purple-600 dark:text-purple-400"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{option.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full" size="sm">
            <HugeiconsIcon icon={SparklesIcon} className="size-4" />
            Upgrade to Pro
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
