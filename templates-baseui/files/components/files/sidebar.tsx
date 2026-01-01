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
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Folder01Icon,
  FavouriteIcon,
  Clock01Icon,
  Share01Icon,
  Delete01Icon,
  Settings01Icon,
  ArrowDown01Icon,
  Add01Icon,
  UnfoldMoreIcon,
  Logout01Icon,
  UserCircle02Icon,
  Globe02Icon,
  Home01Icon,
  HardDriveIcon,
  Upload01Icon,
  FolderAddIcon,
  File01Icon,
  Image01Icon,
  Link01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { useFilesStore } from "@/store/files-store";
import { storageData } from "@/mock-data/files";

const menuItems = [
  { icon: Home01Icon, label: "All Files", href: "/" },
  { icon: FavouriteIcon, label: "Starred", href: "/starred" },
  { icon: Clock01Icon, label: "Recent", href: "/recent" },
  { icon: Share01Icon, label: "Shared", href: "/shared" },
  { icon: Delete01Icon, label: "Trash", href: "/trash" },
];

export function FilesSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { folders } = useFilesStore();
  const pathname = usePathname();
  const [foldersOpen, setFoldersOpen] = React.useState(true);

  const storagePercentage = (storageData.used / storageData.total) * 100;

  return (
    <Sidebar className="lg:border-r-0!" collapsible="offExamples" {...props}>
      <SidebarHeader className="p-4 pb-0">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-fuchsia-500">
            <HugeiconsIcon icon={HardDriveIcon} className="size-4 text-white" />
          </div>
          <span className="font-semibold text-base">Square Drive</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 pt-6">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button className="w-full mb-4 gap-2">
                <HugeiconsIcon icon={Add01Icon} className="size-4" />
                New
              </Button>
            }
          />
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Upload01Icon} className="size-4 mr-2" />
                Upload File
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={FolderAddIcon} className="size-4 mr-2" />
                New Folder
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={File01Icon} className="size-4 mr-2" />
                New Document
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Image01Icon} className="size-4 mr-2" />
                New Image
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Link01Icon} className="size-4 mr-2" />
                Add Link
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                    className="h-9"
                  >
                    <HugeiconsIcon icon={item.icon} className="size-4" />
                    <span className="text-sm">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible open={foldersOpen} onOpenChange={setFoldersOpen}>
          <SidebarGroup className="p-0 mt-4">
            <CollapsibleTrigger
              render={
                <SidebarGroupLabel className="h-4 pb-4 pt-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-transparent cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
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
                    <HugeiconsIcon icon={Add01Icon} className="size-3" />
                  </Button>
                </SidebarGroupLabel>
              }
            />
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {folders.map((folder) => (
                    <SidebarMenuItem key={folder.id}>
                      <SidebarMenuButton
                        render={<Link href={`/folder/${folder.id}`} />}
                        isActive={pathname === `/folder/${folder.id}`}
                        className="h-9"
                      >
                        <HugeiconsIcon
                          icon={Folder01Icon}
                          className="size-4"
                          style={{ color: folder.color }}
                        />
                        <span className="flex-1 text-sm truncate">
                          {folder.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {folder.filesCount}
                        </span>
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
        <Link
          href="https://square.lndev.me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-border bg-background hover:bg-muted shadow-xs text-sm font-medium w-full"
        >
          <HugeiconsIcon icon={Globe02Icon} className="size-4" />
          square.lndev.me
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
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
                <HugeiconsIcon
                  icon={UnfoldMoreIcon}
                  className="size-4 text-muted-foreground shrink-0"
                />
              </div>
            }
          />
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon
                  icon={UserCircle02Icon}
                  className="size-4 mr-2"
                />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Settings01Icon} className="size-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <HugeiconsIcon icon={Logout01Icon} className="size-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
