"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
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
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserAdd01Icon,
  MoreHorizontalIcon,
  ChartColumnIcon,
  ChartLineData01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  GridIcon,
  RefreshIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

const fullYearData = [
  { month: "Jan", newHires: 20, exits: 7 },
  { month: "Feb", newHires: 29, exits: 16 },
  { month: "Mar", newHires: 31, exits: 21 },
  { month: "Apr", newHires: 37, exits: 14 },
  { month: "May", newHires: 21, exits: 11 },
  { month: "Jun", newHires: 30, exits: 18 },
  { month: "Jul", newHires: 31, exits: 11 },
  { month: "Aug", newHires: 19, exits: 10 },
  { month: "Sep", newHires: 31, exits: 12 },
  { month: "Oct", newHires: 38, exits: 16 },
  { month: "Nov", newHires: 22, exits: 18 },
  { month: "Dec", newHires: 31, exits: 15 },
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

  const newHires = payload.find((p) => p.dataKey === "newHires")?.value || 0;
  const exits = payload.find((p) => p.dataKey === "exits")?.value || 0;

  return (
    <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-foreground mb-2">{label}, 2024</p>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div
            className="size-2.5 rounded-full"
            style={{ background: "#2BACAC" }}
          />
          <span className="text-sm font-medium text-foreground">
            {newHires}
          </span>
          <span className="text-xs text-emerald-500 flex items-center">
            ↑ 5
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="size-2.5 rounded-full"
            style={{ background: "#F67878" }}
          />
          <span className="text-sm font-medium text-foreground">{exits}</span>
          <span className="text-xs text-red-500 flex items-center">↓ 10</span>
        </div>
      </div>
    </div>
  );
}

export function HiresExitsChart() {
  const { resolvedTheme } = useTheme();
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [period, setPeriod] = useState<TimePeriod>("year");
  const [showGrid, setShowGrid] = useState(true);
  const [showNewHires, setShowNewHires] = useState(true);
  const [showExits, setShowExits] = useState(true);
  const [smoothCurve, setSmoothCurve] = useState(true);

  const isDark = resolvedTheme === "dark";
  const axisColor = isDark ? "#71717a" : "#a1a1aa";
  const gridColor = isDark ? "#27272a" : "#f4f4f5";

  const chartData = getDataForPeriod(period);

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={UserAdd01Icon} className="size-5 text-foreground" />
          <span className="font-medium text-foreground">
            New Hires vs. Exits
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className="size-3 rounded-full"
                style={{ background: "#2BACAC" }}
              />
              <span className="text-xs text-muted-foreground">New Hires</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="size-3 rounded-full"
                style={{ background: "#F67878" }}
              />
              <span className="text-xs text-muted-foreground">Exits</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="size-8">
                  <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Chart Options</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <HugeiconsIcon icon={ChartColumnIcon} className="size-4 mr-2" />
                  Chart Type
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setChartType("bar")}>
                    <HugeiconsIcon icon={ChartColumnIcon} className="size-4 mr-2" />
                    Bar Chart
                    {chartType === "bar" && (
                      <HugeiconsIcon icon={Tick02Icon} className="size-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setChartType("line")}>
                    <HugeiconsIcon icon={ChartLineData01Icon} className="size-4 mr-2" />
                    Line Chart
                    {chartType === "line" && (
                      <HugeiconsIcon icon={Tick02Icon} className="size-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setChartType("area")}>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4 mr-2" />
                    Area Chart
                    {chartType === "area" && (
                      <HugeiconsIcon icon={Tick02Icon} className="size-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <HugeiconsIcon icon={Calendar03Icon} className="size-4 mr-2" />
                  Time Period
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {(Object.keys(periodLabels) as TimePeriod[]).map((key) => (
                    <DropdownMenuItem key={key} onClick={() => setPeriod(key)}>
                      {periodLabels[key]}
                      {period === key && (
                        <HugeiconsIcon icon={Tick02Icon} className="size-4 ml-auto" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

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
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4 mr-2" />
                  Smooth Curve
                </DropdownMenuCheckboxItem>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">
                  Data Series
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuCheckboxItem
                checked={showNewHires}
                onCheckedChange={setShowNewHires}
              >
                <div
                  className="size-3 rounded-full mr-2"
                  style={{ background: "#2BACAC" }}
                />
                Show New Hires
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={showExits}
                onCheckedChange={setShowExits}
              >
                <div
                  className="size-3 rounded-full mr-2"
                  style={{ background: "#F67878" }}
                />
                Show Exits
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  setChartType("bar");
                  setPeriod("year");
                  setShowGrid(true);
                  setShowNewHires(true);
                  setShowExits(true);
                  setSmoothCurve(true);
                }}
              >
                <HugeiconsIcon icon={RefreshIcon} className="size-4 mr-2" />
                Reset to Default
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={chartData} barGap={4}>
              <defs>
                <linearGradient
                  id="newHiresGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2BACAC" stopOpacity={1} />
                  <stop offset="100%" stopColor="#2BACAC" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="exitsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F67878" stopOpacity={1} />
                  <stop offset="100%" stopColor="#F67878" stopOpacity={0.6} />
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
                tick={{ fill: axisColor, fontSize: 12 }}
                dx={-10}
                domain={[0, 50]}
                ticks={[0, 10, 20, 30, 40, 50]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: isDark ? "#27272a" : "#f4f4f5", radius: 4 }}
              />
              {showNewHires && (
                <Bar
                  dataKey="newHires"
                  fill="url(#newHiresGradient)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={22}
                />
              )}
              {showExits && (
                <Bar
                  dataKey="exits"
                  fill="url(#exitsGradient)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={22}
                />
              )}
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart data={chartData}>
              <defs>
                <linearGradient
                  id="newHiresGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2BACAC" stopOpacity={1} />
                  <stop offset="100%" stopColor="#2BACAC" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="exitsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F67878" stopOpacity={1} />
                  <stop offset="100%" stopColor="#F67878" stopOpacity={0.6} />
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
                tick={{ fill: axisColor, fontSize: 12 }}
                dx={-10}
                domain={[0, 50]}
                ticks={[0, 10, 20, 30, 40, 50]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: isDark ? "#52525b" : "#d4d4d8" }}
              />
              {showNewHires && (
                <Line
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="newHires"
                  stroke="#2BACAC"
                  strokeWidth={2.5}
                  dot={{ fill: "#2BACAC", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "#2BACAC" }}
                />
              )}
              {showExits && (
                <Line
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="exits"
                  stroke="#F67878"
                  strokeWidth={2.5}
                  dot={{ fill: "#F67878", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "#F67878" }}
                />
              )}
            </LineChart>
          ) : (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="newHiresAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2BACAC" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2BACAC" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient
                  id="exitsAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#F67878" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#F67878" stopOpacity={0.05} />
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
                tick={{ fill: axisColor, fontSize: 12 }}
                dx={-10}
                domain={[0, 50]}
                ticks={[0, 10, 20, 30, 40, 50]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: isDark ? "#52525b" : "#d4d4d8" }}
              />
              {showNewHires && (
                <Area
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="newHires"
                  stroke="#2BACAC"
                  strokeWidth={2}
                  fill="url(#newHiresAreaGradient)"
                />
              )}
              {showExits && (
                <Area
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="exits"
                  stroke="#F67878"
                  strokeWidth={2}
                  fill="url(#exitsAreaGradient)"
                />
              )}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
