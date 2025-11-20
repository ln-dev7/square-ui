"use client";

import { isSameDay } from "date-fns";
import { getCurrentTimePosition } from "./calendar-utils";

interface CurrentTimeIndicatorProps {
  day: Date;
  today: Date;
  isTodayInWeek: boolean;
  currentTime: Date;
}

export function CurrentTimeIndicator({
  day,
  today,
  isTodayInWeek,
  currentTime,
}: CurrentTimeIndicatorProps) {
  if (!isTodayInWeek || !isSameDay(day, today)) {
    return null;
  }

  const currentTimePosition = getCurrentTimePosition(currentTime);

  return (
    <div
      className="absolute left-0 right-0 z-20 flex items-center pointer-events-none"
      style={{
        top: `${currentTimePosition}px`,
        transform: "translateY(-50%)",
      }}
    >
      <div className="size-2 rounded-full bg-red-500 shrink-0 -ml-1" />
      <div className="h-0.5 bg-red-500 flex-1" />
    </div>
  );
}

