"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Bell,
  Users,
  Calendar,
  Coins,
  FileText,
  ListTodo,
  Folder,
  ChevronDown,
  Search,
  Settings,
  HelpCircle,
  ChevronRight,
  X,
  MessageSquare,
  Globe,
  Plus,
  Check,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Bell, label: "Notification", badge: "9+" },
  { icon: Users, label: "Employees" },
  { icon: Calendar, label: "Attendance" },
  { icon: Coins, label: "Payroll" },
  { icon: FileText, label: "Invoices" },
  { icon: ListTodo, label: "Performance" },
];

const favorites = [
  { icon: Folder, label: "Reimbursements" },
  { icon: Folder, label: "Timesheets" },
  { icon: Folder, label: "Overtime Logs" },
];

const footerItems = [
  { icon: MessageSquare, label: "Feedback" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help Center" },
];

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [favoritesOpen, setFavoritesOpen] = React.useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(true);

  return (
    <Sidebar collapsible="offcanvas" className="lg:border-r-0!" {...props}>
      <SidebarHeader className="p-5 pb-0">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
              <div className="size-7 rounded-full overflow-hidden bg-linear-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center ring-1 ring-white/40 shadow-lg" />
              <span className="font-medium text-muted-foreground">
                Square UI
              </span>
              <ChevronDown className="size-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-muted-foreground text-xs font-medium">
                Workspaces
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <div className="size-5 rounded-full bg-linear-to-br from-purple-400 via-pink-500 to-red-500 mr-2" />
                Square UI
                <Check className="size-4 ml-auto" />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="size-5 rounded-full bg-linear-to-br from-blue-400 to-cyan-500 mr-2" />
                Marketing Team
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="size-5 rounded-full bg-linear-to-br from-green-400 to-emerald-500 mr-2" />
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
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4 mr-2" />
                Workspace Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-destructive">
                <LogOut className="size-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="size-7">
            <AvatarImage src="/ln.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-5 pt-5">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search Anything..."
            className="pl-9 pr-10 h-9 bg-background"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-muted px-1.5 py-0.5 rounded text-[11px] text-muted-foreground font-medium">
            ⌘K
          </div>
        </div>

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={item.active}
                    className="h-[38px]"
                  >
                    <item.icon className="size-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.active && (
                      <ChevronRight className="size-4 text-muted-foreground opacity-60" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="flex items-center gap-1.5 px-0 text-[10px] font-semibold tracking-wider text-muted-foreground">
            <button
              onClick={() => setFavoritesOpen(!favoritesOpen)}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform",
                  !favoritesOpen && "-rotate-90"
                )}
              />
              FAVORITES
            </button>
          </SidebarGroupLabel>
          {favoritesOpen && (
            <SidebarGroupContent>
              <SidebarMenu className="mt-2">
                {favorites.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton className="h-[38px]">
                      <item.icon className="size-5 text-foreground" />
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        {showUpgradeModal && (
          <div className="relative mt-4 p-5 rounded-2xl border bg-card shadow-lg">
            <Button
              variant="ghost"
              size="icon-xs"
              className="absolute right-3 top-3 bg-muted"
              onClick={() => setShowUpgradeModal(false)}
            >
              <X className="size-3" />
            </Button>
            <p className="font-semibold text-sm mb-2">🗓️ 5 Days left !</p>
            <div className="w-full bg-muted rounded-sm h-1.5 mb-2">
              <div className="bg-foreground h-full rounded-sm w-[60%]" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Select best plan now and unlock all special features
            </p>
            <Link
              href="#"
              className="flex items-center gap-1 text-sm font-medium"
            >
              Select plan
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        )}

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {footerItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton className="h-[38px]">
                    <item.icon className="size-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-5 pb-5">
        <Link
          href="https://square.lndev.me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-border bg-background hover:bg-muted shadow-xs text-sm font-medium w-full"
        >
          <Globe className="size-4" />
          square.lndev.me
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

