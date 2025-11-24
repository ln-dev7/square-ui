"use client";

import { useState } from "react";
import { Settings2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useProjectsStore } from "@/store/projects-store";

export function ProjectsCustomize() {
  const [open, setOpen] = useState(false);
  const { showAvatars, showPriority, setShowAvatars, setShowPriority } =
    useProjectsStore();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 h-8">
          <Settings2 className="size-4" />
          <span className="text-xs">Customize</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3">Display Options</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="avatars" className="text-sm font-normal">
                  Show Avatars
                </Label>
                <Switch
                  id="avatars"
                  checked={showAvatars}
                  onCheckedChange={setShowAvatars}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="priority" className="text-sm font-normal">
                  Show Priority
                </Label>
                <Switch
                  id="priority"
                  checked={showPriority}
                  onCheckedChange={setShowPriority}
                />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
