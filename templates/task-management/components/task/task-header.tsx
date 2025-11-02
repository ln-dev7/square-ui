"use client";

import {
  Sparkle,
  Calendar,
  ChevronDown,
  Plus,
  Link as LinkIcon,
  SlidersHorizontal,
  ListFilter,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export function TaskHeader() {
  return (
    <div className="border-b border-border bg-background">
      {/* Top header */}
      <div className="flex items-center justify-between px-3 lg:px-6 py-3">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-base lg:text-lg font-semibold">Task</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <Button variant="outline" className="shadow-none" asChild>
            <Link
              href="https://github.com/ln-dev7/square-ui/tree/master/templates/task-management"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              GitHub
            </Link>
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
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 hidden lg:flex"
          >
            <LinkIcon className="size-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 lg:px-6 py-3 border-t border-border overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="secondary" size="sm" className="sm:gap-2">
            <SlidersHorizontal className="size-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="secondary" size="sm" className="sm:gap-2">
            <ListFilter className="size-4" />
            <span className="hidden sm:inline">Sort</span>
          </Button>
          <Button variant="secondary" size="sm" className="sm:gap-2">
            <Sparkle className="size-4" />
            <span className="hidden sm:inline">Automate</span>
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
          <Button size="sm" className="sm:gap-2 shrink-0">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Request task</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
