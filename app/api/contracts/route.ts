import { NextResponse } from "next/server";
import { backendContracts } from "@/lib/shohoj-path/mock-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: backendContracts,
  });
}
