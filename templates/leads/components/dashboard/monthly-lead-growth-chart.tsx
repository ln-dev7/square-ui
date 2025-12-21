"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { TrendingUp, MoreHorizontal } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { useTheme } from "next-themes";

const fullYearData = [
  { month: "Jan", week: 1, leads: 210 },
  { month: "", week: 2, leads: 220 },
  { month: "", week: 3, leads: 310 },
  { month: "", week: 4, leads: 420 },
  { month: "Feb", week: 5, leads: 340 },
  { month: "", week: 6, leads: 330 },
  { month: "", week: 7, leads: 280 },
  { month: "", week: 8, leads: 260 },
  { month: "Mar", week: 9, leads: 210 },
  { month: "", week: 10, leads: 230 },
  { month: "", week: 11, leads: 270 },
  { month: "", week: 12, leads: 290 },
  { month: "Apr", week: 13, leads: 340 },
  { month: "", week: 14, leads: 360 },
  { month: "", week: 15, leads: 380 },
  { month: "", week: 16, leads: 350 },
  { month: "May", week: 17, leads: 370 },
  { month: "", week: 18, leads: 390 },
  { month: "", week: 19, leads: 400 },
  { month: "", week: 20, leads: 380 },
  { month: "Jun", week: 21, leads: 410 },
  { month: "", week: 22, leads: 430 },
  { month: "", week: 23, leads: 400 },
  { month: "", week: 24, leads: 420 },
  { month: "Jul", week: 25, leads: 390 },
  { month: "", week: 26, leads: 380 },
  { month: "", week: 27, leads: 400 },
  { month: "", week: 28, leads: 390 },
  { month: "Aug", week: 29, leads: 290 },
  { month: "", week: 30, leads: 310 },
  { month: "", week: 31, leads: 380 },
  { month: "", week: 32, leads: 400 },
  { month: "Sep", week: 33, leads: 370 },
  { month: "", week: 34, leads: 390 },
  { month: "", week: 35, leads: 360 },
  { month: "", week: 36, leads: 380 },
  { month: "Oct", week: 37, leads: 370 },
  { month: "", week: 38, leads: 390 },
  { month: "", week: 39, leads: 380 },
  { month: "", week: 40, leads: 400 },
];

type ChartType = "line" | "area" | "bar";
type Period = "3m" | "6m" | "12m";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { month: string; week: number; leads: number };
  }>;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0];
    const weekIndex = data.payload.week - 1;
    const monthIndex = Math.floor(weekIndex / 4);
    const monthName = monthNames[monthIndex] || "Apr";
    
    const prevIndex = fullYearData.findIndex(d => d.week === data.payload.week) - 1;
    const prevValue = prevIndex >= 0 ? fullYearData[prevIndex].leads : data.value;
    const change = prevValue > 0 ? ((data.value - prevValue) / prevValue * 100).toFixed(1) : 0;
    
    return (
      <div className="bg-card border rounded-md p-2">
        <p className="text-xs text-muted-foreground">{monthName}, 2025</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold text-sm">{data.value}</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="size-3" />
            {change}%
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export function MonthlyLeadGrowthChart() {
  const { theme } = useTheme();
  const [chartType, setChartType] = useState<ChartType>("area");
  const [period, setPeriod] = useState<Period>("12m");
  const [showGrid, setShowGrid] = useState(true);
  const [smoothCurve, setSmoothCurve] = useState(true);

  const axisColor = theme === "dark" ? "#525866" : "#868c98";
  const gridColor = theme === "dark" ? "#27272a" : "#e2e4e9";
  const lineColor = "#6e3ff3";

  const getDataForPeriod = () => {
    switch (period) {
      case "3m":
        return fullYearData.slice(-12);
      case "6m":
        return fullYearData.slice(-24);
      case "12m":
      default:
        return fullYearData;
    }
  };

  const data = getDataForPeriod();

  const resetToDefault = () => {
    setChartType("area");
    setPeriod("12m");
    setShowGrid(true);
    setSmoothCurve(true);
  };

  return (
    <div className="bg-card text-card-foreground rounded-xl border flex-1">
      <div className="flex flex-row items-center justify-between py-5 px-5">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="size-8">
            <TrendingUp className="size-4 text-muted-foreground" />
          </Button>
          <h3 className="font-medium text-sm sm:text-base">Monthly Lead Growth</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Chart Type</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setChartType("line")}>
                  Line Chart {chartType === "line" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChartType("area")}>
                  Area Chart {chartType === "area" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChartType("bar")}>
                  Bar Chart {chartType === "bar" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Time Period</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setPeriod("3m")}>
                  Last 3 Months {period === "3m" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPeriod("6m")}>
                  Last 6 Months {period === "6m" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPeriod("12m")}>
                  Last 12 Months {period === "12m" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showGrid}
              onCheckedChange={setShowGrid}
            >
              Show Grid
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={smoothCurve}
              onCheckedChange={setSmoothCurve}
              disabled={chartType === "bar"}
            >
              Smooth Curve
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={resetToDefault}>
              Reset to Default
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-5 pb-5">
        <div className="h-[200px] sm:h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />}
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: axisColor }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: axisColor }}
                  domain={[0, 500]}
                  ticks={[0, 100, 200, 300, 400, 500]}
                />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="leadBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6e3ff3" />
                    <stop offset="100%" stopColor="#aa8ef9" />
                  </linearGradient>
                </defs>
                <Bar dataKey="leads" fill="url(#leadBarGradient)" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : chartType === "area" ? (
              <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />}
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: axisColor }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: axisColor }}
                  domain={[0, 500]}
                  ticks={[0, 100, 200, 300, 400, 500]}
                />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="leadAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6e3ff3" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#6e3ff3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="leads"
                  stroke={lineColor}
                  strokeWidth={2}
                  fill="url(#leadAreaGradient)"
                  dot={false}
                  activeDot={{ r: 6, fill: lineColor, stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            ) : (
              <LineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />}
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: axisColor }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: axisColor }}
                  domain={[0, 500]}
                  ticks={[0, 100, 200, 300, 400, 500]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="leads"
                  stroke={lineColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: lineColor, stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
