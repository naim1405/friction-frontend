import { NextRequest, NextResponse } from "next/server";
import { getFrontendTasks } from "@/lib/shohoj-path/backend-api";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() || "";
  const tasks = await getFrontendTasks(query);

  return NextResponse.json({
    success: true,
    data: tasks.map((task) => ({
      id: task.id,
      slug: task.slug,
      title: task.title,
      tagline: task.tagline,
      category: task.category,
      summary: task.summary,
      estimatedDays: task.estimatedDays,
      estimatedCostBdt: task.estimatedCostBdt,
      stepsCount: task.stepsCount,
      locationsCount: task.locationsCount,
      reviewCount: task.reviewCount,
      savedCount: task.savedCount,
      difficulty: task.difficulty,
      coverLabel: task.coverLabel,
    })),
  });
}
