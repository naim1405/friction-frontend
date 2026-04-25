import { NextResponse } from "next/server";
import { getCommunityInsights } from "@/lib/shohoj-path/backend-api";

export async function GET() {
  const communityInsights = await getCommunityInsights();

  return NextResponse.json({
    success: true,
    data: communityInsights,
  });
}
