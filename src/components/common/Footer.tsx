"use client";

import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import useUserSlice from "@/src/redux/features/user/useUserSlice";

const Footer = () => {
  const { user } = useUserSlice();
  const isLoggedIn = Boolean(user.userId);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-slate-950 text-slate-200">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Kivabe Kori?</h2>
            <p className="max-w-md text-sm text-slate-300">
              Lunch er agei hobe.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-slate-300">
              Lunch er agei hobe.
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Quick Links</h3>
            <div className="grid gap-2 text-sm">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <Link href="/search" className="transition hover:text-white">
                Search Tasks
              </Link>
              <Link href="/community" className="transition hover:text-white">
                Community
              </Link>
              {isLoggedIn ? (
                <Link href="/contribute" className="transition hover:text-white">
                  Contribute
                </Link>
              ) : (
                <Link href="/login" className="transition hover:text-white">
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Contact</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="inline-flex items-center gap-2">
                <Mail className="size-4" />
                hello@shohojpath.bd
              </p>
              <p className="inline-flex items-center gap-2">
                <MapPin className="size-4" />
                Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-800 pt-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Kivabe Kori?. All rights reserved.</p>
          <p>Built to make everyday public tasks clearer, faster, and more navigable.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
