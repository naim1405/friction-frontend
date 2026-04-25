import { NextRequest, NextResponse } from "next/server";
import { getFrontendTasks } from "@/lib/shohoj-path/backend-api";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const results = await getFrontendTasks(query);

  return NextResponse.json({
    success: true,
    data: {
      query,
      interpretedIntent: query || "Explore available public tasks",
      total: results.length,
      results: results.map((task, index) => ({
        slug: task.slug,
        title: task.title,
        summary: task.summary,
        category: task.category,
        estimatedDays: task.estimatedDays,
        estimatedCostBdt: task.estimatedCostBdt,
        matchScore: Number((1 - index * 0.08).toFixed(2)),
        whyMatched: `Matches intent around ${task.category.toLowerCase()} workflows.`,
      })),
    },
  });
}
