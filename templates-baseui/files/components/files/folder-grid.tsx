"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Folder01Icon, MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useFilesStore } from "@/store/files-store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FolderGrid() {
  const { folders } = useFilesStore();
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">Folders</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/folder/${folder.id}`}
            className={cn(
              "p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all cursor-pointer group block"
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="size-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${folder.color}15` }}
              >
                <HugeiconsIcon
                  icon={Folder01Icon}
                  className="size-5"
                  style={{ color: folder.color }}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={(e) => e.preventDefault()}
                    >
                      <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Open</DropdownMenuItem>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="font-medium text-sm truncate mb-0.5">{folder.name}</p>
            <p className="text-xs text-muted-foreground">
              {folder.filesCount} files · {folder.size}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

