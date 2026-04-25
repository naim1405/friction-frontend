import { NextResponse } from "next/server";
import { getRouteSummary, getTaskBySlug } from "@/lib/shohoj-path/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const task = getTaskBySlug(slug);

  if (!task) {
    return NextResponse.json(
      { success: false, message: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      taskSlug: task.slug,
      ...getRouteSummary(task.route),
      stops: task.route,
    },
  });
}
