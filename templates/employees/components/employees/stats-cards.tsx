"use client";

import { Users, UserCheck, UserX, GitFork } from "lucide-react";
import { useEmployeesStore } from "@/store/employees-store";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  className?: string;
}

function StatCard({ title, value, icon: Icon, className }: StatCardProps) {
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
        <Icon className="size-5 text-foreground" />
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
        icon={Users}
      />
      <StatCard
        title="Active Employees"
        value={activeEmployees}
        icon={UserCheck}
      />
      <StatCard
        title="Inactive Employees"
        value={inactiveEmployees}
        icon={UserX}
      />
      <StatCard
        title="Departments"
        value={departments}
        icon={GitFork}
      />
    </div>
  );
}

