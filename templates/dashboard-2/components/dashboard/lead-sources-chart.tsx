"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  ChartLine,
  MoreHorizontal,
  ArrowRight,
  Download,
  Share2,
  Maximize2,
  RefreshCw,
  Settings2,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

const allData = {
  "7days": [
    { name: "Website", value: 312, color: "#35b9e9" },
    { name: "Paid Ads", value: 198, color: "#6e3ff3" },
    { name: "Emails", value: 156, color: "#375dfb" },
    { name: "Referral", value: 98, color: "#e255f2" },
  ],
  "30days": [
    { name: "Website", value: 1445, color: "#35b9e9" },
    { name: "Paid Ads", value: 903, color: "#6e3ff3" },
    { name: "Emails", value: 722, color: "#375dfb" },
    { name: "Referral", value: 451, color: "#e255f2" },
  ],
  "90days": [
    { name: "Website", value: 4235, color: "#35b9e9" },
    { name: "Paid Ads", value: 2709, color: "#6e3ff3" },
    { name: "Emails", value: 2166, color: "#375dfb" },
    { name: "Referral", value: 1353, color: "#e255f2" },
  ],
};

type TimeRange = "7days" | "30days" | "90days";

const timeRangeLabels: Record<TimeRange, string> = {
  "7days": "Last 7 days",
  "30days": "Last 30 days",
  "90days": "Last 90 days",
};

export function LeadSourcesChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30days");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  const data = allData[timeRange];
  const totalLeads = data.reduce((acc, item) => acc + item.value, 0);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderActiveShape = (props: unknown) => {
    const typedProps = props as {
      cx: number;
      cy: number;
      innerRadius: number;
      outerRadius: number;
      startAngle: number;
      endAngle: number;
      fill: string;
    };
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      typedProps;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-xl border bg-card w-full xl:w-[410px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Button variant="outline" size="icon" className="size-7 sm:size-8">
            <ChartLine className="size-4 sm:size-[18px] text-muted-foreground" />
          </Button>
          <span className="text-sm sm:text-base font-medium">Lead Sources</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7 sm:size-8">
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuLabel>Time Range</DropdownMenuLabel>
            {(Object.keys(timeRangeLabels) as TimeRange[]).map((range) => (
              <DropdownMenuCheckboxItem
                key={range}
                checked={timeRange === range}
                onCheckedChange={() => setTimeRange(range)}
              >
                {timeRangeLabels[range]}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Display Options</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showLabels}
              onCheckedChange={setShowLabels}
            >
              Show labels
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="size-4 mr-2" />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="size-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Maximize2 className="size-4 mr-2" />
              Full Screen
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="size-4 mr-2" />
              Refresh Data
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="relative shrink-0 size-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="42%"
                outerRadius="70%"
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg sm:text-xl font-semibold">
              {totalLeads.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              Total Leads
            </span>
          </div>
        </div>

        {showLabels && (
          <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-4">
            {data.map((item, index) => (
              <div
                key={item.name}
                className={`flex items-center gap-2 sm:gap-2.5 cursor-pointer transition-opacity ${
                  activeIndex !== null && activeIndex !== index
                    ? "opacity-50"
                    : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div
                  className="w-1 h-4 sm:h-5 rounded-sm shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1 text-xs sm:text-sm text-muted-foreground truncate">
                  {item.name}
                </span>
                <span className="text-xs sm:text-sm font-semibold tabular-nums">
                  {item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Settings2 className="size-3" />
        <span>{timeRangeLabels[timeRange]}</span>
      </div>
    </div>
  );
}
