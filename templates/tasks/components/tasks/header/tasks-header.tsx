"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconBell,
  IconBrandGithub,
  IconMessage2,
  IconCheck,
  IconSettings,
} from "@tabler/icons-react";
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
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
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-9 relative">
              <IconBell className="size-[18px]" />
              <span className="absolute top-0 right-0 size-2.5 bg-destructive rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span className="text-sm font-medium">Notifications</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <IconCheck className="size-3 mr-1" />
                Mark all as read
              </Button>
            </DropdownMenuLabel>
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
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-9 relative">
              <IconMessage2 className="size-[18px]" />
              <span className="absolute top-0 right-0 size-2.5 bg-blue-500 rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span className="text-sm font-medium">Messages</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <IconSettings className="size-3 mr-1" />
                Settings
              </Button>
            </DropdownMenuLabel>
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

        <Button variant="outline" className="h-9 gap-2" asChild>
          <Link
            href="https://github.com/ln-dev7/square-ui/tree/master/templates/tasks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub className="size-4" />
            <span className="text-xs hidden sm:inline">GitHub</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
