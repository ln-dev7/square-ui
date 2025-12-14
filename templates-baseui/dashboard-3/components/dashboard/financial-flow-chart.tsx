"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Invoice01Icon,
  MoreHorizontalIcon,
  ChartBarLineIcon,
  ChartLineData01Icon,
  ChartAverageIcon,
  Calendar01Icon,
  GridIcon,
  RefreshIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

const fullYearData = [
  { month: "Jan", moneyIn: 155000, moneyOut: 25000, moneyInChange: 8.5, moneyOutChange: -5.2 },
  { month: "Feb", moneyIn: 200000, moneyOut: 100000, moneyInChange: 12.3, moneyOutChange: 8.7 },
  { month: "Mar", moneyIn: 210000, moneyOut: 100000, moneyInChange: 5.0, moneyOutChange: 0.0 },
  { month: "Apr", moneyIn: 280000, moneyOut: 175000, moneyInChange: 15.2, moneyOutChange: 12.7 },
  { month: "May", moneyIn: 265000, moneyOut: 120000, moneyInChange: -5.4, moneyOutChange: -8.3 },
  { month: "Jun", moneyIn: 210000, moneyOut: 100000, moneyInChange: -10.2, moneyOutChange: -6.5 },
  { month: "Jul", moneyIn: 210000, moneyOut: 170000, moneyInChange: 0.0, moneyOutChange: 14.2 },
  { month: "Aug", moneyIn: 265000, moneyOut: 175000, moneyInChange: 11.8, moneyOutChange: 2.9 },
  { month: "Sep", moneyIn: 265000, moneyOut: 135000, moneyInChange: 0.0, moneyOutChange: -9.1 },
  { month: "Oct", moneyIn: 265000, moneyOut: 135000, moneyInChange: 0.0, moneyOutChange: 0.0 },
  { month: "Nov", moneyIn: 265000, moneyOut: 135000, moneyInChange: 0.0, moneyOutChange: 0.0 },
  { month: "Dec", moneyIn: 210000, moneyOut: 100000, moneyInChange: -7.5, moneyOutChange: -6.2 },
];

type ChartType = "bar" | "line" | "area";
type TimePeriod = "3months" | "6months" | "year" | "q1" | "q2" | "q3" | "q4";

const periodLabels: Record<TimePeriod, string> = {
  "3months": "Last 3 Months",
  "6months": "Last 6 Months",
  year: "Full Year",
  q1: "Q1 (Jan-Mar)",
  q2: "Q2 (Apr-Jun)",
  q3: "Q3 (Jul-Sep)",
  q4: "Q4 (Oct-Dec)",
};

function getDataForPeriod(period: TimePeriod) {
  switch (period) {
    case "3months":
      return fullYearData.slice(-3);
    case "6months":
      return fullYearData.slice(-6);
    case "q1":
      return fullYearData.slice(0, 3);
    case "q2":
      return fullYearData.slice(3, 6);
    case "q3":
      return fullYearData.slice(6, 9);
    case "q4":
      return fullYearData.slice(9, 12);
    default:
      return fullYearData;
  }
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  const moneyInData = payload.find((p) => p.dataKey === "moneyIn");
  const moneyOutData = payload.find((p) => p.dataKey === "moneyOut");
  const moneyIn = moneyInData?.value || 0;
  const moneyOut = moneyOutData?.value || 0;
  const moneyInChange = (moneyInData?.payload as { moneyInChange?: number })?.moneyInChange || 0;
  const moneyOutChange = (moneyOutData?.payload as { moneyOutChange?: number })?.moneyOutChange || 0;

  return (
    <div className="bg-popover border border-border rounded-lg p-3 shadow-lg min-w-[160px]">
      <p className="text-sm font-medium text-foreground mb-3">{label}, 2024</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-foreground">
              ${(Number(moneyIn) / 1000).toFixed(0)}k
            </span>
          </div>
          <span className={`text-xs font-medium ${moneyInChange >= 0 ? "text-red-500" : "text-emerald-500"}`}>
            {moneyInChange >= 0 ? "↘" : "↗"} {Math.abs(moneyInChange).toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#162664] dark:bg-indigo-500" />
            <span className="text-sm font-semibold text-foreground">
              ${(Number(moneyOut) / 1000).toFixed(0)}k
            </span>
          </div>
          <span className={`text-xs font-medium ${moneyOutChange >= 0 ? "text-emerald-500" : "text-red-500"}`}>
            {moneyOutChange >= 0 ? "↗" : "↘"} {Math.abs(moneyOutChange).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export function FinancialFlowChart() {
  const { theme } = useTheme();
  const [chartType, setChartType] = useState<ChartType>("line");
  const [period, setPeriod] = useState<TimePeriod>("year");
  const [showGrid, setShowGrid] = useState(true);
  const [showMoneyIn, setShowMoneyIn] = useState(true);
  const [showMoneyOut, setShowMoneyOut] = useState(true);
  const [smoothCurve, setSmoothCurve] = useState(false);

  const isDark = theme === "dark";
  const axisColor = isDark ? "#71717a" : "#a1a1aa";
  const gridColor = isDark ? "#27272a" : "#e5e7eb";
  const moneyOutColor = isDark ? "#6366f1" : "#162664";

  const chartData = getDataForPeriod(period);

  const resetToDefault = () => {
    setChartType("line");
    setPeriod("year");
    setShowGrid(true);
    setShowMoneyIn(true);
    setShowMoneyOut(true);
    setSmoothCurve(false);
  };

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={Invoice01Icon}
            className="size-5 text-muted-foreground"
          />
          <span className="font-medium text-muted-foreground">
            Financial Flow
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-muted-foreground">
                Money in
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-full bg-[#162664] dark:bg-indigo-500" />
              <span className="text-xs font-medium text-muted-foreground">
                Money Out
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center size-8 rounded-md hover:bg-muted">
              <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <p className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                  Chart Type
                </p>
                <DropdownMenuItem onClick={() => setChartType("bar")}>
                  <HugeiconsIcon icon={ChartBarLineIcon} className="size-4 mr-2" />
                  Bar Chart
                  {chartType === "bar" && (
                    <HugeiconsIcon icon={Tick01Icon} className="size-4 ml-auto" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChartType("line")}>
                  <HugeiconsIcon icon={ChartLineData01Icon} className="size-4 mr-2" />
                  Line Chart
                  {chartType === "line" && (
                    <HugeiconsIcon icon={Tick01Icon} className="size-4 ml-auto" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChartType("area")}>
                  <HugeiconsIcon icon={ChartAverageIcon} className="size-4 mr-2" />
                  Area Chart
                  {chartType === "area" && (
                    <HugeiconsIcon icon={Tick01Icon} className="size-4 ml-auto" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <HugeiconsIcon icon={Calendar01Icon} className="size-4 mr-2" />
                  Time Period
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {(Object.keys(periodLabels) as TimePeriod[]).map((key) => (
                    <DropdownMenuItem key={key} onClick={() => setPeriod(key)}>
                      {periodLabels[key]}
                      {period === key && (
                        <HugeiconsIcon icon={Tick01Icon} className="size-4 ml-auto" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <p className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                  Display Options
                </p>
                <DropdownMenuCheckboxItem
                  checked={showGrid}
                  onCheckedChange={setShowGrid}
                >
                  <HugeiconsIcon icon={GridIcon} className="size-4 mr-2" />
                  Show Grid Lines
                </DropdownMenuCheckboxItem>

                {(chartType === "line" || chartType === "area") && (
                  <DropdownMenuCheckboxItem
                    checked={smoothCurve}
                    onCheckedChange={setSmoothCurve}
                  >
                    <HugeiconsIcon icon={ChartAverageIcon} className="size-4 mr-2" />
                    Smooth Curve
                  </DropdownMenuCheckboxItem>
                )}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <p className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                  Data Series
                </p>
                <DropdownMenuCheckboxItem
                  checked={showMoneyIn}
                  onCheckedChange={setShowMoneyIn}
                >
                  <div className="size-3 rounded-full bg-emerald-500 mr-2" />
                  Show Money In
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem
                  checked={showMoneyOut}
                  onCheckedChange={setShowMoneyOut}
                >
                  <div className="size-3 rounded-full bg-[#162664] dark:bg-indigo-500 mr-2" />
                  Show Money Out
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={resetToDefault}>
                <HugeiconsIcon icon={RefreshIcon} className="size-4 mr-2" />
                Reset to Default
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="h-[250px] sm:h-[280px] px-2 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={chartData} barGap={4}>
              <defs>
                <linearGradient
                  id="moneyInGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2d9f75" stopOpacity={1} />
                  <stop offset="100%" stopColor="#2d9f75" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient
                  id="moneyOutGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={moneyOutColor} stopOpacity={1} />
                  <stop offset="100%" stopColor={moneyOutColor} stopOpacity={0.6} />
                </linearGradient>
              </defs>
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="0"
                  stroke={gridColor}
                  vertical={false}
                />
              )}
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 10 }}
                tickFormatter={(value) => `$${value / 1000}k`}
                width={50}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#f4f4f5", radius: 4 }}
              />
              {showMoneyIn && (
                <Bar
                  dataKey="moneyIn"
                  fill="url(#moneyInGradient)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={22}
                />
              )}
              {showMoneyOut && (
                <Bar
                  dataKey="moneyOut"
                  fill="url(#moneyOutGradient)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={22}
                />
              )}
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart data={chartData}>
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={gridColor}
                  vertical={true}
                />
              )}
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 10 }}
                tickFormatter={(value) => `$${value / 1000}k`}
                width={50}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#d4d4d8" }}
              />
              {showMoneyIn && (
                <Line
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="moneyIn"
                  stroke="#2d9f75"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: "#2d9f75",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                />
              )}
              {showMoneyOut && (
                <Line
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="moneyOut"
                  stroke={moneyOutColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: moneyOutColor,
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                />
              )}
            </LineChart>
          ) : (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="moneyInAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2d9f75" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2d9f75" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient
                  id="moneyOutAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={moneyOutColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={moneyOutColor} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="0"
                  stroke={gridColor}
                  vertical={false}
                />
              )}
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 10 }}
                tickFormatter={(value) => `$${value / 1000}k`}
                width={50}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#d4d4d8" }}
              />
              {showMoneyIn && (
                <Area
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="moneyIn"
                  stroke="#2d9f75"
                  strokeWidth={2}
                  fill="url(#moneyInAreaGradient)"
                />
              )}
              {showMoneyOut && (
                <Area
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="moneyOut"
                  stroke={moneyOutColor}
                  strokeWidth={2}
                  fill="url(#moneyOutAreaGradient)"
                />
              )}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
