"use client";

import { WelcomeSection } from "./header";
import { StatsCards } from "./stats-cards";
import { LeadsChart } from "./leads-chart";
import { TopPerformers } from "./top-performers";
import { LeadsTable } from "./leads-table";

export function DashboardContent() {
  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 space-y-6 bg-background w-full">
      <WelcomeSection />
      <StatsCards />
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        <LeadsChart />
        <TopPerformers />
      </div>
      <LeadsTable />
    </main>
  );
}

