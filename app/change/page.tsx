"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, KeyRound, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import ReUseForm from "@/src/components/shared/form/ReForm";
import ReUseInput from "@/src/components/shared/form/ReInput";
import { postAuth } from "@/src/service/auth/authRequest";
import { getErrorMessage } from "@/src/utils/apiError";

const changePasswordSchema = z
	.object({
		oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
		newPassword: z.string().min(6, "New password must be at least 6 characters"),
		confirmPassword: z.string().min(6, "Confirm your new password"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const changePasswordHighlights = [
	"Update your credentials securely",
	"Keep your account protected with strong passwords",
	"Use a password you do not reuse elsewhere",
];

const ChangePasswordPage = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isChanged, setIsChanged] = useState(false);

	const handleChangePassword = async (data: FieldValues) => {
		const values = data as ChangePasswordFormValues;

		setIsSubmitting(true);

		try {
			const { ok, result } = await postAuth("/auth/change-password", {
				oldPassword: values.oldPassword,
				newPassword: values.newPassword,
			});

			if (!ok || !result?.success) {
				throw new Error(getErrorMessage(result, "Unable to change password right now."));
			}

			setIsChanged(true);
			toast.success(result?.message ?? "Password changed successfully.");
			router.push("/login");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Password change failed. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
			<div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-rose-300/30 blur-3xl" />
			<div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl" />

			<section className="w-full max-w-6xl mx-auto grid gap-6 rounded-3xl border border-black/10 bg-white/75 p-4 shadow-lg sm:p-8 lg:grid-cols-2">
				<aside className="hidden rounded-2xl bg-linear-to-br from-rose-500/90 via-orange-500/90 to-amber-600/90 p-8 text-white lg:flex lg:flex-col gap-y-10">
					<div className="space-y-4">
						<span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
							<Sparkles className="size-3.5" />
							Change Password
						</span>
						<h1 className="text-4xl font-semibold leading-tight">Keep your account secure with a fresh password.</h1>
						<p className="max-w-md text-sm text-white/85 sm:text-base">
							Changing your password regularly helps protect your account from unauthorized access.
						</p>
					</div>

					<ul className="space-y-3">
						{changePasswordHighlights.map((highlight) => (
							<li key={highlight} className="flex items-center gap-3 text-sm">
								<CheckCircle2 className="size-4 text-amber-100" />
								<span>{highlight}</span>
							</li>
						))}
					</ul>
				</aside>

				<div className="rounded-2xl border border-black/10 bg-white/85 p-6 shadow-xl backdrop-blur-sm sm:p-8">
					<div className="space-y-2">
						<span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-700">
							<KeyRound className="size-3.5" />
							Password Update
						</span>
						<h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Change your password</h2>
						<p className="text-sm text-slate-600 sm:text-base">
							Enter your current password and choose a new one.
						</p>
					</div>

					<ReUseForm
						resolver={zodResolver(changePasswordSchema)}
						defaultValues={{
							oldPassword: "",
							newPassword: "",
							confirmPassword: "",
						}}
						onSubmit={handleChangePassword}
						className="mt-6 space-y-4"
					>
						<ReUseInput
							name="oldPassword"
							type="password"
							label="Current Password"
							placeholder="Enter current password"
							icon={<KeyRound className="size-4" />}
							autoComplete="current-password"
							required
						/>

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
									Updating password...
								</span>
							) : (
								<span className="inline-flex items-center gap-2">
									Update Password
									<ArrowRight className="size-4" />
								</span>
							)}
						</Button>
					</ReUseForm>

					{isChanged && (
						<div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
							Your password was changed successfully.
						</div>
					)}

					<div className="mt-5 flex items-center justify-center gap-4 text-sm text-slate-600">
						<Link href="/" className="font-medium text-rose-700 hover:text-rose-900 hover:underline">
							Back to dashboard
						</Link>
						<span className="text-slate-300">|</span>
						<Link href="/login" className="font-medium text-rose-700 hover:text-rose-900 hover:underline">
							Go to login
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
};

export default ChangePasswordPage;
