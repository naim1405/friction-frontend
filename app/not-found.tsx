"use client";

import { ArrowLeft, Home, SearchX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-blue-50" />

      <section className="relative mx-auto w-full max-w-5xl gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8 ">
        
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
            <SearchX className="size-3.5" />
            404 Error
          </span>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              This page does not exist.
            </h1>
            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
              The URL may be incorrect, or the content was moved to a different route.
              Use one of the actions below to continue.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => router.back()} className="rounded-xl">
              <ArrowLeft className="mr-2 size-4" />
              Go Back
            </Button>

            <Button variant="outline" asChild className="rounded-xl">
              <Link href="/">
                <Home className="mr-2 size-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
