import { create } from "zustand";
import { bookmarks as initialBookmarks, type Bookmark } from "@/mock-data/bookmarks";

type ViewMode = "grid" | "list";
type SortBy = "date-newest" | "date-oldest" | "alpha-az" | "alpha-za";
type FilterType = "all" | "favorites" | "with-tags" | "without-tags";

interface BookmarksState {
  bookmarks: Bookmark[];
  archivedBookmarks: Bookmark[];
  trashedBookmarks: Bookmark[];
  selectedCollection: string;
  selectedTags: string[];
  searchQuery: string;
  viewMode: ViewMode;
  sortBy: SortBy;
  filterType: FilterType;
  setSelectedCollection: (collectionId: string) => void;
  toggleTag: (tagId: string) => void;
  clearTags: () => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setSortBy: (sort: SortBy) => void;
  setFilterType: (filter: FilterType) => void;
  toggleFavorite: (bookmarkId: string) => void;
  archiveBookmark: (bookmarkId: string) => void;
  restoreFromArchive: (bookmarkId: string) => void;
  trashBookmark: (bookmarkId: string) => void;
  restoreFromTrash: (bookmarkId: string) => void;
  permanentlyDelete: (bookmarkId: string) => void;
  getFilteredBookmarks: () => Bookmark[];
  getFavoriteBookmarks: () => Bookmark[];
  getArchivedBookmarks: () => Bookmark[];
  getTrashedBookmarks: () => Bookmark[];
}

export const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarks: initialBookmarks,
  archivedBookmarks: [],
  trashedBookmarks: [],
  selectedCollection: "all",
  selectedTags: [],
  searchQuery: "",
  viewMode: "grid",
  sortBy: "date-newest",
  filterType: "all",

  setSelectedCollection: (collectionId) => set({ selectedCollection: collectionId }),

  toggleTag: (tagId) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tagId)
        ? state.selectedTags.filter((t) => t !== tagId)
        : [...state.selectedTags, tagId],
    })),

  clearTags: () => set({ selectedTags: [] }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setViewMode: (mode) => set({ viewMode: mode }),

  setSortBy: (sort) => set({ sortBy: sort }),

  setFilterType: (filter) => set({ filterType: filter }),

  toggleFavorite: (bookmarkId) =>
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === bookmarkId
          ? { ...bookmark, isFavorite: !bookmark.isFavorite }
          : bookmark
      ),
    })),

  archiveBookmark: (bookmarkId) =>
    set((state) => {
      const bookmark = state.bookmarks.find((b) => b.id === bookmarkId);
      if (!bookmark) return state;
      return {
        bookmarks: state.bookmarks.filter((b) => b.id !== bookmarkId),
        archivedBookmarks: [...state.archivedBookmarks, bookmark],
      };
    }),

  restoreFromArchive: (bookmarkId) =>
    set((state) => {
      const bookmark = state.archivedBookmarks.find((b) => b.id === bookmarkId);
      if (!bookmark) return state;
      return {
        archivedBookmarks: state.archivedBookmarks.filter((b) => b.id !== bookmarkId),
        bookmarks: [...state.bookmarks, bookmark],
      };
    }),

  trashBookmark: (bookmarkId) =>
    set((state) => {
      const bookmark = state.bookmarks.find((b) => b.id === bookmarkId);
      if (!bookmark) return state;
      return {
        bookmarks: state.bookmarks.filter((b) => b.id !== bookmarkId),
        trashedBookmarks: [...state.trashedBookmarks, bookmark],
      };
    }),

  restoreFromTrash: (bookmarkId) =>
    set((state) => {
      const bookmark = state.trashedBookmarks.find((b) => b.id === bookmarkId);
      if (!bookmark) return state;
      return {
        trashedBookmarks: state.trashedBookmarks.filter((b) => b.id !== bookmarkId),
        bookmarks: [...state.bookmarks, bookmark],
      };
    }),

  permanentlyDelete: (bookmarkId) =>
    set((state) => ({
      trashedBookmarks: state.trashedBookmarks.filter((b) => b.id !== bookmarkId),
    })),

  getFilteredBookmarks: () => {
    const state = get();
    let filtered = [...state.bookmarks];

    if (state.selectedCollection !== "all") {
      filtered = filtered.filter((b) => b.collectionId === state.selectedCollection);
    }

    if (state.selectedTags.length > 0) {
      filtered = filtered.filter((b) =>
        state.selectedTags.some((tag) => b.tags.includes(tag))
      );
    }

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.url.toLowerCase().includes(query)
      );
    }

    switch (state.filterType) {
      case "favorites":
        filtered = filtered.filter((b) => b.isFavorite);
        break;
      case "with-tags":
        filtered = filtered.filter((b) => b.tags.length > 0);
        break;
      case "without-tags":
        filtered = filtered.filter((b) => b.tags.length === 0);
        break;
    }

    switch (state.sortBy) {
      case "date-newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "date-oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "alpha-az":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "alpha-za":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  },

  getFavoriteBookmarks: () => {
    const state = get();
    let filtered = state.bookmarks.filter((b) => b.isFavorite);

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.url.toLowerCase().includes(query)
      );
    }

    switch (state.sortBy) {
      case "date-newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "date-oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "alpha-az":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "alpha-za":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  },

  getArchivedBookmarks: () => {
    const state = get();
    let filtered = [...state.archivedBookmarks];

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.url.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  getTrashedBookmarks: () => {
    const state = get();
    let filtered = [...state.trashedBookmarks];

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.url.toLowerCase().includes(query)
      );
    }

    return filtered;
  },
}));
