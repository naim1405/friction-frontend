"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ReUseForm from "@/src/components/shared/form/ReForm";
import ReUseInput from "@/src/components/shared/form/ReInput";
import { resetPassword } from "@/src/service/auth/reset";
import type { ResetPasswordFormValues } from "@/src/types";
import { getErrorMessage } from "@/src/utils/apiError";
import { resetPasswordSchema } from "@/src/zod";

const resetNotes = [
  "Set a new password with at least 6 characters",
  "Your previous sessions will be invalidated",
  "Use a unique password you do not reuse elsewhere",
];

const ResetPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromQuery = searchParams.get("token")?.trim() ?? "";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async (data: FieldValues) => {
    const values = data as ResetPasswordFormValues;

    setIsSubmitting(true);

    try {
      const { ok, result } = await resetPassword({
        token: tokenFromQuery,
        newPassword: values.newPassword,
      });

      if (!ok || !result?.success) {
        throw new Error(getErrorMessage(result, "Unable to reset password."));
      }

      toast.success(result.message ?? "Password reset successfully.");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Reset failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-sky-300/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-6xl gap-6 rounded-3xl border border-black/10 bg-white/75 p-4 shadow-lg sm:p-8 lg:grid-cols-2">
        <aside className="hidden rounded-2xl bg-linear-to-br from-sky-500/90 via-blue-500/90 to-emerald-600/90 p-8 text-white lg:flex lg:flex-col gap-y-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="size-3.5" />
              Reset Password
            </span>
            <h1 className="text-4xl font-semibold leading-tight">
              Create a fresh password and secure your account.
            </h1>
            <p className="max-w-md text-sm text-white/85 sm:text-base">
              Paste your reset token and choose a new password. Once updated,
              your previous sessions are invalidated for safety.
            </p>
          </div>

          <ul className="space-y-3">
            {resetNotes.map((note) => (
              <li key={note} className="flex items-center gap-3 text-sm">
                <ShieldCheck className="size-4 text-emerald-100" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="rounded-2xl border border-black/10 bg-white/85 p-6 shadow-xl backdrop-blur-sm sm:p-8">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700">
              <LockKeyhole className="size-3.5" />
              New Password
            </span>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Set your new password
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Enter your reset token and new password to finish account
              recovery.
            </p>
          </div>

          {tokenFromQuery && (
            <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
              Reset token detected from URL and pre-filled below.
            </div>
          )}

          {!tokenFromQuery && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              No token found in URL. Paste your token manually from the reset
              email.
            </div>
          )}

          <ReUseForm
            key={tokenFromQuery || "manual-token"}
            resolver={zodResolver(resetPasswordSchema)}
            defaultValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            onSubmit={handleResetPassword}
            className="mt-6 space-y-4"
          >
            <ReUseInput
              name="newPassword"
              type="password"
              label="New Password"
              placeholder="Minimum 6 characters"
              icon={<ShieldCheck className="size-4" />}
              autoComplete="new-password"
              required
            />

            <ReUseInput
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              placeholder="Re-enter new password"
              icon={<ShieldCheck className="size-4" />}
              autoComplete="new-password"
              required
            />

            <Button
              type="submit"
              size="lg"
              className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Resetting password...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  Update Password
                  <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
          </ReUseForm>

          <div className="mt-5 flex items-center justify-center gap-4 text-sm text-slate-600">
            <Link
              href="/forget"
              className="font-medium text-sky-700 hover:text-sky-900 hover:underline"
            >
              Request another token
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/login"
              className="font-medium text-sky-700 hover:text-sky-900 hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

const ResetPageFallback = () => {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-3xl items-center justify-center rounded-2xl border border-black/10 bg-white/80 p-8 text-center shadow-sm">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
          <Loader2 className="size-4 animate-spin" />
          Loading reset page...
        </span>
      </section>
    </main>
  );
};

const ResetPage = () => {
  return (
    <Suspense fallback={<ResetPageFallback />}>
      <ResetPageContent />
    </Suspense>
  );
};

export default ResetPage;
