import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      id: "mock-user-1",
      name: "Tanvir Hasan",
      email: "tanvir@example.com",
      points: 120,
      contributionLevel: "Level 4 Contributor",
    },
  });
}
