import Link from "next/link";
import {
  ArrowRight,
  Bot,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import TaskSearchForm from "@/src/components/shohoj/TaskSearchForm";
import ContributionGate from "@/src/components/shohoj/ContributionGate";
import TaskMapPanel from "@/src/components/shohoj/TaskMapPanel";
import {
  communityInsights,
  homeHighlights,
  shohojPathCopy,
  tasks,
} from "@/lib/shohoj-path/mock-data";

export default function HomePage() {
  const featuredTask = tasks[0];
  const popularTasks = tasks.slice(0, 3);

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-emerald-100 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.16),_transparent_28%),linear-gradient(180deg,#f8fffb_0%,#ffffff_72%)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
                <Sparkles className="size-3.5" />
                {shohojPathCopy.title}
              </span>
              <div className="space-y-3">
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  {shohojPathCopy.brand}
                </h1>
                <p className="text-xl font-medium text-emerald-700">{shohojPathCopy.tagline}</p>
                <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                  {shohojPathCopy.pitch}
                </p>
              </div>
            </div>

            <TaskSearchForm />

            <div className="grid gap-4 sm:grid-cols-3">
              {homeHighlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.32)] backdrop-blur"
                >
                  <h2 className="text-base font-semibold text-slate-900">{highlight.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{highlight.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <TaskMapPanel
              title="Dashboard location map"
              description="OpenStreetMap shows your current location if shared, or Bangladesh by default. Routes appear when you select a task."
              heightClassName="min-h-[500px]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Popular tasks</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">Start from a proven path</h2>
              </div>
              <Link href="/search" className="text-sm font-semibold text-emerald-700">
                Explore all
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {popularTasks.map((task) => (
                <Link
                  key={task.slug}
                  href={`/tasks/${task.slug}`}
                  className="block rounded-[26px] border border-slate-100 bg-slate-50/80 p-5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{task.summary}</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {task.category}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-white px-3 py-1">Steps {task.stepsCount}</span>
                    <span className="rounded-full bg-white px-3 py-1">Locations {task.locationsCount}</span>
                    <span className="rounded-full bg-white px-3 py-1">Cost BDT {task.estimatedCostBdt}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <MessageCircleHeart className="size-5" />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">Community insights</h2>
                  <p className="text-sm text-slate-600">Real experiences help the best workflow rise to the top.</p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {communityInsights.map((insight) => (
                  <article key={insight.id} className="rounded-[24px] bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700">
                        {insight.upvotes} upvotes
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{insight.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <ContributionGate taskSlug={featuredTask.slug} taskTitle={featuredTask.title} />
          </div>
        </div>
      </section>

      <section className="border-t border-emerald-100 bg-slate-950 py-12 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <article className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <Bot className="size-6 text-emerald-300" />
            <h2 className="mt-4 text-xl font-semibold">AI Assistant</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Explain confusing forms, summarize next actions, and answer task questions in plain Bangla or English.
            </p>
          </article>
          <article className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <ArrowRight className="size-6 text-emerald-300" />
            <h2 className="mt-4 text-xl font-semibold">Map-first decisions</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Turn scattered locations into a useful order so people can finish more in fewer trips.
            </p>
          </article>
          <article className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <ShieldCheck className="size-6 text-emerald-300" />
            <h2 className="mt-4 text-xl font-semibold">Continuous improvement</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Votes, comments, and AI optimization keep the platform learning from real outcomes over time.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
