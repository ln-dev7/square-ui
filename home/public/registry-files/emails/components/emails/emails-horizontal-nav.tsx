"use client";

import {
  MailPlusIcon,
  InboxIcon,
  SendIcon,
  FileSpreadsheetIcon,
  StarIcon,
  ArchiveIcon,
  Trash2Icon,
  FileWarningIcon,
  AsteriskIcon,
  MenuIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEmailsStore } from "@/store/emails-store";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function EmailsHorizontalNav() {
  const { emails, currentFolder, setFolder } = useEmailsStore();

  const mainFolders = [
    {
      id: "inbox",
      label: "Inbox",
      icon: InboxIcon,
      count: emails.length.toString() as string | undefined,
    },
    { id: "sent", label: "Sent items", icon: SendIcon, count: undefined },
    {
      id: "drafts",
      label: "Drafts",
      icon: FileSpreadsheetIcon,
      count: undefined,
    },
    { id: "starred", label: "Favorites", icon: StarIcon, count: undefined },
    { id: "archive", label: "Archive", icon: ArchiveIcon, count: undefined },
  ];

  const additionalFolders = [
    { id: "deleted", label: "Deleted", icon: Trash2Icon, count: undefined },
    { id: "spam", label: "Spam", icon: FileWarningIcon, count: undefined },
    { id: "junk", label: "Junk", icon: AsteriskIcon, count: undefined },
  ];

  const allFolders = [...mainFolders, ...additionalFolders];

  return (
    <div className="flex h-[54px] items-center border-b border-border bg-background px-3 md:px-4">
      <div className="flex items-center gap-2 md:gap-3 w-full">
        <Button
          size="sm"
          className="relative h-[30px] shrink-0 overflow-hidden bg-linear-to-r from-white to-white hover:opacity-90"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(205,175,250,1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(129,169,248,1),transparent_50%),radial-gradient(ellipse_at_top_left,rgba(247,203,191,1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(164,252,245,1),transparent_50%)]" />
          <MailPlusIcon className="relative size-4 text-black" />
          <span className="relative hidden sm:inline text-black">Compose</span>
        </Button>

        <Separator orientation="vertical" className="h-5 hidden sm:block" />

        <div className="hidden 2xl:flex items-center gap-2.5 flex-1">
          {allFolders.map((folder) => {
            const Icon = folder.icon;
            const isActive = currentFolder === folder.id;

            return (
              <Button
                key={folder.id}
                variant="ghost"
                size="sm"
                onClick={() => setFolder(folder.id as any)}
                className={cn(
                  "h-[30px] gap-1.5",
                  isActive && "bg-muted text-foreground hover:bg-muted"
                )}
              >
                <Icon className="size-4" />
                <span className="text-[13px]">{folder.label}</span>
                {folder.count && isActive && (
                  <span className="text-[12px]">{folder.count}</span>
                )}
              </Button>
            );
          })}
        </div>

        <div className="hidden xl:flex 2xl:hidden items-center gap-2.5 flex-1">
          {mainFolders.map((folder) => {
            const Icon = folder.icon;
            const isActive = currentFolder === folder.id;

            return (
              <Button
                key={folder.id}
                variant="ghost"
                size="sm"
                onClick={() => setFolder(folder.id as any)}
                className={cn(
                  "h-[30px] gap-1.5",
                  isActive && "bg-muted text-foreground hover:bg-muted"
                )}
              >
                <Icon className="size-4" />
                <span className="text-[13px]">{folder.label}</span>
                {folder.count && isActive && (
                  <span className="text-[12px]">{folder.count}</span>
                )}
              </Button>
            );
          })}

          <Separator orientation="vertical" className="h-5" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-[30px] gap-1.5">
                <MenuIcon className="size-4" />
                <span className="text-[13px]">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {additionalFolders.map((folder) => {
                const Icon = folder.icon;
                const isActive = currentFolder === folder.id;

                return (
                  <DropdownMenuItem
                    key={folder.id}
                    onClick={() => setFolder(folder.id as any)}
                    className={cn(isActive && "bg-muted")}
                  >
                    <Icon className="size-4" />
                    <span>{folder.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden lg:flex xl:hidden items-center gap-2.5 flex-1">
          {mainFolders.slice(0, 3).map((folder) => {
            const Icon = folder.icon;
            const isActive = currentFolder === folder.id;

            return (
              <Button
                key={folder.id}
                variant="ghost"
                size="sm"
                onClick={() => setFolder(folder.id as any)}
                className={cn(
                  "h-[30px] gap-1.5",
                  isActive && "bg-muted text-foreground hover:bg-muted"
                )}
              >
                <Icon className="size-4" />
                <span className="text-[13px]">{folder.label}</span>
                {folder.count && isActive && (
                  <span className="text-[12px]">{folder.count}</span>
                )}
              </Button>
            );
          })}

          <Separator orientation="vertical" className="h-5" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-[30px] gap-1.5">
                <MenuIcon className="size-4" />
                <span className="text-[13px]">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {mainFolders.slice(3).map((folder) => {
                const Icon = folder.icon;
                const isActive = currentFolder === folder.id;

                return (
                  <DropdownMenuItem
                    key={folder.id}
                    onClick={() => setFolder(folder.id as any)}
                    className={cn(isActive && "bg-muted")}
                  >
                    <Icon className="size-4" />
                    <span>{folder.label}</span>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              {additionalFolders.map((folder) => {
                const Icon = folder.icon;
                const isActive = currentFolder === folder.id;

                return (
                  <DropdownMenuItem
                    key={folder.id}
                    onClick={() => setFolder(folder.id as any)}
                    className={cn(isActive && "bg-muted")}
                  >
                    <Icon className="size-4" />
                    <span>{folder.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden md:flex lg:hidden items-center gap-2 flex-1">
          {mainFolders.slice(0, 2).map((folder) => {
            const Icon = folder.icon;
            const isActive = currentFolder === folder.id;

            return (
              <Button
                key={folder.id}
                variant="ghost"
                size="sm"
                onClick={() => setFolder(folder.id as any)}
                className={cn(
                  "h-[30px] gap-1.5",
                  isActive && "bg-muted text-foreground hover:bg-muted"
                )}
              >
                <Icon className="size-4" />
                <span className="text-[13px]">{folder.label}</span>
              </Button>
            );
          })}

          <Separator orientation="vertical" className="h-5" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-[30px] gap-1.5">
                <MenuIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {mainFolders.slice(2).map((folder) => {
                const Icon = folder.icon;
                const isActive = currentFolder === folder.id;

                return (
                  <DropdownMenuItem
                    key={folder.id}
                    onClick={() => setFolder(folder.id as any)}
                    className={cn(isActive && "bg-muted")}
                  >
                    <Icon className="size-4" />
                    <span>{folder.label}</span>
                    {folder.count && isActive && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {folder.count}
                      </span>
                    )}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              {additionalFolders.map((folder) => {
                const Icon = folder.icon;
                const isActive = currentFolder === folder.id;

                return (
                  <DropdownMenuItem
                    key={folder.id}
                    onClick={() => setFolder(folder.id as any)}
                    className={cn(isActive && "bg-muted")}
                  >
                    <Icon className="size-4" />
                    <span>{folder.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex md:hidden items-center gap-2 flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-[30px] gap-1.5">
                <MenuIcon className="size-4" />
                <span className="text-[13px]">Folders</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {mainFolders.map((folder) => {
                const Icon = folder.icon;
                const isActive = currentFolder === folder.id;

                return (
                  <DropdownMenuItem
                    key={folder.id}
                    onClick={() => setFolder(folder.id as any)}
                    className={cn(isActive && "bg-muted")}
                  >
                    <Icon className="size-4" />
                    <span>{folder.label}</span>
                    {folder.count && isActive && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {folder.count}
                      </span>
                    )}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              {additionalFolders.map((folder) => {
                const Icon = folder.icon;
                const isActive = currentFolder === folder.id;

                return (
                  <DropdownMenuItem
                    key={folder.id}
                    onClick={() => setFolder(folder.id as any)}
                    className={cn(isActive && "bg-muted")}
                  >
                    <Icon className="size-4" />
                    <span>{folder.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
