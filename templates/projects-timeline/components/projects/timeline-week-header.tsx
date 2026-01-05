"use client";

import { format } from "date-fns";

interface TimelineWeekHeaderProps {
  weekDays: Date[];
}

export function TimelineWeekHeader({ weekDays }: TimelineWeekHeaderProps) {
  return (
    <div className="grid grid-cols-7 border-b border-border sticky top-0 z-30 bg-background w-full">
      {weekDays.map((day) => (
        <div
          key={day.toISOString()}
          className="border-r border-border last:border-r-0 text-center py-2.5"
        >
          <div className="text-sm font-medium">
            {format(day, "EEE dd")}
          </div>
        </div>
      ))}
    </div>
  );
}

