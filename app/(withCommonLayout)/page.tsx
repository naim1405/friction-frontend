"use client";

import { ArrowRight, CheckCircle2, LockKeyhole, UsersRound } from "lucide-react";
import Link from "next/link";
import useUserSlice from "@/src/redux/features/user/useUserSlice";

const Main = () => {
    const { user } = useUserSlice();
    const isLoggedIn = Boolean(user.userId);

    const points = [
        "Secure cookie-based sessions and role control",
        "Fast onboarding for admin users and operators",
        "Recovery-ready auth flow with reset and change password",
    ];

    const cards = [
        {
            title: "Authentication Suite",
            description: "Login, signup, forgot, reset, and change-password flows in one coherent experience.",
            icon: <LockKeyhole className="size-5" />,
        },
        {
            title: "Admin Lifecycle",
            description: "Manage account setup and security updates with minimal friction.",
            icon: <UsersRound className="size-5" />,
        },
        {
            title: "Operational Readiness",
            description: "Designed UI patterns that keep credential and account workflows clear under pressure.",
            icon: <CheckCircle2 className="size-5" />,
        },
    ];

    return (
        <main className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />

            <section className="relative mx-auto w-full max-w-6xl rounded-3xl border border-black/10 bg-white/75 p-6 shadow-lg backdrop-blur-sm sm:p-10">
                <div className={`grid gap-8 ${isLoggedIn ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-1"} lg:items-center`}>
                    <div className="space-y-6">
                        <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
                            Authentication Platform
                        </span>

                        <div className="space-y-3">
                            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                                Modern admin access, built for secure daily operations.
                            </h1>
                            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
                                A complete authentication workspace with strong UX patterns for access control, account recovery,
                                and credential management.
                            </p>
                        </div>

                        <ul className="space-y-2">
                            {points.map((point) => (
                                <li key={point} className="flex items-center gap-3 text-sm text-slate-700 sm:text-base">
                                    <CheckCircle2 className="size-4 text-emerald-600" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href={isLoggedIn ? "/create" : "/login"}
                                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                {isLoggedIn ? "Create Account" : "Sign In"}
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>

                    {isLoggedIn && (
                        <div className="rounded-2xl border border-black/10 bg-white/90 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Auth Workflows</h2>
                            <p className="mt-1 text-sm text-slate-600">Quick links to your primary account actions.</p>

                            <div className="mt-5 grid gap-3">
                                <Link
                                    href="/create"
                                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                                >
                                    Create Account
                                </Link>
                                <Link
                                    href="/admin"
                                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                                >
                                    Admin List
                                </Link>
                                <Link
                                    href="/change"
                                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                                >
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="mx-auto mt-8 grid w-full max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <article
                        key={card.title}
                        className="rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
                    >
                        <span className="inline-flex size-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                            {card.icon}
                        </span>
                        <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Main;