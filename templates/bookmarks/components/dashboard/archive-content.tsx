"use client";

import { useBookmarksStore } from "@/store/bookmarks-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, MoreHorizontal, RotateCcw, Trash2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { tags as allTags, type Bookmark } from "@/mock-data/bookmarks";
import { cn } from "@/lib/utils";

function ArchivedBookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const { restoreFromArchive, trashBookmark } = useBookmarksStore();
  const bookmarkTags = allTags.filter((tag) => bookmark.tags.includes(tag.id));

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
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{bookmark.url}</p>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => restoreFromArchive(bookmark.id)}
        >
          <RotateCcw className="size-4 mr-1" />
          Restore
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => window.open(bookmark.url, "_blank")}
            >
              <ExternalLink className="size-4 mr-2" />
              Open URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                restoreFromArchive(bookmark.id);
                setTimeout(() => trashBookmark(bookmark.id), 0);
              }}
            >
              <Trash2 className="size-4 mr-2" />
              Move to Trash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function ArchiveContent() {
  const { getArchivedBookmarks } = useBookmarksStore();
  const archivedBookmarks = getArchivedBookmarks();

  return (
    <div className="flex-1 w-full overflow-auto">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
          <div className="size-10 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center">
            <Archive className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Archived Bookmarks</h2>
            <p className="text-sm text-muted-foreground">
              {archivedBookmarks.length} bookmark
              {archivedBookmarks.length !== 1 ? "s" : ""} in archive
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {archivedBookmarks.map((bookmark) => (
            <ArchivedBookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>

        {archivedBookmarks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Archive className="size-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">Archive is empty</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Archived bookmarks will appear here. Archive bookmarks you want to
              keep but don&apos;t need right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

