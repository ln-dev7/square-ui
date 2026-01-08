"use client";

import { useBookmarksStore } from "@/store/bookmarks-store";
import { collections, tags } from "@/mock-data/bookmarks";
import { BookmarkCard } from "./bookmark-card";
import { StatsCards } from "./stats-cards";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function BookmarksContent() {
  const {
    selectedCollection,
    getFilteredBookmarks,
    viewMode,
    selectedTags,
    toggleTag,
    filterType,
    setFilterType,
    sortBy,
  } = useBookmarksStore();
  const filteredBookmarks = getFilteredBookmarks();

  const currentCollection = collections.find(
    (c) => c.id === selectedCollection
  );

  const activeTagsData = tags.filter((t) => selectedTags.includes(t.id));
  const hasActiveFilters =
    selectedTags.length > 0 || filterType !== "all" || sortBy !== "date-newest";

  return (
    <div className="flex-1 w-full overflow-auto">
      <div className="p-4 md:p-6 space-y-6">
        <StatsCards />

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">
                {currentCollection?.name || "All Bookmarks"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredBookmarks.length} bookmark
                {filteredBookmarks.length !== 1 ? "s" : ""}
                {hasActiveFilters && " (filtered)"}
              </p>
            </div>

            {(activeTagsData.length > 0 || filterType !== "all") && (
              <div className="flex flex-wrap items-center gap-2">
                {filterType !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                    {filterType === "favorites" && "Favorites only"}
                    {filterType === "with-tags" && "With tags"}
                    {filterType === "without-tags" && "Without tags"}
                    <button
                      onClick={() => setFilterType("all")}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                {activeTagsData.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-primary text-primary-foreground"
                  >
                    {tag.name}
                    <button
                      onClick={() => toggleTag(tag.id)}
                      className="hover:bg-primary-foreground/20 rounded-full p-0.5"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.id} bookmark={bookmark} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  variant="list"
                />
              ))}
            </div>
          )}

          {filteredBookmarks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <svg
                  className="size-6 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">No bookmarks found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-4">
                Try adjusting your search or filter to find what you&apos;re
                looking for, or add a new bookmark.
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilterType("all");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
