"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Greeting } from "./greeting";

export function ProjectsTopBar() {
  return (
    <div className="border-b bg-background px-6 py-3.5 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="shrink-0" />
          <Greeting name="LN" />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden lg:block">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search anything"
              className="w-full max-w-[320px] pl-10 pr-20 h-9 bg-background"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>
              </kbd>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                F
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="shadow-none"
              nativeButton={false}
              render={
                <Link
                  href="https://github.com/ln-dev7/square-ui/tree/master/templates-baseui/projects-timeline"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
