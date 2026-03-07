"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHabitStore } from "@/store/habit-store";
import { HABIT_COLORS, type HabitColor } from "@/mock-data/habits";
import { cn } from "@/lib/utils";

const COLOR_OPTIONS: HabitColor[] = ["violet", "emerald", "amber", "rose", "sky", "orange", "teal"];
const ICON_OPTIONS = ["⭐", "🧘", "💪", "📚", "🌙", "🚿", "✍️", "🎯", "🏃", "💧", "🥗", "😴", "🎵", "🖥️", "🚴", "🥊"];

interface AddHabitDialogProps {
  children: React.ReactNode;
}

export function AddHabitDialog({ children }: AddHabitDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    newHabitName,
    newHabitIcon,
    newHabitColor,
    addHabit,
    setNewHabitName,
    setNewHabitIcon,
    setNewHabitColor,
    resetNewHabit,
  } = useHabitStore();

  const handleAdd = () => {
    if (!newHabitName.trim()) return;
    addHabit();
    setOpen(false);
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) resetNewHabit();
    setOpen(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New habit</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-2">
          <div className="flex items-center gap-3">
            <div
              className="size-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: HABIT_COLORS[newHabitColor].light + "22" }}
            >
              {newHabitIcon}
            </div>
            <Input
              placeholder="Habit name..."
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              autoFocus
            />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">Icon</p>
            <div className="flex flex-wrap gap-1.5">
              {ICON_OPTIONS.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setNewHabitIcon(icon)}
                  className={cn(
                    "size-9 rounded-lg flex items-center justify-center text-xl transition-colors",
                    newHabitIcon === icon
                      ? "bg-primary/20 ring-2 ring-primary/50"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">Color</p>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewHabitColor(c)}
                  className={cn(
                    "size-7 rounded-full transition-all",
                    newHabitColor === c && "ring-2 ring-offset-2 ring-offset-background scale-110"
                  )}
                  style={{ backgroundColor: HABIT_COLORS[c].light }}
                />
              ))}
            </div>
          </div>

          <Button onClick={handleAdd} disabled={!newHabitName.trim()} className="w-full">
            Add habit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
