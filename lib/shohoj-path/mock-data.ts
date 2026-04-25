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

export const tasks: TaskDetail[] = [
  {
    id: "task-passport",
    slug: "apply-passport",
    title: "Apply for a Passport",
    tagline: "Complete your passport process without unnecessary trips.",
    category: "Government Service",
    summary:
      "A guided workflow for preparing documents, visiting the correct offices, paying fees, and tracking police verification.",
    documentsCount: 6,
    stepsCount: 7,
    locationsCount: 4,
    estimatedDays: "7-10 days",
    estimatedCostBdt: 4070,
    difficulty: "Moderate",
    reviewCount: 120,
    savedCount: 386,
    popularityScore: 94,
    heroGradient: "from-emerald-500 via-green-500 to-lime-500",
    coverLabel: "Government Services",
    documents: [
      "National ID card or online birth registration certificate",
      "Existing passport copy if reissue",
      "Recent passport-size photos",
      "Profession certificate or student ID where applicable",
      "Utility bill copy for address proof",
      "Completed online application summary",
    ],
    aiSummary:
      "Shohoj Path recommends completing photo, photocopies, and online form review before office hours begin. This reduces waiting time and avoids repeat visits.",
    communityTip:
      "Users report the fastest flow is form + document check at home, bank payment before noon, then passport office visit with photocopies already stapled.",
    steps: [
      {
        id: "passport-step-1",
        order: 1,
        title: "Prepare required documents",
        description:
          "Collect the full document checklist and verify that your name, date of birth, and address match across records.",
        duration: "1 day",
        documents: [
          "National ID or birth certificate",
          "Passport-size photos",
          "Profession proof",
        ],
        tips: [
          "Keep two extra photocopy sets.",
          "Double-check English spellings before submission.",
        ],
        contributionLocked: false,
      },
      {
        id: "passport-step-2",
        order: 2,
        title: "Visit passport office for verification",
        description:
          "Go to your assigned regional passport office to verify the online application and documents.",
        duration: "1 day",
        documents: ["Application summary", "Original ID", "Photocopies"],
        tips: [
          "Reach before the main rush begins.",
          "Carry printed copies even if the form is online.",
        ],
        contributionLocked: false,
        locationId: "loc-passport-office",
      },
      {
        id: "passport-step-3",
        order: 3,
        title: "Submit application",
        description:
          "Submit your documents and signed application package at the designated counter.",
        duration: "30 min",
        documents: ["Signed form", "All supporting documents"],
        fee: 2000,
        tips: [
          "Keep the delivery slip safe.",
          "Ask the officer to confirm missing fields before leaving.",
        ],
        contributionLocked: false,
        locationId: "loc-passport-office",
      },
      {
        id: "passport-step-4",
        order: 4,
        title: "Biometric and photo capture",
        description:
          "Provide fingerprints, digital signature, and on-site photograph as part of enrollment.",
        duration: "30 min",
        documents: ["Delivery slip"],
        tips: [
          "Avoid reflective accessories during the photo step.",
          "Make sure fingerprints are dry and clear.",
        ],
        contributionLocked: false,
        locationId: "loc-passport-office",
      },
      {
        id: "passport-step-5",
        order: 5,
        title: "Pay fees at partner bank",
        description:
          "Complete passport fee payment at the recommended bank counter and collect the stamped receipt.",
        duration: "30 min",
        documents: ["Application reference"],
        fee: 2070,
        tips: [
          "Carry small-change cash backup.",
          "Take a photo of the stamped bank receipt.",
        ],
        contributionLocked: false,
        locationId: "loc-sonali-bank",
      },
      {
        id: "passport-step-6",
        order: 6,
        title: "Police verification follow-up",
        description:
          "Stay available on the contact number you submitted and keep originals ready if local police requests them.",
        duration: "3-5 days",
        documents: ["Original ID", "Address proof"],
        tips: [
          "Inform household members in advance.",
          "Keep your reference slip accessible.",
        ],
        contributionLocked: true,
        locationId: "loc-police-station",
      },
      {
        id: "passport-step-7",
        order: 7,
        title: "Collect passport",
        description:
          "Track delivery status and collect the passport from the office or delivery point when ready.",
        duration: "1 day",
        documents: ["Delivery slip", "Old passport if reissue"],
        tips: [
          "Check name spelling before leaving the counter.",
          "Keep a digital scan once collected.",
        ],
        contributionLocked: true,
        locationId: "loc-passport-office",
      },
    ],
    locations: [
      {
        id: "loc-user-start",
        name: "Your Location",
        category: "Other",
        address: "Current user location",
        area: "Dhaka",
        coordinates: { lat: 23.7801, lng: 90.4076 },
        officeHours: "Flexible",
      },
      {
        id: "loc-passport-office",
        name: "Agargaon Passport Office",
        category: "Government",
        address: "Passport Bhaban, Agargaon, Dhaka",
        area: "Agargaon",
        coordinates: { lat: 23.778, lng: 90.3792 },
        officeHours: "Sun-Thu, 9:00 AM-4:00 PM",
      },
      {
        id: "loc-sonali-bank",
        name: "Sonali Bank Agargaon Branch",
        category: "Bank",
        address: "Agargaon, Dhaka",
        area: "Agargaon",
        coordinates: { lat: 23.7735, lng: 90.3797 },
        officeHours: "Sun-Thu, 10:00 AM-4:00 PM",
      },
      {
        id: "loc-police-station",
        name: "Shahbagh Police Station",
        category: "Other",
        address: "Shahbagh, Dhaka",
        area: "Shahbagh",
        coordinates: { lat: 23.7389, lng: 90.3944 },
        officeHours: "24/7",
      },
    ],
    route: [
      { stepOrder: 0, label: "Your Location", distanceKm: 2.1, travelMinutes: 8 },
      {
        stepOrder: 2,
        label: "Passport Office",
        distanceKm: 1.4,
        travelMinutes: 6,
        locationId: "loc-passport-office",
      },
      {
        stepOrder: 5,
        label: "Sonali Bank",
        distanceKm: 2.6,
        travelMinutes: 9,
        locationId: "loc-sonali-bank",
      },
      {
        stepOrder: 6,
        label: "Police Station",
        distanceKm: 0.8,
        travelMinutes: 4,
        locationId: "loc-police-station",
      },
    ],
    reviews: [
      {
        id: "passport-review-1",
        user: "Tanvir Hasan",
        role: "Level 4 Contributor",
        comment:
          "Going to the bank before the office saved me nearly an hour because the payment queue got longer after noon.",
        upvotes: 243,
        createdAt: "2026-04-18T09:30:00.000Z",
      },
      {
        id: "passport-review-2",
        user: "Nafisa Rahman",
        role: "Community Member",
        comment:
          "The office asked for an extra photocopy of my NID, so carrying spare copies really helped.",
        upvotes: 118,
        createdAt: "2026-04-16T11:00:00.000Z",
      },
    ],
  },
  {
    id: "task-bank-account",
    slug: "open-bank-account",
    title: "Open a Bank Account",
    tagline: "Know the exact documents, branch flow, and next best stop.",
    category: "Banking",
    summary:
      "A citizen-friendly path for selecting a branch, collecting account forms, submitting KYC, and activating your account.",
    documentsCount: 5,
    stepsCount: 5,
    locationsCount: 3,
    estimatedDays: "1-2 days",
    estimatedCostBdt: 1200,
    difficulty: "Easy",
    reviewCount: 84,
    savedCount: 214,
    popularityScore: 88,
    heroGradient: "from-sky-500 via-cyan-500 to-teal-500",
    coverLabel: "Banking",
    documents: [
      "National ID card",
      "Passport-size photographs",
      "Proof of address",
      "TIN certificate if required",
      "Introducer information if bank requests",
    ],
    aiSummary:
      "The fastest path typically starts with choosing the branch that offers the account type you need, then preparing KYC photocopies before visiting.",
    communityTip:
      "Community contributors recommend calling the branch first to confirm introducer requirements, as they vary between banks.",
    steps: [
      {
        id: "bank-step-1",
        order: 1,
        title: "Choose branch and account type",
        description:
          "Compare savings, student, and current account requirements and shortlist the nearest branch.",
        duration: "20 min",
        documents: ["National ID"],
        tips: ["Check minimum balance policy.", "Confirm introducer requirement by phone."],
        contributionLocked: false,
      },
      {
        id: "bank-step-2",
        order: 2,
        title: "Prepare KYC documents",
        description:
          "Fill in the customer information form and attach photographs and identity documents.",
        duration: "45 min",
        documents: ["Photographs", "Address proof", "TIN if needed"],
        tips: ["Bring a pen.", "Write your phone number clearly on the form."],
        contributionLocked: false,
      },
      {
        id: "bank-step-3",
        order: 3,
        title: "Submit at branch counter",
        description:
          "Submit the form and supporting documents to the account opening desk for review.",
        duration: "1 hour",
        documents: ["Completed form", "Original documents"],
        tips: ["Ask about debit card delivery timeline."],
        contributionLocked: false,
        locationId: "loc-dhaka-bank",
      },
      {
        id: "bank-step-4",
        order: 4,
        title: "Make initial deposit",
        description:
          "Deposit the opening balance and collect the stamped receipt from the cash counter.",
        duration: "20 min",
        documents: ["Approved account opening slip"],
        fee: 1000,
        tips: ["Take a photo of the deposit receipt."],
        contributionLocked: true,
        locationId: "loc-dhaka-bank",
      },
      {
        id: "bank-step-5",
        order: 5,
        title: "Activate mobile banking and collect passbook",
        description:
          "Complete the final activation instructions before leaving the branch.",
        duration: "20 min",
        documents: ["Deposit receipt", "NID"],
        fee: 200,
        tips: ["Set transaction alerts before leaving."],
        contributionLocked: true,
        locationId: "loc-support-booth",
      },
    ],
    locations: [
      {
        id: "loc-dhaka-bank",
        name: "Dhaka Bank Dhanmondi Branch",
        category: "Bank",
        address: "Road 27, Dhanmondi, Dhaka",
        area: "Dhanmondi",
        coordinates: { lat: 23.7465, lng: 90.3747 },
        officeHours: "Sun-Thu, 10:00 AM-4:00 PM",
      },
      {
        id: "loc-support-booth",
        name: "Customer Service Booth",
        category: "Other",
        address: "Inside branch lobby",
        area: "Dhanmondi",
        coordinates: { lat: 23.7462, lng: 90.3744 },
        officeHours: "Sun-Thu, 10:00 AM-4:00 PM",
      },
      {
        id: "loc-nid-copy",
        name: "Nearby Print & Copy Center",
        category: "Other",
        address: "Dhanmondi 27, beside branch",
        area: "Dhanmondi",
        coordinates: { lat: 23.7471, lng: 90.3751 },
        officeHours: "Daily, 9:00 AM-9:00 PM",
      },
    ],
    route: [
      { stepOrder: 0, label: "Home", distanceKm: 1.8, travelMinutes: 7 },
      {
        stepOrder: 3,
        label: "Dhaka Bank",
        distanceKm: 0.2,
        travelMinutes: 2,
        locationId: "loc-dhaka-bank",
      },
      {
        stepOrder: 5,
        label: "Service Booth",
        distanceKm: 0.1,
        travelMinutes: 1,
        locationId: "loc-support-booth",
      },
    ],
    reviews: [
      {
        id: "bank-review-1",
        user: "Shamim Iqbal",
        role: "Contributor",
        comment:
          "Calling the branch saved me from making a second trip because they required two photos, not one.",
        upvotes: 77,
        createdAt: "2026-04-20T08:15:00.000Z",
      },
    ],
  },
  {
    id: "task-trade-license",
    slug: "get-trade-license",
    title: "Get a Trade License",
    tagline: "For small businesses that need a clearer municipal process.",
    category: "Citizen Support",
    summary:
      "A structured municipal task path for identifying the correct office, preparing business documents, and tracking approval status.",
    documentsCount: 7,
    stepsCount: 6,
    locationsCount: 3,
    estimatedDays: "3-5 days",
    estimatedCostBdt: 5600,
    difficulty: "Complex",
    reviewCount: 56,
    savedCount: 162,
    popularityScore: 79,
    heroGradient: "from-amber-500 via-orange-500 to-rose-500",
    coverLabel: "Citizen Support",
    documents: [
      "National ID",
      "Passport-size photos",
      "TIN certificate",
      "Rental agreement or ownership papers",
      "Business name details",
      "Holding tax receipt",
      "Application form",
    ],
    aiSummary:
      "Most delays happen because applicants visit the wrong municipality desk or miss property-related papers. Shohoj Path highlights those checks up front.",
    communityTip:
      "Contributors recommend confirming ward office jurisdiction before collecting signatures.",
    steps: [
      {
        id: "trade-step-1",
        order: 1,
        title: "Confirm municipality jurisdiction",
        description:
          "Identify which city corporation or municipality office handles your business address.",
        duration: "30 min",
        documents: ["Business address details"],
        tips: ["Use the ward map first.", "Confirm the correct counter number."],
        contributionLocked: false,
      },
      {
        id: "trade-step-2",
        order: 2,
        title: "Prepare property and owner documents",
        description:
          "Collect holding tax receipt, tenancy agreement or ownership papers, and applicant identification.",
        duration: "1 day",
        documents: ["NID", "Tax receipt", "Tenancy or ownership papers"],
        tips: ["Carry originals plus two photocopy sets."],
        contributionLocked: false,
      },
      {
        id: "trade-step-3",
        order: 3,
        title: "Collect and submit the application",
        description:
          "Get the trade license form, complete it, and submit it to the municipal desk.",
        duration: "1 day",
        documents: ["Filled form", "Supporting documents"],
        fee: 3500,
        tips: ["Ask for expected review timeline in writing if possible."],
        contributionLocked: false,
        locationId: "loc-city-corp",
      },
      {
        id: "trade-step-4",
        order: 4,
        title: "Pay processing charges",
        description:
          "Clear any municipal or associated bank fees linked to the application.",
        duration: "30 min",
        documents: ["Application slip"],
        fee: 2100,
        tips: ["Check if digital payment is accepted."],
        contributionLocked: true,
        locationId: "loc-municipal-bank",
      },
      {
        id: "trade-step-5",
        order: 5,
        title: "Inspection or local verification",
        description:
          "Stay reachable in case an inspector or licensing staff needs to verify the business location.",
        duration: "1-2 days",
        documents: ["Contact number", "Business address"],
        tips: ["Keep signage or proof of business activity visible."],
        contributionLocked: true,
      },
      {
        id: "trade-step-6",
        order: 6,
        title: "Collect trade license",
        description:
          "Pick up the approved trade license and verify the business name and address are correct.",
        duration: "30 min",
        documents: ["Application receipt"],
        tips: ["Scan the final license immediately."],
        contributionLocked: true,
        locationId: "loc-city-corp",
      },
    ],
    locations: [
      {
        id: "loc-city-corp",
        name: "Dhaka North City Corporation Office",
        category: "Government",
        address: "Gulshan 2, Dhaka",
        area: "Gulshan",
        coordinates: { lat: 23.7925, lng: 90.4078 },
        officeHours: "Sun-Thu, 9:00 AM-4:00 PM",
      },
      {
        id: "loc-municipal-bank",
        name: "Municipal Fee Collection Booth",
        category: "Bank",
        address: "Inside DNCC premises",
        area: "Gulshan",
        coordinates: { lat: 23.7928, lng: 90.4081 },
        officeHours: "Sun-Thu, 10:00 AM-3:30 PM",
      },
      {
        id: "loc-print-shop",
        name: "Ward Copy & Print Shop",
        category: "Other",
        address: "Next to ward office gate",
        area: "Gulshan",
        coordinates: { lat: 23.792, lng: 90.4072 },
        officeHours: "Daily, 8:30 AM-9:00 PM",
      },
    ],
    route: [
      { stepOrder: 0, label: "Start", distanceKm: 4.4, travelMinutes: 16 },
      {
        stepOrder: 3,
        label: "City Corporation",
        distanceKm: 0.1,
        travelMinutes: 1,
        locationId: "loc-city-corp",
      },
      {
        stepOrder: 4,
        label: "Fee Booth",
        distanceKm: 0.1,
        travelMinutes: 1,
        locationId: "loc-municipal-bank",
      },
    ],
    reviews: [
      {
        id: "trade-review-1",
        user: "Mehjabin Sultana",
        role: "Small Business Owner",
        comment:
          "The jurisdiction check was the most useful step. It prevented me from going to the wrong city corporation office.",
        upvotes: 64,
        createdAt: "2026-04-15T13:10:00.000Z",
      },
    ],
  },
];

export const communityInsights: CommunityInsight[] = [
  {
    id: "insight-1",
    title: "Most helpful passport shortcut",
    body:
      "Community votes strongly favor paying the bank fee before the lunch rush and carrying a stapled photocopy bundle.",
    upvotes: 243,
    taskSlug: "apply-passport",
    tag: "Popular",
  },
  {
    id: "insight-2",
    title: "Best branch check before opening an account",
    body:
      "Users want a quick branch rule summary because introducer and photo requirements vary more than expected.",
    upvotes: 121,
    taskSlug: "open-bank-account",
    tag: "Banking",
  },
  {
    id: "insight-3",
    title: "Trade license pain point",
    body:
      "Applicants repeatedly mention confusion around municipal jurisdiction, so that check should stay near the top of the workflow.",
    upvotes: 94,
    taskSlug: "get-trade-license",
    tag: "High impact",
  },
];

export const backendContracts: BackendEndpointContract[] = [
  {
    method: "GET",
    path: "/api/tasks",
    authRequired: false,
    description: "Return task cards for homepage, dashboard sections, and search seed results.",
    responseExample: {
      success: true,
      data: tasks.map((task) => ({
        id: task.id,
        slug: task.slug,
        title: task.title,
        category: task.category,
        summary: task.summary,
        estimatedDays: task.estimatedDays,
        estimatedCostBdt: task.estimatedCostBdt,
        stepsCount: task.stepsCount,
        locationsCount: task.locationsCount,
        reviewCount: task.reviewCount,
        savedCount: task.savedCount,
      })),
    },
  },
  {
    method: "GET",
    path: "/api/tasks/:slug",
    authRequired: false,
    description: "Return the full task detail with steps, locations, route, cost, and community review data.",
    responseExample: {
      success: true,
      data: tasks[0],
    },
  },
  {
    method: "GET",
    path: "/api/search?q=passport",
    authRequired: false,
    description: "Semantic or keyword search returning ranked tasks and AI understanding metadata.",
    responseExample: {
      success: true,
      data: {
        query: "passport",
        interpretedIntent: "Apply for a passport",
        results: [
          {
            slug: tasks[0].slug,
            title: tasks[0].title,
            matchScore: 0.98,
            whyMatched: "Matches government identity document workflow intent.",
          },
        ],
      },
    },
  },
  {
    method: "GET",
    path: "/api/community/insights",
    authRequired: false,
    description: "Return home and task-page community highlights aggregated from comments and votes.",
    responseExample: {
      success: true,
      data: communityInsights,
    },
  },
  {
    method: "GET",
    path: "/api/navigation/:slug",
    authRequired: false,
    description: "Return ordered route stops and route summary for the map widget.",
    responseExample: {
      success: true,
      data: {
        taskSlug: tasks[0].slug,
        totalDistanceKm: 6.9,
        totalTravelMinutes: 27,
        stops: tasks[0].route,
      },
    },
  },
  {
    method: "POST",
    path: "/api/contributions",
    authRequired: true,
    description: "Create a comment, improvement suggestion, or step edit proposal for a task.",
    requestExample: {
      taskSlug: "apply-passport",
      stepId: "passport-step-6",
      type: "improvement",
      comment:
        "Police verification was faster when I kept my landlord phone number ready.",
    },
    responseExample: {
      success: true,
      message: "Contribution submitted for moderation.",
      data: {
        contributionId: "contrib-1001",
        moderationStatus: "pending",
      },
    },
  },
  {
    method: "GET",
    path: "/api/contracts",
    authRequired: false,
    description: "Expose the backend contract list in one machine-readable response for coordination.",
    responseExample: {
      success: true,
      data: [],
    },
  },
  {
    method: "GET",
    path: "/api/location/reverse?lat=23.7801&lon=90.4076",
    authRequired: false,
    description: "Reverse geocode the visitor position into a current area label for the map header.",
    responseExample: {
      success: true,
      data: {
        area: "Tejgaon",
        fullAddress: "Tejgaon, Dhaka, Bangladesh",
        coordinates: {
          lat: 23.7801,
          lon: 90.4076,
        },
      },
    },
  },
];

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

export function getTaskBySlug(slug: string) {
  return tasks.find((task) => task.slug === slug);
}

export function searchTasks(query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return tasks;
  }

  return tasks
    .map((task) => {
      const haystack = [
        task.title,
        task.tagline,
        task.summary,
        task.category,
        ...task.documents,
        ...task.steps.map((step) => `${step.title} ${step.description}`),
      ]
        .join(" ")
        .toLowerCase();

      const score =
        haystack.includes(normalized) || normalized.split(" ").some((word) => haystack.includes(word))
          ? normalized.length / haystack.length + task.popularityScore / 100
          : 0;

      return { task, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.task);
}

export function getRelatedTasks(activeSlug: string) {
  return tasks.filter((task) => task.slug !== activeSlug).slice(0, 2);
}

export function getRouteSummary(route: RouteStop[]) {
  const totalDistanceKm = route.reduce((sum, stop) => sum + stop.distanceKm, 0);
  const totalTravelMinutes = route.reduce((sum, stop) => sum + stop.travelMinutes, 0);

  return {
    totalDistanceKm: Number(totalDistanceKm.toFixed(1)),
    totalTravelMinutes,
  };
}
