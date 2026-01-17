"use client";

import * as React from "react";
import { ZoomIn, ZoomOut, Navigation, Github } from "lucide-react";
import { useRentalsStore } from "@/store/rentals-store";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MapControls() {
  const { mapZoom, setMapZoom, setMapCenter, setUserLocation } =
    useRentalsStore();

  const handleZoomIn = () => {
    setMapZoom(Math.min(mapZoom + 1, 18));
  };

  const handleZoomOut = () => {
    setMapZoom(Math.max(mapZoom - 1, 3));
  };

  const handleLocate = () => {
    if ("geolocation" in navigator) {
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
          alert("Unable to get your location. Please try again later.");
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-1 shadow-lg">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="h-9 w-9"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            }
          />
          <TooltipContent>Zoom in</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="h-9 w-9"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            }
          />
          <TooltipContent>Zoom out</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLocate}
                className="h-9 w-9"
              >
                <Navigation className="h-4 w-4" />
              </Button>
            }
          />
          <TooltipContent>Locate me</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border bg-background p-1 shadow-lg">
        <ThemeToggle />
        <Tooltip>
          <TooltipTrigger
            render={
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
            }
          />
          <TooltipContent>View on GitHub</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
