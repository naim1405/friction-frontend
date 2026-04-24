"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Mail, Phone, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ReUseForm from "@/src/components/shared/form/ReForm";
import ReUseInput from "@/src/components/shared/form/ReInput";
import { signup } from "@/src/service/auth/signup";
import type { SignupFormValues } from "@/src/types";
import { getErrorMessage } from "@/src/utils/apiError";
import { signupSchema } from "@/src/zod";

const signupHighlights = [
	"Instant onboarding for admin users",
	"Role-based permissions from day one",
	"Secure password rules and validation",
];

const SignupPage = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSignup = async (data: FieldValues) => {
		const values = data as SignupFormValues;

		setIsSubmitting(true);

		try {
			const normalizedPhone = values.phone.replace(/\D/g, "");

			const { ok, result } = await signup({
				password: values.password,
				admin: {
					name: values.name.trim(),
					email: values.email.trim().toLowerCase(),
					phone: normalizedPhone,
				},
			});

			if (!ok || !result?.success) {
				throw new Error(getErrorMessage(result, "Unable to create account."));
			}

			toast.success(result.message ?? "Account created successfully.");
			router.push("/login");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Signup failed. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
			
            <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />
			<div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky-300/35 blur-3xl" />

			<section className="w-full max-w-6xl mx-auto grid gap-6 rounded-3xl border border-black/10 bg-white/75 p-4 shadow-lg sm:p-8 lg:grid-cols-2">

				<aside className="hidden rounded-2xl bg-linear-to-br from-emerald-500/90 via-teal-500/90 to-sky-600/90 p-8 text-white lg:flex lg:flex-col gap-y-10">
					
                    <div className="space-y-4">
						<span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
							<Sparkles className="size-3.5" />
							New Admin Access
						</span>
						<h1 className="text-4xl font-semibold leading-tight">
							Create an account and launch your control center.
						</h1>
						<p className="max-w-md text-sm text-white/85 sm:text-base">
							Set up your admin profile once and start managing teams, data, and workflows in a secure environment.
						</p>
					</div>

					<ul className="space-y-3">
						{signupHighlights.map((item) => (
							<li key={item} className="flex items-center gap-3 text-sm">
								<ShieldCheck className="size-4 text-emerald-200" />
								<span>{item}</span>
							</li>
						))}
					</ul>
				</aside>

				<div className="rounded-2xl border border-black/10 bg-white/85 p-6 shadow-xl sm:p-8">
					
                    <div className="space-y-2">
						<span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
							<UserRound className="size-3.5" />
							Create Account
						</span>
						<h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Register your admin profile</h2>
						<p className="text-sm text-slate-600 sm:text-base">
							Fill in your details below to create your workspace access.
						</p>
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
						onSubmit={handleSignup}
						className="mt-6 space-y-4"
					>
						<ReUseInput
							name="name"
							label="Full Name"
							placeholder="Your full name"
							icon={<UserRound className="size-4" />}
							autoComplete="name"
							required
						/>

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
							placeholder="Re-enter your password"
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
									Creating account...
								</span>
							) : (
								<span className="inline-flex items-center gap-2">
									Create Account
									<ArrowRight className="size-4" />
								</span>
							)}
						</Button>
					</ReUseForm>

					<p className="mt-5 text-center text-sm text-slate-600">
						Already have an account?{" "}
						<Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-900 hover:underline">
							Sign in
						</Link>
					</p>
				</div>
			</section>
		</main>
	);
};

export default SignupPage;
