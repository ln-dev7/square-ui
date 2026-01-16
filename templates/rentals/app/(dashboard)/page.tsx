"use client";

import { MapView } from "@/components/dashboard/map-view";
import { ListingsPanel } from "@/components/dashboard/listings-panel";
import { MapControls } from "@/components/dashboard/map-controls";

export default function RentalsPage() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapView />
      <ListingsPanel />
      <MapControls />
    </div>
  );
}
