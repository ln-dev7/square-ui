"use client";

import Link from "next/link";
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
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  SparklesIcon,
  Layers01Icon,
  Notification01Icon,
  DashboardSquare01Icon,
  Mail01Icon,
  Task01Icon,
  Calendar01Icon,
  ChartLineData01Icon,
  HelpCircleIcon,
  Settings01Icon,
  ArrowDown01Icon,
  Tick01Icon,
  Add01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

const navItems = [
  { title: "Search", icon: Search01Icon, shortcut: "/", iconColor: "text-muted-foreground" },
  { title: "Taskplus AI", icon: SparklesIcon, iconColor: "text-violet-500" },
  { title: "Templates", icon: Layers01Icon, iconColor: "text-blue-500" },
  { title: "Notification", icon: Notification01Icon, iconColor: "text-amber-500" },
  { title: "Dashboard", icon: DashboardSquare01Icon, isActive: true, iconColor: "text-primary" },
  { title: "Inbox", icon: Mail01Icon, iconColor: "text-cyan-500" },
  { title: "Project", icon: Task01Icon, iconColor: "text-emerald-500" },
  { title: "Calendar", icon: Calendar01Icon, iconColor: "text-orange-500" },
  { title: "Reports", icon: ChartLineData01Icon, iconColor: "text-rose-500" },
  { title: "Help & Center", icon: HelpCircleIcon, iconColor: "text-sky-500" },
  { title: "Settings", icon: Settings01Icon, iconColor: "text-muted-foreground" },
];

export function DashboardSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar collapsible="offExamples" className="lg:border-r-0!" {...props}>
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center justify-between w-full">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex items-center gap-2 outline-none w-full justify-start">
                  <div className="size-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                    <span className="text-sm font-bold">T+</span>
                  </div>
                  <span className="font-semibold text-sidebar-foreground truncate">
                    Taskplus
                  </span>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="size-3 text-muted-foreground shrink-0" />
                </button>
              }
            />
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuGroup>
                <p className="text-muted-foreground text-xs font-medium px-2 py-1.5">
                  Workspaces
                </p>
                <DropdownMenuItem>
                  <div className="size-5 rounded bg-primary/20 mr-2 flex items-center justify-center text-xs font-bold text-primary">
                    T+
                  </div>
                  Taskplus
                  <HugeiconsIcon icon={Tick01Icon} className="size-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="size-5 rounded bg-blue-500/20 mr-2 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                    M
                  </div>
                  Marketing Team
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="size-5 rounded bg-emerald-500/20 mr-2 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    D
                  </div>
                  Design Studio
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <HugeiconsIcon icon={Add01Icon} className="size-4 mr-2" />
                Create Workspace
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <HugeiconsIcon icon={UserIcon} className="size-4 mr-2" />
                Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="size-8 border-2 border-sidebar shrink-0">
            <AvatarImage src="/ln.png" />
            <AvatarFallback>LN</AvatarFallback>
          </Avatar>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    className="h-9"
                    render={<Link href="#" />}
                  >
                    <HugeiconsIcon icon={item.icon} className={cn("size-4 shrink-0", item.iconColor)} />
                    <span className="text-sm">{item.title}</span>
                    {item.shortcut && (
                      <span className="ml-auto flex size-5 items-center justify-center rounded bg-muted text-[10px] font-medium text-muted-foreground">
                        {item.shortcut}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-3 group-data-[collapsible=icon]:hidden">
        <div className="group/sidebar relative flex flex-col gap-2 rounded-lg border p-4 text-sm w-full bg-background">
          <div className="text-balance text-lg font-semibold leading-tight group-hover/sidebar:underline">
            Open-source layouts by lndev-ui
          </div>
          <div className="text-muted-foreground">
            Collection of beautifully crafted open-source layouts UI built with
            shadcn/ui.
          </div>
          <Link
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0"
            href="https://square.lndevui.com"
          >
            <span className="sr-only">Square by lndev-ui</span>
          </Link>
          <Link
            href="https://square.lndevui.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }), "w-full")}
          >
            square.lndevui.com
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
