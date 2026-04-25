"use client";

import { useMemo, useState } from "react";
import { Loader2, MessageSquarePlus, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskDetail } from "@/lib/shohoj-path/mock-data";
import useUserSlice from "@/src/redux/features/user/useUserSlice";
import { getAccessToken } from "@/src/utils/authTokens";

interface TaskContributionFormProps {
  task: TaskDetail;
}

async function postBackend<TPayload>(endpoint: string, payload: TPayload) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";
  const token = getAccessToken();

  const response = await fetch(`${baseUrl}${endpoint}`, {
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
    throw new Error(result?.message || "Request failed.");
  }

  return result;
}

export default function TaskContributionForm({ task }: TaskContributionFormProps) {
  const { user } = useUserSlice();
  const isLoggedIn = Boolean(user.userId);
  const [selectedStepId, setSelectedStepId] = useState(task.steps[0]?.id ?? "");
  const [content, setContent] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const selectedStep = useMemo(
    () => task.steps.find((step) => step.id === selectedStepId),
    [selectedStepId, task.steps]
  );

  const submitComment = async () => {
    if (!isLoggedIn) {
      toast.error("Please login before contributing.");
      return;
    }

    if (!selectedStepId || !content.trim()) {
      toast.error("Select a step and write your experience first.");
      return;
    }

    try {
      setIsCommenting(true);
      const result = await postBackend("/comments", {
        stepId: selectedStepId,
        content: content.trim(),
      });

      setContent("");
      toast.success(result.message || "Comment submitted successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit comment.");
    } finally {
      setIsCommenting(false);
    }
  };

  const submitVote = async () => {
    if (!isLoggedIn) {
      toast.error("Please login before voting.");
      return;
    }

    if (!selectedStepId) {
      toast.error("Select a step first.");
      return;
    }

    try {
      setIsVoting(true);
      const result = await postBackend("/votes", {
        stepId: selectedStepId,
        value: 1,
      });

      toast.success(result.message || "Vote submitted successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit vote.");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Contribute to this task</h2>
          <p className="mt-1 text-sm text-slate-600">
            Share a comment or upvote the most useful step.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={submitVote}
          disabled={isVoting || !isLoggedIn}
          className="h-10 rounded-[8px]"
        >
          {isVoting ? <Loader2 className="size-4 animate-spin" /> : <ThumbsUp className="size-4" />}
          Upvote
        </Button>
      </div>

      <div className="mt-5 space-y-4">
        <Select value={selectedStepId} onValueChange={setSelectedStepId}>
          <SelectTrigger className="h-11 rounded-[8px]">
            <SelectValue placeholder="Select a step" />
          </SelectTrigger>
          <SelectContent>
            {task.steps.map((step) => (
              <SelectItem key={step.id} value={step.id}>
                {step.order}. {step.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedStep ? (
          <p className="rounded-[8px] bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Selected: <span className="font-medium text-slate-900">{selectedStep.title}</span>
          </p>
        ) : null}

        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Share what happened, what documents were needed, or what route worked best..."
          className="min-h-28 rounded-[8px]"
          disabled={!isLoggedIn}
        />

        <Button
          type="button"
          onClick={submitComment}
          disabled={isCommenting || !isLoggedIn}
          className="h-11 w-full rounded-[8px] bg-emerald-600 text-white hover:bg-emerald-700"
        >
          {isCommenting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <MessageSquarePlus className="size-4" />
          )}
          Submit comment
        </Button>
      </div>
    </section>
  );
}
