"use client";

import { dashboardStats } from "@/mock-data/dashboard";
import {
  DollarSign,
  Users,
  MessageSquare,
  Building,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Generated Revenue",
    value: dashboardStats.generatedRevenue.value,
    change: dashboardStats.generatedRevenue.change,
    icon: DollarSign,
    trend: "up" as const,
  },
  {
    title: "Signed Clients",
    value: dashboardStats.signedClients.value,
    change: dashboardStats.signedClients.change,
    icon: Users,
    trend: "down" as const,
  },
  {
    title: "Total Leads",
    value: dashboardStats.totalLeads.value,
    change: dashboardStats.totalLeads.change,
    icon: MessageSquare,
    trend: "up" as const,
  },
  {
    title: "Team Members",
    value: dashboardStats.teamMembers.value,
    extra: { active: dashboardStats.teamMembers.activeCount },
    icon: Building,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card text-card-foreground rounded-xl border p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">{stat.title}</span>
            <stat.icon className="size-4 text-muted-foreground" />
          </div>

          <div className="bg-muted/50 dark:bg-neutral-800/50 border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-medium tracking-tight">
                {stat.value}
              </span>

              <div className="flex items-center gap-3">
                <div className="h-9 w-px bg-border" />

                {stat.change !== undefined && stat.trend ? (
                  <div
                    className={cn(
                      "flex items-center gap-1.5",
                      stat.trend === "up" ? "text-green-400" : "text-pink-400"
                    )}
                    style={{
                      textShadow:
                        stat.trend === "up"
                          ? "0 1px 6px rgba(68, 255, 118, 0.25)"
                          : "0 1px 6px rgba(255, 68, 193, 0.25)",
                    }}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="size-3.5" />
                    ) : (
                      <TrendingDown className="size-3.5" />
                    )}
                    <span className="text-sm font-medium">{stat.change}%</span>
                  </div>
                ) : stat.extra ? (
                  <div className="text-sm font-medium">
                    <span className="text-foreground">{stat.extra.active}</span>{" "}
                    <span className="text-muted-foreground">Active</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
