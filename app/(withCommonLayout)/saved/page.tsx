import Link from "next/link";
import { Bookmark, Clock3 } from "lucide-react";
import { getFrontendTasks } from "@/lib/shohoj-path/backend-api";

export default async function SavedPage() {
  const tasks = await getFrontendTasks();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <Bookmark className="size-5 text-emerald-700" />
          <div>
            <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">Saved journeys</h1>
            <p className="text-sm text-slate-600">A lightweight placeholder page for personalized saved tasks.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {tasks.map((task) => (
            <Link key={task.id} href={`/tasks/${task.id}`} className="rounded-[28px] bg-slate-50 p-5">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                Saved
              </span>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{task.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{task.summary}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500">
                <Clock3 className="size-3.5" />
                {task.estimatedDays}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
