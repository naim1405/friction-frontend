import Link from "next/link";
import { CheckCircle2, Route } from "lucide-react";
import ContributionGate from "@/src/components/shohoj/ContributionGate";
import { tasks } from "@/lib/shohoj-path/mock-data";

export default function MyTasksPage() {
  const inProgress = tasks.slice(0, 2);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">My tasks</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Track what you want to finish next</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            This page is ready for backend integration with user-specific task progress, saved plans, and contribution history.
          </p>

          <div className="mt-6 space-y-4">
            {inProgress.map((task) => (
              <Link key={task.slug} href={`/tasks/${task.slug}`} className="block rounded-[28px] bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{task.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">{task.tagline}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {task.stepsCount} steps
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm">
            <Route className="size-5 text-emerald-700" />
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Expected backend shape</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Backend can later return user-specific progress like current step, last visited office, saved route, and follow-up reminders.
            </p>
          </article>

          <article className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm">
            <CheckCircle2 className="size-5 text-emerald-700" />
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Contribution status</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Suggested future data fields: `draft`, `pending`, `approved`, `rejected`, and reviewer notes.
            </p>
          </article>

          <ContributionGate />
        </div>
      </section>
    </main>
  );
}
