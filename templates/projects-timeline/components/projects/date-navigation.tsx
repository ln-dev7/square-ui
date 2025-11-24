"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { startOfWeek } from "date-fns";

interface DateNavigationProps {
  startDate: Date;
  endDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  onDateSelect: (date: Date) => void;
}

export function DateNavigation({
  startDate,
  endDate,
  onPrevious,
  onNext,
  onDateSelect,
}: DateNavigationProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(startDate);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
      setOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 shadow-none"
        onClick={onPrevious}
      >
        <ChevronLeft className="size-5" />
      </Button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-9 px-3 shadow-none w-10 sm:min-w-[220px] justify-center"
          >
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
              {format(startDate, "MMM dd")} - {format(endDate, "MMM dd")}
            </span>
            <CalendarIcon className="size-4 sm:hidden" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={startOfWeek(startDate, { weekStartsOn: 1 })}
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown"
            startMonth={new Date(2020, 0, 1)}
            endMonth={new Date(2070, 11, 31)}
            hidden={[
              { before: new Date(2020, 0, 1) },
              { after: new Date(2070, 11, 31) },
            ]}
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 shadow-none"
        onClick={onNext}
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
}
