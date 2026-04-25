"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ReUseForm from "@/src/components/shared/form/ReForm";
import ReUseInput from "@/src/components/shared/form/ReInput";
import { useCreateAdminMutation } from "@/src/redux/api/userApi";
import type { SignupFormValues } from "@/src/types";
import { signupSchema } from "@/src/zod";

const createHighlights = [
  "Create and onboard admin accounts quickly",
  "Use strong validation before account creation",
  "Keep credentials and roles consistent from day one",
];

const CreateAdminPage = () => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const [isCreated, setIsCreated] = useState(false);

  const handleCreateAdmin = async (data: FieldValues) => {
    const values = data as SignupFormValues;
    setIsCreated(false);

    try {
      const normalizedPhone = values.phone.replace(/\D/g, "");

      const response = await createAdmin({
        password: values.password,
        admin: {
          name: values.name.trim(),
          email: values.email.trim().toLowerCase(),
          phone: normalizedPhone,
        },
      }).unwrap();

      if (!response?.success) {
        throw new Error(response?.message ?? "Unable to create admin account.");
      }

      setIsCreated(true);
      toast.success(response.message ?? "Admin created successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Admin creation failed. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-black/10 bg-white p-4 shadow-lg sm:p-8">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            <Sparkles className="size-3.5" />
            Create Admin
          </span>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            Provision a new admin account in seconds.
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Set up a fresh admin profile with validated identity and secure
            credentials.
          </p>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {createHighlights.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>

        <ReUseForm
          resolver={zodResolver(signupSchema)}
          defaultValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleCreateAdmin}
          className="mt-8 space-y-4"
        >
          <div>
            <ReUseInput
              name="name"
              label="Full Name"
              placeholder="Your full name"
              icon={<UserRound className="size-4" />}
              autoComplete="name"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ReUseInput
              name="email"
              type="email"
              label="Email"
              placeholder="name@company.com"
              icon={<Mail className="size-4" />}
              autoComplete="email"
              required
            />

            <ReUseInput
              name="phone"
              type="tel"
              label="Phone"
              placeholder="01XXXXXXXXX"
              icon={<Phone className="size-4" />}
              autoComplete="tel"
              inputMode="numeric"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ReUseInput
              name="password"
              type="password"
              label="Password"
              placeholder="Minimum 6 characters"
              icon={<ShieldCheck className="size-4" />}
              autoComplete="new-password"
              required
            />

            <ReUseInput
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Re-enter password"
              icon={<ShieldCheck className="size-4" />}
              autoComplete="new-password"
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-2 h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Creating admin...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                Create Admin
                <ArrowRight className="size-4" />
              </span>
            )}
          </Button>
        </ReUseForm>

        {isCreated && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Admin account created successfully.
          </div>
        )}

        <div className="mt-5 flex items-center justify-center gap-4 text-sm text-slate-600">
          <Link
            href="/admin"
            className="font-medium text-emerald-700 hover:text-emerald-900 hover:underline"
          >
            View admin list
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            href="/"
            className="font-medium text-emerald-700 hover:text-emerald-900 hover:underline"
          >
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CreateAdminPage;
