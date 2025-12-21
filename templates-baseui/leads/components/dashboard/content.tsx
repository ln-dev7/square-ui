"use client";

import { FilterSection } from "./filter-section";
import { StatsCards } from "./stats-cards";
import { MonthlyLeadGrowthChart } from "./monthly-lead-growth-chart";
import { LeadsByStatusChart } from "./leads-by-status-chart";
import { LeadsTable } from "./leads-table";

export function DashboardContent() {
  return (
    <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 bg-background w-full">
      <FilterSection />
      <StatsCards />
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
        <MonthlyLeadGrowthChart />
        <LeadsByStatusChart />
      </div>
      <LeadsTable />
    </main>
  );
}
