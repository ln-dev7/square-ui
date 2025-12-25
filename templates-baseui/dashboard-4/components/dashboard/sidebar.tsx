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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Mail01Icon,
  DashboardSquare01Icon,
  Task01Icon,
  Layers01Icon,
  Calendar01Icon,
  File01Icon,
  UserGroupIcon,
  Building02Icon,
  Globe02Icon,
  Folder01Icon,
  FileEmpty01Icon,
  Notification01Icon,
  SourceCodeIcon,
  HeadphonesIcon,
  Add01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  UnfoldMoreIcon,
  Settings01Icon,
  UserAdd01Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Search", icon: Search01Icon, shortcut: "/" },
  { title: "Inbox", icon: Mail01Icon },
  { title: "Dashboard", icon: DashboardSquare01Icon, isActive: true },
  { title: "My Tasks", icon: Task01Icon },
  { title: "Projects", icon: Layers01Icon },
  { title: "Calendar", icon: Calendar01Icon },
  { title: "Documents", icon: File01Icon },
  { title: "Teams", icon: UserGroupIcon },
  { title: "Company", icon: Building02Icon },
];

const workgroups = [
  {
    id: "all-work",
    name: "All Work",
    icon: Globe02Icon,
    children: [
      {
        id: "website-copy",
        name: "Website Copy",
        icon: Folder01Icon,
        children: [
          { id: "client-website", name: "Client website", icon: FileEmpty01Icon },
          { id: "personal-project", name: "Personal project", icon: FileEmpty01Icon },
        ],
      },
      { id: "ux-research", name: "UX Research", icon: Folder01Icon },
      { id: "assets-library", name: "Assets Library", icon: Folder01Icon },
    ],
  },
  { id: "marketing", name: "Marketing", icon: Notification01Icon },
  { id: "development", name: "Development", icon: SourceCodeIcon },
  { id: "support", name: "Support", icon: HeadphonesIcon },
];

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([
    "all-work",
    "website-copy",
  ]);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderWorkgroupItem = (
    item: (typeof workgroups)[0],
    level: number = 0
  ) => {
    const hasChildren = "children" in item && item.children;
    const isExpanded = expandedItems.includes(item.id);
    const Icon = item.icon;
    const paddingLeft = level * 12;

    if (hasChildren) {
      return (
        <Collapsible
          key={item.id}
          open={isExpanded}
          onOpenChange={() => toggleItem(item.id)}
        >
          <SidebarMenuItem>
            <CollapsibleTrigger
              render={
                <SidebarMenuButton
                  className="h-7 text-sm"
                  style={{ paddingLeft: `${8 + paddingLeft}px` }}
                >
                  <HugeiconsIcon icon={Icon} className="size-3.5" />
                  <span className="flex-1">{item.name}</span>
                  {isExpanded ? (
                    <HugeiconsIcon icon={ArrowDown01Icon} className="size-3" />
                  ) : (
                    <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
                  )}
                </SidebarMenuButton>
              }
            />
            <CollapsibleContent>
              <SidebarMenuSub className="mr-0 pr-0">
                {item.children?.map((child) => (
                  <SidebarMenuSubItem key={child.id}>
                    {renderWorkgroupItem(
                      child as (typeof workgroups)[0],
                      level + 1
                    )}
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton
          className="h-7 text-sm"
          style={{ paddingLeft: `${8 + paddingLeft}px` }}
        >
          <HugeiconsIcon icon={Icon} className="size-3.5" />
          <span>{item.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="lg:border-r-0!" collapsible="icon" {...props}>
      <SidebarHeader className="px-2.5 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2.5 w-full hover:bg-sidebar-accent rounded-md p-1 -m-1 transition-colors shrink-0">
                <div className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background shrink-0">
                  <span className="text-sm font-bold">S</span>
                </div>
                <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-medium">Square UI</span>
                  <HugeiconsIcon icon={UnfoldMoreIcon} className="size-3 text-muted-foreground" />
                </div>
              </button>
            }
          />
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Settings01Icon} className="size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={UserAdd01Icon} className="size-4" />
                <span>Invite members</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <HugeiconsIcon icon={Logout01Icon} className="size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent className="px-2.5">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href="#" />}
                    isActive={item.isActive}
                    className="h-7"
                  >
                    <HugeiconsIcon icon={item.icon} className="size-3.5" />
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

        <SidebarGroup className="p-0 mt-4">
          <SidebarGroupLabel className="flex items-center justify-between px-0 h-6">
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground">
              Workgroups
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-5">
                <HugeiconsIcon icon={Search01Icon} className="size-3" />
              </Button>
              <Button variant="ghost" size="icon" className="size-5">
                <HugeiconsIcon icon={Add01Icon} className="size-3" />
              </Button>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workgroups.map((item) => renderWorkgroupItem(item))}
              <SidebarMenuItem>
                <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                  <HugeiconsIcon icon={Add01Icon} className="size-3.5" />
                  <span>Create Group</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2.5 pb-3 group-data-[collapsible=icon]:hidden">
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
            href="https://square.lndev.me"
          >
            <span className="sr-only">Square by lndev-ui</span>
          </Link>
          <Link
            href="https://square.lndev.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-8 w-full px-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 transition-colors"
          >
            square.lndev.me
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

