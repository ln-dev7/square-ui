"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notification01Icon,
  DashboardSquare01Icon,
  CircleIcon,
  StarIcon,
  DocumentValidationIcon,
  File01Icon,
  Calendar03Icon,
  UserGroupIcon,
  Building03Icon,
  ArrowDown01Icon,
  Attachment01Icon,
  Folder01Icon,
  Mail01Icon,
  HelpCircleIcon,
  ArrowUpRight01Icon,
  Layers01Icon,
  CreditCardIcon,
  Navigation03Icon,
  Search01Icon,
  Tick02Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Kbd } from "@/components/ui/kbd";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  active?: boolean;
}

function SidebarItem({ icon, label, badge, active }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-between px-3 py-2 h-auto text-sm",
        active
          ? "bg-muted text-foreground font-medium"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge && (
        <div className="bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
          {badge}
        </div>
      )}
    </Button>
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
    <div className="mb-6">
      <Button
        variant="ghost"
        className="gap-2 px-1 mb-2 text-xs h-auto py-0 text-muted-foreground hover:text-foreground"
      >
        <span>{title}</span>
        <HugeiconsIcon icon={ArrowDown01Icon} className="size-3" />
      </Button>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

export function TaskSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="pb-0">
        <div className="px-4 pt-4 pb-0">
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 h-auto p-0! hover:bg-transparent"
                  >
                    <div className="size-6 bg-linear-to-br from-purple-500 to-pink-600 rounded-sm shadow flex items-center justify-center text-white text-xs font-semibold">
                      SU
                    </div>
                    <span className="font-semibold">Square UI</span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      className="size-3 text-muted-foreground"
                    />
                  </Button>
                }
              />
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem>
                  <div className="flex items-center gap-3 w-full">
                    <div className="size-6 bg-linear-to-br from-purple-500 to-pink-600 rounded-sm shadow flex items-center justify-center text-white text-xs font-semibold">
                      SU
                    </div>
                    <span className="font-semibold">Square UI</span>
                    <HugeiconsIcon icon={Tick02Icon} className="size-4 ml-auto" />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-3 w-full">
                    <div className="size-6 bg-linear-to-br from-blue-500 to-cyan-600 rounded-sm shadow flex items-center justify-center text-white text-xs font-semibold">
                      CI
                    </div>
                    <span>Circle</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-3 w-full">
                    <div className="size-6 bg-linear-to-br from-orange-500 to-red-600 rounded-sm shadow flex items-center justify-center text-white text-xs font-semibold">
                      LN
                    </div>
                    <span>lndev-ui</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <HugeiconsIcon icon={Add01Icon} className="size-4" />
                  <span>Add new team</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Image
              src="/ln.png"
              alt="lndev.me"
              className="size-5 object-cover rounded-full"
              width={20}
              height={20}
            />
          </div>

          <div className="mt-4 relative">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search anything"
              className="pl-8 pr-10 text-xs h-8 bg-background"
            />
            <Kbd className="absolute right-2 top-1/2 -translate-y-1/2">/</Kbd>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <div className="space-y-0.5 mb-6">
          <SidebarItem
            icon={<HugeiconsIcon icon={Notification01Icon} className="size-4" />}
            label="Notifications"
            badge="12"
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={DashboardSquare01Icon} className="size-4" />}
            label="Dashboard"
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={CircleIcon} className="size-4" />}
            label="Assigned to me"
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={StarIcon} className="size-4" />}
            label="Task"
            active
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={DocumentValidationIcon} className="size-4" />}
            label="Projects"
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={File01Icon} className="size-4" />}
            label="Drafts"
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={Calendar03Icon} className="size-4" />}
            label="Schedule"
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={UserGroupIcon} className="size-4" />}
            label="Customers"
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={Building03Icon} className="size-4" />}
            label="Companies"
          />
        </div>

        <SidebarSection title="Workspace">
          <SidebarItem
            icon={<HugeiconsIcon icon={Attachment01Icon} className="size-4" />}
            label="Attachment"
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={Folder01Icon} className="size-4" />}
            label="Documents"
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={Mail01Icon} className="size-4" />}
            label="Emails"
          />
          <SidebarItem
            icon={<HugeiconsIcon icon={DocumentValidationIcon} className="size-4" />}
            label="Projects"
          />
        </SidebarSection>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-0.5">
        <Button
          variant="outline"
          className="w-full justify-between px-3 py-2 h-auto text-sm shadow-none"
          nativeButton={false}
          render={<Link href="https://square.lndevui.com" target="_blank" />}
        >
          <div className="flex items-center gap-3">
            <HugeiconsIcon icon={HelpCircleIcon} className="size-4" />
            <span>square.lndevui.com</span>
          </div>
          <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
        </Button>
        <SidebarItem
          icon={<HugeiconsIcon icon={Layers01Icon} className="size-4" />}
          label="Sub accounts"
        />
        <SidebarItem
          icon={<HugeiconsIcon icon={CreditCardIcon} className="size-4" />}
          label="Billing"
        />
        <SidebarItem
          icon={<HugeiconsIcon icon={Navigation03Icon} className="size-4" />}
          label="Availability"
        />
      </SidebarFooter>
    </Sidebar>
  );
}
