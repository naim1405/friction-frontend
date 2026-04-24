"use client";
import { Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import useUserSlice from "@/src/redux/features/user/useUserSlice";
import { handleLogout } from "@/src/service/auth/logout";

const Navbar = () => {
    const router = useRouter();
    const { user, clearUser } = useUserSlice();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const isLoggedIn = Boolean(user.userId);

    const links = useMemo(
        () =>
            isLoggedIn
                ? [
                    { href: "/", label: "Home" },
                    { href: "/admin", label: "Admin List" },
                    { href: "/change", label: "Change Password" },
                    { href: "/create", label: "Create Account" },
                ]
                : [{ href: "/", label: "Home" }],
        [isLoggedIn]
    );

    const onLogout = async () => {
        try {
            setIsLoggingOut(true);
            await handleLogout();
            clearUser();
            toast.success("Logged out successfully.");
            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Logout failed. Please try again.");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500/90 via-teal-500/90 to-emerald-600/90 text-white shadow-lg">
                        <Sparkles className="size-4" />
                    </span>
                    <span>
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Admin Flow</span>
                        <span className="block text-base font-semibold text-slate-900">Nexus Console</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    {isLoggedIn ? (
                        <button
                            type="button"
                            onClick={onLogout}
                            disabled={isLoggingOut}
                            className="hidden items-center rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70 sm:inline-flex"
                        >
                            {isLoggingOut ? (
                                <span className="inline-flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    Logging out...
                                </span>
                            ) : (
                                "Logout"
                            )}
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="hidden rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 sm:inline-flex"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>

            <div className="mx-auto flex w-full max-w-6xl items-center gap-2 overflow-x-auto px-4 pb-3 md:hidden sm:px-6 lg:px-8">
                {links.map((link) => (
                    <Link
                        key={`${link.href}-mobile`}
                        href={link.href}
                        className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </header>
    );
};

export default Navbar;