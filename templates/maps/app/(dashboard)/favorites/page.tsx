"use client";

import { MapView } from "@/components/dashboard/map-view";
import { MapsPanel } from "@/components/dashboard/maps-panel";
import { MapControls } from "@/components/dashboard/map-controls";

export default function FavoritesPage() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapView />
      <MapsPanel mode="favorites" />
      <MapControls />
    </div>
  );
}
