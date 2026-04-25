"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Loader2,
  Mail,
  MailCheck,
  ShieldEllipsis,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ReUseForm from "@/src/components/shared/form/ReForm";
import ReUseInput from "@/src/components/shared/form/ReInput";
import { forgotPassword } from "@/src/service/auth/forgot";
import type { ForgotPasswordFormValues } from "@/src/types";
import { getErrorMessage } from "@/src/utils/apiError";
import { forgotPasswordSchema } from "@/src/zod";

const recoveryNotes = [
  "A secure reset link is sent to your inbox",
  "Links expire automatically for your safety",
  "You can request a new link anytime",
];

const ForgetPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleForgotPassword = async (data: FieldValues) => {
    const values = data as ForgotPasswordFormValues;

    setIsSubmitting(true);

    try {
      const { ok, result } = await forgotPassword({
        email: values.email.trim().toLowerCase(),
      });

      if (!ok || !result?.success) {
        throw new Error(
          getErrorMessage(result, "Unable to send password reset email."),
        );
      }

      setIsSent(true);
      toast.success(result.message ?? "Password reset email sent.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Request failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-5xl gap-6 rounded-3xl border border-black/10 bg-white/75 p-4 shadow-lg sm:p-8 lg:grid-cols-2">
        <aside className="hidden rounded-2xl bg-linear-to-br from-purple-500/90 via-sky-500/90 to-teal-600/90 p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="size-3.5" />
              Account Recovery
            </span>
            <h1 className="text-4xl font-semibold leading-tight">
              Reset your password in a secure flow.
            </h1>
            <p className="max-w-md text-sm text-white/85 sm:text-base">
              Enter your email and we will send a reset link. For security, we
              always return a generic success response.
            </p>
          </div>

          <ul className="space-y-3">
            {recoveryNotes.map((note) => (
              <li key={note} className="flex items-center gap-3 text-sm">
                <ShieldEllipsis className="size-4 text-amber-100" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="rounded-2xl border border-black/10 bg-white/85 p-6 shadow-xl backdrop-blur-sm sm:p-8">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700">
              <MailCheck className="size-3.5" />
              Forgot Password
            </span>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Recover account access
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              We will email a reset link if your account exists in our system.
            </p>
          </div>

          <ReUseForm
            resolver={zodResolver(forgotPasswordSchema)}
            defaultValues={{ email: "" }}
            resetOnSubmit
            onSubmit={handleForgotPassword}
            className="mt-6 space-y-4"
          >
            <ReUseInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@company.com"
              icon={<Mail className="size-4" />}
              autoComplete="email"
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
                  Sending reset link...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  Send Reset Link
                  <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
          </ReUseForm>

          {isSent && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              If an account exists with this email, a reset link has been sent
              to the inbox.
            </div>
          )}

          <div className="mt-5 flex items-center justify-center gap-4 text-sm text-slate-600">
            <Link
              href="/login"
              className="font-medium text-teal-700 hover:text-teal-900 hover:underline"
            >
              Back to login
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/signup"
              className="font-medium text-teal-700 hover:text-teal-900 hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgetPage;
