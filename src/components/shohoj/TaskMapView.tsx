"use client";

import { useEffect } from "react";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Pane,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

interface RoutePoint {
  id: string;
  label: string;
  position: LatLngExpression;
  kind: "user" | "task";
}

interface TaskMapViewProps {
  center: LatLngExpression;
  zoom: number;
  routeLine: LatLngExpression[];
  routePoints: RoutePoint[];
  heightClassName?: string;
}

function createMarkerIcon(kind: RoutePoint["kind"], label: string) {
  if (kind === "user") {
    // Person icon for user location
    return L.divIcon({
      className: "shohoj-map-icon-wrapper",
      html: `<div class="shohoj-map-icon bg-slate-950 border-slate-950" style="display: flex; align-items: center; justify-content: center; padding: 0;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });
  }

  // Numbered badge for task locations
  const baseClass = "bg-emerald-600 text-white border-emerald-600";
  return L.divIcon({
    className: "shohoj-map-icon-wrapper",
    html: `<div class="shohoj-map-icon ${baseClass}">${label}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

function MapViewport({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, map, zoom]);

  return null;
}

export default function TaskMapView({
  center,
  zoom,
  routeLine,
  routePoints,
  heightClassName = "min-h-[420px]",
}: TaskMapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      className={`!block !w-full overflow-hidden rounded-[28px] ${heightClassName}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewport center={center} zoom={zoom} />
      {routeLine.length > 0 && (
        <Pane name="route-line" style={{ zIndex: 350 }}>
          <Polyline
            positions={routeLine}
            pathOptions={{
              color: "#2563eb",
              weight: 5,
              opacity: 0.85,
              dashArray: "10 10",
            }}
          />
        </Pane>
      )}
      {routePoints.map((point, index) => (
        <Marker
          key={point.id}
          position={point.position}
          icon={createMarkerIcon(
            point.kind,
            point.kind === "user" ? "You" : `${index}`,
          )}
        >
          <Tooltip direction="top" offset={[0, -18]} opacity={1}>
            <div className="space-y-1">
              <p className="font-semibold text-slate-900">{point.label}</p>
              <p className="text-xs text-slate-500">
                {point.kind === "user"
                  ? "Current/default starting point"
                  : "Task location"}
              </p>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
