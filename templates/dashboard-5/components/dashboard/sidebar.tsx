"use client";

import Link from "next/link";
import {
  Search,
  Sparkles,
  LayoutGrid,
  Bell,
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Calendar,
  BarChart3,
  HelpCircle,
  Settings,
  ChevronDown,
  Check,
  Plus,
  User,
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Search", icon: Search, shortcut: "/", iconColor: "text-muted-foreground" },
  { title: "Taskplus AI", icon: Sparkles, iconColor: "text-violet-500" },
  { title: "Templates", icon: LayoutGrid, iconColor: "text-blue-500" },
  { title: "Notification", icon: Bell, iconColor: "text-amber-500" },
  { title: "Dashboard", icon: LayoutDashboard, isActive: true, iconColor: "text-primary" },
  { title: "Inbox", icon: Inbox, iconColor: "text-cyan-500" },
  { title: "Project", icon: FolderKanban, iconColor: "text-emerald-500" },
  { title: "Calendar", icon: Calendar, iconColor: "text-orange-500" },
  { title: "Reports", icon: BarChart3, iconColor: "text-rose-500" },
  { title: "Help & Center", icon: HelpCircle, iconColor: "text-sky-500" },
  { title: "Settings", icon: Settings, iconColor: "text-muted-foreground" },
];

export function DashboardSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar collapsible="offcanvas" className="!border-r-0" {...props}>
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center justify-between w-full">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none w-full justify-start">
              <div className="size-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                <span className="text-sm font-bold">T+</span>
              </div>
              <span className="font-semibold text-sidebar-foreground truncate">
                Taskplus
              </span>
              <ChevronDown className="size-3 text-muted-foreground shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-muted-foreground text-xs font-medium">
                Workspaces
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <div className="size-5 rounded bg-primary/20 mr-2 flex items-center justify-center text-xs font-bold text-primary">
                  T+
                </div>
                Taskplus
                <Check className="size-4 ml-auto" />
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
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus className="size-4 mr-2" />
                Create Workspace
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="size-4 mr-2" />
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
                    asChild
                    isActive={item.isActive}
                    className="h-9"
                  >
                    <Link href="#">
                      <item.icon className={cn("size-4 shrink-0", item.iconColor)} />
                      <span className="text-sm">{item.title}</span>
                      {item.shortcut && (
                        <span className="ml-auto flex size-5 items-center justify-center rounded bg-muted text-[10px] font-medium text-muted-foreground">
                          {item.shortcut}
                        </span>
                      )}
                    </Link>
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
          <Button size="sm" className="w-full" asChild>
            <Link
              href="https://square.lndevui.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              square.lndevui.com
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
