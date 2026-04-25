"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { TaskDetail } from "@/lib/shohoj-path/mock-data";
import type { FrontendTaskComment } from "@/lib/shohoj-path/backend-api";
import useUserSlice from "@/src/redux/features/user/useUserSlice";
import { getAccessToken } from "@/src/utils/authTokens";

interface TaskContributionFormProps {
  task: TaskDetail;
  comments: FrontendTaskComment[];
}

function formatCommentDate(value?: string) {
  if (!value) {
    return "Recently";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return "Recently";
  }

  return parsed.toLocaleString();
}

async function postBackend<TPayload>(endpoint: string, payload: TPayload) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";
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

export default function TaskContributionForm({
  task,
  comments,
}: TaskContributionFormProps) {
  const router = useRouter();
  const { user } = useUserSlice();
  const isLoggedIn = Boolean(user.userId);
  const [content, setContent] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const submitComment = async () => {
    if (!isLoggedIn) {
      toast.error("Please login before contributing.");
      return;
    }

    if (!content.trim()) {
      toast.error("Write your experience first.");
      return;
    }

    try {
      setIsCommenting(true);
      const result = await postBackend("/comments", {
        taskId: task.id,
        content: content.trim(),
      });

      setContent("");
      toast.success(result.message || "Comment submitted successfully.");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to submit comment.",
      );
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            Contribute to this task
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Share your experience to help others complete this task.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Share your experience on this task so others can learn from it..."
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

        <div className="rounded-[8px] border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">Recent comments</p>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
              {comments.length}
            </span>
          </div>

          {comments.length > 0 ? (
            <div className="mt-3 space-y-2.5">
              {comments.map((comment) => (
                <div key={comment.id} className="rounded-[8px] bg-white p-3">
                  <p className="text-sm leading-6 text-slate-700">{comment.content}</p>
                  <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span>User {comment.userId.slice(0, 8)}</span>
                    <span>{formatCommentDate(comment.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              No comments yet. Be the first to add one.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
