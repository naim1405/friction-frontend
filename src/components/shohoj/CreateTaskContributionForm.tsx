"use client";

import Link from "next/link";
import { Plus, Send, Trash2, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useUserSlice from "@/src/redux/features/user/useUserSlice";
import { getAccessToken } from "@/src/utils/authTokens";

type TaskLocationPayload = {
  name: string;
  address?: string;
  city?: string;
  country?: string;
  latitude: number;
  longitude: number;
  source: "openstreetmap";
  sourcePlaceId: string;
};

type LocationSearchResult = TaskLocationPayload & {
  id: string;
};

type StepDraft = {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  estimatedCost: string;
  documents: string;
  tips: string;
  useCustomLocation: boolean;
  customLocation: TaskLocationPayload | null;
};

const createStepDraft = (): StepDraft => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  estimatedTime: "",
  estimatedCost: "",
  documents: "",
  tips: "",
  useCustomLocation: false,
  customLocation: null,
});

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

function locationLabel(location: TaskLocationPayload) {
  return [location.name, location.address, location.city, location.country]
    .filter(Boolean)
    .join(", ");
}

async function searchOfficeLocations(query: string) {
  const response = await fetch(
    `/api/location/search?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Unable to search locations.");
  }

  return (result.data ?? []) as LocationSearchResult[];
}

type LocationSearchFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  disabled: boolean;
  helperText?: string;
  selectedLocation: TaskLocationPayload | null;
  onSelect: (location: TaskLocationPayload | null) => void;
};

function LocationSearchField({
  id,
  label,
  placeholder,
  disabled,
  helperText,
  selectedLocation,
  onSelect,
}: LocationSearchFieldProps) {
  const [query, setQuery] = useState(() =>
    selectedLocation ? locationLabel(selectedLocation) : "",
  );
  const [options, setOptions] = useState<LocationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    setQuery(selectedLocation ? locationLabel(selectedLocation) : "");
  }, [selectedLocation]);

  useEffect(() => {
    const nextQuery = query.trim();

    if (nextQuery.length < 2) {
      setOptions([]);
      setIsSearching(false);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        setIsSearching(true);
        const nextOptions = await searchOfficeLocations(nextQuery);
        setOptions(nextOptions);
      } catch {
        setOptions([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const showDropdown = useMemo(
    () => hasFocus && query.trim().length >= 2,
    [hasFocus, query],
  );

  return (
    <div className="relative">
      <label className="text-sm font-semibold text-slate-900" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          onSelect(null);
        }}
        onFocus={() => setHasFocus(true)}
        onBlur={() => window.setTimeout(() => setHasFocus(false), 120)}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-2 rounded-[8px]"
      />
      {helperText ? <p className="mt-1 text-xs text-slate-500">{helperText}</p> : null}

      {showDropdown ? (
        <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-[8px] border border-slate-200 bg-white shadow-lg">
          {isSearching ? (
            <p className="px-3 py-2 text-sm text-slate-600">Searching OpenStreetMap...</p>
          ) : options.length === 0 ? (
            <p className="px-3 py-2 text-sm text-slate-600">No locations found.</p>
          ) : (
            options.map((option) => (
              <button
                key={option.id}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onSelect(option);
                  setQuery(locationLabel(option));
                  setOptions([]);
                  setHasFocus(false);
                }}
                className="w-full border-b border-slate-100 px-3 py-2 text-left last:border-b-0 hover:bg-slate-50"
              >
                <p className="text-sm font-medium text-slate-900">{option.name}</p>
                <p className="text-xs text-slate-600">
                  {[option.address, option.city, option.country].filter(Boolean).join(", ")}
                </p>
              </button>
            ))
          )}
        </div>
      ) : null}

      {selectedLocation ? (
        <p className="mt-2 text-xs font-medium text-emerald-700">
          Selected: {locationLabel(selectedLocation)}
        </p>
      ) : null}
    </div>
  );
}

async function postTask(payload: unknown) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";
  const token = getAccessToken();

  const response = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Unable to submit task.");
  }

  return result.data as { id: string; slug: string; title: string };
}

export default function CreateTaskContributionForm() {
  const { user } = useUserSlice();
  const isLoggedIn = Boolean(user.userId);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Citizen Support");
  const [summary, setSummary] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");
  const [estimatedCostBdt, setEstimatedCostBdt] = useState("");
  const [difficulty, setDifficulty] = useState("Moderate");
  const [documents, setDocuments] = useState("");
  const [mainLocation, setMainLocation] = useState<TaskLocationPayload | null>(
    null,
  );
  const [steps, setSteps] = useState<StepDraft[]>([createStepDraft()]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTask, setCreatedTask] = useState<{
    slug: string;
    title: string;
  } | null>(null);

  const updateStep = (
    id: string,
    field: Exclude<keyof StepDraft, "id">,
    value: string | boolean | TaskLocationPayload | null,
  ) => {
    setSteps((current) =>
      current.map((step) =>
        step.id === id ? { ...step, [field]: value } : step,
      ),
    );
  };

  const removeStep = (id: string) => {
    setSteps((current) => current.filter((step) => step.id !== id));
  };

  const submitTask = async () => {
    if (!isLoggedIn) {
      toast.error("Please login before submitting a new task.");
      return;
    }

    if (!title.trim() || !summary.trim()) {
      toast.error("Add a task title and summary first.");
      return;
    }

    if (!mainLocation) {
      toast.error("Select a main office/location for the task.");
      return;
    }

    const incompleteStepNumbers = steps
      .map((step, index) => ({ step, number: index + 1 }))
      .filter(
        ({ step }) =>
          (step.title.trim() || step.description.trim()) &&
          !(step.title.trim() && step.description.trim()),
      )
      .map(({ number }) => number);

    if (incompleteStepNumbers.length > 0) {
      toast.error(
        `Complete title and description for step ${incompleteStepNumbers.join(", ")}.`,
      );
      return;
    }

    const missingCustomLocationNumbers = steps
      .map((step, index) => ({ step, number: index + 1 }))
      .filter(({ step }) => step.useCustomLocation && !step.customLocation)
      .map(({ number }) => number);

    if (missingCustomLocationNumbers.length > 0) {
      toast.error(
        `Select a step location for step ${missingCustomLocationNumbers.join(", ")}.`,
      );
      return;
    }

    const validSteps = steps.filter(
      (step) => step.title.trim() && step.description.trim(),
    );

    if (validSteps.length === 0) {
      toast.error("Add at least one step with a title and description.");
      return;
    }

    try {
      setIsSubmitting(true);
      setCreatedTask(null);

      const task = await postTask({
        title: title.trim(),
        tagline: summary.trim(),
        description: summary.trim(),
        summary: summary.trim(),
        category,
        mainLocation,
        estimatedDays: estimatedDays.trim() || "Time varies",
        estimatedCostBdt: Number(estimatedCostBdt || 0),
        difficulty,
        documents: splitLines(documents),
        aiSummary: summary.trim(),
        communityTip:
          "Submitted by the community. Add comments and votes to improve this path.",
        coverLabel: category,
        isPublished: true,
        steps: validSteps.map((step, index) => ({
          title: step.title.trim(),
          description: step.description.trim(),
          order: index + 1,
          estimatedTime: step.estimatedTime.trim() || "Time varies",
          estimatedCost: Number(step.estimatedCost || 0),
          documents: splitLines(step.documents),
          tips: splitLines(step.tips),
          contributionLocked: false,
          ...(step.useCustomLocation && step.customLocation
            ? { location: step.customLocation }
            : {}),
        })),
      });

      setCreatedTask({ slug: task.slug, title: task.title });
      setTitle("");
      setSummary("");
      setEstimatedDays("");
      setEstimatedCostBdt("");
      setDocuments("");
      setMainLocation(null);
      setSteps([createStepDraft()]);
      toast.success("Task submitted successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Task submission failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            className="text-sm font-semibold text-slate-900"
            htmlFor="task-title"
          >
            Task title
          </label>
          <Input
            id="task-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Apply for a driving license"
            disabled={!isLoggedIn}
            className="mt-2 rounded-[8px]"
          />
        </div>

        <div>
          <label
            className="text-sm font-semibold text-slate-900"
            htmlFor="task-category"
          >
            Category
          </label>
          <select
            id="task-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            disabled={!isLoggedIn}
            className="mt-2 h-10 w-full rounded-[8px] border border-slate-200 bg-white px-3 text-sm text-slate-700"
          >
            <option>Government Service</option>
            <option>Banking</option>
            <option>Education</option>
            <option>Citizen Support</option>
          </select>
        </div>

        <div>
          <label
            className="text-sm font-semibold text-slate-900"
            htmlFor="task-difficulty"
          >
            Difficulty
          </label>
          <select
            id="task-difficulty"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            disabled={!isLoggedIn}
            className="mt-2 h-10 w-full rounded-[8px] border border-slate-200 bg-white px-3 text-sm text-slate-700"
          >
            <option>Easy</option>
            <option>Moderate</option>
            <option>Complex</option>
          </select>
        </div>

        <div>
          <label
            className="text-sm font-semibold text-slate-900"
            htmlFor="task-days"
          >
            Estimated time
          </label>
          <Input
            id="task-days"
            value={estimatedDays}
            onChange={(event) => setEstimatedDays(event.target.value)}
            placeholder="Example: 2-3 days"
            disabled={!isLoggedIn}
            className="mt-2 rounded-[8px]"
          />
        </div>

        <div>
          <label
            className="text-sm font-semibold text-slate-900"
            htmlFor="task-cost"
          >
            Estimated cost
          </label>
          <Input
            id="task-cost"
            type="number"
            min="0"
            value={estimatedCostBdt}
            onChange={(event) => setEstimatedCostBdt(event.target.value)}
            placeholder="BDT"
            disabled={!isLoggedIn}
            className="mt-2 rounded-[8px]"
          />
        </div>

        <div className="sm:col-span-2">
          <LocationSearchField
            id="task-main-location"
            label="Main office location"
            placeholder="Search office, bank, or service center"
            helperText="Type at least 2 letters to search OpenStreetMap offices and select one."
            disabled={!isLoggedIn}
            selectedLocation={mainLocation}
            onSelect={setMainLocation}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="text-sm font-semibold text-slate-900"
            htmlFor="task-summary"
          >
            Summary
          </label>
          <Textarea
            id="task-summary"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="Describe what the task helps people complete."
            disabled={!isLoggedIn}
            className="mt-2 min-h-24 rounded-[8px]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="text-sm font-semibold text-slate-900"
            htmlFor="task-documents"
          >
            Required documents
          </label>
          <Textarea
            id="task-documents"
            value={documents}
            onChange={(event) => setDocuments(event.target.value)}
            placeholder="One document per line"
            disabled={!isLoggedIn}
            className="mt-2 min-h-24 rounded-[8px]"
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-950">Steps</h2>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setSteps((current) => [...current, createStepDraft()])
            }
            disabled={!isLoggedIn}
            className="rounded-[8px]"
          >
            <Plus className="size-4" />
            Add step
          </Button>
        </div>

        {steps.map((step, index) => (
          <div
            key={step.id}
            className="rounded-[8px] border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-slate-900">Step {index + 1}</p>
              {steps.length > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeStep(step.id)}
                  disabled={!isLoggedIn}
                  className="size-9 rounded-[8px] p-0"
                  aria-label={`Remove step ${index + 1}`}
                >
                  <Trash2 className="size-4" />
                </Button>
              ) : null}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Input
                value={step.title}
                onChange={(event) =>
                  updateStep(step.id, "title", event.target.value)
                }
                placeholder="Step title"
                disabled={!isLoggedIn}
                className="rounded-[8px] bg-white"
              />
              <Input
                value={step.estimatedTime}
                onChange={(event) =>
                  updateStep(step.id, "estimatedTime", event.target.value)
                }
                placeholder="Estimated time"
                disabled={!isLoggedIn}
                className="rounded-[8px] bg-white"
              />
              <Input
                type="number"
                min="0"
                value={step.estimatedCost}
                onChange={(event) =>
                  updateStep(step.id, "estimatedCost", event.target.value)
                }
                placeholder="Step cost"
                disabled={!isLoggedIn}
                className="rounded-[8px] bg-white"
              />
              <Textarea
                value={step.description}
                onChange={(event) =>
                  updateStep(step.id, "description", event.target.value)
                }
                placeholder="Step description"
                disabled={!isLoggedIn}
                className="min-h-20 rounded-[8px] bg-white sm:col-span-2"
              />
              <Textarea
                value={step.documents}
                onChange={(event) =>
                  updateStep(step.id, "documents", event.target.value)
                }
                placeholder="Step documents, one per line"
                disabled={!isLoggedIn}
                className="min-h-20 rounded-[8px] bg-white"
              />
              <Textarea
                value={step.tips}
                onChange={(event) =>
                  updateStep(step.id, "tips", event.target.value)
                }
                placeholder="Tips, one per line"
                disabled={!isLoggedIn}
                className="min-h-20 rounded-[8px] bg-white"
              />

              <div className="rounded-[8px] border border-slate-200 bg-white p-3 sm:col-span-2">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-slate-800"
                  htmlFor={`step-custom-location-${step.id}`}
                >
                  <input
                    id={`step-custom-location-${step.id}`}
                    type="checkbox"
                    checked={step.useCustomLocation}
                    onChange={(event) => {
                      const shouldUseCustom = event.target.checked;
                      updateStep(step.id, "useCustomLocation", shouldUseCustom);

                      if (!shouldUseCustom) {
                        updateStep(step.id, "customLocation", null);
                      }
                    }}
                    disabled={!isLoggedIn}
                  />
                  This step happens at a different location
                </label>

                {step.useCustomLocation ? (
                  <div className="mt-3">
                    <LocationSearchField
                      id={`step-location-search-${step.id}`}
                      label="Step-specific location"
                      placeholder="Search another office for this step"
                      disabled={!isLoggedIn}
                      selectedLocation={step.customLocation}
                      onSelect={(location) =>
                        updateStep(step.id, "customLocation", location)
                      }
                    />
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-slate-500">
                    Inherits task main location by default.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={submitTask}
        disabled={isSubmitting || !isLoggedIn}
        className="mt-6 h-11 w-full rounded-[8px] bg-emerald-600 text-white hover:bg-emerald-700"
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Submit task
      </Button>

      {createdTask ? (
        <div className="mt-4 rounded-[8px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span className="font-semibold">{createdTask.title}</span> is live.{" "}
          <Link
            href={`/tasks/${createdTask.slug}`}
            className="font-semibold underline"
          >
            View task
          </Link>
        </div>
      ) : null}
    </section>
  );
}
