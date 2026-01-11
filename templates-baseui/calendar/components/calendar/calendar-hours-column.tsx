"use client";

import { HOURS_24, HOUR_HEIGHT } from "./calendar-utils";

interface CalendarHoursColumnProps {
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function CalendarHoursColumn({
  onScroll,
  scrollRef,
}: CalendarHoursColumnProps) {
  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="w-[80px] md:w-[104px] border-r border-border shrink-0 overflow-y-auto relative"
    >
      {HOURS_24.map((hour) => (
        <div
          key={hour}
          className="border-b border-border p-2 md:p-3 text-xs md:text-sm text-muted-foreground"
          style={{ height: `${HOUR_HEIGHT}px` }}
        >
          {hour}
        </div>
      ))}
    </div>
  );
}

