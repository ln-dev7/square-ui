"use client";

import { PeriodTabs } from "./period-tabs";
import { ActionButtons } from "./action-buttons";
import { ExpenseChart } from "./expense-chart";
import { DeductionsChart } from "./deductions-chart";
import { PayrollsTable } from "./payrolls-table";
import { useLayoutStore } from "@/store/layout-store";
import { cn } from "@/lib/utils";

export function PayrollsContent() {
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
        <PeriodTabs />
        <ActionButtons />
      </div>

      {showCharts && (
        <div
          className={cn(
            "flex gap-6",
            layout === "expanded" ? "flex-col" : "flex-col lg:flex-row"
          )}
        >
          <ExpenseChart />
          <DeductionsChart />
        </div>
      )}

      <PayrollsTable showFilters={showFilters} />
    </div>
  );
}
