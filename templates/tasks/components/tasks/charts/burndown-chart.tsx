"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";

const AXIS_COLOR_LIGHT = "#E8E9ED";
const AXIS_COLOR_DARK = "#2A2A2A";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconChartLine, IconDots, IconArrowUpRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const shortData = [
  { month: "May", actual: 280 },
  { month: "Jun", actual: 380 },
  { month: "Jul", actual: 290 },
  { month: "Aug", actual: 400 },
  { month: "Sep", actual: 320 },
  { month: "Oct", actual: 450 },
  { month: "Nov", actual: 360 },
  { month: "Dec", actual: 480 },
];

const fullData = [
  { month: "Jan", actual: 180 },
  { month: "Feb", actual: 420 },
  { month: "Mar", actual: 230 },
  { month: "Apr", actual: 340 },
  { month: "May", actual: 280 },
  { month: "Jun", actual: 380 },
  { month: "Jul", actual: 290 },
  { month: "Aug", actual: 400 },
  { month: "Sep", actual: 320 },
  { month: "Oct", actual: 450 },
  { month: "Nov", actual: 360 },
  { month: "Dec", actual: 480 },
];

const chartConfig = {
  actual: {
    label: "Actual",
    color: "hsl(142 71% 45%)",
  },
} satisfies ChartConfig;

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-background p-2 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}, 2025</p>
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">{payload[0]?.value}</span>
          <div className="flex items-center text-emerald-500">
            <IconArrowUpRight className="size-3.5" />
            <span className="text-[10px]">5.2%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

type LineType = "linear" | "monotone";
type Period = "8months" | "year";

export function BurndownChart() {
  const { resolvedTheme } = useTheme();
  const [lineType, setLineType] = useState<LineType>("monotone");
  const [showGrid, setShowGrid] = useState(true);
  const [period, setPeriod] = useState<Period>("year");

  const isDark = resolvedTheme === "dark";
  const axisColor = isDark ? AXIS_COLOR_DARK : AXIS_COLOR_LIGHT;

  const data = period === "8months" ? shortData : fullData;

  return (
    <div className="rounded-xl border border-border p-4 sm:p-6 flex-[1.5] min-w-0">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-8 rounded-lg border border-border shrink-0">
            <IconChartLine className="size-[18px] text-muted-foreground" />
          </div>
          <span className="text-xs font-medium">Burndown Chart</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <IconDots className="size-4 text-muted-foreground" />
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
            <DropdownMenuLabel className="text-xs">Display</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showGrid}
              onCheckedChange={setShowGrid}
              className="text-xs"
            >
              Show Grid
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs">Period</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={period === "8months"}
              onCheckedChange={() => setPeriod("8months")}
              className="text-xs"
            >
              Last 8 Months
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={period === "year"}
              onCheckedChange={() => setPeriod("year")}
              className="text-xs"
            >
              Full Year
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ChartContainer config={chartConfig} className="h-[235px] w-full -ml-5">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(45, 159, 117, 0.07)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.07)" />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="5 5"
            vertical={true}
            horizontal={true}
            stroke={axisColor}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={{ stroke: axisColor }}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: axisColor }}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            domain={[0, 500]}
            ticks={[0, 100, 200, 300, 400, 500]}
          />
          <ChartTooltip content={<CustomTooltip />} />
          <Area
            type={lineType}
            dataKey="actual"
            stroke="var(--color-actual)"
            strokeWidth={2}
            fill="url(#fillActual)"
            dot={false}
            activeDot={{
              r: 6,
              fill: "var(--color-actual)",
              stroke: "hsl(var(--background))",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
