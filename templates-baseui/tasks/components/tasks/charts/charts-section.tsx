"use client";

import { RevenueFlowChart } from "./revenue-flow-chart";
import { BurndownChart } from "./burndown-chart";

export function ChartsSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full px-4 sm:px-6">
      <RevenueFlowChart />
      <BurndownChart />
    </div>
  );
}

