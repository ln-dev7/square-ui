"use client";

import * as React from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "next-themes";
import { useRentalsStore } from "@/store/rentals-store";
import { propertyTypeLabels } from "@/mock-data/listings";

const MAP_STYLES = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  streets: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  outdoors: "https://tiles.stadiamaps.com/styles/outdoors.json",
  satellite: "https://tiles.stadiamaps.com/styles/alidade_satellite.json",
};

export function MapView() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<maplibregl.Map | null>(null);
  const markersRef = React.useRef<Map<string, maplibregl.Marker>>(new Map());
  const popupRef = React.useRef<maplibregl.Popup | null>(null);
  const isAnimatingRef = React.useRef(false);
  const { resolvedTheme } = useTheme();

  const {
    mapCenter,
    mapZoom,
    mapStyle,
    setMapCenter,
    setMapZoom,
    selectListing,
    selectedListingId,
    getFilteredListings,
  } = useRentalsStore();

  const listings = getFilteredListings();

  const getMapStyleUrl = React.useCallback(() => {
    if (mapStyle === "default") {
      return resolvedTheme === "dark" ? MAP_STYLES.dark : MAP_STYLES.light;
    }
    return MAP_STYLES[mapStyle];
  }, [mapStyle, resolvedTheme]);

  React.useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: getMapStyleUrl(),
      center: [mapCenter.lng, mapCenter.lat],
      zoom: mapZoom,
      minZoom: 3,
      maxZoom: 18,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    map.on("moveend", () => {
      if (isAnimatingRef.current) {
        isAnimatingRef.current = false;
        return;
      }
      const center = map.getCenter();
      const zoom = map.getZoom();
      setMapCenter({ lat: center.lat, lng: center.lng });
      setMapZoom(zoom);
    });

    mapRef.current = map;

    const handleMapClick = (e: maplibregl.MapMouseEvent) => {
      if (popupRef.current) {
        const popupElement = popupRef.current.getElement();
        if (
          popupElement &&
          !popupElement.contains(e.originalEvent.target as Node)
        ) {
          const target = e.originalEvent.target as HTMLElement;
          if (!target.closest(".listing-marker-container")) {
            popupRef.current.remove();
            popupRef.current = null;
            selectListing(null);
          }
        }
      }
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
      map.remove();
      mapRef.current = null;
    };
  }, [selectListing]);

  React.useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(getMapStyleUrl());
  }, [mapStyle, resolvedTheme, getMapStyleUrl]);

  React.useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    listings.forEach((listing) => {
      const isSelected = selectedListingId === listing.id;

      const el = document.createElement("div");
      el.className = "listing-marker-container";
      const priceText = `$${listing.pricePerNight}`;
      el.innerHTML = `
        <div class="relative cursor-pointer transition-all ${
          isSelected ? "scale-110 z-10" : "hover:scale-105"
        }">
          <div class="px-2.5 py-1.5 rounded-lg bg-card border-2 ${
            isSelected
              ? "border-primary shadow-xl"
              : "border-border shadow-lg hover:shadow-xl"
          } flex items-center justify-center min-w-[60px]">
            <span class="text-sm font-semibold text-card-foreground whitespace-nowrap">${priceText}</span>
          </div>
          ${
            isSelected
              ? '<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary animate-ping"></div>'
              : ""
          }
        </div>
      `;

      el.addEventListener("click", (e) => {
        e.stopPropagation();

        if (popupRef.current) {
          const currentPopup = popupRef.current;
          const currentLngLat = currentPopup.getLngLat();
          if (
            currentLngLat.lng === listing.coordinates.lng &&
            currentLngLat.lat === listing.coordinates.lat
          ) {
            currentPopup.remove();
            popupRef.current = null;
            selectListing(null);
            return;
          }
          currentPopup.remove();
        }

        if (!mapRef.current) return;

        const popupContent = `
          <div class="listing-popup-content">
            <div class="relative w-full h-64 mb-4 rounded-t-lg overflow-hidden">
              <img 
                src="${listing.images[0]}" 
                alt="${listing.title}"
                class="w-full h-full object-cover"
                onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop'"
              />
              <button 
                class="close-popup-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all shadow-md hover:shadow-lg z-10"
                aria-label="Close"
              >
                <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="px-4 pb-4">
              <div class="flex items-start justify-between mb-2">
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-base mb-1">${
                    propertyTypeLabels[listing.propertyType]
                  } • ${listing.city}</h3>
                  <p class="text-sm text-muted-foreground mb-2 line-clamp-2">${
                    listing.title
                  }</p>
                </div>
                <div class="flex items-center gap-1 ml-2 shrink-0">
                  <svg class="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm font-medium">${listing.rating.toFixed(
                    1
                  )}</span>
                  <span class="text-xs text-muted-foreground">(${
                    listing.reviewCount
                  })</span>
                </div>
              </div>
              <div class="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                ${
                  listing.bedrooms > 0
                    ? `<span>${listing.bedrooms} chambre${
                        listing.bedrooms > 1 ? "s" : ""
                      }</span>`
                    : ""
                }
                ${
                  listing.bedrooms > 0 && listing.bathrooms > 0
                    ? "<span>•</span>"
                    : ""
                }
                ${
                  listing.bathrooms > 0
                    ? `<span>${listing.bathrooms} salle${
                        listing.bathrooms > 1 ? "s" : ""
                      } de bain</span>`
                    : ""
                }
              </div>
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-semibold">$${
                  listing.pricePerNight
                }</span>
                <span class="text-sm text-muted-foreground">/ nuit</span>
              </div>
            </div>
          </div>
        `;

        const point = mapRef.current.project([
          listing.coordinates.lng,
          listing.coordinates.lat,
        ]);
        const mapHeight = mapRef.current.getContainer().clientHeight;
        const mapWidth = mapRef.current.getContainer().clientWidth;

        const isNearBottom = point.y > mapHeight * 0.7;
        const isNearTop = point.y < mapHeight * 0.3;
        const isNearRight = point.x > mapWidth * 0.7;
        const isNearLeft = point.x < mapWidth * 0.3;

        let offsetX = 0;
        let offsetY = -30;

        if (isNearBottom) {
          offsetY = 20;
        } else if (isNearTop) {
          offsetY = -60;
        }

        if (isNearRight) {
          offsetX = -20;
        } else if (isNearLeft) {
          offsetX = 20;
        }

        const popup = new maplibregl.Popup({
          offset: [offsetX, offsetY],
          closeButton: false,
          closeOnClick: false,
          className: "listing-popup",
          maxWidth: "400px",
        })
          .setLngLat([listing.coordinates.lng, listing.coordinates.lat])
          .setHTML(popupContent)
          .addTo(mapRef.current!);

        const popupElement = popup.getElement();
        if (popupElement) {
          popupElement.style.zIndex = "1000";

          const closeButton = popupElement.querySelector(".close-popup-btn");
          if (closeButton) {
            closeButton.addEventListener("click", (e) => {
              e.stopPropagation();
              popup.remove();
              popupRef.current = null;
              selectListing(null);
            });
          }

          popupElement.addEventListener("click", (e) => {
            e.stopPropagation();
            if (mapRef.current) {
              isAnimatingRef.current = true;
              mapRef.current.flyTo({
                center: [listing.coordinates.lng, listing.coordinates.lat],
                zoom: Math.max(mapRef.current.getZoom(), 14),
                essential: true,
              });
            }
          });
        }

        popupRef.current = popup;
        selectListing(listing.id);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([listing.coordinates.lng, listing.coordinates.lat])
        .addTo(mapRef.current!);

      markersRef.current.set(listing.id, marker);
    });
  }, [listings, selectedListingId, selectListing]);

  const lastCenterRef = React.useRef({
    lat: mapCenter.lat,
    lng: mapCenter.lng,
  });
  const lastZoomRef = React.useRef(mapZoom);

  React.useEffect(() => {
    if (!mapRef.current) return;

    const centerChanged =
      Math.abs(lastCenterRef.current.lat - mapCenter.lat) > 0.0001 ||
      Math.abs(lastCenterRef.current.lng - mapCenter.lng) > 0.0001;
    const zoomChanged = Math.abs(lastZoomRef.current - mapZoom) > 0.1;

    if (centerChanged || zoomChanged) {
      isAnimatingRef.current = true;
      mapRef.current.flyTo({
        center: [mapCenter.lng, mapCenter.lat],
        zoom: mapZoom,
        essential: true,
      });
      lastCenterRef.current = { lat: mapCenter.lat, lng: mapCenter.lng };
      lastZoomRef.current = mapZoom;
    }
  }, [mapCenter, mapZoom]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
