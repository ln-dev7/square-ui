import { create } from "zustand";
import {
  listings as initialListings,
  type Listing,
  type PropertyType,
} from "@/mock-data/listings";

type SortBy =
  | "price-low"
  | "price-high"
  | "rating"
  | "newest"
  | "reviews"
  | "nearest";

type MapStyle = "default" | "streets" | "outdoors" | "satellite";

interface RentalsState {
  listings: Listing[];
  searchQuery: string;
  selectedPropertyTypes: PropertyType[];
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  beds: number | null;
  guests: number | null;
  amenities: string[];
  sortBy: SortBy;
  selectedListingId: string | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  mapStyle: MapStyle;
  userLocation: { lat: number; lng: number } | null;
  setSearchQuery: (query: string) => void;
  togglePropertyType: (type: PropertyType) => void;
  setPriceRange: (range: [number, number]) => void;
  setBedrooms: (count: number | null) => void;
  setBathrooms: (count: number | null) => void;
  setBeds: (count: number | null) => void;
  setGuests: (count: number | null) => void;
  toggleAmenity: (amenity: string) => void;
  setSortBy: (sort: SortBy) => void;
  toggleFavorite: (listingId: string) => void;
  selectListing: (listingId: string | null) => void;
  setMapCenter: (center: { lat: number; lng: number }) => void;
  setMapZoom: (zoom: number) => void;
  setMapStyle: (style: MapStyle) => void;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  getFilteredListings: () => Listing[];
  getFavoriteListings: () => Listing[];
  resetFilters: () => void;
}

const defaultPriceRange: [number, number] = [0, 500];

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

export const useRentalsStore = create<RentalsState>((set, get) => ({
  listings: initialListings,
  searchQuery: "",
  selectedPropertyTypes: [],
  priceRange: defaultPriceRange,
  bedrooms: null,
  bathrooms: null,
  beds: null,
  guests: null,
  amenities: [],
  sortBy: "price-low",
  selectedListingId: null,
  mapCenter: { lat: 48.8566, lng: 2.3522 },
  mapZoom: 10,
  mapStyle: "default",
  userLocation: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  togglePropertyType: (type) =>
    set((state) => ({
      selectedPropertyTypes: state.selectedPropertyTypes.includes(type)
        ? state.selectedPropertyTypes.filter((t) => t !== type)
        : [...state.selectedPropertyTypes, type],
    })),

  setPriceRange: (range) => set({ priceRange: range }),

  setBedrooms: (count) => set({ bedrooms: count }),

  setBathrooms: (count) => set({ bathrooms: count }),

  setBeds: (count) => set({ beds: count }),

  setGuests: (count) => set({ guests: count }),

  toggleAmenity: (amenity) =>
    set((state) => ({
      amenities: state.amenities.includes(amenity)
        ? state.amenities.filter((a) => a !== amenity)
        : [...state.amenities, amenity],
    })),

  setSortBy: (sort) => set({ sortBy: sort }),

  toggleFavorite: (listingId) =>
    set((state) => ({
      listings: state.listings.map((listing) =>
        listing.id === listingId
          ? { ...listing, isFavorite: !listing.isFavorite }
          : listing
      ),
    })),

  selectListing: (listingId) => set({ selectedListingId: listingId }),

  setMapCenter: (center) => set({ mapCenter: center }),

  setMapZoom: (zoom) => set({ mapZoom: zoom }),

  setMapStyle: (style) => set({ mapStyle: style }),

  setUserLocation: (location) => set({ userLocation: location }),

  resetFilters: () =>
    set({
      searchQuery: "",
      selectedPropertyTypes: [],
      priceRange: defaultPriceRange,
      bedrooms: null,
      bathrooms: null,
      beds: null,
      guests: null,
      amenities: [],
      sortBy: "price-low",
    }),

  getFilteredListings: () => {
    const state = get();
    let filtered = [...state.listings];

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.city.toLowerCase().includes(query) ||
          listing.address.toLowerCase().includes(query)
      );
    }

    if (state.selectedPropertyTypes.length > 0) {
      filtered = filtered.filter((listing) =>
        state.selectedPropertyTypes.includes(listing.propertyType)
      );
    }

    filtered = filtered.filter(
      (listing) =>
        listing.pricePerNight >= state.priceRange[0] &&
        listing.pricePerNight <= state.priceRange[1]
    );

    if (state.bedrooms !== null) {
      filtered = filtered.filter(
        (listing) => listing.bedrooms >= state.bedrooms!
      );
    }

    if (state.bathrooms !== null) {
      filtered = filtered.filter(
        (listing) => listing.bathrooms >= state.bathrooms!
      );
    }

    if (state.beds !== null) {
      filtered = filtered.filter((listing) => listing.beds >= state.beds!);
    }

    if (state.guests !== null) {
      filtered = filtered.filter((listing) => listing.guests >= state.guests!);
    }

    if (state.amenities.length > 0) {
      filtered = filtered.filter((listing) =>
        state.amenities.every((amenity) => listing.amenities.includes(amenity))
      );
    }

    switch (state.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "price-high":
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
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
    }

    if (state.selectedListingId) {
      const selectedIndex = filtered.findIndex(
        (listing) => listing.id === state.selectedListingId
      );
      if (selectedIndex > 0) {
        const selected = filtered.splice(selectedIndex, 1)[0];
        filtered.unshift(selected);
      }
    }

    return filtered;
  },

  getFavoriteListings: () => {
    const state = get();
    let favorites = state.listings.filter((listing) => listing.isFavorite);

    if (state.selectedListingId) {
      const selectedIndex = favorites.findIndex(
        (listing) => listing.id === state.selectedListingId
      );
      if (selectedIndex > 0) {
        const selected = favorites.splice(selectedIndex, 1)[0];
        favorites.unshift(selected);
      }
    }

    return favorites;
  },
}));
