"use client";

import { WelcomeSection } from "./welcome-section";
import { StatsCards } from "./stats-cards";
import { LeadSourcesChart } from "./lead-sources-chart";
import { RevenueFlowChart } from "./revenue-flow-chart";
import { DealsTable } from "./deals-table";

export function DashboardContent() {
  return (
    <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 bg-background w-full">
      <WelcomeSection />
      <StatsCards />
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
        <LeadSourcesChart />
        <RevenueFlowChart />
      </div>
      <DealsTable />
    </main>
  );
}
