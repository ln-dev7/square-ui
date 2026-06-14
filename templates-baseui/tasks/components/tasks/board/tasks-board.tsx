"use client";

import { useMemo } from "react";
import { useTasksStore } from "@/store/tasks-store";
import { statuses } from "@/mock-data/statuses";
import { TaskColumn } from "./task-column";
import { Task } from "@/mock-data/tasks";

export function TasksBoard() {
  const tasks = useTasksStore((state) => state.tasks);
  const searchQuery = useTasksStore((state) => state.searchQuery);
  const priorityFilter = useTasksStore((state) => state.priorityFilter);

  const tasksByStatus = useMemo(() => {
    let filtered = tasks;

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.project.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priorityFilter) {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    return statuses.reduce<Record<string, Task[]>>((acc, status) => {
      acc[status.id] = filtered.filter((task) => task.status.id === status.id);
      return acc;
    }, {});
  }, [tasks, searchQuery, priorityFilter]);

  return (
    <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 px-4 sm:px-6">
      {statuses.map((status) => (
        <div key={status.id} className="flex gap-4">
          <TaskColumn status={status} tasks={tasksByStatus[status.id] || []} />
        </div>
      ))}
    </div>
  );
}
