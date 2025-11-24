"use client";

import { LayoutGrid, List, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabType = "board" | "list" | "timeline";

interface ProjectsTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function ProjectsTabs({ activeTab, onTabChange }: ProjectsTabsProps) {
  const tabs = [
    { id: "board" as TabType, label: "Board", icon: LayoutGrid },
    { id: "list" as TabType, label: "List", icon: List },
    { id: "timeline" as TabType, label: "Timeline", icon: CalendarIcon },
  ];

  const tabPositions = {
    board: 0,
    list: 94,
    timeline: 200,
  };

  return (
    <div className="relative border-b bg-background">
      <div className="px-3 md:px-6 py-3">
        <div className="flex items-center gap-4 md:gap-8 relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={cn(
                  "relative h-auto p-0 gap-2 font-medium",
                  isActive
                    ? "text-primary hover:text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon className="size-5" />
                <span className="text-sm">{tab.label}</span>
              </Button>
            );
          })}
          <div
            className="absolute bottom-0 h-0.5 bg-primary transition-all duration-200"
            style={{
              left: `${tabPositions[activeTab]}px`,
              width: "80px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

