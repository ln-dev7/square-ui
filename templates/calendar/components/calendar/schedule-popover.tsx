"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface SchedulePopoverProps {
  children: React.ReactNode;
}

export function SchedulePopover({ children }: SchedulePopoverProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleSchedule = () => {
    if (!date || !startTime || !endTime) {
      return;
    }
    setOpen(false);
    setDate(new Date());
    setStartTime("");
    setEndTime("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-3">Schedule Meeting</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Quick schedule a meeting or event
            </p>
          </div>

          <div className="space-y-3">
            <div className="grid gap-2">
              <Label className="text-xs">Date</Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-9",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setDatePickerOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label className="text-xs">Start</Label>
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="pl-8 h-9 text-xs"
                    placeholder="09:00"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-xs">End</Label>
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="pl-8 h-9 text-xs"
                    placeholder="10:00"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 justify-start gap-2 text-xs"
              >
                <Users className="size-3.5" />
                <span>Add participants</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 justify-start gap-2 text-xs"
              >
                <Video className="size-3.5" />
                <span>Add video call</span>
              </Button>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="flex-1 h-8 text-xs"
                onClick={handleSchedule}
                disabled={!date || !startTime || !endTime}
              >
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

