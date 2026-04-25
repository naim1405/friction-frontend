import { NextResponse } from "next/server";
import { tasks } from "@/lib/shohoj-path/mock-data";

export async function GET() {
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
