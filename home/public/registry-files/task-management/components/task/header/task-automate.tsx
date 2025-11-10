"use client";

import * as React from "react";
import { Sparkle, Zap, Clock, Mail, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const automationOptions = [
  {
    id: "auto-assign",
    name: "Auto-assign tasks",
    description: "Automatically assign new tasks to team members",
    icon: Zap,
  },
  {
    id: "due-date",
    name: "Set due date reminders",
    description: "Get notified before tasks are due",
    icon: Clock,
  },
  {
    id: "email-summary",
    name: "Daily email summary",
    description: "Receive a summary of your tasks every morning",
    icon: Mail,
  },
  {
    id: "slack-notify",
    name: "Slack notifications",
    description: "Send updates to Slack when tasks change",
    icon: Bell,
  },
];

export function TaskAutomate() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm" className="sm:gap-2">
          <Sparkle className="size-4" />
          <span className="hidden sm:inline">Automate</span>
          <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
            Pro
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-1">Automation Rules</h3>
            <p className="text-xs text-muted-foreground">
              Upgrade to Pro to unlock automation features
            </p>
          </div>

          <div className="space-y-2">
            {automationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className="flex gap-3 p-2.5 rounded-md bg-muted/50 opacity-60"
                >
                  <Icon className="size-4 shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{option.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button className="w-full" size="sm">
            <Sparkle className="size-4" />
            Upgrade to Pro
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

