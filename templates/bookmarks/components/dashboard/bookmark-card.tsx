"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Pencil,
  Trash2,
  Tag,
  Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookmarksStore } from "@/store/bookmarks-store";
import { tags as allTags, type Bookmark } from "@/mock-data/bookmarks";

interface BookmarkCardProps {
  bookmark: Bookmark;
  variant?: "grid" | "list";
}

export function BookmarkCard({
  bookmark,
  variant = "grid",
}: BookmarkCardProps) {
  const { toggleFavorite, archiveBookmark, trashBookmark } =
    useBookmarksStore();
  const bookmarkTags = allTags.filter((tag) => bookmark.tags.includes(tag.id));

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(bookmark.url);
  };

  const handleOpenUrl = () => {
    window.open(bookmark.url, "_blank");
  };

  if (variant === "list") {
    return (
      <div className="group flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
        <div className="size-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
          <Image
            src={bookmark.favicon}
            alt={bookmark.title}
            width={24}
            height={24}
            className={cn("size-6", bookmark.hasDarkIcon && "dark:invert")}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium truncate">{bookmark.title}</h3>
            {bookmarkTags.length > 0 && (
              <div className="hidden sm:flex items-center gap-1">
                {bookmarkTags.slice(0, 2).map((tag) => (
                  <span
                    key={tag.id}
                    className={cn(
                      "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium",
                      tag.color
                    )}
                  >
                    {tag.name}
                  </span>
                ))}
                {bookmarkTags.length > 2 && (
                  <span className="text-[10px] text-muted-foreground">
                    +{bookmarkTags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {bookmark.url}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => toggleFavorite(bookmark.id)}
          >
            <Heart
              className={cn(
                "size-4",
                bookmark.isFavorite && "fill-red-500 text-red-500"
              )}
            />
          </Button>
          <Button variant="ghost" size="icon-xs" onClick={handleOpenUrl}>
            <ExternalLink className="size-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-xs">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopyUrl}>
                <Copy className="size-4 mr-2" />
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="size-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Tag className="size-4 mr-2" />
                Add Tags
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => archiveBookmark(bookmark.id)}>
                <Archive className="size-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => trashBookmark(bookmark.id)}
              >
                <Trash2 className="size-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-xl border bg-card overflow-hidden hover:bg-accent/30 transition-colors">
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
        <Button
          variant="secondary"
          size="icon-xs"
          className="bg-background/80 backdrop-blur-sm"
          onClick={() => toggleFavorite(bookmark.id)}
        >
          <Heart
            className={cn(
              "size-4",
              bookmark.isFavorite && "fill-red-500 text-red-500"
            )}
          />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon-xs"
              className="bg-background/80 backdrop-blur-sm"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleCopyUrl}>
              <Copy className="size-4 mr-2" />
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenUrl}>
              <ExternalLink className="size-4 mr-2" />
              Open in new tab
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Tag className="size-4 mr-2" />
              Add Tags
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => archiveBookmark(bookmark.id)}>
              <Archive className="size-4 mr-2" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => trashBookmark(bookmark.id)}
            >
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <button
        className="w-full text-left cursor-pointer"
        onClick={handleOpenUrl}
      >
        <div className="h-32 bg-linear-to-br from-muted/50 to-muted flex items-center justify-center">
          <div className="size-12 rounded-xl bg-background shadow-sm flex items-center justify-center">
            <Image
              src={bookmark.favicon}
              alt={bookmark.title}
              width={32}
              height={32}
              className={cn("size-8", bookmark.hasDarkIcon && "dark:invert")}
            />
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium line-clamp-1">{bookmark.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {bookmark.description}
          </p>
          {bookmarkTags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {bookmarkTags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className={cn(
                    "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium",
                    tag.color
                  )}
                >
                  {tag.name}
                </span>
              ))}
              {bookmarkTags.length > 3 && (
                <span className="text-[10px] text-muted-foreground py-0.5">
                  +{bookmarkTags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
