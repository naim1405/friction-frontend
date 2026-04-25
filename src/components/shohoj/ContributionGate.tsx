"use client";

import Link from "next/link";
import { ArrowRight, LockKeyhole, MessageSquarePlus } from "lucide-react";
import useUserSlice from "@/src/redux/features/user/useUserSlice";

interface ContributionGateProps {
  taskSlug?: string;
  taskTitle?: string;
}

export default function ContributionGate({
  taskSlug,
  taskTitle = "this task",
}: ContributionGateProps) {
  const { user } = useUserSlice();
  const isLoggedIn = Boolean(user.userId);

  if (isLoggedIn) {
    return (
      <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <MessageSquarePlus className="size-5" />
          </span>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">
              Contribute & improve
            </h3>
            <p className="text-sm leading-6 text-slate-600">
              You are signed in, so you can share real-world experience, suggest
              better steps, and help improve{" "}
              <span className="font-semibold text-slate-900">{taskTitle}</span>.
            </p>
          </div>
        </div>

        <Link
          href={taskSlug ? `/contribute?task=${taskSlug}` : "/contribute"}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Add contribution
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white">
          <LockKeyhole className="size-5" />
        </span>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Login required to contribute
          </h3>
          <p className="text-sm leading-6 text-slate-600">
            Anyone can browse task guidance, but contributions for{" "}
            <span className="font-semibold text-slate-900">{taskTitle}</span>{" "}
            require an account so community insights stay trustworthy.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Sign in to contribute
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}
