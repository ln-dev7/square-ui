"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  UserGroupIcon,
  UserCheck01Icon,
  UserRemove01Icon,
  GitForkIcon,
} from "@hugeicons/core-free-icons";
import { useEmployeesStore } from "@/store/employees-store";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: IconSvgElement;
  className?: string;
}

function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <div className={cn(
      "flex items-center justify-between p-5 rounded-xl border border-border bg-card",
      className
    )}>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
      </div>
      <div className="size-10 rounded-lg border border-border bg-background flex items-center justify-center">
        <HugeiconsIcon icon={icon} className="size-5 text-foreground" />
      </div>
    </div>
  );
}

export function StatsCards() {
  const employees = useEmployeesStore((state) => state.employees);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === "active").length;
  const inactiveEmployees = employees.filter((e) => e.status === "inactive").length;
  const departments = [...new Set(employees.map((e) => e.department))].length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Total Employees"
        value={totalEmployees}
        icon={UserGroupIcon}
      />
      <StatCard
        title="Active Employees"
        value={activeEmployees}
        icon={UserCheck01Icon}
      />
      <StatCard
        title="Inactive Employees"
        value={inactiveEmployees}
        icon={UserRemove01Icon}
      />
      <StatCard
        title="Departments"
        value={departments}
        icon={GitForkIcon}
      />
    </div>
  );
}
