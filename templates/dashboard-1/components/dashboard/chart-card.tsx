"use client";

import { useState } from "react";
import { Users, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboardStore } from "@/store/dashboard-store";

// Couleurs exactes du design Figma
const NEW_LEADS_COLOR_LIGHT = "#252C2C";
const NEW_LEADS_COLOR_DARK = "#E8E9ED"; // Gris clair pour dark mode
const REPLIED_COLOR = "#888DF9";

// Couleurs pour les labels selon le thème
const LABEL_COLOR_LIGHT = "#95979d";
const LABEL_COLOR_DARK = "#B4B4B4"; // Gris clair pour dark mode

// Couleurs pour la grille selon le thème
const GRID_COLOR_LIGHT = "#E8E9ED";
const GRID_COLOR_DARK = "#2A2A2A";

export function ChartCard() {
  const { chartData } = useDashboardStore();
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Utiliser resolvedTheme pour gérer le thème système
  // resolvedTheme sera undefined jusqu'au montage, donc on utilise light par défaut
  const isDark = resolvedTheme === "dark";
  const newLeadsColor = isDark ? NEW_LEADS_COLOR_DARK : NEW_LEADS_COLOR_LIGHT;
  const labelColor = isDark ? LABEL_COLOR_DARK : LABEL_COLOR_LIGHT;
  const gridColor = isDark ? GRID_COLOR_DARK : GRID_COLOR_LIGHT;

  const formatDateRange = (date: Date | undefined) => {
    if (!date) return "November";
    const month = date.toLocaleDateString("en-US", { month: "long" });
    return month;
  };

  return (
    <div className="relative rounded-xl border border-border bg-card p-6 max-h-[400px] overflow-y-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <h2 className="text-[15px] font-normal text-foreground tracking-[-0.45px]">
            Leads Over Time
          </h2>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-2 text-xs px-[10px] py-[4px]"
            >
              <CalendarIcon className="size-4" />
              {formatDateRange(date)}
              <ChevronDown className="size-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-4 flex items-center justify-center gap-[22px]">
        <div className="flex items-center gap-1.5">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: newLeadsColor }}
          />
          <span className="text-xs font-medium text-muted-foreground tracking-[-0.24px]">
            New Leads
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: REPLIED_COLOR }}
          />
          <span className="text-xs font-medium text-muted-foreground tracking-[-0.24px]">
            Replied
          </span>
        </div>
      </div>

      <div className="relative pl-8">
        <ResponsiveContainer width="100%" height={237}>
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barCategoryGap={4}
            barGap={5}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              strokeWidth={1}
            />
            <XAxis
              dataKey="month"
              tick={{
                fill: labelColor,
                fontSize: 12,
                fontWeight: 400,
                fontFamily: "inherit",
              }}
              axisLine={false}
              tickLine={false}
              tickMargin={13}
              style={{
                letterSpacing: "-0.24px",
              }}
            />
            <YAxis
              tick={{
                fill: labelColor,
                fontSize: 12,
                fontWeight: 400,
                fontFamily: "inherit",
              }}
              axisLine={false}
              tickLine={false}
              domain={[0, 1000]}
              ticks={[0, 250, 500, 750, 1000]}
              tickFormatter={(value) => {
                if (value === 1000) return "1,000";
                return value.toString();
              }}
              style={{
                letterSpacing: "-0.24px",
              }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                padding: 0,
              }}
              wrapperStyle={{
                outline: "none",
              }}
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const newLeadsEntry = payload.find(
                  (p) => p.dataKey === "newLeads"
                );
                const repliedEntry = payload.find(
                  (p) => p.dataKey === "replied"
                );
                return (
                  <div className="rounded-lg border border-border bg-card p-2 shadow-lg">
                    <p className="mb-1.5 text-xs font-medium text-foreground tracking-[-0.24px]">
                      {label}, 2025
                    </p>
                    {newLeadsEntry && (
                      <div className="mb-1 flex items-center gap-1.5">
                        <div
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: newLeadsColor }}
                        />
                        <span className="flex-1 text-xs font-medium text-foreground tracking-[-0.24px]">
                          {newLeadsEntry.value}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground tracking-[-0.24px]">
                          +92
                        </span>
                      </div>
                    )}
                    {repliedEntry && (
                      <div className="flex items-center gap-1.5">
                        <div
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: REPLIED_COLOR }}
                        />
                        <span className="flex-1 text-xs font-medium text-foreground tracking-[-0.24px]">
                          {repliedEntry.value}
                        </span>
                        <span className="text-xs font-medium text-[#888df9] tracking-[-0.24px]">
                          +67
                        </span>
                      </div>
                    )}
                  </div>
                );
              }}
            />
            <Bar
              dataKey="newLeads"
              fill={newLeadsColor}
              radius={[4.912, 4.912, 0, 0]}
              barSize={30}
            />
            <Bar
              dataKey="replied"
              fill={REPLIED_COLOR}
              radius={[4.912, 4.912, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
