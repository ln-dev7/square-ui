"use client";

import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconChartBar, IconDots } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const allData = [
  { month: "Jan", thisYear: 69, prevYear: 59 },
  { month: "Feb", thisYear: 77, prevYear: 70 },
  { month: "Mar", thisYear: 93, prevYear: 68 },
  { month: "Apr", thisYear: 85, prevYear: 56 },
  { month: "May", thisYear: 89, prevYear: 63 },
  { month: "Jun", thisYear: 81, prevYear: 60 },
  { month: "Jul", thisYear: 75, prevYear: 65 },
  { month: "Aug", thisYear: 88, prevYear: 72 },
  { month: "Sep", thisYear: 95, prevYear: 78 },
  { month: "Oct", thisYear: 82, prevYear: 68 },
  { month: "Nov", thisYear: 91, prevYear: 74 },
  { month: "Dec", thisYear: 98, prevYear: 80 },
];

const chartConfig = {
  thisYear: {
    label: "This Year",
    color: "hsl(217 91% 60%)",
  },
  prevYear: {
    label: "Prev Year",
    color: "hsl(217 91% 80%)",
  },
} satisfies ChartConfig;

type Period = "6months" | "year";

export function RevenueFlowChart() {
  const [showThisYear, setShowThisYear] = useState(true);
  const [showPrevYear, setShowPrevYear] = useState(true);
  const [period, setPeriod] = useState<Period>("year");

  const data = period === "6months" ? allData.slice(0, 6) : allData;

  const totalRevenue = period === "6months" ? "$284,000" : "$568,000";
  const periodLabel = period === "6months" ? "Last 6 Months" : "Last 12 Months";

  return (
    <div className="rounded-xl border border-border p-4 sm:p-6 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-8 rounded-lg border border-border shrink-0">
            <IconChartBar className="size-[18px] text-muted-foreground" />
          </div>
          <span className="text-xs font-medium">Revenue Flow</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            {showThisYear && (
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-[#375DFB] shrink-0" />
                <span className="text-[10px] text-muted-foreground">
                  This Year
                </span>
              </div>
            )}
            {showPrevYear && (
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-[#35B9E9] shrink-0" />
                <span className="text-[10px] text-muted-foreground">
                  Prev Year
                </span>
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <IconDots className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-xs">
                Display Options
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showThisYear}
                onCheckedChange={setShowThisYear}
                className="text-xs"
              >
                Show This Year
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPrevYear}
                onCheckedChange={setShowPrevYear}
                className="text-xs"
              >
                Show Prev Year
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs">Period</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={period === "6months"}
                onCheckedChange={() => setPeriod("6months")}
                className="text-xs"
              >
                Last 6 Months
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={period === "year"}
                onCheckedChange={() => setPeriod("year")}
                className="text-xs"
              >
                Last 12 Months
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-semibold">{totalRevenue}</span>
          <span className="text-xs text-muted-foreground">
            Total Revenue ({periodLabel})
          </span>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[165px] w-full">
        <BarChart data={data} barGap={2}>
          <defs>
            <linearGradient id="fillThisYear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#375DFB" />
              <stop offset="100%" stopColor="rgba(55, 93, 251, 0.6)" />
            </linearGradient>
            <linearGradient id="fillPrevYear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#35B9E9" />
              <stop offset="100%" stopColor="rgba(53, 185, 233, 0.6)" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {showThisYear && (
            <Bar
              dataKey="thisYear"
              fill="url(#fillThisYear)"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          )}
          {showPrevYear && (
            <Bar
              dataKey="prevYear"
              fill="url(#fillPrevYear)"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          )}
        </BarChart>
      </ChartContainer>
    </div>
  );
}
