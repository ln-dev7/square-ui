"use client";

import { StatsCards } from "./stats-cards";
import { ActionButtons } from "./action-buttons";
import { HiresExitsChart } from "./hires-exits-chart";
import { EmployeesTable } from "./employees-table";
import { useLayoutStore } from "@/store/layout-store";
import { cn } from "@/lib/utils";

export function EmployeesContent() {
  const layout = useLayoutStore((state) => state.layout);
  const showCharts = useLayoutStore((state) => state.showCharts);
  const showFilters = useLayoutStore((state) => state.showFilters);

  return (
    <div
      className={cn(
        "flex-1 overflow-auto w-full space-y-6",
        layout === "compact" ? "p-3 md:p-4" : "p-4 md:p-6"
      )}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-foreground">Employee Overview</h1>
        <ActionButtons />
      </div>

      <StatsCards />

      {showCharts && <HiresExitsChart />}

      <EmployeesTable showFilters={showFilters} />
    </div>
  );
}

