import Link from "next/link";
import { SearchX } from "lucide-react";
import TaskSearchForm from "@/src/components/shohoj/TaskSearchForm";
import { getFrontendTasks } from "@/lib/shohoj-path/backend-api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await getFrontendTasks(q);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[34px] border border-emerald-100 bg-[linear-gradient(180deg,#f8fffb_0%,#ffffff_100%)] p-6 shadow-sm sm:p-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Search tasks</p>
          <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">
            Find the clearest path for your next real-world task
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Search in plain language and explore tasks with steps, documents, locations, time, and cost.
          </p>
        </div>

        <div className="mt-6">
          <TaskSearchForm defaultValue={q} />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              {q ? `Results for "${q}"` : "Recommended tasks"}
            </h2>
            <p className="text-sm text-slate-500">
              {results.length} task{results.length === 1 ? "" : "s"} found
            </p>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {results.map((task) => (
              <Link
                key={task.slug}
                href={`/tasks/${task.id}`}
                className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {task.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {task.difficulty}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{task.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{task.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-50 px-3 py-1">Steps {task.stepsCount}</span>
                  <span className="rounded-full bg-slate-50 px-3 py-1">Locations {task.locationsCount}</span>
                  <span className="rounded-full bg-slate-50 px-3 py-1">{task.estimatedDays}</span>
                  <span className="rounded-full bg-slate-50 px-3 py-1">BDT {task.estimatedCostBdt}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[30px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <SearchX className="mx-auto size-10 text-slate-300" />
            <h3 className="mt-4 text-xl font-semibold text-slate-900">No tasks matched yet</h3>
            <p className="mt-2 text-sm text-slate-600">
              Try another phrase like &quot;passport&quot;, &quot;bank account&quot;, or &quot;trade license&quot;.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
