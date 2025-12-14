"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  SidebarLeft01Icon,
  Tick01Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useDashboardStore, type LayoutDensity } from "@/store/dashboard-store";

const densityLabels: Record<LayoutDensity, string> = {
  default: "Default",
  compact: "Compact",
  comfortable: "Comfortable",
};

export function DashboardHeader() {
  const showAlertBanner = useDashboardStore((state) => state.showAlertBanner);
  const showStatsCards = useDashboardStore((state) => state.showStatsCards);
  const showChart = useDashboardStore((state) => state.showChart);
  const showTable = useDashboardStore((state) => state.showTable);
  const layoutDensity = useDashboardStore((state) => state.layoutDensity);
  const setShowAlertBanner = useDashboardStore((state) => state.setShowAlertBanner);
  const setShowStatsCards = useDashboardStore((state) => state.setShowStatsCards);
  const setShowChart = useDashboardStore((state) => state.setShowChart);
  const setShowTable = useDashboardStore((state) => state.setShowTable);
  const setLayoutDensity = useDashboardStore((state) => state.setLayoutDensity);
  const resetLayout = useDashboardStore((state) => state.resetLayout);

  return (
    <header className="w-full flex items-center gap-3 px-4 sm:px-6 py-4 border-b bg-background">
      <SidebarTrigger className="lg:hidden">
        <HugeiconsIcon icon={SidebarLeft01Icon} className="size-5" />
      </SidebarTrigger>

      <HugeiconsIcon icon={DashboardSquare01Icon} className="size-6" />
      <h1 className="flex-1 font-medium text-base">Dashboard</h1>

      <span className="hidden sm:block text-sm text-muted-foreground">
        Last update 12 min ago
      </span>

      <div className="flex items-center -space-x-2">
        <Avatar className="size-7 ring-2 ring-background">
          <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=user1" />
          <AvatarFallback>U1</AvatarFallback>
        </Avatar>
        <Avatar className="size-7 ring-2 ring-background">
          <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=user2" />
          <AvatarFallback>U2</AvatarFallback>
        </Avatar>
        <Avatar className="size-7 ring-2 ring-background">
          <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=user3" />
          <AvatarFallback>U3</AvatarFallback>
        </Avatar>
      </div>

      <div className="hidden sm:block h-6 w-px bg-border" />

      <ThemeToggle />

      <Link
        href="https://github.com/ln-dev7/square-ui/tree/master/templates-baseui/dashboard-3"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex items-center justify-center size-9 rounded-md hover:bg-muted"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <HugeiconsIcon icon={SidebarLeft01Icon} className="size-4" />
              Edit Layout
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <p className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
              Layout Density
            </p>
            {(Object.keys(densityLabels) as LayoutDensity[]).map((key) => (
              <DropdownMenuItem key={key} onClick={() => setLayoutDensity(key)}>
                {densityLabels[key]}
                {layoutDensity === key && (
                  <HugeiconsIcon icon={Tick01Icon} className="size-4 ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <p className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
              Show / Hide Sections
            </p>
            <DropdownMenuCheckboxItem
              checked={showAlertBanner}
              onCheckedChange={setShowAlertBanner}
            >
              Alert Banner
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showStatsCards}
              onCheckedChange={setShowStatsCards}
            >
              Statistics Cards
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showChart}
              onCheckedChange={setShowChart}
            >
              Financial Flow Chart
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showTable}
              onCheckedChange={setShowTable}
            >
              Employees Table
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={resetLayout}>
            <HugeiconsIcon icon={RefreshIcon} className="size-4 mr-2" />
            Reset to Default
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
