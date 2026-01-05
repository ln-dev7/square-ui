"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMapsStore } from "@/store/maps-store";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  MinusSignIcon,
  Location01Icon,
  Compass01Icon,
  Layers01Icon,
  MapsIcon,
  MountainIcon,
  SatelliteIcon,
  StarCircleIcon,
  GithubIcon,
} from "@hugeicons/core-free-icons";

const mapStyles = [
  {
    id: "default",
    name: "Default",
    icon: StarCircleIcon,
    description: "Follows theme",
  },
  { id: "streets", name: "Streets", icon: MapsIcon, description: "Detailed roads" },
  {
    id: "outdoors",
    name: "Outdoors",
    icon: MountainIcon,
    description: "Terrain & trails",
  },
  {
    id: "satellite",
    name: "Satellite",
    icon: SatelliteIcon,
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
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="bg-background! size-11 shadow-lg"
              >
                <HugeiconsIcon icon={Layers01Icon} className="size-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              {mapStyles.map((style) => {
                return (
                  <DropdownMenuItem
                    key={style.id}
                    onClick={() => setMapStyle(style.id)}
                    className={cn("gap-3", mapStyle === style.id && "bg-accent")}
                  >
                    <HugeiconsIcon icon={style.icon} className="size-4 shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-medium">{style.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {style.description}
                      </span>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
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
            href="https://github.com/ln-dev7/square-ui/tree/master/templates-baseui/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HugeiconsIcon icon={GithubIcon} className="size-4" />
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
          <HugeiconsIcon icon={Location01Icon} className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-background! size-11 shadow-lg"
          onClick={handleResetView}
        >
          <HugeiconsIcon icon={Compass01Icon} className="size-4" />
        </Button>
        <div className="flex flex-col rounded-lg border bg-background! border-border shadow-lg overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none size-11 border-b flex items-center justify-center"
            onClick={handleZoomIn}
          >
            <HugeiconsIcon icon={Add01Icon} className="size-4" />
          </Button>
          <div className="border-b border-border"></div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none size-11 flex items-center justify-center"
            onClick={handleZoomOut}
          >
            <HugeiconsIcon icon={MinusSignIcon} className="size-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
