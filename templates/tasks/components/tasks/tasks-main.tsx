"use client";

import { StatsCards } from "./stats/stats-cards";
import { ChartsSection } from "./charts/charts-section";
import { TasksFilters } from "./filters/tasks-filters";
import { TasksBoard } from "./board/tasks-board";

export function TasksMain() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full">
      <StatsCards />
      <ChartsSection />
      <TasksFilters />
      <TasksBoard />
    </div>
  );
}

