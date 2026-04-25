export type TaskCategory =
  | "Government Service"
  | "Banking"
  | "Education"
  | "Citizen Support";

export interface TaskLocation {
  id: string;
  name: string;
  category: "Government" | "Bank" | "University" | "Other";
  address: string;
  area: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  officeHours: string;
}

export interface TaskStep {
  id: string;
  order: number;
  title: string;
  description: string;
  duration: string;
  documents: string[];
  fee?: number;
  tips: string[];
  contributionLocked: boolean;
  locationId?: string;
}

export interface TaskReview {
  id: string;
  user: string;
  role: string;
  comment: string;
  upvotes: number;
  createdAt: string;
}

export interface RouteStop {
  stepOrder: number;
  label: string;
  distanceKm: number;
  travelMinutes: number;
  locationId?: string;
}

export interface TaskSummary {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: TaskCategory;
  summary: string;
  documentsCount: number;
  stepsCount: number;
  locationsCount: number;
  estimatedDays: string;
  estimatedCostBdt: number;
  difficulty: "Easy" | "Moderate" | "Complex";
  reviewCount: number;
  savedCount: number;
  popularityScore: number;
  heroGradient: string;
  coverLabel: string;
}

export interface TaskDetail extends TaskSummary {
  documents: string[];
  steps: TaskStep[];
  locations: TaskLocation[];
  route: RouteStop[];
  reviews: TaskReview[];
  aiSummary: string;
  communityTip: string;
}

export interface CommunityInsight {
  id: string;
  title: string;
  body: string;
  upvotes: number;
  taskSlug: string;
  tag: string;
}

export interface BackendEndpointContract {
  method: "GET" | "POST";
  path: string;
  authRequired: boolean;
  description: string;
  requestExample?: Record<string, unknown>;
  responseExample: Record<string, unknown>;
}

export const shohojPathCopy = {
  title: "Kivabe Kori?",
  brand: "Kivabe Kori?",
  tagline: "Lunch er agei hobe.",
  pitch:
    "An AI-powered, community-driven task navigation platform for Bangladesh that turns confusing real-world processes into clear, step-by-step journeys.",
};

export const homeHighlights = [
  {
    title: "AI-powered semantic search",
    description:
      "Users can ask in plain language and get an intent-aware task path instead of generic links.",
  },
  {
    title: "Map-based action flow",
    description:
      "Every key stop is attached to the task so users know where to go and in what order.",
  },
  {
    title: "Community-ranked best path",
    description:
      "Upvotes, comments, and AI analysis keep the most practical workflow on top.",
  },
];

export const backendContracts: BackendEndpointContract[] = [
  {
    method: "GET",
    path: "/api/v1/tasks",
    authRequired: false,
    description:
      "Return task cards and their ordered steps from the backend database.",
    responseExample: {
      success: true,
      data: [{ slug: "apply-passport", title: "Apply for a Passport" }],
    },
  },
  {
    method: "GET",
    path: "/api/v1/tasks/:idOrSlug",
    authRequired: false,
    description:
      "Return one task workflow with steps, documents, and linked locations.",
    responseExample: {
      success: true,
      data: { slug: "apply-passport", steps: [] },
    },
  },
  {
    method: "GET",
    path: "/api/v1/locations",
    authRequired: false,
    description:
      "Return seeded places such as government offices, banks, and support services.",
    responseExample: {
      success: true,
      data: [{ name: "Agargaon Passport Office", city: "Dhaka" }],
    },
  },
  {
    method: "POST",
    path: "/api/v1/comments",
    authRequired: true,
    description: "Create a community comment for a task.",
    requestExample: {
      taskId: "backend-task-id",
      content: "The queue was shorter before lunch.",
    },
    responseExample: {
      success: true,
      message: "Comment created successfully!",
    },
  },
  {
    method: "POST",
    path: "/api/v1/votes",
    authRequired: true,
    description: "Upvote a useful task step.",
    requestExample: {
      stepId: "backend-step-id",
      value: 1,
    },
    responseExample: {
      success: true,
      message: "Vote created successfully!",
    },
  },
];

export function getRouteSummary(route: RouteStop[]) {
  const totalDistanceKm = route.reduce((sum, stop) => sum + stop.distanceKm, 0);
  const totalTravelMinutes = route.reduce(
    (sum, stop) => sum + stop.travelMinutes,
    0,
  );

  return {
    totalDistanceKm: Number(totalDistanceKm.toFixed(1)),
    totalTravelMinutes,
  };
}
