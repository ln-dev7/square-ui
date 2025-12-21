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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  ChartLineData01Icon,
  Notification01Icon,
  Calendar01Icon,
  Task01Icon,
  UserGroupIcon,
  Folder01Icon,
  HelpCircleIcon,
  Settings01Icon,
  ArrowRight01Icon,
  ArrowDown01Icon,
  MoreHorizontalIcon,
  Invoice01Icon,
  Logout01Icon,
  UserIcon,
  Coins01Icon,
  Globe02Icon,
} from "@hugeicons/core-free-icons";

const menuItems = [
  {
    title: "AI Assistant",
    icon: Invoice01Icon,
    href: "#",
    isGradient: true,
  },
  {
    title: "Dashboard",
    icon: DashboardSquare01Icon,
    href: "#",
  },
  {
    title: "Leads",
    icon: ChartLineData01Icon,
    href: "#",
    isActive: true,
  },
  {
    title: "Emails",
    icon: Notification01Icon,
    href: "#",
  },
  {
    title: "Calendar",
    icon: Calendar01Icon,
    href: "#",
  },
  {
    title: "Tasks",
    icon: Task01Icon,
    href: "#",
  },
  {
    title: "Contacts",
    icon: UserGroupIcon,
    href: "#",
  },
];

const folders = [
  { name: "TechCorp Upgrade", hasNotification: true },
  { name: "Fintra Expansion", hasNotification: true },
  { name: "Nova Redesign", hasNotification: true },
];

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [foldersOpen, setFoldersOpen] = React.useState(true);

  return (
    <Sidebar collapsible="offExamples" className="lg:border-r-0!" {...props}>
      <SidebarHeader className="p-3 sm:p-4 lg:p-5 pb-0">
        <div className="flex items-center gap-2">
          <div className="flex size-5 items-center justify-center rounded bg-linear-to-b from-[#6e3ff3] to-[#aa8ef9] text-white">
            <HugeiconsIcon icon={Invoice01Icon} className="size-3" />
          </div>
          <span className="font-semibold text-base sm:text-lg">Square UI</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 sm:px-4 lg:px-5">
        <div className="flex items-center gap-2 sm:gap-3 rounded-lg border bg-card p-2 sm:p-3 mb-3 sm:mb-4">
          <div className="flex size-8 sm:size-[34px] items-center justify-center rounded-lg bg-linear-to-b from-[#6e3ff3] to-[#aa8ef9] text-white shrink-0">
            <HugeiconsIcon icon={Invoice01Icon} className="size-4 sm:size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-xs sm:text-sm">Synclead</p>
            <div className="flex items-center gap-1 text-muted-foreground">
              <HugeiconsIcon icon={UserGroupIcon} className="size-3 sm:size-3.5" />
              <span className="text-[10px] sm:text-xs">16 Members</span>
            </div>
          </div>
        </div>

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={item.isActive}
                    className="h-9 sm:h-[38px]"
                  >
                    <HugeiconsIcon
                      icon={item.icon}
                      className={`size-4 sm:size-5 ${
                        item.isGradient ? "text-[#6e3ff3]" : ""
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        item.isGradient
                          ? "bg-clip-text text-transparent bg-linear-to-r from-[#6e3ff3] to-[#df3674]"
                          : ""
                      }`}
                    >
                      {item.title}
                    </span>
                    {item.isActive && (
                      <HugeiconsIcon icon={ArrowRight01Icon} className="ml-auto size-4 text-muted-foreground opacity-60" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible open={foldersOpen} onOpenChange={setFoldersOpen}>
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="flex items-center justify-between px-0 text-[10px] sm:text-[11px] font-semibold tracking-wider text-muted-foreground">
              <CollapsibleTrigger className="flex items-center gap-1.5 cursor-pointer">
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  className={`size-3 sm:size-3.5 transition-transform ${
                    foldersOpen ? "" : "-rotate-90"
                  }`}
                />
                FOLDERS
              </CollapsibleTrigger>
              <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4 cursor-pointer hover:text-foreground transition-colors" />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="mt-2">
                  {folders.map((folder) => (
                    <SidebarMenuItem key={folder.name}>
                      <SidebarMenuButton render={<Link href="#" />} className="h-9 sm:h-[38px]">
                        <HugeiconsIcon icon={Folder01Icon} className="size-4 sm:size-5 text-muted-foreground" />
                        <span className="flex-1 text-muted-foreground text-sm truncate">
                          {folder.name}
                        </span>
                        {folder.hasNotification && (
                          <div className="size-1.5 rounded-full bg-[#6e3ff3] shrink-0" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="#" />} className="h-9 sm:h-[38px]">
              <HugeiconsIcon icon={HelpCircleIcon} className="size-4 sm:size-5" />
              <span className="text-sm">Help Center</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="#" />} className="h-9 sm:h-[38px]">
              <HugeiconsIcon icon={Settings01Icon} className="size-4 sm:size-5" />
              <span className="text-sm">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Link
          href="https://square.lndev.me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-border bg-background hover:bg-muted shadow-xs text-sm font-medium w-full mt-2"
        >
          <HugeiconsIcon icon={Globe02Icon} className="size-4" />
          square.lndev.me
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <Avatar className="size-7 sm:size-8">
                  <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=john" />
                  <AvatarFallback className="text-xs">JC</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs sm:text-sm">John Cornor</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    Johncornor@mail.com
                  </p>
                </div>
                <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 text-muted-foreground shrink-0" />
              </div>
            }
          />
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>
              <HugeiconsIcon icon={UserIcon} className="size-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Coins01Icon} className="size-4 mr-2" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Settings01Icon} className="size-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <HugeiconsIcon icon={Logout01Icon} className="size-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
