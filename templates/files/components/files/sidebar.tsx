"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FolderClosed,
  Star,
  Clock,
  Share2,
  Trash2,
  Settings,
  ChevronDown,
  Plus,
  ChevronsUpDown,
  LogOut,
  UserCircle,
  Globe,
  Home,
  HardDrive,
  Upload,
  FolderPlus,
  FileText,
  FileImage,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilesStore } from "@/store/files-store";
import { storageData } from "@/mock-data/files";

const menuItems = [
  { icon: Home, label: "All Files", href: "/" },
  { icon: Star, label: "Starred", href: "/starred" },
  { icon: Clock, label: "Recent", href: "/recent" },
  { icon: Share2, label: "Shared", href: "/shared" },
  { icon: Trash2, label: "Trash", href: "/trash" },
];

export function FilesSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { folders } = useFilesStore();
  const pathname = usePathname();
  const [foldersOpen, setFoldersOpen] = React.useState(true);

  const storagePercentage = (storageData.used / storageData.total) * 100;

  return (
    <Sidebar className="lg:border-r-0!" collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-4 pb-0">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-fuchsia-500">
            <HardDrive className="size-4 text-white" />
          </div>
          <span className="font-semibold text-base">Square Drive</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 pt-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full mb-4 gap-2">
              <Plus className="size-4" />
              New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>
              <Upload className="size-4 mr-2" />
              Upload File
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderPlus className="size-4 mr-2" />
              New Folder
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FileText className="size-4 mr-2" />
              New Document
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileImage className="size-4 mr-2" />
              New Image
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link2 className="size-4 mr-2" />
              Add Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="h-9"
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible open={foldersOpen} onOpenChange={setFoldersOpen}>
          <SidebarGroup className="p-0 mt-4">
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="h-4 pb-4 pt-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-transparent cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <ChevronDown
                    className={cn(
                      "size-3 transition-transform",
                      !foldersOpen && "-rotate-90"
                    )}
                  />
                  <span>Folders</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5 hover:bg-muted"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Plus className="size-3" />
                </Button>
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {folders.map((folder) => (
                    <SidebarMenuItem key={folder.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/folder/${folder.id}`}
                        className="h-9"
                      >
                        <Link href={`/folder/${folder.id}`}>
                          <FolderClosed
                            className="size-4"
                            style={{ color: folder.color }}
                          />
                          <span className="flex-1 text-sm truncate">
                            {folder.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {folder.filesCount}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <div className="mt-6 p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Storage</span>
            <span className="text-xs text-muted-foreground">
              {storageData.used} GB / {storageData.total} GB
            </span>
          </div>
          <Progress value={storagePercentage} className="h-2" />
          <div className="flex flex-wrap gap-2 mt-3">
            {storageData.breakdown.slice(0, 3).map((item) => (
              <div key={item.type} className="flex items-center gap-1.5">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-accent transition-colors mt-2">
              <Avatar className="size-8">
                <AvatarImage src="/ln.png" />
                <AvatarFallback className="text-xs">SW</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Leonel Ngoya</p>
                <p className="text-xs text-muted-foreground truncate">
                  leonelngoya@gmail.com
                </p>
              </div>
              <ChevronsUpDown className="size-4 text-muted-foreground shrink-0" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>
              <UserCircle className="size-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="size-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="size-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
