"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProjectsHeader() {
  return (
    <div className="border-b bg-sidebar px-6 py-2 w-full">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your all employee
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <Avatar
                key={i}
                className="size-7 border-2 border-background"
              >
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/glass/svg?seed=user${i}`}
                />
                <AvatarFallback>U{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

