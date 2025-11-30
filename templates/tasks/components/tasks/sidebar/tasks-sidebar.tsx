"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconAtom2,
  IconUsers,
  IconSelector,
  IconWand,
  IconLayoutGrid,
  IconChartAreaLine,
  IconMail,
  IconCalendarEvent,
  IconNote,
  IconUserCircle,
  IconChevronRight,
  IconHelpSquareRounded,
  IconSettings2,
  IconGlobeFilled,
} from "@tabler/icons-react";
import { currentUser } from "@/mock-data/users";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const menuItems = [
  { id: "ai-assistant", label: "AI Assistant", icon: IconWand },
  { id: "dashboard", label: "Dashboard", icon: IconLayoutGrid },
  { id: "leads", label: "Leads", icon: IconChartAreaLine },
  { id: "emails", label: "Emails", icon: IconMail },
  { id: "calendar", label: "Calendar", icon: IconCalendarEvent },
  {
    id: "tasks",
    label: "Tasks",
    icon: IconNote,
    isActive: true,
    hasChevron: true,
  },
  { id: "contacts", label: "Contacts", icon: IconUserCircle },
];

const bottomItems = [
  { id: "help", label: "Help Center", icon: IconHelpSquareRounded },
  { id: "settings", label: "Settings", icon: IconSettings2 },
];

export function TasksSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded bg-primary flex items-center justify-center">
              <IconAtom2 className="size-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">Square UI</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-5">
        <div className="flex items-center gap-3 rounded-lg border border-border p-3 mb-4">
          <div className="flex items-center justify-center size-[34px] rounded-lg bg-emerald-500/10">
            <IconAtom2 className="size-[22px] text-emerald-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium">Synclead</p>
            <div className="flex items-center gap-1.5 mt-1">
              <IconUsers className="size-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">
                16 Members
              </span>
            </div>
          </div>
          <IconSelector className="size-4 text-muted-foreground" />
        </div>

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    className={`h-[38px] px-2.5 ${
                      item.isActive
                        ? "bg-background border border-border text-foreground hover:bg-background/50 hover:text-foreground"
                        : ""
                    }`}
                  >
                    <item.icon className="size-5" />
                    <span className="text-xs">{item.label}</span>
                    {item.hasChevron && (
                      <IconChevronRight className="ml-auto size-4" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-5">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton className="h-[38px] px-3">
                <item.icon className="size-5" />
                <span className="text-xs">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent transition-colors cursor-pointer">
          <Avatar className="size-8">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium">{currentUser.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">
              {currentUser.email}
            </p>
          </div>
          <IconSelector className="size-4 text-muted-foreground" />
        </div>

        <Button variant="outline" className="mt-2" asChild>
          <Link
            href="https://square.lndev.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGlobeFilled className="size-4" />
            square.lndev.me
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
