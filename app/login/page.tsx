"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  KeyRound,
  Loader2,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ReUseForm from "@/src/components/shared/form/ReForm";
import ReUseInput from "@/src/components/shared/form/ReInput";
import { login } from "@/src/service/auth/login";
import type { LoginFormValues } from "@/src/types";
import { getErrorMessage } from "@/src/utils/apiError";
import { loginSchema } from "@/src/zod";
import useUserSlice from "@/src/redux/features/user/useUserSlice";
import { persistAuthTokens } from "@/src/utils/authTokens";

const loginHighlights = [
  "Contribute step improvements with your account",
  "Track saved tasks and community activity",
  "Password reset available instantly",
];

const LoginPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useUserSlice();

  const handleLogin = async (data: FieldValues) => {
    const values = data as LoginFormValues;

    setIsSubmitting(true);

    try {
      const { ok, result } = await login({
        email: values.email,
        password: values.password,
      });

      if (!ok || !result?.success) {
        throw new Error(getErrorMessage(result, "Unable to login right now."));
      }
      const { id, email } = result.data;
      persistAuthTokens({
        accessToken: result.data?.accessToken,
        refreshToken: result.data?.refreshToken,
      });
      setUser({ userId: id, email });

      toast.success(result.message ?? "Login successful.");
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl" />

      <section className="w-full max-w-6xl mx-auto rounded-3xl border border-black/10 bg-white/70 p-4 grid gap-6 sm:p-8 grid-cols-1 lg:grid-cols-2 shadow-lg">
        <aside className="hidden rounded-2xl bg-linear-to-br from-amber-500/90 via-orange-500/90 to-cyan-600/90 p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="size-3.5" />
              Welcome Back
            </span>

            <h1 className="text-4xl font-semibold leading-tight">
              Sign in to contribute better real-world task guidance.
            </h1>

            <p className="max-w-md text-sm text-white/85 sm:text-base">
              Use your account to save tasks, add community insights, and help
              improve Shohoj Path for everyone.
            </p>
          </div>

          <ul className="space-y-3">
            {loginHighlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-3 text-sm">
                <ShieldCheck className="size-4 text-emerald-200" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="rounded-2xl border border-black/10 bg-white/85 p-6 shadow-xl backdrop-blur-sm sm:p-8">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <KeyRound className="size-3.5" />
              Sign In
            </span>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Welcome back to Shohoj Path
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Use your email and password to continue contributing and tracking
              tasks.
            </p>
          </div>

          <ReUseForm
            resolver={zodResolver(loginSchema)}
            defaultValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
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

            <ReUseInput
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              icon={<KeyRound className="size-4" />}
              autoComplete="current-password"
              required
            />

            <div className="flex items-center justify-end">
              <Link
                href="/forget"
                className="text-sm font-medium text-cyan-700 transition-colors hover:text-cyan-900 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  Continue
                  <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
          </ReUseForm>

          <p className="mt-5 text-center text-sm text-slate-600">
            New here?{" "}
            <Link
              href="/signup"
              className="font-semibold text-cyan-700 hover:text-cyan-900 hover:underline"
            >
              Create your account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
