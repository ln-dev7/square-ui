"use client";

import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarWeekHeaderProps {
  weekDays: Date[];
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export function CalendarWeekHeader({
  weekDays,
  onPreviousWeek,
  onNextWeek,
}: CalendarWeekHeaderProps) {
  return (
    <div className="flex border-b border-border sticky top-0 z-30 bg-background w-max min-w-full">
      <div className="w-[80px] md:w-[104px] flex items-center gap-1 md:gap-2 p-1.5 md:p-2 border-r border-border shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="size-7 md:size-8"
          onClick={onPreviousWeek}
        >
          <ChevronLeft className="size-4 md:size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 md:size-8"
          onClick={onNextWeek}
        >
          <ChevronRight className="size-4 md:size-5" />
        </Button>
      </div>
      {weekDays.map((day) => (
        <div
          key={day.toISOString()}
          className="flex-1 border-r border-border last:border-r-0 p-1.5 md:p-2 min-w-44 flex items-center"
        >
          <div className="text-xs md:text-sm font-medium text-foreground">
            {format(day, "dd EEE").toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
}

