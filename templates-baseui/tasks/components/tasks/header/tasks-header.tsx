"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Notification01Icon,
  Comment01Icon,
  Tick02Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

const notifications = [
  {
    id: "1",
    title: "New task assigned",
    description: "You have been assigned to 'API Integration'",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Task completed",
    description: "Sarah marked 'Design Review' as complete",
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    title: "Comment on task",
    description: "Mike commented on 'Mobile App Redesign'",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    title: "Due date reminder",
    description: "'Client Meeting' is due tomorrow",
    time: "3 hours ago",
    read: true,
  },
];

const messages = [
  {
    id: "1",
    name: "Sarah Wilson",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sarah",
    message: "Hey, can you review the design?",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike",
    message: "The API is ready for testing",
    time: "30 min ago",
    unread: true,
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emma",
    message: "Thanks for the update!",
    time: "2 hours ago",
    unread: false,
  },
];

export function TasksHeader() {
  return (
    <header className="flex items-center justify-between h-[72px] px-6 border-b border-border">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-sm md:text-lg font-medium">Tasks</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search Anything..."
            className="w-full max-w-[238px] pl-10 pr-16 h-9 bg-background text-xs"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>
            </kbd>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              K
            </kbd>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="size-9 relative">
                <HugeiconsIcon icon={Notification01Icon} className="size-[18px]" />
                <span className="absolute top-0 right-0 size-2.5 bg-destructive rounded-full" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex items-center justify-between">
                <span className="text-sm font-medium">Notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <HugeiconsIcon icon={Tick02Icon} className="size-3 mr-1" />
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-1 p-3 cursor-pointer"
              >
                <div className="flex items-start gap-2 w-full">
                  {!notification.read && (
                    <span className="size-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  )}
                  <div className={`flex-1 ${notification.read ? "ml-4" : ""}`}>
                    <p className="text-xs font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-xs text-muted-foreground cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="size-9 relative">
                <HugeiconsIcon icon={Comment01Icon} className="size-[18px]" />
                <span className="absolute top-0 right-0 size-2.5 bg-blue-500 rounded-full" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex items-center justify-between">
                <span className="text-sm font-medium">Messages</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <HugeiconsIcon icon={Settings01Icon} className="size-3 mr-1" />
                  Settings
                </Button>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {messages.map((msg) => (
              <DropdownMenuItem
                key={msg.id}
                className="flex items-start gap-3 p-3 cursor-pointer"
              >
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={msg.avatar} alt={msg.name} />
                  <AvatarFallback>{msg.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium truncate">{msg.name}</p>
                    <p className="text-[10px] text-muted-foreground shrink-0">
                      {msg.time}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {msg.message}
                  </p>
                </div>
                {msg.unread && (
                  <span className="size-2 rounded-full bg-primary shrink-0 mt-1" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-xs text-muted-foreground cursor-pointer">
              View all messages
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        <Button
          variant="outline"
          className="h-9 gap-2"
          nativeButton={false}
          render={
            <Link
              href="https://github.com/ln-dev7/square-ui/tree/master/templates-baseui/tasks"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="text-xs hidden sm:inline">GitHub</span>
        </Button>
      </div>
    </header>
  );
}
