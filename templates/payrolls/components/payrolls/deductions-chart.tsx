"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, MoreVertical } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { useTheme } from "next-themes";
import {
  deductionsTaxesData,
  deductionsSummary,
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

const LABEL_COLOR_LIGHT = "#868c98";
const LABEL_COLOR_DARK = "#9ca3af";

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2">
      <p className="text-xs text-muted-foreground mb-1.5">{label}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="size-2 rounded-full"
              style={{
                backgroundColor:
                  entry.dataKey === "taxes" ? "#346CBA" : "#FF6060",
              }}
            />
            <span className="text-xs text-muted-foreground">
              {entry.dataKey === "taxes" ? "Taxes" : "Deductions"}:
            </span>
            <span className="text-xs font-semibold text-foreground">
              ${entry.value?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DeductionsChart() {
  const { resolvedTheme } = useTheme();
  const periodFilter = usePayrollsStore((state) => state.periodFilter);
  const [showTaxes, setShowTaxes] = useState(true);
  const [showDeductions, setShowDeductions] = useState(true);

  const isDark = resolvedTheme === "dark";
  const labelColor = isDark ? LABEL_COLOR_DARK : LABEL_COLOR_LIGHT;

  const data = deductionsTaxesData[periodFilter];
  const summary = deductionsSummary[periodFilter];
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
              d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
            />
          </svg>
          <span className="font-medium">Deductions & Taxes</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-[#346CBA]" />
              <span className="text-xs text-muted-foreground">Taxes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-[#FF6060]" />
              <span className="text-xs text-muted-foreground">Deductions</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreVertical className="size-4 text-muted-foreground rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-xs">
                Display Options
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showTaxes}
                onCheckedChange={setShowTaxes}
                className="text-xs"
              >
                Show Taxes
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showDeductions}
                onCheckedChange={setShowDeductions}
                className="text-xs"
              >
                Show Deductions
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs">
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs">
                Export Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
            <BarChart data={data} barGap={2}>
              <defs>
                <linearGradient id="fillTaxes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#346CBA" />
                  <stop offset="100%" stopColor="rgba(52, 108, 186, 0.6)" />
                </linearGradient>
                <linearGradient id="fillDeductions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6060" />
                  <stop offset="100%" stopColor="rgba(255, 96, 96, 0.6)" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: labelColor }}
                interval={0}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              {showTaxes && (
                <Bar
                  dataKey="taxes"
                  fill="url(#fillTaxes)"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={12}
                />
              )}
              {showDeductions && (
                <Bar
                  dataKey="deductions"
                  fill="url(#fillDeductions)"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={12}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
