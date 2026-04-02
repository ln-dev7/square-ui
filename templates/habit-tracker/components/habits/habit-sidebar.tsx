"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  BarChart3,
  Trash2,
  Flame,
  Plus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddHabitDialog } from "@/components/habits/add-habit-dialog";
import { useHabitStore } from "@/store/habit-store";
import { HABIT_COLORS, getStreak } from "@/mock-data/habits";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Today", icon: CheckSquare, href: "/" },
  { label: "Statistics", icon: BarChart3, href: "/stats" },
];

function HabitSidebarInner() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const {
    habits,
    completions,
    deleteHabit,
    isCompletedToday,
    selectedHabitId,
    selectHabit,
  } = useHabitStore();

  const completedToday = habits.filter((h) => isCompletedToday(h.id)).length;

  const handleHabitClick = (habitId: string) => {
    selectHabit(selectedHabitId === habitId ? null : habitId);
    setOpenMobile(false);
  };

  return (
    <>
      <SidebarHeader className="border-b px-4 py-3.5 h-15 flex items-center justify-center">
        <div className="w-full flex items-center justify-start gap-2">
          <div className="size-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <CheckSquare className="size-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold tracking-tight">Square UI</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ label, icon: Icon, href }) => {
                const isActive = pathname === href;
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-9"
                      onClick={() => setOpenMobile(false)}
                    >
                      <Link href={href}>
                        <Icon className="size-4 shrink-0" />
                        <span>{label}</span>
                        {label === "Today" && (
                          <span
                            className={cn(
                              "ml-auto text-xs px-1.5 py-0.5 rounded-full font-semibold",
                              isActive
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {completedToday}/{habits.length}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Habits
          </span>
          <AddHabitDialog>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 text-muted-foreground hover:text-foreground"
            >
              <Plus className="size-3.5" />
            </Button>
          </AddHabitDialog>
        </div>

        <div className="px-2 pb-4 space-y-0.5">
          {habits.map((habit) => {
            const streak = getStreak(completions[habit.id] ?? {});
            const isCompleted = isCompletedToday(habit.id);
            const isSelected = selectedHabitId === habit.id;

            return (
              <div
                key={habit.id}
                role="button"
                onClick={() => handleHabitClick(habit.id)}
                className={cn(
                  "group flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
                  isSelected ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/60"
                )}
              >
                <div
                  className="size-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                  style={{
                    backgroundColor: HABIT_COLORS[habit.color].light + "22",
                  }}
                >
                  {habit.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium truncate leading-tight",
                      isCompleted && "line-through opacity-60"
                    )}
                  >
                    {habit.name}
                  </p>
                  {streak > 0 && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Flame className="size-3 text-orange-500" />
                      <span className="text-[11px] text-muted-foreground">
                        {streak} day streak
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHabit(habit.id);
                  }}
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            );
          })}

          {habits.length === 0 && (
            <div className="px-3 py-4 text-center">
              <p className="text-xs text-muted-foreground mb-2">No habits yet</p>
              <AddHabitDialog>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Plus className="size-3 mr-1" />
                  Add your first habit
                </Button>
              </AddHabitDialog>
            </div>
          )}
        </div>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-3 group-data-[collapsible=icon]:hidden">
        <div className="group/sidebar relative flex flex-col gap-2 rounded-lg border p-4 text-sm w-full bg-background">
          <div className="text-balance text-base font-semibold leading-tight">
            Open-source layouts by lndev-ui
          </div>
          <div className="text-xs text-muted-foreground">
            Collection of beautifully crafted open-source layouts built with shadcn/ui.
          </div>
          <Link
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0"
            href="https://square.lndevui.com"
          >
            <span className="sr-only">Square by lndev-ui</span>
          </Link>
          <Button size="sm" className="w-full" asChild>
            <Link href="https://square.lndevui.com" target="_blank" rel="noopener noreferrer">
              square.lndevui.com
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
}

export function HabitSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <HabitSidebarInner />
    </Sidebar>
  );
}
