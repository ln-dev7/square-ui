"use client";

import { useMemo } from "react";
import { Flame, Trophy, Target, TrendingUp, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ContributionHeatmap } from "@/components/habits/contribution-heatmap";
import { AddHabitDialog } from "@/components/habits/add-habit-dialog";

import { useHabitStore } from "@/store/habit-store";
import {
  HABIT_COLORS,
  getStreak,
  getCompletionRate,
} from "@/mock-data/habits";
import { cn } from "@/lib/utils";

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className={cn("size-7 rounded-lg flex items-center justify-center", color)}>
          <Icon className="size-3.5" />
        </div>
      </div>
      <p className="text-2xl font-black tabular-nums">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function WeeklyBars({
  history,
  color,
}: {
  history: Record<string, boolean>;
  color: string;
}) {
  const weeks = useMemo(() => {
    return Array.from({ length: 12 }, (_, wi) => {
      const weekNum = 11 - wi;
      let count = 0;
      for (let d = 0; d < 7; d++) {
        const date = new Date();
        date.setDate(date.getDate() - weekNum * 7 - d);
        const s = date.toISOString().split("T")[0];
        if (history[s]) count++;
      }
      return { count, weekNum };
    }).reverse();
  }, [history]);

  const max = Math.max(...weeks.map((w) => w.count), 1);

  return (
    <div className="flex items-end gap-1 h-10">
      {weeks.map(({ count, weekNum }) => (
        <div
          key={weekNum}
          className="flex-1 rounded-sm transition-all"
          style={{
            height: `${Math.max(4, (count / max) * 40)}px`,
            backgroundColor: color,
            opacity: count > 0 ? 0.4 + (count / max) * 0.6 : 0.1,
          }}
        />
      ))}
    </div>
  );
}

function DayOfWeekChart({
  history,
  color,
}: {
  history: Record<string, boolean>;
  color: string;
}) {
  const data = useMemo(() => {
    const counts = Array(7).fill(0);
    const totals = Array(7).fill(0);
    for (const [dateStr, done] of Object.entries(history)) {
      const day = new Date(dateStr + "T00:00:00").getDay();
      totals[day]++;
      if (done) counts[day]++;
    }
    return counts.map((c, i) =>
      totals[i] > 0 ? Math.round((c / totals[i]) * 100) : 0
    );
  }, [history]);

  const max = Math.max(...data, 1);

  return (
    <div className="flex items-end gap-2 h-16">
      {data.map((rate, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex-1 flex items-end">
            <div
              className="w-full rounded-t-sm transition-all"
              style={{
                height: `${Math.max(4, (rate / max) * 56)}px`,
                backgroundColor: color,
                opacity: rate > 0 ? 0.3 + (rate / max) * 0.7 : 0.1,
              }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground leading-none">
            {DAYS_SHORT[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function StatsView() {
  const { habits, completions } = useHabitStore();

  const globalStats = useMemo(() => {
    let totalDays = 0;
    let completedDays = 0;
    let bestStreak = 0;

    for (const habit of habits) {
      const history = completions[habit.id] ?? {};
      const streak = getStreak(history);
      if (streak > bestStreak) bestStreak = streak;
      const entries = Object.values(history);
      totalDays += entries.length;
      completedDays += entries.filter(Boolean).length;
    }

    return {
      completionRate:
        totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
      bestStreak,
      activeHabits: habits.length,
      totalCompleted: completedDays,
    };
  }, [habits, completions]);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
          Statistics
        </h1>
        <p className="text-sm text-muted-foreground">
          Your habit journey at a glance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Completion"
          value={`${globalStats.completionRate}%`}
          sub="all-time average"
          icon={TrendingUp}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          label="Best streak"
          value={`${globalStats.bestStreak}d`}
          sub="consecutive days"
          icon={Flame}
          color="bg-orange-500/10 text-orange-500"
        />
        <StatCard
          label="Active habits"
          value={globalStats.activeHabits}
          sub="being tracked"
          icon={Target}
          color="bg-sky-500/10 text-sky-500"
        />
        <StatCard
          label="Total done"
          value={globalStats.totalCompleted.toLocaleString()}
          sub="completions ever"
          icon={Trophy}
          color="bg-amber-500/10 text-amber-500"
        />
      </div>

      {habits.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
          <span className="text-4xl">📊</span>
          <p className="font-medium">No habits to analyse yet.</p>
          <AddHabitDialog>
            <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
              <Plus className="size-3.5" />
              Add a habit
            </Button>
          </AddHabitDialog>
        </div>
      ) : (
        <Tabs defaultValue={habits[0]?.id ?? ""} className="space-y-0">
          <div className="mb-5">
            <h2 className="text-sm font-bold mb-3">Per habit</h2>
            <TabsList className="h-auto gap-1 bg-transparent p-0 flex-nowrap w-full overflow-x-auto justify-start pb-1 scrollbar-none">
              {habits.map((habit) => (
                <TabsTrigger
                  key={habit.id}
                  value={habit.id}
                  className="gap-1.5 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg shrink-0"
                >
                  <span>{habit.icon}</span>
                  <span className="text-xs hidden sm:inline">{habit.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {habits.map((habit) => {
            const history = completions[habit.id] ?? {};
            const streak = getStreak(history);
            const rate30 = getCompletionRate(history, 30);
            const rate7 = getCompletionRate(history, 7);
            const colors = HABIT_COLORS[habit.color];

            return (
              <TabsContent
                key={habit.id}
                value={habit.id}
                className="mt-0 space-y-4"
              >
                <div className="flex items-center gap-4 p-4 rounded-2xl border bg-card">
                  <div
                    className="size-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ backgroundColor: colors.light + "22" }}
                  >
                    {habit.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold truncate">{habit.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Tracking since{" "}
                      {new Date(habit.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className="text-2xl font-black tabular-nums"
                      style={{ color: colors.light }}
                    >
                      {streak}
                    </p>
                    <p className="text-xs text-muted-foreground">day streak</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border bg-card p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Last 7 days
                    </p>
                    <p
                      className="text-2xl sm:text-3xl font-black"
                      style={{ color: colors.light }}
                    >
                      {rate7}%
                    </p>
                    <div className="mt-2">
                      <WeeklyBars history={history} color={colors.light} />
                    </div>
                  </div>
                  <div className="rounded-2xl border bg-card p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Last 30 days
                    </p>
                    <p
                      className="text-2xl sm:text-3xl font-black"
                      style={{ color: colors.light }}
                    >
                      {rate30}%
                    </p>
                    <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${rate30}%`,
                          backgroundColor: colors.light,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      completion rate
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border bg-card p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Best day of week
                  </p>
                  <DayOfWeekChart history={history} color={colors.light} />
                </div>

                <div className="rounded-2xl border bg-card p-4 sm:p-5 overflow-hidden">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Past year
                  </p>
                  <div className="overflow-x-auto">
                    <ContributionHeatmap history={history} color={habit.color} />
                  </div>
                  <div className="flex items-center gap-2 mt-3 justify-end">
                    <span className="text-xs text-muted-foreground">Less</span>
                    {[0.1, 0.3, 0.55, 0.75, 0.9].map((op, i) => (
                      <div
                        key={i}
                        className="size-3 rounded-sm"
                        style={{ backgroundColor: colors.light, opacity: op }}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground">More</span>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </div>
  );
}
