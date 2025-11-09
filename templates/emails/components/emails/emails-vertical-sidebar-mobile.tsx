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
import { cn } from "@/lib/utils";

interface EmailsVerticalSidebarMobileProps {
  onItemClick?: () => void;
}

export function EmailsVerticalSidebarMobile({
  onItemClick,
}: EmailsVerticalSidebarMobileProps = {}) {
  const topItems = [
    { icon: SparklesIcon, label: "Sparkles", active: false },
    { icon: GalleryVerticalEndIcon, label: "Gallery", active: false },
    { icon: MailIcon, label: "Inbox", active: true },
    { icon: FolderClosedIcon, label: "Drafts", active: false },
    { icon: AudioLinesIcon, label: "Sent", active: false },
    { icon: GitForkIcon, label: "Junk", active: false },
    { icon: FilesIcon, label: "Trash", active: false },
  ];

  const bottomItems = [
    { icon: ShieldIcon, label: "Security" },
    { icon: UnplugIcon, label: "Disconnect" },
    { icon: LifeBuoyIcon, label: "Help" },
  ];

  return (
    <div className="flex h-screen w-full flex-col items-start gap-4 border-r border-border bg-background py-4 px-3">
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="icon-sm"
          className="relative size-9 overflow-hidden rounded-lg bg-linear-to-br from-white via-purple-200 to-blue-200 hover:opacity-90"
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
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold text-foreground">Square UI</span>
          <span className="text-xs text-muted-foreground">lndev.me</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-1">
        {topItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            onClick={onItemClick}
            className={cn(
              "w-full justify-start gap-2 px-3",
              item.active && "bg-muted text-foreground hover:bg-muted"
            )}
          >
            <item.icon className="size-4 shrink-0" />
            <span className="text-sm">{item.label}</span>
          </Button>
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex w-full flex-col gap-1">
        {bottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            onClick={onItemClick}
            className="w-full justify-start gap-2 px-3 text-muted-foreground"
          >
            <item.icon className="size-4 shrink-0" />
            <span className="text-sm">{item.label}</span>
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full justify-start gap-2 px-3 h-auto py-2"
      >
        <Avatar className="size-8 rounded-lg shrink-0">
          <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start text-left">
          <span className="text-xs font-medium text-foreground">John Doe</span>
          <span className="text-[10px] text-muted-foreground">
            john@example.com
          </span>
        </div>
      </Button>
    </div>
  );
}
