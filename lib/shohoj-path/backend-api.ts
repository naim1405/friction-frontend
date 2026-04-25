import type {
  CommunityInsight,
  TaskCategory,
  TaskDetail,
  TaskLocation,
  TaskStep,
} from "@/lib/shohoj-path/mock-data";

type BackendResponse<T> = {
  statusCode?: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
};

type BackendTask = {
  id: string;
  slug: string;
  title: string;
  tagline?: string | null;
  description?: string | null;
  summary?: string | null;
  category?: string | null;
  estimatedDays?: string | null;
  estimatedCostBdt?: number | null;
  difficulty?: string | null;
  documents?: string[];
  aiSummary?: string | null;
  communityTip?: string | null;
  coverLabel?: string | null;
  reviewCount?: number;
  savedCount?: number;
  popularityScore?: number;
  isPublished?: boolean;
  steps?: BackendStep[];
};

type BackendStep = {
  id: string;
  taskId: string;
  title: string;
  description?: string | null;
  order: number;
  estimatedTime?: string | null;
  estimatedCost?: number | null;
  documents?: string[];
  tips?: string[];
  contributionLocked?: boolean;
  locationId?: string | null;
  location?: BackendLocation | null;
  comments?: BackendComment[];
  votes?: BackendVote[];
};

type BackendLocation = {
  id: string;
  name: string;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  latitude: number;
  longitude: number;
  type?: string | null;
  officeHours?: string | null;
};

type BackendComment = {
  id: string;
  stepId: string;
  userId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

type BackendVote = {
  id: string;
  stepId: string;
  userId: string;
  value: number;
};

const DEFAULT_BACKEND_URL = "http://localhost:5000/api/v1";

function getBackendBaseUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL;
}

async function backendFetch<T>(path: string) {
  const response = await fetch(`${getBackendBaseUrl()}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`);
  }

  const result = (await response.json()) as BackendResponse<T>;

  if (!result.success) {
    throw new Error(result.message || "Backend request failed.");
  }

  return result;
}

function toTaskCategory(category?: string | null): TaskCategory {
  if (
    category === "Government Service" ||
    category === "Banking" ||
    category === "Education" ||
    category === "Citizen Support"
  ) {
    return category;
  }

  return "Citizen Support";
}

function toDifficulty(difficulty?: string | null): TaskDetail["difficulty"] {
  if (difficulty === "Easy" || difficulty === "Moderate" || difficulty === "Complex") {
    return difficulty;
  }

  return "Moderate";
}

function locationCategory(type?: string | null): TaskLocation["category"] {
  const normalized = type?.toLowerCase() || "";

  if (normalized.includes("bank")) {
    return "Bank";
  }

  if (normalized.includes("university")) {
    return "University";
  }

  if (normalized.includes("government")) {
    return "Government";
  }

  return "Other";
}

function toTaskLocation(location: BackendLocation): TaskLocation {
  return {
    id: location.id,
    name: location.name,
    category: locationCategory(location.type),
    address:
      location.address ||
      [location.city, location.country].filter(Boolean).join(", ") ||
      "Bangladesh",
    area: location.city || location.country || "Bangladesh",
    coordinates: {
      lat: Number(location.latitude),
      lng: Number(location.longitude),
    },
    officeHours: location.officeHours || "See official office schedule",
  };
}

function findLocation(
  locationId: string | null | undefined,
  locations: BackendLocation[]
) {
  if (!locationId) {
    return undefined;
  }

  return locations.find((location) => location.id === locationId);
}

function toTaskStep(step: BackendStep): TaskStep {
  return {
    id: step.id,
    order: step.order,
    title: step.title,
    description: step.description || "Follow this step to continue the task workflow.",
    duration: step.estimatedTime || "Time not provided",
    documents: step.documents ?? [],
    fee: step.estimatedCost ?? undefined,
    tips: step.tips ?? [],
    contributionLocked: Boolean(step.contributionLocked),
    locationId: step.locationId ?? undefined,
  };
}

function moneyTotal(steps: BackendStep[]) {
  return steps.reduce((sum, step) => sum + Number(step.estimatedCost ?? 0), 0);
}

function toTaskDetail(task: BackendTask, locations: BackendLocation[]): TaskDetail {
  const backendSteps = [...(task.steps ?? [])].sort(
    (left, right) => left.order - right.order
  );
  const steps = backendSteps.map(toTaskStep);
  const linkedLocations = backendSteps
    .map((step) => step.location || findLocation(step.locationId, locations))
    .filter((location): location is BackendLocation => Boolean(location))
    .map(toTaskLocation);
  const taskLocations = Array.from(
    new Map(linkedLocations.map((location) => [location.id, location])).values()
  );
  const route = taskLocations.map((location, index) => ({
    stepOrder: steps[index]?.order ?? index + 1,
    label: location.name,
    distanceKm: 0,
    travelMinutes: 0,
    locationId: location.id,
  }));
  const documents = task.documents ?? [];

  return {
    id: task.id,
    slug: task.slug || task.id,
    title: task.title,
    tagline: task.tagline || task.description || task.title,
    category: toTaskCategory(task.category),
    summary: task.summary || task.description || task.tagline || "",
    documentsCount: documents.length,
    stepsCount: steps.length,
    locationsCount: taskLocations.length,
    estimatedDays: task.estimatedDays || "Time varies",
    estimatedCostBdt: task.estimatedCostBdt ?? moneyTotal(backendSteps),
    difficulty: toDifficulty(task.difficulty),
    reviewCount: task.reviewCount ?? 0,
    savedCount: task.savedCount ?? 0,
    popularityScore: task.popularityScore ?? 0,
    heroGradient: "from-emerald-500 via-green-500 to-lime-500",
    coverLabel: task.coverLabel || task.category || "Task",
    documents,
    steps,
    locations: taskLocations,
    route,
    reviews: [],
    aiSummary: task.aiSummary || task.summary || task.description || "",
    communityTip: task.communityTip || "Community updates will appear as users contribute.",
  };
}

export async function getFrontendTasks(searchTerm = "") {
  const params = new URLSearchParams({ limit: "50" });

  if (searchTerm.trim()) {
    params.set("searchTerm", searchTerm.trim());
  }

  const [taskResult, locationResult] = await Promise.all([
    backendFetch<BackendTask[]>(`/tasks?${params.toString()}`),
    backendFetch<BackendLocation[]>("/locations?limit=100"),
  ]);

  return taskResult.data.map((task) => toTaskDetail(task, locationResult.data));
}

export async function getFrontendTask(identifier: string) {
  const [taskResult, locationResult] = await Promise.all([
    backendFetch<BackendTask>(`/tasks/${identifier}`),
    backendFetch<BackendLocation[]>("/locations?limit=100"),
  ]);

  return toTaskDetail(taskResult.data, locationResult.data);
}

export async function getFrontendLocations() {
  const result = await backendFetch<BackendLocation[]>("/locations?limit=100");

  return result.data.map(toTaskLocation);
}

export async function getCommunityInsights(): Promise<CommunityInsight[]> {
  const tasks = await getFrontendTasks();

  return tasks.slice(0, 3).map((task) => ({
    id: `insight-${task.slug}`,
    title: task.title,
    body: task.communityTip,
    upvotes: task.popularityScore,
    taskSlug: task.slug,
    tag: task.category,
  }));
}

export async function getStepComments(stepId: string) {
  try {
    const result = await backendFetch<BackendComment[]>(
      `/comments?stepId=${stepId}&limit=20`
    );
    return result.data;
  } catch {
    return [];
  }
}
