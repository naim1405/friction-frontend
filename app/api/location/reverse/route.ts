import { NextRequest, NextResponse } from "next/server";

function pickArea(address: Record<string, string | undefined>) {
  return (
    address.suburb ||
    address.neighbourhood ||
    address.city_district ||
    address.town ||
    address.city ||
    address.county ||
    address.state ||
    "Bangladesh"
  );
}

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { success: false, message: "lat and lon are required." },
      { status: 400 },
    );
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`,
    {
      headers: {
        "Accept-Language": "en,bn",
        "User-Agent": "ShohojPathFrontend/1.0",
      },
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { success: false, message: "Reverse geocoding failed." },
      { status: 502 },
    );
  }

  const result = await response.json();
  const address = result?.address ?? {};
  const fullAddress = result?.display_name ?? "Bangladesh";

  return NextResponse.json({
    success: true,
    data: {
      area: pickArea(address),
      fullAddress,
      coordinates: {
        lat: Number(lat),
        lon: Number(lon),
      },
    },
  });
}
