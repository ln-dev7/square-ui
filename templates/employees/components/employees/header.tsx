"use client";

import {
  Users,
  Github,
  PanelLeft,
  LayoutGrid,
  Columns,
  Rows,
  Table2,
  Layout,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useLayoutStore, LayoutOption } from "@/store/layout-store";

const layoutOptions = [
  { value: "default" as LayoutOption, label: "Default View", icon: LayoutGrid },
  { value: "compact" as LayoutOption, label: "Compact View", icon: Rows },
  { value: "expanded" as LayoutOption, label: "Expanded View", icon: Columns },
];

const teamMembers = [
  { name: "John", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=john1" },
  { name: "Jane", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=jane1" },
  { name: "Alex", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alex1" },
];

export function EmployeesHeader() {
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
          <PanelLeft className="size-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Users className="size-5 text-foreground" />
          <span className="font-medium text-foreground">Employees</span>
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
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://github.com/ln-dev7/square-ui/tree/master/templates/employees"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
            </Link>
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hidden md:flex"
            >
              <Layout className="size-4" />
              Edit Layout
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs">
              Layout Style
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {layoutOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={layout === option.value}
                onCheckedChange={() => setLayout(option.value)}
              >
                <option.icon className="size-4 mr-2" />
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs">Show/Hide</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showCharts}
              onCheckedChange={setShowCharts}
            >
              <Table2 className="size-4 mr-2" />
              Charts Section
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showFilters}
              onCheckedChange={setShowFilters}
            >
              <Rows className="size-4 mr-2" />
              Table Filters
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

