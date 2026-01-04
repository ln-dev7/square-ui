"use client";

import * as React from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "next-themes";
import { useMapsStore } from "@/store/maps-store";
import { categories, tags as allTags } from "@/mock-data/locations";

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
  const userMarkerRef = React.useRef<maplibregl.Marker | null>(null);
  const popupRef = React.useRef<maplibregl.Popup | null>(null);
  const isAnimatingRef = React.useRef(false);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isHoveringPopupRef = React.useRef(false);
  const { resolvedTheme } = useTheme();

  const {
    mapCenter,
    mapZoom,
    mapStyle,
    setMapCenter,
    setMapZoom,
    selectLocation,
    selectedLocationId,
    userLocation,
    routeDestinationId,
    setUserLocation,
    getFilteredLocations,
    locations: allLocations,
  } = useMapsStore();

  const getMapStyleUrl = React.useCallback(() => {
    if (mapStyle === "default") {
      return resolvedTheme === "dark" ? MAP_STYLES.dark : MAP_STYLES.light;
    }
    return MAP_STYLES[mapStyle];
  }, [mapStyle, resolvedTheme]);

  const locations = getFilteredLocations();

  const getTagName = (tagId: string) => {
    return allTags.find((t) => t.id === tagId)?.name || tagId;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  React.useEffect(() => {
    const getLocationFromIP = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data.latitude && data.longitude) {
          const location = { lat: data.latitude, lng: data.longitude };
          setUserLocation(location);
          setMapCenter(location);
        }
      } catch {
        console.log("IP geolocation failed");
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);
        },
        () => {
          getLocationFromIP();
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
      );
    } else {
      getLocationFromIP();
    }
  }, [setUserLocation, setMapCenter]);

  const closePopup = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      if (!isHoveringPopupRef.current && popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
    }, 150);
  }, []);

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

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      map.remove();
      mapRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(getMapStyleUrl());
  }, [mapStyle, resolvedTheme, getMapStyleUrl]);

  React.useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
      return;
    }

    const el = document.createElement("div");
    el.className = "user-marker";
    el.innerHTML = `
      <div class="relative">
        <div class="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg"></div>
        <div class="absolute inset-0 w-4 h-4 rounded-full bg-blue-500/50 animate-ping"></div>
      </div>
    `;

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(mapRef.current);

    userMarkerRef.current = marker;
  }, [userLocation]);

  React.useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    locations.forEach((location) => {
      const category = categories.find((c) => c.id === location.categoryId);
      const color = category?.color || "#6b7280";
      const isSelected = selectedLocationId === location.id;
      const isRouteDestination = routeDestinationId === location.id;

      const el = document.createElement("div");
      el.className = "marker-container";
      el.innerHTML = `
        <div class="relative cursor-pointer transition-transform ${
          isSelected || isRouteDestination ? "scale-125" : "hover:scale-110"
        }">
          <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.164 0 0 7.164 0 16C0 28 16 40 16 40C16 40 32 28 32 16C32 7.164 24.836 0 16 0Z" fill="${
              isRouteDestination ? "#22c55e" : isSelected ? "#3b82f6" : color
            }"/>
            <circle cx="16" cy="14" r="6" fill="white"/>
          </svg>
          ${
            isSelected
              ? '<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/30 animate-ping"></div>'
              : ""
          }
          ${
            isRouteDestination
              ? '<div class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>'
              : ""
          }
        </div>
      `;

      el.addEventListener("click", () => {
        selectLocation(location.id);
      });

      el.addEventListener("mouseenter", () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }

        if (popupRef.current) {
          popupRef.current.remove();
        }

        const stars =
          "★".repeat(Math.floor(location.rating)) +
          "☆".repeat(5 - Math.floor(location.rating));

        const tagsHtml = location.tags
          .slice(0, 4)
          .map((tag) => `<span class="popup-tag">${getTagName(tag)}</span>`)
          .join("");

        const popupContent = `
          <div class="location-popup" data-popup-hover="true">
            <div class="popup-header">
              <div class="popup-icon" style="background-color: ${color}20;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="popup-title-section">
                <h3 class="popup-title">${location.name}</h3>
                <p class="popup-category">${category?.name || "Location"}</p>
              </div>
            </div>
            
            <p class="popup-description">${location.description}</p>
            
            <p class="popup-address">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              ${location.address}
            </p>
            
            ${tagsHtml ? `<div class="popup-tags">${tagsHtml}</div>` : ""}
            
            <div class="popup-stats">
              <div class="popup-stat">
                <span class="popup-rating">
                  <span class="stars">${stars}</span>
                  <span class="rating-value">${location.rating}</span>
                </span>
              </div>
              <div class="popup-stat">
                <svg class="popup-stat-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <span class="popup-stat-value">${location.visitCount}</span>
                <span class="popup-stat-label">visits</span>
              </div>
            </div>
            
            <div class="popup-footer">
              ${
                location.isFavorite
                  ? '<span class="popup-favorite">❤️ Favorite</span>'
                  : "<span></span>"
              }
              <span class="popup-date">Added ${formatDate(location.createdAt)}</span>
            </div>
          </div>
        `;

        const popup = new maplibregl.Popup({
          offset: [0, -35],
          closeButton: false,
          closeOnClick: false,
          className: "location-hover-popup",
          maxWidth: "380px",
        })
          .setLngLat([location.coordinates.lng, location.coordinates.lat])
          .setHTML(popupContent)
          .addTo(mapRef.current!);

        const popupElement = popup.getElement();
        if (popupElement) {
          popupElement.addEventListener("mouseenter", () => {
            isHoveringPopupRef.current = true;
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
            }
          });
          popupElement.addEventListener("mouseleave", () => {
            isHoveringPopupRef.current = false;
            closePopup();
          });
          popupElement.addEventListener("click", () => {
            selectLocation(location.id);
            popup.remove();
            popupRef.current = null;
          });
        }

        popupRef.current = popup;
      });

      el.addEventListener("mouseleave", () => {
        closePopup();
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([location.coordinates.lng, location.coordinates.lat])
        .addTo(mapRef.current!);

      markersRef.current.set(location.id, marker);
    });
  }, [locations, selectedLocationId, selectLocation, closePopup, routeDestinationId]);

  const routeDataRef = React.useRef<{
    coordinates: [number, number][];
    bounds: maplibregl.LngLatBounds;
  } | null>(null);

  React.useEffect(() => {
    if (!routeDestinationId || !userLocation) {
      routeDataRef.current = null;
      return;
    }

    const destination = allLocations.find((l) => l.id === routeDestinationId);
    if (!destination) {
      routeDataRef.current = null;
      return;
    }

    const fetchRoute = async () => {
      const start = `${userLocation.lng},${userLocation.lat}`;
      const end = `${destination.coordinates.lng},${destination.coordinates.lat}`;

      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`
        );
        const data = await response.json();

        if (data.routes && data.routes[0]) {
          const coordinates = data.routes[0].geometry.coordinates as [number, number][];
          const bounds = new maplibregl.LngLatBounds();
          bounds.extend([userLocation.lng, userLocation.lat]);
          bounds.extend([destination.coordinates.lng, destination.coordinates.lat]);
          coordinates.forEach((coord) => bounds.extend(coord));

          routeDataRef.current = { coordinates, bounds };

          const map = mapRef.current;
          if (map) {
            drawRoute(map, coordinates);
            isAnimatingRef.current = true;
            map.fitBounds(bounds, { padding: 80 });
          }
        }
      } catch (error) {
        console.error("Failed to fetch route:", error);
      }
    };

    fetchRoute();
  }, [routeDestinationId, userLocation, allLocations]);

  const drawRoute = React.useCallback((map: maplibregl.Map, coordinates: [number, number][]) => {
    if (map.getLayer("route-line")) map.removeLayer("route-line");
    if (map.getLayer("route-line-outline")) map.removeLayer("route-line-outline");
    if (map.getSource("route")) map.removeSource("route");

    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates,
        },
      },
    });

    map.addLayer({
      id: "route-line-outline",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#1d4ed8",
        "line-width": 8,
        "line-opacity": 0.4,
      },
    });

    map.addLayer({
      id: "route-line",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3b82f6",
        "line-width": 4,
        "line-opacity": 1,
      },
    });
  }, []);

  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const clearRoute = () => {
      if (map.getLayer("route-line")) map.removeLayer("route-line");
      if (map.getLayer("route-line-outline")) map.removeLayer("route-line-outline");
      if (map.getSource("route")) map.removeSource("route");
    };

    if (!routeDestinationId) {
      clearRoute();
    }
  }, [routeDestinationId]);

  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleStyleLoad = () => {
      if (routeDataRef.current && routeDestinationId) {
        drawRoute(map, routeDataRef.current.coordinates);
      }
    };

    map.on("style.load", handleStyleLoad);

    return () => {
      map.off("style.load", handleStyleLoad);
    };
  }, [drawRoute, routeDestinationId]);

  React.useEffect(() => {
    if (!mapRef.current || !selectedLocationId) return;
    if (routeDestinationId) return;

    const location = locations.find((l) => l.id === selectedLocationId);
    if (location) {
      isAnimatingRef.current = true;
      mapRef.current.flyTo({
        center: [location.coordinates.lng, location.coordinates.lat],
        zoom: Math.max(mapRef.current.getZoom(), 14),
        essential: true,
      });
    }
  }, [selectedLocationId, locations, routeDestinationId]);

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
