import { NextRequest, NextResponse } from "next/server";

function hasMockAuth(request: NextRequest) {
  return request.headers.get("x-mock-user-id");
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        contributionId: "contrib-1001",
        taskSlug: "apply-passport",
        stepId: "passport-step-6",
        type: "improvement",
        moderationStatus: "pending",
      },
    ],
  });
}

export async function POST(request: NextRequest) {
  if (!hasMockAuth(request)) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication required to submit contribution.",
      },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);

  if (!body?.taskSlug || !body?.type || !body?.comment) {
    return NextResponse.json(
      {
        success: false,
        message: "taskSlug, type, and comment are required.",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Contribution submitted for moderation.",
      data: {
        contributionId: "contrib-1002",
        moderationStatus: "pending",
        received: body,
      },
    },
    { status: 201 },
  );
}
