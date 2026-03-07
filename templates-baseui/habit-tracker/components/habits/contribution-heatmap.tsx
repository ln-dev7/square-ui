"use client";

import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HABIT_COLORS, type HabitColor } from "@/mock-data/habits";
import { cn } from "@/lib/utils";

interface ContributionHeatmapProps {
  history: Record<string, boolean>;
  color: HabitColor;
  compact?: boolean;
}

function getDayLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function buildGrid(history: Record<string, boolean>): Array<Array<{ date: string; done: boolean | undefined }>> {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364);

  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);

  const weeks: Array<Array<{ date: string; done: boolean | undefined }>> = [];
  const cursor = new Date(startDate);

  while (cursor <= today) {
    const week: Array<{ date: string; done: boolean | undefined }> = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = cursor.toISOString().split("T")[0];
      const isInRange = cursor >= new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()) && cursor <= today;
      week.push({ date: dateStr, done: isInRange ? history[dateStr] : undefined });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function ContributionHeatmap({ history, color, compact = false }: ContributionHeatmapProps) {
  const weeks = useMemo(() => buildGrid(history), [history]);
  const colorVal = HABIT_COLORS[color].light;

  const cellSize = compact ? 9 : 13;
  const cellGap = compact ? 2 : 3;
  const stride = cellSize + cellGap;

  const monthPositions = useMemo(() => {
    const positions: { label: string; x: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const firstDayOfWeek = week.find((d) => d.date !== "");
      if (!firstDayOfWeek) return;
      const date = new Date(firstDayOfWeek.date + "T00:00:00");
      const month = date.getMonth();
      if (month !== lastMonth) {
        positions.push({ label: MONTH_LABELS[month], x: wi * stride });
        lastMonth = month;
      }
    });
    return positions;
  }, [weeks, stride]);

  const totalWidth = weeks.length * stride;
  const headerHeight = compact ? 0 : 18;

  return (
    <div className="overflow-x-auto">
      <svg
        width={totalWidth}
        height={headerHeight + 7 * stride}
        style={{ display: "block" }}
      >
        {!compact && monthPositions.map(({ label, x }) => (
          <text
            key={`${label}-${x}`}
            x={x}
            y={12}
            fontSize={10}
            fill="currentColor"
            className="fill-muted-foreground"
          >
            {label}
          </text>
        ))}

        {weeks.map((week, wi) =>
          week.map((day, di) => {
            if (day.done === undefined) return null;
            const x = wi * stride;
            const y = headerHeight + di * stride;

            return (
              <Tooltip key={day.date}>
                <TooltipTrigger
                  render={
                    <rect
                      x={x}
                      y={y}
                      width={cellSize}
                      height={cellSize}
                      rx={compact ? 2 : 3}
                      ry={compact ? 2 : 3}
                      fill={day.done ? colorVal : "currentColor"}
                      className={cn(
                        "transition-opacity cursor-pointer",
                        day.done ? "opacity-85 hover:opacity-100" : "opacity-10 hover:opacity-20 text-foreground"
                      )}
                    />
                  }
                />
                <TooltipContent side="top" className="text-xs">
                  <p className="font-medium">{getDayLabel(new Date(day.date + "T00:00:00"))}</p>
                  <p className={day.done ? "text-primary" : "text-muted-foreground"}>
                    {day.done ? "✓ Completed" : "✗ Missed"}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })
        )}
      </svg>
    </div>
  );
}
