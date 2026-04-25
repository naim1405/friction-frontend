import Link from "next/link";
import { MessageCircleHeart, TrendingUp, Users } from "lucide-react";
import { communityInsights, tasks } from "@/lib/shohoj-path/mock-data";

export default function CommunityPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Community-driven intelligence</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Real user experience makes the route smarter
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Shohoj Path is designed to learn from contributors. Upvotes, comments, and practical corrections help the most efficient path rise to the top.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[26px] bg-emerald-50 p-5">
              <Users className="size-5 text-emerald-700" />
              <p className="mt-3 text-2xl font-semibold text-slate-900">2.4k+</p>
              <p className="text-sm text-slate-600">Community actions across reviews, votes, and saves</p>
            </div>
            <div className="rounded-[26px] bg-amber-50 p-5">
              <TrendingUp className="size-5 text-amber-700" />
              <p className="mt-3 text-2xl font-semibold text-slate-900">94%</p>
              <p className="text-sm text-slate-600">Average confidence on top-ranked workflow suggestions</p>
            </div>
            <div className="rounded-[26px] bg-sky-50 p-5">
              <MessageCircleHeart className="size-5 text-sky-700" />
              <p className="mt-3 text-2xl font-semibold text-slate-900">120</p>
              <p className="text-sm text-slate-600">Mock reviews on the most active passport task</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-950">Top insights</h2>
            <Link href="/contribute" className="text-sm font-semibold text-emerald-700">
              Add your insight
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {communityInsights.map((insight) => (
              <article key={insight.id} className="rounded-[26px] border border-slate-100 bg-slate-50/80 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {insight.tag}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">{insight.upvotes} upvotes</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{insight.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{insight.body}</p>
                <Link href={`/tasks/${insight.taskSlug}`} className="mt-4 inline-flex text-sm font-semibold text-emerald-700">
                  View related task
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <article className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Most discussed tasks</h2>
            <div className="mt-4 space-y-3">
              {tasks.map((task) => (
                <Link key={task.slug} href={`/tasks/${task.slug}`} className="block rounded-[24px] bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{task.title}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {task.reviewCount} reviews • {task.savedCount} saves
                  </p>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-[34px] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Contribution rules</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              <li>• Login is required before posting a contribution.</li>
              <li>• Contributions can target a task, a step, or a location note.</li>
              <li>• Backend moderation status is included in the mock API contract.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
