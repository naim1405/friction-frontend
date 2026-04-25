import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

function authHeader(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return undefined;
  }

  return `Bearer ${token}`;
}

export async function GET(request: NextRequest) {
  const response = await fetch(`${BACKEND_BASE_URL}/contributions`, {
    cache: "no-store",
    headers: {
      ...(authHeader(request)
        ? { Authorization: authHeader(request) as string }
        : {}),
    },
  });

  const result = await response.json().catch(() => null);

  return NextResponse.json(result ?? { success: false, data: [] }, {
    status: response.status,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const response = await fetch(`${BACKEND_BASE_URL}/contributions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader(request)
        ? { Authorization: authHeader(request) as string }
        : {}),
    },
    body: JSON.stringify(body ?? {}),
  });

  const result = await response.json().catch(() => null);

  return NextResponse.json(
    result ?? {
      success: false,
      message: "Unable to submit contribution.",
    },
    { status: response.status },
  );
}
