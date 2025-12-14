"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  Invoice01Icon,
  Calendar01Icon,
  File01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";

const stats = [
  {
    title: "Total Employees",
    value: "150",
    subtitle: "Active: 140, Inactive: 10",
    icon: UserGroupIcon,
    subtitleIcon: File01Icon,
  },
  {
    title: "Upcoming Payroll",
    value: "$250,000",
    subtitle: "Processing in 3 days",
    icon: Invoice01Icon,
    subtitleIcon: File01Icon,
  },
  {
    title: "Attendance Rate",
    value: "85%",
    subtitle: "Last 30 Days",
    icon: Calendar01Icon,
    subtitleIcon: InformationCircleIcon,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="relative p-5 rounded-xl border bg-card overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-black/5 to-transparent pointer-events-none" />
          <div className="relative flex items-start justify-between">
            <div className="flex flex-col gap-6">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-2xl sm:text-[26px] font-semibold tracking-tight">
                {stat.value}
              </p>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <HugeiconsIcon icon={stat.subtitleIcon} className="size-4" />
                <span className="text-sm font-medium">{stat.subtitle}</span>
              </div>
            </div>
            <Button variant="outline" size="icon" className="size-10">
              <HugeiconsIcon icon={stat.icon} className="size-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

