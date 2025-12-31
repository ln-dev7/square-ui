"use client";

import {
  Star,
  MoreVertical,
  Share2,
  FolderOpen,
  Clock,
  Users,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFilesStore } from "@/store/files-store";
import { FileIcon } from "./file-icon";
import { cn } from "@/lib/utils";
import { ViewType } from "./content";

interface FileListProps {
  view: ViewType;
  folderId?: string;
}

export function FileList({ view, folderId }: FileListProps) {
  const {
    viewMode,
    toggleStarred,
    getFilteredFiles,
    getStarredFiles,
    getRecentFiles,
    getSharedFiles,
    getFilesByFolder,
  } = useFilesStore();

  let files = getFilteredFiles();
  let title = "All Files";

  if (view === "starred") {
    files = getStarredFiles();
    title = "Starred Files";
  } else if (view === "recent") {
    files = getRecentFiles();
    title = "Recent Files";
  } else if (view === "shared") {
    files = getSharedFiles();
    title = "Shared Files";
  } else if (view === "trash") {
    files = [];
    title = "Trash";
  } else if (view === "folder" && folderId) {
    files = getFilesByFolder(folderId);
    title = "Folder";
  }

  if (files.length === 0) {
    const emptyStates = {
      starred: {
        icon: Star,
        title: "No starred files",
        description: "Star important files to find them quickly",
      },
      recent: {
        icon: Clock,
        title: "No recent files",
        description: "Files you open will appear here",
      },
      shared: {
        icon: Users,
        title: "No shared files",
        description: "Files shared with you will appear here",
      },
      trash: {
        icon: Trash2,
        title: "Trash is empty",
        description: "Deleted files will appear here for 30 days",
      },
      default: {
        icon: FolderOpen,
        title: "This folder is empty",
        description: "Upload files or drag and drop them here",
      },
    };

    const state =
      emptyStates[view as keyof typeof emptyStates] || emptyStates.default;
    const Icon = state.icon;

    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Icon className="size-7 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-lg mb-1">{state.title}</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          {state.description}
        </p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <TooltipProvider>
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <FileIcon type={file.type} />
                  <div className="flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "size-7 transition-opacity",
                            file.starred
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStarred(file.id);
                          }}
                        >
                          <Star
                            className={cn(
                              "size-4",
                              file.starred && "fill-amber-400 text-amber-400"
                            )}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {file.starred
                          ? "Remove from starred"
                          : "Add to starred"}
                      </TooltipContent>
                    </Tooltip>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="font-medium text-sm truncate mb-0.5">
                  {file.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{file.size}</span>
                  {file.shared && <Share2 className="size-3" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="hidden sm:grid grid-cols-[1fr_100px_100px_100px_70px] gap-4 px-4 py-3 border-b bg-muted/50 text-xs font-medium text-muted-foreground">
            <span>Name</span>
            <span>Size</span>
            <span>Modified</span>
            <span>Created</span>
            <span></span>
          </div>
          <div className="divide-y">
            {files.map((file) => (
              <div
                key={file.id}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_100px_100px_100px_70px] gap-2 sm:gap-4 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer group items-center"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileIcon type={file.type} size="sm" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground sm:hidden">
                      {file.size} · {file.modifiedAt}
                    </p>
                  </div>
                  {file.shared && (
                    <Share2 className="size-3.5 text-muted-foreground shrink-0 hidden sm:block" />
                  )}
                </div>
                <span className="hidden sm:block text-sm text-muted-foreground">
                  {file.size}
                </span>
                <span className="hidden sm:block text-sm text-muted-foreground">
                  {file.modifiedAt}
                </span>
                <span className="hidden sm:block text-sm text-muted-foreground">
                  {file.createdAt}
                </span>
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "size-7 transition-opacity",
                          file.starred
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStarred(file.id);
                        }}
                      >
                        <Star
                          className={cn(
                            "size-4",
                            file.starred && "fill-amber-400 text-amber-400"
                          )}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {file.starred ? "Remove from starred" : "Add to starred"}
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
