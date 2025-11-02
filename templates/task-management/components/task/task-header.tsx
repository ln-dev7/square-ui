"use client";

import {
  Star,
  Settings,
  Menu as MenuIcon,
  Calendar,
  ChevronDown,
  Plus,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export function TaskHeader() {
  return (
    <div className="border-b border-border bg-background">
      {/* Top header */}
      <div className="flex items-center justify-between px-3 lg:px-6 py-3">
        <div className="flex items-center gap-2 lg:gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div className="flex items-center gap-2">
            <h1 className="text-base lg:text-lg font-semibold">Task</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <ThemeToggle />
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <span>Last update 3 days ago</span>
            <div className="flex -space-x-2 ml-2">
              <Avatar className="size-5 border-2 border-background">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Alice Johnson" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="size-5 border-2 border-background">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Bob Smith" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="size-5 border-2 border-background">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Charlie Brown" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <Avatar className="size-5 border-2 border-background">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Diana Prince" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 hidden lg:flex"
          >
            <Share2 className="size-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 lg:px-6 py-3 border-t border-border overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="secondary" size="sm" className="gap-2">
            <Settings className="size-4" />
            Filter
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            <MenuIcon className="size-4" />
            Sort
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            <Star className="size-4" />
            Automate
            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
              Pro
            </span>
          </Button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="gap-2 hidden lg:flex">
            <Calendar className="size-4" />
            Sep 7, 2024
          </Button>
          <Button variant="outline" size="sm" className="gap-2 hidden lg:flex">
            Import / Export
            <ChevronDown className="size-4" />
          </Button>
          <Button size="sm" className="gap-2 shrink-0">
            <Plus className="size-4" />
            Request task
          </Button>
        </div>
      </div>
    </div>
  );
}
