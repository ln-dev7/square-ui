"use client";

import {
  SparklesIcon,
  GalleryVerticalEndIcon,
  MailIcon,
  FolderClosedIcon,
  AudioLinesIcon,
  GitForkIcon,
  FilesIcon,
  ShieldIcon,
  UnplugIcon,
  LifeBuoyIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface EmailsVerticalSidebarProps {
  onItemClick?: () => void;
}

export function EmailsVerticalSidebar({
  onItemClick,
}: EmailsVerticalSidebarProps = {}) {
  const topIcons = [
    { icon: SparklesIcon, label: "Sparkles", active: false },
    { icon: GalleryVerticalEndIcon, label: "Gallery", active: false },
    { icon: MailIcon, label: "Mail", active: true },
    { icon: FolderClosedIcon, label: "Folders", active: false },
    { icon: AudioLinesIcon, label: "Audio", active: false },
    { icon: GitForkIcon, label: "Git", active: false },
    { icon: FilesIcon, label: "Files", active: false },
  ];

  const bottomIcons = [
    { icon: ShieldIcon, label: "Shield" },
    { icon: UnplugIcon, label: "Unplug" },
    { icon: LifeBuoyIcon, label: "Help" },
  ];

  return (
    <div className="flex h-screen w-14 flex-col items-center gap-4 border-r border-border bg-background py-4">
      <Button
        variant="default"
        size="icon-sm"
        className="relative mb-2 size-8 overflow-hidden rounded-lg bg-linear-to-br from-white via-purple-200 to-blue-200 hover:opacity-90"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(205,175,250,1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(129,169,248,1),transparent_50%),radial-gradient(ellipse_at_top_left,rgba(247,203,191,1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(164,252,245,1),transparent_50%)]" />
        <svg className="relative size-4" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2L2 8L8 14"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 2L14 8L8 14"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>

      <div className="flex flex-col gap-2">
        {topIcons.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onItemClick}
                className={cn(
                  "size-8",
                  item.active && "bg-muted text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex flex-col gap-2">
        {bottomIcons.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onItemClick}
                className="size-8 text-muted-foreground"
              >
                <item.icon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <Avatar className="size-8 cursor-pointer">
        <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  );
}
