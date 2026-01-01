"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Notification01Icon,
  GridViewIcon,
  Menu01Icon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useFilesStore } from "@/store/files-store";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "./breadcrumb";
import { QuickActions } from "./quick-actions";

export function FilesHeader() {
  const { searchQuery, setSearchQuery, viewMode, setViewMode } =
    useFilesStore();

  return (
    <header className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 border-b bg-card sticky top-0 z-10 w-full">
      <SidebarTrigger className="-ml-1 sm:-ml-2" />

      <div className="hidden lg:block">
        <Breadcrumb />
      </div>

      <div className="flex-1 lg:hidden">
        <Breadcrumb />
      </div>

      <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
        <QuickActions />
      </div>

      <div className="hidden md:block relative max-w-xs">
        <HugeiconsIcon
          icon={Search01Icon}
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
        />
        <Input
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 bg-card border"
        />
      </div>

      <div className="hidden sm:flex items-center gap-1 border rounded-lg p-0.5">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setViewMode("grid")}
          className={cn("size-7.5", viewMode === "grid" && "bg-muted")}
        >
          <HugeiconsIcon icon={GridViewIcon} className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setViewMode("list")}
          className={cn("size-7.5", viewMode === "list" && "bg-muted")}
        >
          <HugeiconsIcon icon={Menu01Icon} className="size-4" />
        </Button>
      </div>

      <ThemeToggle />

      <Link
        href="https://github.com/ln-dev7/square-ui/tree/master/templates-baseui/files"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex"
      >
        <Button variant="ghost" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8">
              <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
            </Button>
          }
        />
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Search01Icon} className="size-4 mr-2" />
              Search
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? (
                <HugeiconsIcon icon={Menu01Icon} className="size-4 mr-2" />
              ) : (
                <HugeiconsIcon icon={GridViewIcon} className="size-4 mr-2" />
              )}
              {viewMode === "grid" ? "List View" : "Grid View"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Notification01Icon} className="size-4 mr-2" />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem render={<Link href="https://github.com/ln-dev7/square-ui/tree/master/templates-baseui/files" target="_blank" rel="noopener noreferrer" />}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 mr-2"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

