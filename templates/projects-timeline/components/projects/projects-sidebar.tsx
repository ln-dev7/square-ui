"use client";

import {
  LayoutGrid,
  Users,
  Calendar,
  Folder,
  UserPlus,
  Clock,
  BarChart3,
  DollarSign,
  Briefcase,
  FileText,
  Workflow,
  FileStack,
  Settings,
  HelpCircle,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={cn(
          "w-full justify-start gap-3",
          active
            ? "bg-background text-primary border border-border pl-3 shadow-xs"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider px-3">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>{children}</SidebarMenu>
    </SidebarGroup>
  );
}

export function ProjectsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="lg:border-r-0!" collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b px-4 py-3 h-[65px] lg:h-[74px] flex items-center justify-center">
        <Link
          href="https://square.lndev.me"
          target="_blank"
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <div className="size-9 shrink-0 bg-linear-to-br from-purple-500 to-pink-600 rounded-md shadow flex items-center justify-center text-white text-xs font-semibold border border-border">
              SU
            </div>
            <div className="flex flex-col items-start">
              <h1 className="font-semibold text-sm">Square UI</h1>
              <div className="flex items-center gap-1">
                <Globe className="size-3" />
                <span className="text-xs">lndev.me</span>
              </div>
            </div>
          </div>

          <Avatar className="size-7 border-2 border-background">
            <AvatarImage src="/ln.png" />
          </Avatar>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 pb-4 pt-2">
        <SidebarSection title="Main">
          <SidebarItem
            icon={<LayoutGrid className="size-4" />}
            label="Dashboard"
          />
          <SidebarItem icon={<Users className="size-4" />} label="Employee" />
          <SidebarItem
            icon={<Calendar className="size-4" />}
            label="Calendar"
          />
          <SidebarItem
            icon={<Folder className="size-4" />}
            label="Projects"
            active
          />
          <SidebarItem
            icon={<UserPlus className="size-4" />}
            label="Team Member"
          />
        </SidebarSection>

        <SidebarSection title="Management">
          <SidebarItem icon={<Clock className="size-4" />} label="Time off" />
          <SidebarItem
            icon={<BarChart3 className="size-4" />}
            label="Reports"
          />
          <SidebarItem
            icon={<DollarSign className="size-4" />}
            label="Payrolls"
          />
          <SidebarItem
            icon={<Briefcase className="size-4" />}
            label="Benefits"
          />
        </SidebarSection>

        <SidebarSection title="Company">
          <SidebarItem
            icon={<FileText className="size-4" />}
            label="Documents"
          />
          <SidebarItem
            icon={<Workflow className="size-4" />}
            label="Integrations"
          />
          <SidebarItem
            icon={<FileStack className="size-4" />}
            label="Invoices"
          />
          <SidebarItem
            icon={<Settings className="size-4" />}
            label="Settings"
          />
          <SidebarItem
            icon={<HelpCircle className="size-4" />}
            label="Help & Center"
          />
        </SidebarSection>
      </SidebarContent>

      <SidebarFooter className="px-3 py-4">
        <div className="group/sidebar relative flex flex-col gap-2 rounded-lg border p-4 text-sm w-full bg-background">
          <div className="text-balance text-lg font-semibold leading-tight group-hover/sidebar:underline">
            Open-source layouts by lndev-ui
          </div>
          <div>
            Collection of beautifully crafted open-source layouts UI built with
            shadcn/ui.
          </div>
          <Link
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0"
            href="https://square.lndev.me"
          >
            <span className="sr-only">Square by lndev-ui</span>
          </Link>
          <Button size="sm" className="w-full">
            <Link
              href="https://square.lndev.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              square.lndev.me
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
