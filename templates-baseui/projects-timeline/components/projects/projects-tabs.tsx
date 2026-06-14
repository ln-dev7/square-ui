"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  LeftToRightListBulletIcon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabType = "board" | "list" | "timeline";

interface ProjectsTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function ProjectsTabs({ activeTab, onTabChange }: ProjectsTabsProps) {
  const tabs: { id: TabType; label: string; icon: IconSvgElement }[] = [
    { id: "board", label: "Board", icon: DashboardSquare01Icon },
    { id: "list", label: "List", icon: LeftToRightListBulletIcon },
    { id: "timeline", label: "Timeline", icon: Calendar03Icon },
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
                <HugeiconsIcon icon={tab.icon} className="size-5" />
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
