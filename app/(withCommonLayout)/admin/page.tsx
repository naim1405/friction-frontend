"use client";

import {
  ArrowRight,
  RefreshCw,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAdminsQuery } from "@/src/redux/api/userApi";
import type { IResponse } from "@/src/types";
import { getErrorMessage } from "@/src/utils/apiError";

const AdminListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const queryParams = useMemo(
    () => ({
      limit: 50,
      searchTerm: searchTerm.trim() || undefined,
    }),
    [searchTerm],
  );

  const { data, isLoading, isFetching, error, refetch } =
    useGetAdminsQuery(queryParams);

  const admins = data?.data ?? [];
  const total = data?.meta?.total ?? admins.length;

  const errorMessage = useMemo(() => {
    if (!error) {
      return "";
    }

    const errorData = error as { data?: IResponse<unknown>; message?: string };
    return getErrorMessage(
      errorData.data ?? null,
      errorData.message ?? "Unable to load admin list.",
    );
  }, [error]);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-6 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl" />

      <section className="relative mx-auto w-full max-w-6xl rounded-3xl border border-black/10 bg-white/75 p-4 shadow-lg backdrop-blur-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              <UsersRound className="size-3.5" />
              Admin Directory
            </span>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Admin List
            </h1>
            <p className="text-sm text-slate-600 sm:text-base">
              View and manage admin accounts from one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => refetch()}
              className="rounded-full"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            <Link href="/create">
              <Button
                type="button"
                className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
              >
                Create Admin
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-black/10 bg-white/85 p-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, phone, email"
                className="h-10 rounded-xl pl-9"
              />
            </div>
            <p className="text-sm font-medium text-slate-600">
              Total admins: <span className="text-slate-900">{total}</span>
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {isLoading ? (
            <div className="space-y-2">
              <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
            </div>
          ) : admins.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
              <ShieldCheck className="mx-auto size-6 text-slate-400" />
              <p className="mt-2 text-sm font-semibold text-slate-700">
                No admins found
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Try changing the search or create a new admin.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Email</th>
                    <th className="px-3 py-3">Phone</th>
                    <th className="px-3 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {admins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-slate-50/80">
                      <td className="px-3 py-3 font-medium text-slate-900">
                        {admin.name}
                      </td>
                      <td className="px-3 py-3 text-slate-700">
                        {admin.email}
                      </td>
                      <td className="px-3 py-3 text-slate-700">
                        {admin.phone}
                      </td>
                      <td className="px-3 py-3">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminListPage;
