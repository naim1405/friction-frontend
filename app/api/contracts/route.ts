import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

  const response = await fetch(`${baseUrl}/contracts`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch contracts from backend.",
        data: [],
      },
      { status: response.status },
    );
  }

  const result = await response.json().catch(() => null);

  return NextResponse.json({
    success: Boolean(result?.success),
    data: result?.data ?? [],
    message: result?.message,
  });
}
