"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";
import { LocateFixed, MapPinned, Route, ShieldAlert } from "lucide-react";
import type {
  TaskDetail,
  TaskLocation,
  RouteStop,
} from "@/lib/shohoj-path/mock-data";

const DynamicMap = dynamic(
  () => import("@/src/components/shohoj/TaskMapView"),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[420px] items-center justify-center rounded-[28px] bg-slate-100 text-sm text-slate-500">
        Loading map...
      </div>
    ),
  },
);

const BANGLADESH_CENTER = { lat: 23.685, lng: 90.3563 };
const BANGLADESH_ZOOM = 7;
const USER_FALLBACK = { lat: 23.7801, lng: 90.4076 };

interface TaskMapPanelProps {
  task?: TaskDetail;
  title?: string;
  description?: string;
  heightClassName?: string;
}

interface ReverseGeocodeState {
  area: string;
  fullAddress: string;
}

interface UserPositionState {
  lat: number;
  lng: number;
}

function pickLocationForStop(stop: RouteStop, locations: TaskLocation[]) {
  if (!stop.locationId) {
    return undefined;
  }

  return locations.find((location) => location.id === stop.locationId);
}

export default function TaskMapPanel({
  task,
  title = "Interactive location map",
  description = "Live OpenStreetMap view showing your location or Bangladesh.",
  heightClassName = "min-h-[420px]",
}: TaskMapPanelProps) {
  const [userPosition, setUserPosition] = useState<UserPositionState | null>(
    null,
  );
  const [reverseGeocode, setReverseGeocode] =
    useState<ReverseGeocodeState | null>(null);
  const [locationState, setLocationState] = useState<
    "loading" | "granted" | "denied" | "idle"
  >(() => {
    if (typeof navigator !== "undefined" && !("geolocation" in navigator)) {
      return "denied";
    }

    return "loading";
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    const onSuccess = async (position: GeolocationPosition) => {
      const nextPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setUserPosition(nextPosition);
      setLocationState("granted");

      try {
        const response = await fetch(
          `/api/location/reverse?lat=${nextPosition.lat}&lon=${nextPosition.lng}`,
        );
        const result = await response.json();

        if (response.ok && result?.success) {
          setReverseGeocode({
            area: result.data.area,
            fullAddress: result.data.fullAddress,
          });
        }
      } catch {
        setReverseGeocode(null);
      }
    };

    const onError = () => {
      setLocationState("denied");
    };

    const watchId = navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );

    return () => {
      void watchId;
    };
  }, []);

  const mapData = useMemo(() => {
    const start = userPosition ?? USER_FALLBACK;

    const center =
      userPosition && locationState === "granted"
        ? ([userPosition.lat, userPosition.lng] as LatLngExpression)
        : ([BANGLADESH_CENTER.lat, BANGLADESH_CENTER.lng] as LatLngExpression);

    const zoom =
      userPosition && locationState === "granted" ? 12 : BANGLADESH_ZOOM;

    // Only show routes if a task is provided
    const routePoints = task
      ? [
          {
            id: "user-location",
            label:
              reverseGeocode?.area ||
              (locationState === "granted"
                ? "Your current area"
                : "Bangladesh start"),
            position: [start.lat, start.lng] as LatLngExpression,
            kind: "user" as const,
          },
          ...task.route
            .map((stop) => pickLocationForStop(stop, task.locations))
            .filter((location): location is TaskLocation => Boolean(location))
            .map((location, index) => ({
              id: location.id,
              label: `${index + 1}. ${location.name}`,
              position: [
                location.coordinates.lat,
                location.coordinates.lng,
              ] as LatLngExpression,
              kind: "task" as const,
            })),
        ]
      : [
          {
            id: "user-location",
            label:
              reverseGeocode?.area ||
              (locationState === "granted"
                ? "Your current location"
                : "Bangladesh"),
            position: [start.lat, start.lng] as LatLngExpression,
            kind: "user" as const,
          },
        ];

    return {
      center,
      zoom,
      routeLine: task ? routePoints.map((point) => point.position) : [],
      routePoints,
    };
  }, [locationState, reverseGeocode?.area, task, userPosition]);

  return (
    <article className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <MapPinned className="size-3.5" />
          OpenStreetMap
        </span>
      </div>

      <div className="overflow-hidden rounded-[28px]">
        <DynamicMap
          center={mapData.center}
          zoom={mapData.zoom}
          routeLine={mapData.routeLine}
          routePoints={mapData.routePoints}
          heightClassName={heightClassName}
        />
      </div>

      <div
        className={`grid gap-3 border-t border-slate-100 px-6 py-5 ${task ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        <div className="rounded-[24px] bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <LocateFixed className="size-4 text-emerald-700" />
            <p className="text-sm font-semibold text-slate-900">Current area</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {reverseGeocode?.area ||
              (locationState === "loading"
                ? "Requesting location access..."
                : "Location unavailable, showing Bangladesh by default.")}
          </p>
        </div>

        {task && (
          <div className="rounded-[24px] bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Route className="size-4 text-emerald-700" />
              <p className="text-sm font-semibold text-slate-900">
                Route stops
              </p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {task.route.length} mapped stops connected in task order for quick
              trip planning.
            </p>
          </div>
        )}

        <div className="rounded-[24px] bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-emerald-700" />
            <p className="text-sm font-semibold text-slate-900">
              {task ? "Fallback behavior" : "Map behavior"}
            </p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {task
              ? "If location access is denied, the map opens to Bangladesh and still shows all task locations."
              : "Select a task to see its route and locations on the map."}
          </p>
        </div>
      </div>

      {reverseGeocode?.fullAddress ? (
        <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">
            Detected address area:
          </span>{" "}
          {reverseGeocode.fullAddress}
        </div>
      ) : null}
    </article>
  );
}
