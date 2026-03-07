"use client";

import { useMemo, useEffect, useRef } from "react";
import { Check, Flame, TrendingUp, Plus, PartyPopper, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddHabitDialog } from "@/components/habits/add-habit-dialog";

import { ContributionHeatmap } from "@/components/habits/contribution-heatmap";
import { useHabitStore } from "@/store/habit-store";
import {
  HABIT_COLORS,
  getStreak,
  getCompletionRate,
  getTodayString,
} from "@/mock-data/habits";
import { cn } from "@/lib/utils";

function getMotivationalMessage(completed: number, total: number) {
  if (total === 0) return null;
  const pct = completed / total;
  if (pct === 1) return { text: "Perfect day! All done!", emoji: "🎉", color: "text-primary" };
  if (pct >= 0.75) return { text: "Almost there, keep going!", emoji: "🔥", color: "text-orange-500" };
  if (pct >= 0.5) return { text: "Halfway through, great work!", emoji: "💪", color: "text-amber-500" };
  if (pct > 0) return { text: "Good start! Stay consistent.", emoji: "🌱", color: "text-emerald-500" };
  return { text: "Let's make today count!", emoji: "✨", color: "text-muted-foreground" };
}

function DayHeader() {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const { habits, isCompletedToday } = useHabitStore();
  const completed = habits.filter((h) => isCompletedToday(h.id)).length;
  const total = habits.length;
  const allDone = completed === total && total > 0;
  const msg = getMotivationalMessage(completed, total);

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            {date}
          </p>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{dayName}</h1>
          {msg && (
            <p className={cn("text-sm mt-1 flex items-center gap-1.5", msg.color)}>
              <span>{msg.emoji}</span>
              {msg.text}
            </p>
          )}
        </div>

        <div className="text-right shrink-0">
          <p className="text-2xl sm:text-3xl font-black tabular-nums">
            <span className={allDone ? "text-primary" : ""}>{completed}</span>
            <span className="text-muted-foreground text-lg sm:text-xl">/{total}</span>
          </p>
          <p className="text-xs text-muted-foreground">habits done</p>
        </div>
      </div>

      <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: total > 0 ? `${(completed / total) * 100}%` : "0%" }}
        />
      </div>

    </div>
  );
}

function StreakLeaders() {
  const { habits, completions } = useHabitStore();

  const leaders = useMemo(() => {
    return habits
      .map((h) => ({ ...h, streak: getStreak(completions[h.id] ?? {}) }))
      .filter((h) => h.streak > 0)
      .sort((a, b) => b.streak - a.streak)
      .slice(0, 5);
  }, [habits, completions]);

  if (leaders.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="size-4 text-orange-500" />
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Active Streaks
        </p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {leaders.map((habit) => (
          <div
            key={habit.id}
            className="flex flex-col items-center gap-1.5 shrink-0 p-3 rounded-xl border bg-card min-w-[80px]"
          >
            <span className="text-2xl">{habit.icon}</span>
            <p className="text-[11px] font-semibold text-center truncate w-full leading-tight">
              {habit.name}
            </p>
            <div className="flex items-center gap-1">
              <Flame className="size-3 text-orange-500" />
              <span className="text-xs font-bold text-orange-500">{habit.streak}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HabitRow({ habitId }: { habitId: string }) {
  const { habits, completions, toggleCompletion, isCompletedToday, selectedHabitId } = useHabitStore();
  const habit = habits.find((h) => h.id === habitId);
  const rowRef = useRef<HTMLDivElement>(null);
  const isSelected = selectedHabitId === habitId;

  useEffect(() => {
    if (isSelected && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isSelected]);

  if (!habit) return null;

  const history = completions[habit.id] ?? {};
  const today = getTodayString();
  const isCompleted = isCompletedToday(habit.id);
  const streak = getStreak(history);
  const rate = getCompletionRate(history, 30);
  const colors = HABIT_COLORS[habit.color];

  const last7: boolean[] = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const s = d.toISOString().split("T")[0];
      return s === today ? isCompleted : !!history[s];
    });
  }, [history, today, isCompleted]);

  return (
    <div
      ref={rowRef}
      className={cn(
        "rounded-2xl border p-4 sm:p-5 transition-all duration-200 overflow-hidden",
        isCompleted ? "bg-card opacity-70" : "bg-card",
        isSelected && "ring-2 ring-primary/40"
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <button
          onClick={() => toggleCompletion(habit.id, today)}
          className={cn(
            "size-10 sm:size-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-all duration-200 border-2",
            isCompleted
              ? "border-transparent"
              : "border-dashed border-muted-foreground/30 hover:border-muted-foreground/60"
          )}
          style={isCompleted ? { backgroundColor: colors.light } : {}}
        >
          {isCompleted ? (
            <Check className="size-5 text-white" strokeWidth={3} />
          ) : (
            habit.icon
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3
              className={cn(
                "text-sm font-semibold",
                isCompleted && "line-through text-muted-foreground"
              )}
            >
              {habit.name}
            </h3>
            {streak > 0 && (
              <div className="flex items-center gap-1">
                <Flame className="size-3.5 text-orange-500" />
                <span className="text-xs font-semibold text-orange-500">{streak}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              {last7.map((done, i) => (
                <div
                  key={i}
                  className="size-2 rounded-full transition-all"
                  style={
                    done
                      ? { backgroundColor: colors.light, opacity: 0.85 }
                      : { backgroundColor: "currentColor", opacity: 0.15 }
                  }
                />
              ))}
              <span className="text-xs text-muted-foreground ml-0.5">7d</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="size-3" />
              <span>{rate}% / 30d</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground font-medium">30d</span>
          <div className="flex items-end gap-[2px] h-6">
            {Array.from({ length: 8 }, (_, i) => {
              const weekStart = new Date();
              weekStart.setDate(weekStart.getDate() - (7 - i) * 4);
              let count = 0;
              for (let j = 0; j < 4; j++) {
                const d = new Date(weekStart);
                d.setDate(weekStart.getDate() + j);
                const s = d.toISOString().split("T")[0];
                if (history[s]) count++;
              }
              const h = Math.max(2, Math.round((count / 4) * 20));
              return (
                <div
                  key={i}
                  className="w-1 rounded-full transition-all"
                  style={{
                    height: `${h}px`,
                    backgroundColor: count > 0 ? colors.light : "currentColor",
                    opacity: count > 0 ? 0.7 : 0.15,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto flex justify-center">
        <ContributionHeatmap history={history} color={habit.color} compact />
      </div>
    </div>
  );
}

export function TodayView() {
  const { habits } = useHabitStore();
  const allDone = habits.length > 0 && habits.every((h) => h.id);

  return (
    <div className="flex flex-col gap-4">
      <DayHeader />
      <StreakLeaders />

      {habits.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sprout className="size-8 text-primary" />
          </div>
          <div>
            <p className="text-base font-semibold">No habits yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Start tracking your first habit and build consistency day by day.
            </p>
          </div>
          <AddHabitDialog>
            <Button className="gap-2 rounded-full">
              <Plus className="size-4" />
              Add your first habit
            </Button>
          </AddHabitDialog>
        </div>
      ) : (
        <>
          {habits.map((habit) => (
            <HabitRow key={habit.id} habitId={habit.id} />
          ))}
          {allDone && habits.every((h) => h.id) && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20 mt-2">
              <PartyPopper className="size-5 text-primary shrink-0" />
              <p className="text-sm font-medium text-primary">
                All habits tracked for today — great job!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
