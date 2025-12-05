"use client";

import { useState } from "react";
import { TrendingDown, TrendingUp, MoreVertical } from "lucide-react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { useTheme } from "next-themes";
import {
  payrollExpenseData,
  expenseSummary,
  periodLabels,
} from "@/mock-data/chart-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePayrollsStore } from "@/store/payrolls-store";

const LINE_COLOR_LIGHT = "#162664";
const LINE_COLOR_DARK = "#4ade80";
const LABEL_COLOR_LIGHT = "#868c98";
const LABEL_COLOR_DARK = "#9ca3af";

type LineType = "linear" | "monotone";

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-semibold text-foreground">
        ${payload[0].value?.toLocaleString()}
      </p>
    </div>
  );
}

export function ExpenseChart() {
  const { resolvedTheme } = useTheme();
  const periodFilter = usePayrollsStore((state) => state.periodFilter);
  const [lineType, setLineType] = useState<LineType>("linear");

  const isDark = resolvedTheme === "dark";
  const lineColor = isDark ? LINE_COLOR_DARK : LINE_COLOR_LIGHT;
  const labelColor = isDark ? LABEL_COLOR_DARK : LABEL_COLOR_LIGHT;

  const data = payrollExpenseData[periodFilter];
  const summary = expenseSummary[periodFilter];
  const periodLabel = periodLabels[periodFilter];

  return (
    <div className="flex-1 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16a1 1 0 001 1h14a1 1 0 001-1V4"
            />
          </svg>
          <span className="font-medium">Payroll Expense Overview</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreVertical className="size-4 text-muted-foreground rotate-90" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs">
              Line Style
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={lineType === "linear"}
              onCheckedChange={() => setLineType("linear")}
              className="text-xs"
            >
              Angular (Linear)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={lineType === "monotone"}
              onCheckedChange={() => setLineType("monotone")}
              className="text-xs"
            >
              Smooth (Curved)
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">Export Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col min-[520px]:flex-row min-[520px]:items-end min-[520px]:justify-between lg:flex-col lg:items-stretch xl:flex-row xl:items-end xl:justify-between gap-4">
        <div className="space-y-4 min-[520px]:space-y-6">
          <p className="text-3xl font-semibold tracking-tight">
            ${summary.total.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5">
            <div
              className={`flex items-center gap-0.5 ${
                summary.isPositive ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {summary.isPositive ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
              <span className="font-semibold text-sm">{summary.change}%</span>
            </div>
            <span className="text-sm text-muted-foreground">{periodLabel}</span>
          </div>
        </div>

        <div className="w-full min-[520px]:w-[280px] lg:w-full xl:w-[280px] h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lineColor} stopOpacity={0.15} />
                  <stop
                    offset="100%"
                    stopColor={lineColor}
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: labelColor }}
                interval={0}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Area
                type={lineType}
                dataKey="value"
                stroke={lineColor}
                strokeWidth={2.5}
                fill="url(#fillExpense)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: lineColor,
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
