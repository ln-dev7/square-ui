"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { AddHabitDialog } from "@/components/habits/add-habit-dialog";
import { Github, CheckSquare, BarChart3, Plus } from "lucide-react";

const views: Record<string, { label: string; icon: React.ElementType }> = {
  "/": { label: "Today", icon: CheckSquare },
  "/stats": { label: "Statistics", icon: BarChart3 },
};

export function HabitHeader() {
  const pathname = usePathname();
  const view = views[pathname] ?? views["/"];
  const Icon = view.icon;

  return (
    <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b bg-card sticky top-0 z-10 w-full shrink-0 h-15">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-2" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="size-4" />
          <span className="text-sm font-medium">{view.label}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <AddHabitDialog>
          <Button size="sm" variant="outline" className="h-8 gap-1.5 rounded-full">
            <Plus className="size-3.5" />
            <span className="hidden sm:inline">New habit</span>
          </Button>
        </AddHabitDialog>
        <ThemeToggle />
        <Button variant="ghost" size="icon" asChild className="size-8">
          <Link
            href="https://github.com/ln-dev7/square-ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="size-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
