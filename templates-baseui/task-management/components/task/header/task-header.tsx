"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, Add01Icon, Link01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { TaskFilters } from "./task-filters";
import { TaskSort } from "./task-sort";
import { TaskAutomate } from "./task-automate";
import { TaskImportExport } from "./task-import-export";

export function TaskHeader() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date("2024-09-07"));
  return (
    <div className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-3 lg:px-6 py-3">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-base lg:text-lg font-semibold">Task</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <Button
            variant="outline"
            className="shadow-none"
            nativeButton={false}
            render={
              <Link
                href="https://github.com/ln-dev7/square-ui/tree/master/templates-baseui/task-management"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </Button>
          <ThemeToggle />
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <span>Last update 3 days ago</span>
            <div className="flex -space-x-2 ml-2">
              <Avatar className="size-5 border-2 border-background">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=AliceJohnson" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="size-5 border-2 border-background">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=BobSmith" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="size-5 border-2 border-background">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=CharlieBrown" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <Avatar className="size-5 border-2 border-background">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=DianaPrince" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="gap-2 hidden lg:flex">
            <HugeiconsIcon icon={Link01Icon} className="size-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 lg:px-6 py-3 border-t border-border overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <TaskFilters />
          <TaskSort />
          <TaskAutomate />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hidden lg:flex font-normal"
                >
                  <HugeiconsIcon icon={Calendar03Icon} className="size-4" />
                  {date
                    ? date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Select date"}
                </Button>
              }
            />
            <PopoverContent className="w-auto overflow-hidden p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(selectedDate: Date | undefined) => {
                  setDate(selectedDate);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          <TaskImportExport />
          <Button size="sm" className="sm:gap-2 shrink-0">
            <HugeiconsIcon icon={Add01Icon} className="size-4" />
            <span className="hidden sm:inline">Request task</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
