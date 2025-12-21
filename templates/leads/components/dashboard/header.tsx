"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  MessageSquare,
  UserPlus,
  Command,
  MoreVertical,
  ChartArea,
  Settings,
  Check,
  Mail,
  Archive,
  Users,
  Link2,
  Copy,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <header className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-b bg-card sticky top-0 z-10 w-full">
      <SidebarTrigger className="-ml-1 sm:-ml-2" />

      <div className="flex items-center gap-2 sm:gap-3 flex-1">
        <ChartArea className="size-5 sm:size-6 text-muted-foreground hidden sm:block" />
        <h1 className="text-base sm:text-lg font-medium truncate">Leads</h1>
      </div>

      <div className="hidden md:block relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input
          placeholder="Search Anything..."
          className="pl-10 pr-14 w-[180px] lg:w-[220px] h-9 bg-card border"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 bg-muted px-1 py-0.5 rounded text-xs text-muted-foreground">
          <Command className="size-3" />
          <span>K</span>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative size-9">
              <Bell />
              <span className="absolute -top-0.5 -right-0.5 size-2.5 bg-rose-500 rounded-full border-2 border-card" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
              >
                Mark all as read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
              <Avatar className="size-8 mt-0.5">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Alex" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">New lead assigned</p>
                <p className="text-xs text-muted-foreground">
                  Alex Ray assigned you a new lead
                </p>
                <p className="text-xs text-muted-foreground">2 min ago</p>
              </div>
              <span className="size-2 bg-blue-500 rounded-full mt-2" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
              <Avatar className="size-8 mt-0.5">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Mina" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Lead status updated</p>
                <p className="text-xs text-muted-foreground">
                  Mina Swan changed status to Qualified
                </p>
                <p className="text-xs text-muted-foreground">15 min ago</p>
              </div>
              <span className="size-2 bg-blue-500 rounded-full mt-2" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer opacity-60">
              <Avatar className="size-8 mt-0.5">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=John" />
                <AvatarFallback>JK</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Comment added</p>
                <p className="text-xs text-muted-foreground">
                  John Kim commented on Lead #LD21305
                </p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="size-9">
              <MessageSquare />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Messages</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
              >
                <Settings className="size-3.5 mr-1" />
                Settings
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
              <Avatar className="size-8 mt-0.5">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Sarah" />
                <AvatarFallback>SL</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Sarah Lee</p>
                  <span className="text-xs text-muted-foreground">5m</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Hey, can you check the new lead from Acme Corp? They seem
                  interested...
                </p>
              </div>
              <span className="size-2 bg-blue-500 rounded-full mt-2" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
              <Avatar className="size-8 mt-0.5">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Alex" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Alex Ray</p>
                  <span className="text-xs text-muted-foreground">1h</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  The meeting with TechStart is confirmed for tomorrow at 2 PM
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer opacity-60">
              <Avatar className="size-8 mt-0.5">
                <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Mina" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Mina Swan</p>
                  <span className="text-xs text-muted-foreground">2d</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Thanks for the update! I'll follow up with them next week.
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
              View all messages
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ThemeToggle />

      <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
        <Link
          href="https://github.com/ln-dev7/square-ui/tree/master/templates/leads"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuItem>
            <Search className="size-4 mr-2" />
            Search
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="size-4 mr-2" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare className="size-4 mr-2" />
            Messages
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://github.com/ln-dev7/square-ui/tree/master/templates/leads"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 mr-2"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
