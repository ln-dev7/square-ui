"use client";

import Link from "next/link";
import {
  Plus,
  Minus,
  Locate,
  Compass,
  Github,
  Layers,
  Map,
  Mountain,
  Satellite,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMapsStore } from "@/store/maps-store";
import { cn } from "@/lib/utils";

const mapStyles = [
  {
    id: "default",
    name: "Default",
    icon: Circle,
    description: "Follows theme",
  },
  { id: "streets", name: "Streets", icon: Map, description: "Detailed roads" },
  {
    id: "outdoors",
    name: "Outdoors",
    icon: Mountain,
    description: "Terrain & trails",
  },
  {
    id: "satellite",
    name: "Satellite",
    icon: Satellite,
    description: "Aerial view",
  },
] as const;

export function MapControls() {
  const {
    mapZoom,
    setMapZoom,
    setMapCenter,
    setUserLocation,
    userLocation,
    mapStyle,
    setMapStyle,
  } = useMapsStore();

  const handleZoomIn = () => {
    setMapZoom(Math.min(mapZoom + 1, 18));
  };

  const handleZoomOut = () => {
    setMapZoom(Math.max(mapZoom - 1, 3));
  };

  const handleResetView = () => {
    if (userLocation) {
      setMapCenter(userLocation);
      setMapZoom(12);
    } else {
      setMapCenter({ lat: 20, lng: 0 });
      setMapZoom(2);
    }
  };

  const getLocationFromIP = async (): Promise<{
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
  };

  const handleLocate = async () => {
    if (userLocation) {
      setMapCenter(userLocation);
      setMapZoom(15);
      return;
    }

    const tryIPFallback = async () => {
      const ipLocation = await getLocationFromIP();
      if (ipLocation) {
        setUserLocation(ipLocation);
        setMapCenter(ipLocation);
        setMapZoom(15);
      } else {
        alert("Unable to get your location. Please try again later.");
      }
    };

    if (!("geolocation" in navigator)) {
      await tryIPFallback();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        setMapCenter(location);
        setMapZoom(15);
      },
      () => {
        tryIPFallback();
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-10 flex flex-col sm:flex-row items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-background! size-11 shadow-lg"
            >
              <Layers className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {mapStyles.map((style) => {
              const Icon = style.icon;
              return (
                <DropdownMenuItem
                  key={style.id}
                  onClick={() => setMapStyle(style.id)}
                  className={cn("gap-3", mapStyle === style.id && "bg-accent")}
                >
                  <Icon className="size-4 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-medium">{style.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {style.description}
                    </span>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle className="bg-background! size-11 shadow-lg" />
        <Button
          variant="outline"
          size="icon"
          className="bg-background! size-11 shadow-lg"
          asChild
        >
          <Link
            href="https://github.com/ln-dev7/square-ui/tree/master/templates/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-background! size-11 shadow-lg"
          onClick={handleLocate}
        >
          <Locate className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background! size-11 shadow-lg"
          onClick={handleResetView}
        >
          <Compass className="size-4" />
        </Button>
        <div className="flex flex-col rounded-lg border bg-background! shadow-lg overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none size-11 border-b flex items-center justify-center"
            onClick={handleZoomIn}
          >
            <Plus className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none size-11 flex items-center justify-center"
            onClick={handleZoomOut}
          >
            <Minus className="size-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
