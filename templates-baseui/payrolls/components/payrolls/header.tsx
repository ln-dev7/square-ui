"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  Coins01Icon,
  SidebarLeft01Icon,
  DashboardSquare01Icon,
  GridIcon,
  Menu01Icon,
  Layout01Icon,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useLayoutStore, LayoutOption } from "@/store/layout-store";

const layoutOptions: {
  value: LayoutOption;
  label: string;
  icon: IconSvgElement;
}[] = [
  { value: "default", label: "Default View", icon: DashboardSquare01Icon },
  { value: "compact", label: "Compact View", icon: Menu01Icon },
  { value: "expanded", label: "Expanded View", icon: GridIcon },
];

const teamMembers = [
  { name: "John", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=john1" },
  { name: "Jane", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=jane1" },
  { name: "Alex", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alex1" },
];

export function PayrollsHeader() {
  const { toggleSidebar } = useSidebar();
  const layout = useLayoutStore((state) => state.layout);
  const setLayout = useLayoutStore((state) => state.setLayout);
  const showCharts = useLayoutStore((state) => state.showCharts);
  const setShowCharts = useLayoutStore((state) => state.setShowCharts);
  const showFilters = useLayoutStore((state) => state.showFilters);
  const setShowFilters = useLayoutStore((state) => state.setShowFilters);

  return (
    <header className="flex items-center justify-between w-full border-b border-border px-4 md:px-6 py-2.5 bg-card">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <HugeiconsIcon icon={SidebarLeft01Icon} className="size-5" />
        </Button>
        <div className="flex items-center gap-3">
          <HugeiconsIcon icon={Coins01Icon} className="size-5 text-foreground" />
          <span className="font-medium text-foreground">Payroll</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden md:block">
          Last update 12 min ago
        </span>

        <div className="flex -space-x-2">
          {teamMembers.map((member) => (
            <Avatar
              key={member.name}
              className="size-7 border-2 border-background"
            >
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            render={
              <Link
                href="https://github.com/ln-dev7/square-ui/tree/master/templates-baseui/payrolls"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-2 hidden md:flex">
                <HugeiconsIcon icon={Layout01Icon} className="size-4" />
                Edit Layout
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">
                Layout Style
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {layoutOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={layout === option.value}
                onCheckedChange={() => setLayout(option.value)}
              >
                <HugeiconsIcon icon={option.icon} className="size-4 mr-2" />
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">Show/Hide</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showCharts}
              onCheckedChange={setShowCharts}
            >
              <HugeiconsIcon icon={GridIcon} className="size-4 mr-2" />
              Charts Section
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showFilters}
              onCheckedChange={setShowFilters}
            >
              <HugeiconsIcon icon={Menu01Icon} className="size-4 mr-2" />
              Table Filters
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
