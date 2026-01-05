import { create } from "zustand";
import { locations as initialLocations, type Location } from "@/mock-data/locations";

type ViewMode = "map" | "list" | "split";
type SortBy = "date-newest" | "date-oldest" | "alpha-az" | "alpha-za" | "rating" | "visits" | "nearest";
type MapStyle = "default" | "streets" | "outdoors" | "satellite";

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface MapsState {
  locations: Location[];
  selectedCategory: string;
  selectedTags: string[];
  searchQuery: string;
  viewMode: ViewMode;
  sortBy: SortBy;
  selectedLocationId: string | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  mapStyle: MapStyle;
  userLocation: { lat: number; lng: number } | null;
  routeDestinationId: string | null;
  isPanelVisible: boolean;
  setSelectedCategory: (categoryId: string) => void;
  toggleTag: (tagId: string) => void;
  clearTags: () => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setSortBy: (sort: SortBy) => void;
  toggleFavorite: (locationId: string) => void;
  selectLocation: (locationId: string | null) => void;
  setMapCenter: (center: { lat: number; lng: number }) => void;
  setMapZoom: (zoom: number) => void;
  setMapStyle: (style: MapStyle) => void;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  setRouteDestination: (locationId: string | null) => void;
  clearRoute: () => void;
  setPanelVisible: (visible: boolean) => void;
  resetSelectionIfNotInList: (locations: Location[]) => void;
  getFilteredLocations: () => Location[];
  getFavoriteLocations: () => Location[];
  getRecentLocations: () => Location[];
}

export const useMapsStore = create<MapsState>((set, get) => ({
  locations: initialLocations,
  selectedCategory: "all",
  selectedTags: [],
  searchQuery: "",
  viewMode: "split",
  sortBy: "nearest",
  selectedLocationId: null,
  mapCenter: { lat: 20, lng: 0 },
  mapZoom: 2,
  mapStyle: "default",
  userLocation: null,
  routeDestinationId: null,
  isPanelVisible: true,

  setSelectedCategory: (categoryId) => {
    const state = get();
    const newState: Partial<MapsState> = { selectedCategory: categoryId };
    
    if (state.selectedLocationId) {
      const location = state.locations.find((l) => l.id === state.selectedLocationId);
      if (location && categoryId !== "all" && location.categoryId !== categoryId) {
        newState.selectedLocationId = null;
        newState.routeDestinationId = null;
      }
    }
    
    set(newState);
  },

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

  toggleFavorite: (locationId) =>
    set((state) => ({
      locations: state.locations.map((location) =>
        location.id === locationId
          ? { ...location, isFavorite: !location.isFavorite }
          : location
      ),
    })),

  selectLocation: (locationId) => set({ selectedLocationId: locationId }),

  setMapCenter: (center) => set({ mapCenter: center }),

  setMapZoom: (zoom) => set({ mapZoom: zoom }),

  setMapStyle: (style) => set({ mapStyle: style }),

  setUserLocation: (location) => set({ userLocation: location }),

  setRouteDestination: (locationId) => set({ routeDestinationId: locationId }),

  clearRoute: () => set({ routeDestinationId: null }),

  setPanelVisible: (visible) => set({ isPanelVisible: visible }),

  resetSelectionIfNotInList: (locations) => {
    const state = get();
    if (state.selectedLocationId) {
      const isInList = locations.some((l) => l.id === state.selectedLocationId);
      if (!isInList) {
        set({ selectedLocationId: null, routeDestinationId: null });
      }
    }
  },

  getFilteredLocations: () => {
    const state = get();
    let filtered = [...state.locations];

    if (state.selectedCategory !== "all") {
      filtered = filtered.filter((l) => l.categoryId === state.selectedCategory);
    }

    if (state.selectedTags.length > 0) {
      filtered = filtered.filter((l) =>
        state.selectedTags.some((tag) => l.tags.includes(tag))
      );
    }

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(query) ||
          l.description.toLowerCase().includes(query) ||
          l.address.toLowerCase().includes(query)
      );
    }

    switch (state.sortBy) {
      case "nearest":
        if (state.userLocation) {
          filtered.sort((a, b) => {
            const distA = calculateDistance(
              state.userLocation!.lat,
              state.userLocation!.lng,
              a.coordinates.lat,
              a.coordinates.lng
            );
            const distB = calculateDistance(
              state.userLocation!.lat,
              state.userLocation!.lng,
              b.coordinates.lat,
              b.coordinates.lng
            );
            return distA - distB;
          });
        }
        break;
      case "date-newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "date-oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "alpha-az":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alpha-za":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "visits":
        filtered.sort((a, b) => b.visitCount - a.visitCount);
        break;
    }

    return filtered;
  },

  getFavoriteLocations: () => {
    const state = get();
    let filtered = state.locations.filter((l) => l.isFavorite);

    if (state.selectedCategory !== "all") {
      filtered = filtered.filter((l) => l.categoryId === state.selectedCategory);
    }

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(query) ||
          l.description.toLowerCase().includes(query) ||
          l.address.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return filtered;
  },

  getRecentLocations: () => {
    const state = get();
    let filtered = [...state.locations];

    if (state.selectedCategory !== "all") {
      filtered = filtered.filter((l) => l.categoryId === state.selectedCategory);
    }

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(query) ||
          l.description.toLowerCase().includes(query) ||
          l.address.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return filtered.slice(0, 20);
  },
}));
