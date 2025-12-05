"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  LayoutGrid,
  Bell,
  Users,
  Calendar,
  Coins,
  FileText,
  ClipboardList,
  Folder,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Settings,
  HelpCircle,
  Check,
  Plus,
  X,
  Globe,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard" },
  { icon: Bell, label: "Notification" },
  { icon: Users, label: "Employees" },
  { icon: Calendar, label: "Attendance" },
  { icon: Coins, label: "Payroll", active: true },
  { icon: FileText, label: "Invoices" },
  { icon: ClipboardList, label: "Performance" },
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

export function PayrollsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [favoritesOpen, setFavoritesOpen] = useState(true);

  return (
    <Sidebar className="lg:border-r-0!" collapsible="offcanvas" {...props}>
      <SidebarHeader className="pb-0">
        <div className="px-2 py-3">
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center justify-between gap-3 h-auto p-0 hover:bg-transparent w-full"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-full overflow-hidden bg-linear-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
                      <div className="size-full bg-linear-to-br from-purple-400 via-pink-500 to-red-500 rounded-full ring-1 ring-white/40" />
                    </div>
                    <span className="font-medium text-muted-foreground">
                      Square UI
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/ln.png"
                      alt="User"
                      className="size-7 object-cover rounded-full"
                      width={28}
                      height={28}
                    />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem>
                  <div className="flex items-center gap-3 w-full">
                    <div className="size-6 bg-linear-to-br from-purple-400 via-pink-500 to-red-500 rounded-full" />
                    <span className="font-medium">Square UI</span>
                    <Check className="size-4 ml-auto" />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-3 w-full">
                    <div className="size-6 bg-linear-to-br from-blue-500 to-cyan-600 rounded-full" />
                    <span>lndev.me</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Plus className="size-4" />
                  <span>Add new company</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground z-10" />
            <Input
              type="search"
              placeholder="Search Anything..."
              className="pl-8 pr-12 h-9 text-sm text-muted-foreground placeholder:text-muted-foreground bg-muted/50 border-border"
            />
            <div className="flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 shrink-0 absolute right-2 top-1/2 -translate-y-1/2">
              <span className="text-[10px] font-medium text-muted-foreground leading-none">
                ⌘
              </span>
              <Kbd className="h-auto min-w-0 px-0 py-0 text-[10px] leading-none bg-transparent border-0">
                K
              </Kbd>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={item.active}
                    className={cn(
                      "h-8 text-sm text-muted-foreground",
                      item.active && "bg-muted dark:bg-muted/50"
                    )}
                  >
                    <item.icon className="size-4" />
                    <span
                      className={cn(
                        item.active && "font-medium text-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                    {item.active && (
                      <ChevronRight className="size-4 ml-auto text-muted-foreground" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible open={favoritesOpen} onOpenChange={setFavoritesOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="h-4 pb-4 pt-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-transparent cursor-pointer">
                <ChevronDown
                  className={cn(
                    "size-3 transition-transform mr-1",
                    !favoritesOpen && "-rotate-90"
                  )}
                />
                <span>Favorites</span>
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {favorites.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton className="h-8 text-sm text-muted-foreground">
                        <item.icon className="size-4 fill-foreground" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <Button variant="outline" className="w-full" asChild>
              <Link
                href="https://square.lndev.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="size-4" />
                square.lndev.me
              </Link>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton className="h-8 text-sm text-muted-foreground">
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="mt-4">
          <Link
            href="https://github.com/ln-dev7/square-ui/tree/master/templates/payrolls"
            target="_blank"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
