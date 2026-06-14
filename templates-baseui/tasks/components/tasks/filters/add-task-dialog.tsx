"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { useTasksStore } from "@/store/tasks-store";
import { statuses } from "@/mock-data/statuses";
import { users } from "@/mock-data/users";

export function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [statusId, setStatusId] = useState("draft");
  const [priority, setPriority] = useState<"low" | "medium" | "urgent">("medium");
  const { addTask } = useTasksStore();

  const handleSubmit = () => {
    if (!title.trim() || !project.trim()) return;

    const status = statuses.find((s) => s.id === statusId) || statuses[0];

    addTask({
      id: Date.now().toString(),
      title: title.trim(),
      project: project.trim(),
      status,
      assignees: [users[0]],
      priority,
      dueDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
      }),
      comments: 0,
      attachments: 0,
    });

    setTitle("");
    setProject("");
    setStatusId("draft");
    setPriority("medium");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="h-9 gap-2">
            <HugeiconsIcon icon={Add01Icon} className="size-4" />
            <span className="text-xs">Add New</span>
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-xs">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="text-xs"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project" className="text-xs">
              Project
            </Label>
            <Input
              id="project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Enter project name..."
              className="text-xs"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status" className="text-xs">
              Status
            </Label>
            <Select value={statusId} onValueChange={(v) => v && setStatusId(v)}>
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.id} className="text-xs">
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority" className="text-xs">
              Priority
            </Label>
            <Select
              value={priority}
              onValueChange={(v) => v && setPriority(v as "low" | "medium" | "urgent")}
            >
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low" className="text-xs">
                  Low
                </SelectItem>
                <SelectItem value="medium" className="text-xs">
                  Medium
                </SelectItem>
                <SelectItem value="urgent" className="text-xs">
                  Urgent
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="text-xs">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="text-xs">
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
