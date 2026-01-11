"use client";

import { format } from "date-fns";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notification01Icon,
  Calendar01Icon,
  Add01Icon,
  Github01Icon,
  Tick02Icon,
  Clock01Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/store/calendar-store";
import { getTodayEvents } from "@/mock-data/events";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { CreateEventDialog } from "./create-event-dialog";
import { SchedulePopover } from "./schedule-popover";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function CalendarHeader() {
  const { currentWeekStart } = useCalendarStore();
  const todayEvents = getTodayEvents();
  const meetingsCount = todayEvents.filter(
    (e) =>
      e.title.toLowerCase().includes("call") ||
      e.title.toLowerCase().includes("meeting")
  ).length;
  const eventsCount = todayEvents.length - meetingsCount;
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <>
      <CreateEventDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      <div className="border-b border-border bg-background">
        <div className="px-3 md:px-6 py-2.5 md:py-3">
          <div className="flex items-center justify-between gap-2 md:gap-3 flex-nowrap">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <SidebarTrigger className="shrink-0" />
              <div className="flex-1 min-w-0">
                <h1 className="text-sm md:text-base lg:text-lg font-semibold text-foreground truncate mb-0 md:mb-1">
                  {format(currentWeekStart, "MMMM dd, yyyy")}
                </h1>
                <p className="hidden md:block text-xs text-muted-foreground">
                  You have {meetingsCount} meeting
                  {meetingsCount !== 1 ? "s" : ""} and {eventsCount} event
                  {eventsCount !== 1 ? "s" : ""} today 🗓️
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2 shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative size-7 md:size-8 shrink-0"
                    >
                      <HugeiconsIcon icon={Notification01Icon} className="size-4" />
                      <span className="absolute top-1 right-1 size-1 bg-red-500 rounded-full" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                    <div className="flex items-center gap-2 w-full">
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        className="size-4 text-green-500"
                      />
                      <span className="text-sm font-medium flex-1">
                        Meeting confirmed
                      </span>
                      <span className="text-xs text-muted-foreground">
                        2m ago
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      Daily checkin has been confirmed for tomorrow at 9:00 AM
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                    <div className="flex items-center gap-2 w-full">
                      <HugeiconsIcon
                        icon={Clock01Icon}
                        className="size-4 text-blue-500"
                      />
                      <span className="text-sm font-medium flex-1">
                        Reminder
                      </span>
                      <span className="text-xs text-muted-foreground">
                        15m ago
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      Team Standup starts in 30 minutes
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                    <div className="flex items-center gap-2 w-full">
                      <HugeiconsIcon
                        icon={AlertCircleIcon}
                        className="size-4 text-orange-500"
                      />
                      <span className="text-sm font-medium flex-1">
                        Event updated
                      </span>
                      <span className="text-xs text-muted-foreground">
                        1h ago
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      Design Workshop time has been changed to 2:00 PM
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                    <div className="flex items-center gap-2 w-full">
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        className="size-4 text-green-500"
                      />
                      <span className="text-sm font-medium flex-1">
                        New participant
                      </span>
                      <span className="text-xs text-muted-foreground">
                        3h ago
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      Sarah joined the Sprint Planning meeting
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center cursor-pointer">
                    <span className="text-xs text-muted-foreground">
                      View all notifications
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <SchedulePopover>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7 md:size-8 shrink-0 md:w-auto md:px-2 md:gap-1.5"
                >
                  <HugeiconsIcon icon={Calendar01Icon} className="size-4" />
                  <span className="hidden lg:inline">Schedule</span>
                </Button>
              </SchedulePopover>

              <Button
                size="icon"
                className="size-7 md:size-8 shrink-0 md:w-auto md:px-2 md:gap-1.5 bg-foreground text-background hover:bg-foreground/90"
                onClick={() => setCreateDialogOpen(true)}
              >
                <HugeiconsIcon icon={Add01Icon} className="size-4" />
                <span className="hidden lg:inline">Create Event</span>
              </Button>

              <ThemeToggle />

              <Link
                href="https://github.com/ln-dev7/square-ui/tree/master/templates-baseui/calendar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7 md:size-8 shrink-0"
                >
                  <HugeiconsIcon icon={Github01Icon} className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
