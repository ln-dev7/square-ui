"use client";

import { useMemo } from "react";
import { startOfWeek, addDays, eachDayOfInterval, isSameDay } from "date-fns";
import { Search, Triangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProjectsStore } from "@/store/projects-store";
import { ProjectCard } from "./project-card";
import { ProjectsFilter } from "./projects-filter";
import { ProjectsCustomize } from "./projects-customize";
import { DateNavigation } from "./date-navigation";
import { TimelineWeekHeader } from "./timeline-week-header";
import { TimelineEmptyPattern } from "./timeline-empty-pattern";

export function ProjectsTimeline() {
  const {
    searchQuery,
    setSearchQuery,
    filteredProjects,
    currentWeekStart,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    goToDate,
  } = useProjectsStore();

  const currentWeek = useMemo(() => {
    const weekStart = startOfWeek(currentWeekStart, { weekStartsOn: 1 });
    return eachDayOfInterval({
      start: weekStart,
      end: addDays(weekStart, 6),
    });
  }, [currentWeekStart]);

  const today = new Date();
  const todayIndex = currentWeek.findIndex((day) => isSameDay(day, today));

  const projects = filteredProjects();
  const columnWidth = 162;
  const cardHeight = 108;
  const gapBetweenCards = 30;
  const horizontalPadding = 20;

  interface ProjectInfo {
    project: (typeof projects)[0];
    startIndex: number;
    endIndex: number;
    spanDays: number;
  }

  interface ProjectRow {
    projects: ProjectInfo[];
  }

  const projectRows = useMemo(() => {
    const projectsWithPositions: ProjectInfo[] = [];

    projects.forEach((project) => {
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.endDate);

      const startIndex = currentWeek.findIndex((day) =>
        isSameDay(day, startDate)
      );
      const endIndex = currentWeek.findIndex((day) => isSameDay(day, endDate));

      if (startIndex === -1 && endIndex === -1) {
        const startBeforeWeek = startDate < currentWeek[0];
        const endAfterWeek = endDate > currentWeek[currentWeek.length - 1];

        if (startBeforeWeek && endAfterWeek) {
          projectsWithPositions.push({
            project,
            startIndex: 0,
            endIndex: currentWeek.length - 1,
            spanDays: currentWeek.length,
          });
        }
        return;
      }

      const actualStartIndex = startIndex === -1 ? 0 : startIndex;
      const actualEndIndex =
        endIndex === -1 ? currentWeek.length - 1 : endIndex;
      const spanDays = actualEndIndex - actualStartIndex + 1;

      projectsWithPositions.push({
        project,
        startIndex: actualStartIndex,
        endIndex: actualEndIndex,
        spanDays,
      });
    });

    projectsWithPositions.sort((a, b) => {
      if (a.startIndex !== b.startIndex) {
        return a.startIndex - b.startIndex;
      }
      return a.endIndex - b.endIndex;
    });

    const hasHorizontalOverlap = (
      pos1: { startIndex: number; endIndex: number },
      pos2: { startIndex: number; endIndex: number }
    ): boolean => {
      return (
        pos1.startIndex <= pos2.endIndex && pos1.endIndex >= pos2.startIndex
      );
    };

    const rows: ProjectRow[] = [];

    projectsWithPositions.forEach((projectPos) => {
      let placed = false;

      for (const row of rows) {
        const hasOverlap = row.projects.some((existingProject) =>
          hasHorizontalOverlap(projectPos, existingProject)
        );

        if (!hasOverlap) {
          row.projects.push(projectPos);
          placed = true;
          break;
        }
      }

      if (!placed) {
        rows.push({ projects: [projectPos] });
      }
    });

    return rows;
  }, [projects, currentWeek]);

  const weekStartDate = currentWeek[0];
  const weekEndDate = currentWeek[currentWeek.length - 1];

  return (
    <div className="flex flex-col gap-4 overflow-hidden w-full py-4 px-4.5 h-full">
      <div className="bg-background">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <ProjectsFilter />
            <ProjectsCustomize />
          </div>
        </div>
      </div>

      <div className="w-full flex-1 min-h-0">
        <div className="w-full rounded-2xl overflow-hidden border border-border h-full flex flex-col">
          <div className="border-b bg-background px-4 py-4 shrink-0">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 shadow-none"
                onClick={goToToday}
              >
                Today
              </Button>
              <DateNavigation
                startDate={weekStartDate}
                endDate={weekEndDate}
                onPrevious={goToPreviousWeek}
                onNext={goToNextWeek}
                onDateSelect={goToDate}
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0 overflow-auto w-full relative">
            <TimelineWeekHeader weekDays={currentWeek} />

            <div className="relative py-6 w-max min-w-full">
              {projectRows.length === 0 && <TimelineEmptyPattern />}

              {todayIndex !== -1 && (
                <div
                  className="absolute z-20 pointer-events-none"
                  style={{
                    left: `${todayIndex * columnWidth + columnWidth / 2}px`,
                    top: 0,
                    bottom: 0,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 top-0">
                    <Triangle
                      className="size-4 text-[#9971F0] rotate-180"
                      fill="#9971F0"
                    />
                  </div>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-[8px] bottom-0 w-[3px]"
                    style={{ backgroundColor: "#9971F0" }}
                  />
                </div>
              )}

              <div
                className="grid w-full flex-1"
                style={{
                  gridTemplateColumns: `repeat(7, ${columnWidth}px)`,
                  gridAutoRows: `${cardHeight}px`,
                  gap: `${gapBetweenCards}px 0`,
                }}
              >
                {projectRows.map((row, rowIndex) =>
                  row.projects.map((projectInfo) => {
                    const startCol = projectInfo.startIndex + 1;
                    const endCol = projectInfo.endIndex + 2;

                    return (
                      <div
                        key={projectInfo.project.id}
                        className="relative"
                        style={{
                          gridColumn: `${startCol} / ${endCol}`,
                          gridRow: rowIndex + 1,
                          paddingLeft: `${horizontalPadding}px`,
                          paddingRight: `${horizontalPadding}px`,
                        }}
                      >
                        <ProjectCard project={projectInfo.project} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
