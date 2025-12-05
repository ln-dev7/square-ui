"use client";

import {
  IconNotes,
  IconAddressBook,
  IconChecklist,
  IconFlame,
} from "@tabler/icons-react";
import { statsData } from "@/mock-data/chart-data";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  change: string;
  comparison: string;
}

function StatCard({ icon, title, value, change, comparison }: StatCardProps) {
  return (
    <div className="flex-1 min-w-0 space-y-4">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-xs text-muted-foreground">{title}</span>
      </div>
      <p className="text-4xl font-bold">{value}</p>
      <div className="flex items-center gap-2 text-xs">
        <span className="text-emerald-500 font-medium">{change}</span>
        <span className="size-1 rounded-full bg-muted-foreground" />
        <span className="text-muted-foreground">{comparison}</span>
      </div>
    </div>
  );
}

export function StatsCards() {
  return (
    <div className="pt-4 sm:pt-6 px-4 sm:px-6 flex items-center justify-center w-full">
      <div className="rounded-xl border border-border p-4 sm:p-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<IconNotes className="size-[18px] text-muted-foreground" />}
            title="Tasks Due Today"
            value={statsData.tasksDueToday.value}
            change={statsData.tasksDueToday.change}
            comparison={statsData.tasksDueToday.comparison}
          />
          <StatCard
            icon={
              <IconAddressBook className="size-[18px] text-muted-foreground" />
            }
            title="Overdue Tasks"
            value={statsData.overdueTasks.value}
            change={statsData.overdueTasks.change}
            comparison={statsData.overdueTasks.comparison}
          />
          <StatCard
            icon={
              <IconChecklist className="size-[18px] text-muted-foreground" />
            }
            title="In Progress"
            value={statsData.inProgress.value}
            change={statsData.inProgress.change}
            comparison={statsData.inProgress.comparison}
          />
          <StatCard
            icon={<IconFlame className="size-[18px] text-muted-foreground" />}
            title="Completed This Week"
            value={statsData.completedThisWeek.value}
            change={statsData.completedThisWeek.change}
            comparison={statsData.completedThisWeek.comparison}
          />
        </div>
      </div>
    </div>
  );
}
