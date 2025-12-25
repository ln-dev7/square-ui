"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart3,
  Sparkles,
  Share2,
  Plus,
  FilePlus,
  UserPlus,
  Github,
  Mail,
  Link2,
  Users,
} from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b bg-card sticky top-0 z-10 w-full">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-2" />
        <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
          <BarChart3 className="size-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex -space-x-2 mr-3 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar className="size-6 border-2 border-card">
                  <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=user1" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar className="size-6 border-2 border-card">
                  <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=user2" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar className="size-6 border-2 border-card">
                  <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=user3" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-card bg-muted">
                  <Plus className="size-3" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <div className="px-2 py-1.5">
                <p className="text-xs font-medium text-muted-foreground">
                  Team Members
                </p>
              </div>
              <DropdownMenuItem>
                <Avatar className="size-5 mr-2">
                  <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=user1" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <span>Sarah M.</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Avatar className="size-5 mr-2">
                  <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=user2" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <span>James K.</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Avatar className="size-5 mr-2">
                  <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=user3" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <span>Emily R.</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Mail className="size-4 mr-2" />
                <span>Invite by email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link2 className="size-4 mr-2" />
                <span>Copy invite link</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="size-4 mr-2" />
                <span>Manage team</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="h-5 w-px bg-border mx-2" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 hidden sm:flex"
            >
              <Sparkles className="size-3.5" />
              <span className="text-sm">Ask AI</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Generate report</DropdownMenuItem>
            <DropdownMenuItem>Analyze leads</DropdownMenuItem>
            <DropdownMenuItem>Suggest follow-ups</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 hidden sm:flex"
            >
              <Share2 className="size-3.5" />
              <span className="text-sm">Share</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Share with team</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
          <Link
            href="https://github.com/ln-dev7/square-ui/tree/master/templates/dashboard-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
}

export function WelcomeSection() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Welcome Back LN!
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Let&apos;s tackle down some work
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="h-9 gap-1.5 bg-card hover:bg-card/80 border-border/50"
        >
          <FilePlus className="size-4" />
          <span className="hidden sm:inline">Add Project</span>
        </Button>
        <Button className="h-9 gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-border/50">
          <UserPlus className="size-4" />
          <span className="hidden sm:inline">New Client</span>
        </Button>
      </div>
    </div>
  );
}
