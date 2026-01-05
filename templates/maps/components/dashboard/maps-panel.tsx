"use client";

import * as React from "react";
import {
  MapPin,
  Heart,
  Star,
  Eye,
  Clock,
  Search,
  X,
  Route,
  Loader2,
  Navigation,
  ArrowUpDown,
  ArrowDownAZ,
  ArrowUpAZ,
  CalendarArrowDown,
  CalendarArrowUp,
  TrendingUp,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMapsStore } from "@/store/maps-store";
import {
  categories,
  tags as allTags,
  type Location,
} from "@/mock-data/locations";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

type PanelMode = "all" | "favorites" | "recents";

interface MapsPanelProps {
  mode?: PanelMode;
}

const panelConfig = {
  all: {
    title: "All Locations",
    emptyIcon: MapPin,
    emptyTitle: "No locations found",
    emptyDescription: null,
    getSubtitle: (count: number) =>
      `${count} location${count !== 1 ? "s" : ""}`,
  },
  favorites: {
    title: "Favorites",
    emptyIcon: Heart,
    emptyTitle: "No favorites yet",
    emptyDescription:
      "Click the heart icon on a location to add it to favorites",
    getSubtitle: (count: number) =>
      `${count} favorite${count !== 1 ? "s" : ""}`,
  },
  recents: {
    title: "Recent Locations",
    emptyIcon: Clock,
    emptyTitle: "No recent locations",
    emptyDescription: null,
    getSubtitle: (count: number) => `Last ${count} added locations`,
  },
};

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

function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  if (km < 10) {
    return `${km.toFixed(1)} km`;
  }
  return `${Math.round(km)} km`;
}

export function MapsPanel({ mode = "all" }: MapsPanelProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isLoadingRoute, setIsLoadingRoute] = React.useState(false);
  const [isRequestingLocation, setIsRequestingLocation] = React.useState(false);
  const {
    selectedLocationId,
    searchQuery,
    sortBy,
    selectLocation,
    toggleFavorite,
    setSearchQuery,
    setSortBy,
    getFilteredLocations,
    getFavoriteLocations,
    getRecentLocations,
    userLocation,
    routeDestinationId,
    setRouteDestination,
    setUserLocation,
    clearRoute,
    isPanelVisible,
    setPanelVisible,
  } = useMapsStore();

  const isDesktop = useMediaQuery("(min-width: 640px)");

  React.useEffect(() => {
    if (isDesktop && !isPanelVisible) {
      setPanelVisible(true);
    }
  }, [isDesktop, isPanelVisible, setPanelVisible]);

  const getDistance = React.useCallback(
    (location: Location) => {
      if (!userLocation) return null;
      return calculateDistance(
        userLocation.lat,
        userLocation.lng,
        location.coordinates.lat,
        location.coordinates.lng
      );
    },
    [userLocation]
  );

  const getLocationFromIP = React.useCallback(async (): Promise<{
    lat: number;
    lng: number;
  } | null> => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      if (data.latitude && data.longitude) {
        return { lat: data.latitude, lng: data.longitude };
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  const requestUserLocation = React.useCallback(() => {
    return new Promise<{ lat: number; lng: number } | null>((resolve) => {
      setIsRequestingLocation(true);

      const tryIPFallback = async () => {
        const ipLocation = await getLocationFromIP();
        setIsRequestingLocation(false);
        if (ipLocation) {
          setUserLocation(ipLocation);
          resolve(ipLocation);
        } else {
          alert("Unable to get your location. Please try again later.");
          resolve(null);
        }
      };

      if (!("geolocation" in navigator)) {
        tryIPFallback();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setIsRequestingLocation(false);
          resolve(location);
        },
        () => {
          tryIPFallback();
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
      );
    });
  }, [setUserLocation, getLocationFromIP]);

  const getLocations = () => {
    switch (mode) {
      case "favorites":
        return getFavoriteLocations();
      case "recents":
        return getRecentLocations();
      default:
        return getFilteredLocations();
    }
  };

  const rawLocations = getLocations();
  const locations = React.useMemo(() => {
    if (!selectedLocationId) return rawLocations;
    const selected = rawLocations.find((l) => l.id === selectedLocationId);
    if (!selected) return rawLocations;
    return [
      selected,
      ...rawLocations.filter((l) => l.id !== selectedLocationId),
    ];
  }, [rawLocations, selectedLocationId]);

  const config = panelConfig[mode];
  const EmptyIcon = config.emptyIcon;

  React.useEffect(() => {
    if (selectedLocationId) {
      const isInList = rawLocations.some((l) => l.id === selectedLocationId);
      if (!isInList) {
        selectLocation(null);
        clearRoute();
      }
    }
  }, [rawLocations, selectedLocationId, selectLocation, clearRoute]);

  React.useEffect(() => {
    if (selectedLocationId && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedLocationId]);

  const handleLocationClick = (location: Location) => {
    if (selectedLocationId === location.id) {
      selectLocation(null);
    } else {
      selectLocation(location.id);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectLocation(null);
    clearRoute();
  };

  const handleGetDirections = async (
    e: React.MouseEvent,
    location: Location
  ) => {
    e.stopPropagation();

    if (routeDestinationId === location.id) {
      clearRoute();
      return;
    }

    let currentUserLocation = userLocation;

    if (!currentUserLocation) {
      currentUserLocation = await requestUserLocation();
      if (!currentUserLocation) {
        return;
      }
    }

    setIsLoadingRoute(true);
    setRouteDestination(location.id);

    setTimeout(() => {
      setIsLoadingRoute(false);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getTagName = (tagId: string) => {
    return allTags.find((t) => t.id === tagId)?.name || tagId;
  };

  if (!isPanelVisible) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-4 z-20 sm:hidden size-10 bg-background! shadow-xl"
        onClick={() => setPanelVisible(true)}
      >
        <MapPin className="size-5" />
      </Button>
    );
  }

  return (
    <div className="absolute left-4 top-4 bottom-4 z-20 flex flex-col bg-background rounded-xl shadow-xl border overflow-hidden w-80 sm:w-[400px]">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="">
          <h2 className="font-semibold flex items-center gap-2">
            {mode === "recents" && <Clock className="size-4" />}
            {config.title}
          </h2>
          <p className="text-xs text-muted-foreground">
            {config.getSubtitle(locations.length)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <SidebarTrigger className="size-7" />
          <Button
            variant="ghost"
            size="icon"
            className="size-7 sm:hidden"
            onClick={() => setPanelVisible(false)}
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      <div className="p-2 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn("pl-8 h-9", searchQuery && "pr-8")}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 size-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="size-3.5" />
              </Button>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="size-9 shrink-0">
                <ArrowUpDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => setSortBy("nearest")}
                className="gap-2"
              >
                <Navigation className="size-4" />
                <span className="flex-1">Nearest</span>
                {sortBy === "nearest" && <Check className="size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("rating")}
                className="gap-2"
              >
                <Star className="size-4" />
                <span className="flex-1">Best rated</span>
                {sortBy === "rating" && <Check className="size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("visits")}
                className="gap-2"
              >
                <TrendingUp className="size-4" />
                <span className="flex-1">Most visited</span>
                {sortBy === "visits" && <Check className="size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("date-newest")}
                className="gap-2"
              >
                <CalendarArrowDown className="size-4" />
                <span className="flex-1">Newest first</span>
                {sortBy === "date-newest" && <Check className="size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("date-oldest")}
                className="gap-2"
              >
                <CalendarArrowUp className="size-4" />
                <span className="flex-1">Oldest first</span>
                {sortBy === "date-oldest" && <Check className="size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("alpha-az")}
                className="gap-2"
              >
                <ArrowDownAZ className="size-4" />
                <span className="flex-1">A to Z</span>
                {sortBy === "alpha-az" && <Check className="size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("alpha-za")}
                className="gap-2"
              >
                <ArrowUpAZ className="size-4" />
                <span className="flex-1">Z to A</span>
                {sortBy === "alpha-za" && <Check className="size-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-2">
          {locations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <EmptyIcon className="size-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">{config.emptyTitle}</p>
              {config.emptyDescription && (
                <p className="text-xs text-muted-foreground mt-1">
                  {config.emptyDescription}
                </p>
              )}
            </div>
          ) : (
            locations.map((location) => {
              const category = categories.find(
                (c) => c.id === location.categoryId
              );
              const isSelected = selectedLocationId === location.id;
              const isRouteActive = routeDestinationId === location.id;

              if (isSelected) {
                return (
                  <div
                    key={location.id}
                    className={cn(
                      "flex flex-col rounded-lg border-2 overflow-hidden",
                      isRouteActive
                        ? "border-green-500 bg-green-500/10"
                        : "border-primary bg-accent/30"
                    )}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div
                            className="flex size-11 shrink-0 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${category?.color}20` }}
                          >
                            <MapPin
                              className="size-5"
                              style={{ color: category?.color }}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-base">
                                {location.name}
                              </h3>
                              {location.isFavorite && (
                                <Heart className="size-4 fill-red-500 text-red-500 shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {category?.name}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0"
                          onClick={handleClose}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {location.address}
                      </p>

                      <p className="text-sm mb-4">{location.description}</p>

                      <div className="flex items-center flex-wrap gap-4 mb-4">
                        {userLocation && (
                          <div className="flex items-center gap-1.5">
                            <Navigation className="size-4 text-primary" />
                            <span className="font-semibold text-primary">
                              {formatDistance(getDistance(location) || 0)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">
                            {location.rating}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /5
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Eye className="size-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {location.visitCount} visits
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="size-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {formatDate(location.createdAt)}
                          </span>
                        </div>
                      </div>

                      {location.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {location.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {getTagName(tag)}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(location.id);
                          }}
                        >
                          <Heart
                            className={cn(
                              "size-4 mr-2",
                              location.isFavorite && "fill-red-500 text-red-500"
                            )}
                          />
                          {location.isFavorite ? "Unfavorite" : "Favorite"}
                        </Button>
                        <Button
                          size="sm"
                          className={cn(
                            "flex-1",
                            isRouteActive
                              ? "bg-green-500 hover:bg-green-600"
                              : ""
                          )}
                          onClick={(e) => handleGetDirections(e, location)}
                          disabled={isLoadingRoute || isRequestingLocation}
                        >
                          {isLoadingRoute || isRequestingLocation ? (
                            <Loader2 className="size-4 mr-2 animate-spin" />
                          ) : (
                            <Route className="size-4 mr-2" />
                          )}
                          {isRequestingLocation
                            ? "Getting location..."
                            : isRouteActive
                            ? "Clear route"
                            : "Get directions"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={location.id}
                  className={cn(
                    "group flex flex-col gap-2 rounded-lg border p-3 cursor-pointer transition-colors hover:bg-accent/50",
                    routeDestinationId === location.id &&
                      "border-green-500 bg-green-500/10"
                  )}
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${category?.color}20` }}
                    >
                      <MapPin
                        className="size-4"
                        style={{ color: category?.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm truncate">
                          {location.name}
                        </h3>
                        {location.isFavorite && (
                          <Heart className="size-3 fill-red-500 text-red-500 shrink-0" />
                        )}
                        {routeDestinationId === location.id && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] h-5 bg-green-500/20 text-green-600"
                          >
                            Route active
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {location.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">
                        {location.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {userLocation && (
                        <div className="flex items-center gap-1">
                          <Navigation className="size-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground font-medium">
                            {formatDistance(getDistance(location) || 0)}
                          </span>
                        </div>
                      )}
                      {mode === "recents" && (
                        <div className="flex items-center gap-1">
                          <Clock className="size-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(location.createdAt)}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Eye className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {location.visitCount} {mode !== "recents" && "visits"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(location.id);
                        }}
                      >
                        <Heart
                          className={cn(
                            "size-3.5",
                            location.isFavorite && "fill-red-500 text-red-500"
                          )}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "size-7",
                          routeDestinationId === location.id && "text-green-500"
                        )}
                        onClick={(e) => handleGetDirections(e, location)}
                      >
                        <Route className="size-3.5" />
                      </Button>
                    </div>
                  </div>

                  {location.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {location.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] h-5"
                        >
                          {getTagName(tag)}
                        </Badge>
                      ))}
                      {location.tags.length > 3 && (
                        <Badge variant="outline" className="text-[10px] h-5">
                          +{location.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
