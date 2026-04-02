"use client";

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
import { folders } from "@/mock-data/creator-dashboard";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  Megaphone01Icon,
  Layers01Icon,
  UserMultiple02Icon,
  Message01Icon,
  Wallet01Icon,
  Folder01Icon,
  Add01Icon,
  HelpCircleIcon,
  Settings01Icon,
  ArrowDown01Icon,
  UserIcon,
  Search01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";

const navItems = [
  { title: "Dashboard", icon: DashboardSquare01Icon, href: "#" },
  { title: "Campaigns", icon: Megaphone01Icon, href: "#", isActive: true },
  { title: "Projects", icon: Layers01Icon, href: "#" },
  { title: "Team", icon: UserMultiple02Icon, href: "#" },
  { title: "Messages", icon: Message01Icon, href: "#" },
  { title: "Wallet", icon: Wallet01Icon, href: "#" },
];

const bottomNavItems = [
  { title: "Help", icon: HelpCircleIcon, href: "#" },
  { title: "Settings", icon: Settings01Icon, href: "#" },
];

export function DashboardSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar collapsible="offcanvas" className="!border-r-0" {...props}>
      <SidebarHeader className="px-3 py-3">
        <div className="flex items-center justify-between w-full">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex items-center gap-2 outline-none w-full justify-start">
                  <Avatar className="size-7.5 shrink-0">
                    <AvatarImage src="/ln.png" />
                    <AvatarFallback>LN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Square Marketing</span>
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
                  <Avatar className="size-5 mr-2 shrink-0">
                    <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=creator" />
                    <AvatarFallback>CR</AvatarFallback>
                  </Avatar>
                  Creator Hub
                  <HugeiconsIcon icon={Tick01Icon} className="size-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="size-5 rounded bg-blue-500/20 mr-2 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                    M
                  </div>
                  Marketing Team
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
          <Button variant="ghost" size="icon" className="size-7 shrink-0">
            <HugeiconsIcon icon={Search01Icon} className="size-3.5" />
          </Button>
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
                    render={<Link href={item.href} />}
                  >
                    <HugeiconsIcon icon={item.icon} className="size-4 shrink-0" />
                    <span className="text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0 mt-2">
          <div className="flex items-center justify-between px-2 py-1">
            <SidebarGroupLabel className="px-0 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Folders
            </SidebarGroupLabel>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-5">
                <HugeiconsIcon icon={Search01Icon} className="size-3" />
              </Button>
              <Button variant="ghost" size="icon" className="size-5">
                <HugeiconsIcon icon={Add01Icon} className="size-3" />
              </Button>
            </div>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.id}>
                  <SidebarMenuButton className="h-8" render={<Link href="#" />}>
                    <HugeiconsIcon icon={Folder01Icon} className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-sm">{folder.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="h-8" render={<Link href="#" />}>
                  <HugeiconsIcon icon={Add01Icon} className="size-3.5 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">New folder</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-3">
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className="h-9" render={<Link href={item.href} />}>
                <HugeiconsIcon icon={item.icon} className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="group/sidebar relative flex flex-col gap-2 rounded-lg border p-4 text-sm w-full bg-background group-data-[collapsible=icon]:hidden">
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
