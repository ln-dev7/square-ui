"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";

const sharedUsers = [
  { name: "Sarah Chen", avatar: "sarah", initials: "SC" },
  { name: "Alex Kim", avatar: "alex", initials: "AK" },
  { name: "Marie Dupont", avatar: "marie", initials: "MD" },
  { name: "John Doe", avatar: "john", initials: "JD" },
  { name: "Emma Wilson", avatar: "emma", initials: "EW" },
];

export function SharedWithMe() {
  return (
    <TooltipProvider>
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm">Team Members</h3>
          <span className="text-xs text-muted-foreground">
            {sharedUsers.length} people
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {sharedUsers.slice(0, 4).map((user) => (
              <Tooltip key={user.name}>
                <TooltipTrigger asChild>
                  <Avatar className="size-8 border-2 border-card cursor-pointer hover:z-10 transition-transform hover:scale-110">
                    <AvatarImage
                      src={`https://api.dicebear.com/9.x/glass/svg?seed=${user.avatar}`}
                    />
                    <AvatarFallback className="text-[10px]">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{user.name}</TooltipContent>
              </Tooltip>
            ))}
            {sharedUsers.length > 4 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="size-8 rounded-full border-2 border-card bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    <span className="text-xs font-medium text-muted-foreground">
                      +{sharedUsers.length - 4}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {sharedUsers
                    .slice(4)
                    .map((u) => u.name)
                    .join(", ")}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <Button variant="outline" size="icon" className="size-8 ml-2">
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}

