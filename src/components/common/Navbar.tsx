"use client";

import { Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useUserSlice from "@/src/redux/features/user/useUserSlice";
import { handleLogout } from "@/src/service/auth/logout";
import { clearAuthTokens } from "@/src/utils/authTokens";

const Navbar = () => {
  const router = useRouter();
  const { user, clearUser } = useUserSlice();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLoggedIn = Boolean(user.userId);
  const links = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Search Tasks" },
    { href: "/community", label: "Community" },
    { href: "/my-tasks", label: "My Tasks" },
    { href: "/saved", label: "Saved" },
  ];

  const onLogout = async () => {
    try {
      setIsLoggingOut(true);
      await handleLogout();
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Server logout failed, but local session was cleared.",
      );
    } finally {
      clearAuthTokens();
      clearUser();
      setIsLoggingOut(false);
      router.push("/");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 via-green-500 to-lime-500 text-white shadow-lg">
            <Sparkles className="size-4" />
          </span>
          <span>
            <span className="block text-[11px] font-semibold text-emerald-700">
              Lunch er agei hobe.
            </span>
            <span className="block text-base font-semibold text-slate-900">
              Kivabe Kori?
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contribute"
            className="hidden rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 lg:inline-flex"
          >
            Contribute
          </Link>
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

      <div className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-4 pb-3 md:hidden sm:px-6 lg:px-8">
        {links.map((link) => (
          <Link
            key={`${link.href}-mobile`}
            href={link.href}
            className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contribute"
          className="whitespace-nowrap rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
        >
          Contribute
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
