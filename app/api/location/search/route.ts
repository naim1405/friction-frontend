import { NextRequest, NextResponse } from "next/server";

type NominatimAddress = {
  city?: string;
  town?: string;
  village?: string;
  county?: string;
  state?: string;
  country?: string;
};

type NominatimItem = {
  place_id: number;
  display_name: string;
  name?: string;
  lat: string;
  lon: string;
  address?: NominatimAddress;
};

function pickCity(address?: NominatimAddress) {
  if (!address) {
    return undefined;
  }

  return (
    address.city ||
    address.town ||
    address.village ||
    address.county ||
    address.state
  );
}

function pickName(item: NominatimItem) {
  const parts = item.display_name.split(",").map((part) => part.trim());

  return item.name || parts[0] || "Selected location";
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() || "";

  if (query.length < 2) {
    return NextResponse.json(
      { success: false, message: "Search query must be at least 2 characters." },
      { status: 400 },
    );
  }

  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
    query,
  )}&addressdetails=1&limit=8&countrycodes=bd`;

  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en,bn",
      "User-Agent": "ShohojPathFrontend/1.0",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return NextResponse.json(
      { success: false, message: "Location search failed." },
      { status: 502 },
    );
  }

  const result = (await response.json()) as NominatimItem[];

  return NextResponse.json({
    success: true,
    data: result.map((item) => {
      const city = pickCity(item.address);
      const country = item.address?.country || "Bangladesh";

      return {
        id: `osm_${item.place_id}`,
        name: pickName(item),
        address: item.display_name,
        city,
        country,
        latitude: Number(item.lat),
        longitude: Number(item.lon),
        source: "openstreetmap" as const,
        sourcePlaceId: `osm_${item.place_id}`,
      };
    }),
  });
}
