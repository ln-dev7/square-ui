"use client";

import { Coins, Package, Users, MessageCircle } from "lucide-react";

const statsData = [
  {
    title: "Product Revenue",
    value: "$10,312.10",
    change: "+20%",
    changeValue: "($2,423)",
    isPositive: true,
    icon: Coins,
  },
  {
    title: "Total Sales Product",
    value: "224",
    change: "+20%",
    changeValue: "(84)",
    isPositive: true,
    icon: Package,
  },
  {
    title: "Total Deals",
    value: "3,612",
    change: "-15%",
    changeValue: "(134)",
    isPositive: false,
    icon: Users,
  },
  {
    title: "Convo Rate",
    value: "67%",
    change: "-12%",
    changeValue: "",
    isPositive: false,
    icon: MessageCircle,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 rounded-xl border bg-card">
      {statsData.map((stat, index) => (
        <div key={stat.title} className="flex items-start">
          <div className="flex-1 space-y-2 sm:space-y-4 lg:space-y-6">
            <div className="flex items-center gap-1 sm:gap-1.5 text-muted-foreground">
              <stat.icon className="size-3.5 sm:size-[18px]" />
              <span className="text-[10px] sm:text-xs lg:text-sm font-medium truncate">{stat.title}</span>
            </div>
            <p className="text-lg sm:text-xl lg:text-[28px] font-semibold leading-tight tracking-tight">
              {stat.value}
            </p>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs lg:text-sm font-medium">
              <span
                className={stat.isPositive ? "text-emerald-600" : "text-red-600"}
              >
                {stat.change}
                <span className="hidden sm:inline">{stat.changeValue}</span>
              </span>
              <span className="text-muted-foreground hidden sm:inline">vs Last Months</span>
            </div>
          </div>
          {index < statsData.length - 1 && (
            <div className="hidden lg:block w-px h-full bg-border mx-4 xl:mx-6" />
          )}
        </div>
      ))}
    </div>
  );
}
