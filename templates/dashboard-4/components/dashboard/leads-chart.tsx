"use client";

import { useState, useMemo } from "react";
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
import { Calendar, ChevronDown, Settings } from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useTheme } from "next-themes";
import {
  leadsChartDataWeek,
  leadsChartDataMonth,
  leadsChartDataQuarter,
} from "@/mock-data/dashboard";

type ChartType = "line" | "area";
type Period = "last_week" | "last_month" | "last_quarter";

const periodLabels: Record<Period, string> = {
  last_week: "Last Week",
  last_month: "Last Month",
  last_quarter: "Last Quarter",
};

const lineColors = {
  line1: "#ec4899",
  line2: "#06b6d4",
  line3: "#f97316",
  line4: "#22c55e",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border rounded-md p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-2">{label}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export function LeadsChart() {
  const { theme } = useTheme();
  const [chartType, setChartType] = useState<ChartType>("line");
  const [period, setPeriod] = useState<Period>("last_month");
  const [showGrid, setShowGrid] = useState(true);
  const [visibleLines, setVisibleLines] = useState({
    line1: true,
    line2: true,
    line3: true,
    line4: true,
  });

  const axisColor = theme === "dark" ? "#71717a" : "#868c98";
  const gridColor = theme === "dark" ? "#3f3f46" : "#e2e4e9";

  const chartData = useMemo(() => {
    switch (period) {
      case "last_week":
        return leadsChartDataWeek;
      case "last_month":
        return leadsChartDataMonth;
      case "last_quarter":
        return leadsChartDataQuarter;
      default:
        return leadsChartDataMonth;
    }
  }, [period]);

  const toggleLine = (line: keyof typeof visibleLines) => {
    setVisibleLines((prev) => ({
      ...prev,
      [line]: !prev[line],
    }));
  };

  const resetToDefault = () => {
    setChartType("line");
    setPeriod("last_month");
    setShowGrid(true);
    setVisibleLines({
      line1: true,
      line2: true,
      line3: true,
      line4: true,
    });
  };

  return (
    <div className="bg-card text-card-foreground rounded-lg border flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-border/50">
        <h3 className="font-medium text-sm sm:text-base">Leads Gathered</h3>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1.5">
                <Calendar className="size-3.5" />
                <span className="text-sm">{periodLabels[period]}</span>
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(Object.keys(periodLabels) as Period[]).map((p) => (
                <DropdownMenuItem key={p} onClick={() => setPeriod(p)}>
                  {periodLabels[p]} {period === p && "✓"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="size-7">
                <Settings className="size-3.5" />
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
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showGrid}
                onCheckedChange={setShowGrid}
              >
                Show Grid
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Show Lines</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {Object.entries(visibleLines).map(([key, value]) => (
                    <DropdownMenuCheckboxItem
                      key={key}
                      checked={value}
                      onCheckedChange={() =>
                        toggleLine(key as keyof typeof visibleLines)
                      }
                    >
                      <span
                        className="size-2 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            lineColors[key as keyof typeof lineColors],
                        }}
                      />
                      Series {key.replace("line", "")}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={resetToDefault}>
                Reset to Default
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4">
        <div className="h-[200px] sm:h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                {showGrid && (
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColor}
                    vertical={false}
                  />
                )}
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: axisColor }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: axisColor }}
                  domain={[0, 1000]}
                />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  {Object.entries(lineColors).map(([key, color]) => (
                    <linearGradient
                      key={key}
                      id={`gradient-${key}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                {Object.entries(visibleLines).map(
                  ([key, visible]) =>
                    visible && (
                      <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={lineColors[key as keyof typeof lineColors]}
                        strokeWidth={2}
                        fill={`url(#gradient-${key})`}
                        dot={false}
                      />
                    )
                )}
              </AreaChart>
            ) : (
              <RechartsLineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                {showGrid && (
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColor}
                    vertical={false}
                  />
                )}
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: axisColor }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: axisColor }}
                  domain={[0, 1000]}
                />
                <Tooltip content={<CustomTooltip />} />
                {Object.entries(visibleLines).map(
                  ([key, visible]) =>
                    visible && (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={lineColors[key as keyof typeof lineColors]}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                      />
                    )
                )}
              </RechartsLineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
