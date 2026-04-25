import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const response = await fetch(`${BACKEND_BASE_URL}/me`, {
    cache: "no-store",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const result = await response.json().catch(() => null);

  return NextResponse.json(result ?? { success: false, data: null }, {
    status: response.status,
  });
}
