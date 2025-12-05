"use client";

import { cn } from "@/lib/utils";
import { usePayrollsStore } from "@/store/payrolls-store";

const periods = [
  { value: "30days", label: "30 Days" },
  { value: "3months", label: "3 Months" },
  { value: "1year", label: "1 years" },
] as const;

export function PeriodTabs() {
  const periodFilter = usePayrollsStore((state) => state.periodFilter);
  const setPeriodFilter = usePayrollsStore((state) => state.setPeriodFilter);

  return (
    <div className="flex items-center gap-0.5 bg-muted p-1 rounded-lg">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => setPeriodFilter(period.value)}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition-all border",
            periodFilter === period.value
              ? "bg-card text-foreground border-border"
              : "text-muted-foreground hover:text-foreground border-transparent"
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

