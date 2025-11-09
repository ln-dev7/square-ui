"use client";

import { useState } from "react";
import {
  SearchIcon,
  HomeIcon,
  SparklesIcon,
  FileStackIcon,
  Layers3Icon,
  FolderClosedIcon,
  ZapIcon,
  MessageCircleDashedIcon,
  WandSparklesIcon,
  BoxIcon,
  ChevronDownIcon,
  UsersIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  CheckIcon,
  MoreVerticalIcon,
  Share2Icon,
  PencilIcon,
  ArchiveIcon,
  ArchiveRestoreIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/ui/logo";
import { useChatStore } from "@/store/chat-store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const iconMap = {
  zap: ZapIcon,
  "message-circle-dashed": MessageCircleDashedIcon,
  "wand-sparkles": WandSparklesIcon,
  box: BoxIcon,
};

const teams = [
  { id: "personal", name: "Personal", icon: UsersIcon },
  { id: "work", name: "Work Team", icon: BriefcaseIcon },
  { id: "education", name: "Education", icon: GraduationCapIcon },
];

export function ChatSidebar() {
  const {
    chats,
    selectedChatId,
    selectChat,
    archiveChat,
    unarchiveChat,
    deleteChat,
  } = useChatStore();
  const [selectedTeam, setSelectedTeam] = useState("personal");

  const recentChats = chats.filter((chat) => !chat.isArchived);
  const archivedChats = chats.filter((chat) => chat.isArchived);

  return (
    <div className="flex h-full w-full flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2.5 px-2 h-10"
            >
              <Logo className="size-6" />
              <span className="font-semibold text-sm">Square AI</span>
              <div className="ml-auto flex items-center gap-1.5">
                <Image
                  src="/ln.png"
                  alt="lndev.me"
                  className="size-5 object-cover rounded-full"
                  width={20}
                  height={20}
                />
                <ChevronDownIcon className="size-3" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {teams.map((team) => {
              const TeamIcon = team.icon;
              const isSelected = selectedTeam === team.id;
              return (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className="gap-2"
                >
                  <TeamIcon className="size-4" />
                  <span className="flex-1">{team.name}</span>
                  {isSelected && <CheckIcon className="size-4" />}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <Image
                src="/ln.png"
                alt="lndev.me"
                className="size-4 object-cover rounded-full"
                width={16}
                height={16}
              />
              <span>lndev.me</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="p-3">
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search anything"
            className="pl-9 pr-10 h-[34px] bg-muted/50"
          />
          <div className="absolute right-2 flex items-center justify-center size-5 rounded bg-muted text-xs text-muted-foreground">
            /
          </div>
        </div>
      </div>

      <div className="p-3 space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2 px-2">
          <HomeIcon className="size-4" />
          <span className="text-sm">Home</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 px-2">
          <SparklesIcon className="size-4" />
          <span className="text-sm">Ask AI</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 px-2">
          <FileStackIcon className="size-4" />
          <span className="text-sm">Prompt Library</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 px-2">
          <Layers3Icon className="size-4" />
          <span className="text-sm">Extension</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 px-2">
          <FolderClosedIcon className="size-4" />
          <span className="text-sm">Folders</span>
        </Button>
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="p-3 space-y-4">
          <div className="space-y-1">
            <div className="px-2 py-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Recent
              </p>
            </div>
            {recentChats.map((chat) => {
              const Icon =
                iconMap[chat.icon as keyof typeof iconMap] ||
                MessageCircleDashedIcon;
              const isActive = selectedChatId === chat.id;
              return (
                <div
                  key={chat.id}
                  className={cn(
                    "group/item relative flex items-center rounded-md overflow-hidden",
                    isActive && "bg-sidebar-accent"
                  )}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex-1 justify-start gap-2 px-2 text-left h-auto py-1.5 min-w-0 pr-8",
                      isActive ? "hover:bg-sidebar-accent" : "hover:bg-accent"
                    )}
                    onClick={() => selectChat(chat.id)}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="text-sm truncate min-w-0">
                      {chat.title}
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon-sm"
                        className="absolute right-1 size-7 opacity-0 group-hover/item:opacity-100 data-[state=open]:opacity-100 transition-opacity"
                      >
                        <MoreVerticalIcon className="size-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48"
                      side="right"
                      align="start"
                    >
                      <DropdownMenuItem>
                        <Share2Icon className="size-4 text-muted-foreground" />
                        <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PencilIcon className="size-4 text-muted-foreground" />
                        <span>Rename</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => archiveChat(chat.id)}>
                        <ArchiveIcon className="size-4 text-muted-foreground" />
                        <span>Archive</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => deleteChat(chat.id)}
                      >
                        <Trash2Icon className="size-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })}
          </div>

          <div className="space-y-1">
            <div className="px-2 py-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Archived
              </p>
            </div>
            {archivedChats.map((chat) => {
              const Icon =
                iconMap[chat.icon as keyof typeof iconMap] ||
                MessageCircleDashedIcon;
              const isActive = selectedChatId === chat.id;
              return (
                <div
                  key={chat.id}
                  className={cn(
                    "group/item relative flex items-center rounded-md overflow-hidden",
                    isActive && "bg-sidebar-accent"
                  )}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex-1 justify-start gap-2 px-2 text-left h-auto py-1.5 min-w-0 pr-8",
                      isActive ? "hover:bg-sidebar-accent" : "hover:bg-accent"
                    )}
                    onClick={() => selectChat(chat.id)}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="text-sm truncate min-w-0">
                      {chat.title}
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon-sm"
                        className="absolute right-1 size-7 opacity-0 group-hover/item:opacity-100 data-[state=open]:opacity-100 transition-opacity"
                      >
                        <MoreVerticalIcon className="size-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48"
                      side="right"
                      align="start"
                    >
                      <DropdownMenuItem>
                        <Share2Icon className="size-4 text-muted-foreground" />
                        <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PencilIcon className="size-4 text-muted-foreground" />
                        <span>Rename</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => unarchiveChat(chat.id)}>
                        <ArchiveRestoreIcon className="size-4 text-muted-foreground" />
                        <span>Unarchive</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => deleteChat(chat.id)}
                      >
                        <Trash2Icon className="size-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-sidebar-border">
        <div className="rounded-lg bg-linear-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 p-3.5 space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <WandSparklesIcon className="size-4" />
              <span className="text-sm font-semibold">Square UI</span>
            </div>
            <p className="text-xs text-muted-foreground leading-tight">
              Collection of beautifully crafted open-source layouts UI built
              with shadcn/ui.
            </p>
          </div>
          <Button
            size="sm"
            className="relative w-fit h-[30px] px-3 overflow-hidden bg-white text-black hover:bg-white/90 shadow-[0px_1px_2px_0px_rgba(8,8,8,0.2),0px_4px_4px_0px_rgba(8,8,8,0.08),inset_0px_1px_1px_0px_rgba(255,255,255,0.2),inset_0px_6px_12px_0px_rgba(255,255,255,0.12)]"
            asChild
          >
            <Link
              href="https://square.lndev.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(205,175,250,1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(129,169,248,1),transparent_50%),radial-gradient(ellipse_at_top_left,rgba(247,203,191,1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(164,252,245,1),transparent_50%)]" />
              <span className="relative z-10 font-medium text-xs">
                square.lndev.me
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
