"use client";

import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Trophy, Star, User, MoreHorizontal } from "lucide-react";
import { topPerformers } from "@/mock-data/dashboard";
import { cn } from "@/lib/utils";

type SortBy = "score_desc" | "score_asc" | "name_asc" | "name_desc";
type Period = "week" | "month" | "quarter" | "year";

const periodLabels: Record<Period, string> = {
  week: "This Week",
  month: "This Month",
  quarter: "This Quarter",
  year: "This Year",
};

const barStyles = [
  {
    borderColor: "border-pink-500",
    bgGradient:
      "bg-linear-to-r from-pink-500/40 via-pink-500/20 to-transparent",
    isDashed: false,
  },
  {
    borderColor: "border-cyan-400",
    bgGradient:
      "bg-linear-to-r from-cyan-400/30 via-cyan-400/15 to-transparent",
    isDashed: true,
  },
  {
    borderColor: "border-green-400",
    bgGradient:
      "bg-linear-to-r from-green-400/30 via-green-400/15 to-transparent",
    isDashed: true,
  },
  {
    borderColor: "border-amber-400",
    bgGradient:
      "bg-linear-to-r from-amber-400/30 via-amber-400/15 to-transparent",
    isDashed: true,
  },
  {
    borderColor: "border-purple-400",
    bgGradient:
      "bg-linear-to-r from-purple-400/30 via-purple-400/15 to-transparent",
    isDashed: true,
  },
  {
    borderColor: "border-rose-400",
    bgGradient:
      "bg-linear-to-r from-rose-400/30 via-rose-400/15 to-transparent",
    isDashed: true,
  },
];

export function TopPerformers() {
  const [sortBy, setSortBy] = useState<SortBy>("score_desc");
  const [period, setPeriod] = useState<Period>("month");

  const maxScore = useMemo(() => {
    return Math.max(...topPerformers.map((p) => p.score));
  }, []);

  const sortedPerformers = useMemo(() => {
    const performers = [...topPerformers];
    switch (sortBy) {
      case "score_desc":
        return performers.sort((a, b) => b.score - a.score);
      case "score_asc":
        return performers.sort((a, b) => a.score - b.score);
      case "name_asc":
        return performers.sort((a, b) => a.name.localeCompare(b.name));
      case "name_desc":
        return performers.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return performers;
    }
  }, [sortBy]);

  return (
    <div className="bg-card text-card-foreground rounded-lg border w-full lg:w-[332px] shrink-0">
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <h3 className="font-medium text-sm sm:text-base">Top Performers</h3>
        <div className="flex items-center gap-1">
          <Trophy className="size-4 text-muted-foreground" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Time Period</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {(Object.keys(periodLabels) as Period[]).map((p) => (
                    <DropdownMenuItem key={p} onClick={() => setPeriod(p)}>
                      {periodLabels[p]} {period === p && "✓"}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Sort By</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setSortBy("score_desc")}>
                    Score (High to Low) {sortBy === "score_desc" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("score_asc")}>
                    Score (Low to High) {sortBy === "score_asc" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name_asc")}>
                    Name (A to Z) {sortBy === "name_asc" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name_desc")}>
                    Name (Z to A) {sortBy === "name_desc" && "✓"}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("score_desc");
                  setPeriod("month");
                }}
              >
                Reset to Default
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {sortedPerformers.map((performer, index) => {
          const style = barStyles[index % barStyles.length];
          const progressWidth = (performer.score / maxScore) * 100;
          const isFirst = index === 0;

          return (
            <div key={performer.id} className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={performer.avatar} />
                <AvatarFallback>
                  {performer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <div
                  className={cn(
                    "relative h-[42px] rounded-lg border overflow-hidden",
                    style.borderColor,
                    style.isDashed ? "border-dashed" : "border-solid"
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      style.bgGradient
                    )}
                    style={{
                      width: `${Math.max(progressWidth, 30)}%`,
                    }}
                  />
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-card/90 dark:bg-neutral-900/90 border border-border rounded-md px-2 py-1 shadow-sm">
                    {isFirst ? (
                      <Star className="size-3.5 text-amber-400 fill-amber-400" />
                    ) : (
                      <User className="size-3.5 text-muted-foreground" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isFirst ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {performer.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
