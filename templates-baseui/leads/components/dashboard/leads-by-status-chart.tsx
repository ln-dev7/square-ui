"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notification01Icon,
  MoreHorizontalIcon,
  ArrowDown01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";

type Period = "month" | "quarter" | "6months" | "year";
type SortBy = "value_desc" | "value_asc" | "name_asc" | "name_desc";

interface StatusData {
  name: string;
  value: number;
  color: string;
}

const periodData: Record<
  Period,
  {
    total: number;
    totalChange: number;
    totalChangeValue: number;
    data: StatusData[];
  }
> = {
  month: {
    total: 3612,
    totalChange: 20,
    totalChangeValue: 244,
    data: [
      { name: "New Leads", value: 1420, color: "#375dfb" },
      { name: "Contacted", value: 980, color: "#6985fc" },
      { name: "Qualified", value: 620, color: "#9baefd" },
      { name: "Negotiation", value: 280, color: "#7f69fc" },
      { name: "Inactive", value: 190, color: "#aa9bfd" },
      { name: "Recycled", value: 122, color: "#b069fc" },
    ],
  },
  quarter: {
    total: 9840,
    totalChange: 15,
    totalChangeValue: 620,
    data: [
      { name: "New Leads", value: 3800, color: "#375dfb" },
      { name: "Contacted", value: 2650, color: "#6985fc" },
      { name: "Qualified", value: 1720, color: "#9baefd" },
      { name: "Negotiation", value: 780, color: "#7f69fc" },
      { name: "Inactive", value: 520, color: "#aa9bfd" },
      { name: "Recycled", value: 370, color: "#b069fc" },
    ],
  },
  "6months": {
    total: 18650,
    totalChange: 18,
    totalChangeValue: 1240,
    data: [
      { name: "New Leads", value: 7200, color: "#375dfb" },
      { name: "Contacted", value: 5100, color: "#6985fc" },
      { name: "Qualified", value: 3250, color: "#9baefd" },
      { name: "Negotiation", value: 1500, color: "#7f69fc" },
      { name: "Inactive", value: 980, color: "#aa9bfd" },
      { name: "Recycled", value: 620, color: "#b069fc" },
    ],
  },
  year: {
    total: 42300,
    totalChange: 25,
    totalChangeValue: 3200,
    data: [
      { name: "New Leads", value: 16500, color: "#375dfb" },
      { name: "Contacted", value: 11200, color: "#6985fc" },
      { name: "Qualified", value: 7400, color: "#9baefd" },
      { name: "Negotiation", value: 3800, color: "#7f69fc" },
      { name: "Inactive", value: 2100, color: "#aa9bfd" },
      { name: "Recycled", value: 1300, color: "#b069fc" },
    ],
  },
};

const periodLabels: Record<Period, string> = {
  month: "This Month",
  quarter: "Last 3 Months",
  "6months": "Last 6 Months",
  year: "Last 12 Months",
};

export function LeadsByStatusChart() {
  const [period, setPeriod] = useState<Period>("month");
  const [sortBy, setSortBy] = useState<SortBy>("value_desc");
  const [visibleStatuses, setVisibleStatuses] = useState<
    Record<string, boolean>
  >({
    "New Leads": true,
    Contacted: true,
    Qualified: true,
    Negotiation: true,
    Inactive: true,
    Recycled: true,
  });

  const currentData = periodData[period];

  const filteredAndSortedData = useMemo(() => {
    let data = currentData.data.filter((item) => visibleStatuses[item.name]);

    switch (sortBy) {
      case "value_desc":
        data = [...data].sort((a, b) => b.value - a.value);
        break;
      case "value_asc":
        data = [...data].sort((a, b) => a.value - b.value);
        break;
      case "name_asc":
        data = [...data].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        data = [...data].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return data;
  }, [currentData.data, sortBy, visibleStatuses]);

  const maxValue = useMemo(() => {
    return Math.max(...filteredAndSortedData.map((d) => d.value), 1);
  }, [filteredAndSortedData]);

  const visibleTotal = useMemo(() => {
    return filteredAndSortedData.reduce((sum, item) => sum + item.value, 0);
  }, [filteredAndSortedData]);

  const toggleStatus = (statusName: string) => {
    setVisibleStatuses((prev) => ({
      ...prev,
      [statusName]: !prev[statusName],
    }));
  };

  const resetToDefault = () => {
    setPeriod("month");
    setSortBy("value_desc");
    setVisibleStatuses({
      "New Leads": true,
      Contacted: true,
      Qualified: true,
      Negotiation: true,
      Inactive: true,
      Recycled: true,
    });
  };

  return (
    <div className="bg-card text-card-foreground rounded-xl border w-full xl:w-[337px] shrink-0">
      <div className="flex flex-row items-center justify-between py-5 px-5">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="size-8">
            <HugeiconsIcon icon={Notification01Icon} className="size-4 text-muted-foreground" />
          </Button>
          <h3 className="font-medium text-sm sm:text-base">Leads by Status</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="size-8">
                <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4 text-muted-foreground" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={Settings01Icon} className="size-4 mr-2" />
                Time Period
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {(Object.keys(periodLabels) as Period[]).map((p) => (
                  <DropdownMenuItem key={p} onClick={() => setPeriod(p)}>
                    {periodLabels[p]} {period === p && "✓"}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 mr-2" />
                Sort By
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setSortBy("value_desc")}>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 mr-2" />
                  Value (High to Low) {sortBy === "value_desc" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("value_asc")}>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 mr-2 rotate-180" />
                  Value (Low to High) {sortBy === "value_asc" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name_asc")}>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 mr-2" />
                  Name (A to Z) {sortBy === "name_asc" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name_desc")}>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 mr-2 rotate-180" />
                  Name (Z to A) {sortBy === "name_desc" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={Notification01Icon} className="size-4 mr-2" />
                Show Statuses
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {currentData.data.map((item) => (
                  <DropdownMenuCheckboxItem
                    key={item.name}
                    checked={visibleStatuses[item.name]}
                    onCheckedChange={() => toggleStatus(item.name)}
                  >
                    <span
                      className="size-2 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={resetToDefault}>
              Reset to Default
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-5 pb-5 space-y-6 sm:space-y-8">
        <div className="flex items-end gap-2">
          <span className="text-2xl sm:text-[28px] font-semibold tracking-tight">
            {visibleTotal.toLocaleString()}
          </span>
          <div className="flex items-center gap-2 text-xs sm:text-sm pb-1">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              +{currentData.totalChange}%({currentData.totalChangeValue})
            </span>
            <span className="text-muted-foreground hidden sm:inline">
              vs Last Months
            </span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredAndSortedData.map((item) => (
            <div key={item.name} className="flex items-center gap-3 sm:gap-4">
              <span className="text-xs text-muted-foreground w-16 sm:w-[62px] shrink-0 truncate">
                {item.name}
              </span>
              <div className="flex-1 h-[15px] bg-muted rounded">
                <div
                  className="h-full rounded transition-all duration-300"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
              <span className="text-xs font-semibold w-10 sm:w-[30px] text-right shrink-0">
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
