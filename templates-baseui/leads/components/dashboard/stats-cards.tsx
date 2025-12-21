"use client";

import { leadStats } from "@/mock-data/leads";
import { HugeiconsIcon } from "@hugeicons/react";
import { Invoice01Icon, UserGroupIcon, Task01Icon, Notification01Icon } from "@hugeicons/core-free-icons";

const stats = [
  {
    title: "Total Leads This Month",
    value: leadStats.totalLeads,
    change: leadStats.totalLeadsChange,
    changeValue: leadStats.totalLeadsChangeValue,
    icon: Invoice01Icon,
  },
  {
    title: "Contacted Leads",
    value: leadStats.contactedLeads,
    change: leadStats.contactedLeadsChange,
    changeValue: leadStats.contactedLeadsChangeValue,
    icon: UserGroupIcon,
  },
  {
    title: "Qualified Leads",
    value: leadStats.qualifiedLeads,
    change: leadStats.qualifiedLeadsChange,
    changeValue: leadStats.qualifiedLeadsChangeValue,
    icon: Task01Icon,
  },
  {
    title: "Hot Leads",
    value: leadStats.hotLeads,
    change: leadStats.hotLeadsChange,
    changeValue: leadStats.hotLeadsChangeValue,
    icon: Notification01Icon,
  },
];

export function StatsCards() {
  return (
    <div className="bg-card text-card-foreground rounded-xl border">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-x-0 lg:divide-x sm:divide-y-0 divide-border">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <HugeiconsIcon icon={stat.icon} className="size-4 sm:size-[18px]" />
              <span className="text-xs sm:text-sm font-medium">
                {stat.title}
              </span>
            </div>
            <p className="text-2xl sm:text-[28px] font-semibold tracking-tight">
              {stat.value}
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                +{stat.change}%(
                {stat.changeValue > 0
                  ? `$${stat.changeValue}`
                  : stat.changeValue}
                )
              </span>
              <span className="size-1 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground hidden sm:inline">
                vs Last Months
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
