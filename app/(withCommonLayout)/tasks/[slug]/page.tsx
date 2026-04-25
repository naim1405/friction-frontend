import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bot,
  Clock3,
  MapPin,
  MessageSquare,
  NotebookPen,
  WalletCards,
} from "lucide-react";
import ContributionGate from "@/src/components/shohoj/ContributionGate";
import TaskMapPanel from "@/src/components/shohoj/TaskMapPanel";
import TaskContributionForm from "@/src/components/shohoj/TaskContributionForm";
import {
  getTaskComments,
  getFrontendTask,
  getFrontendTasks,
} from "@/lib/shohoj-path/backend-api";
import { getRouteSummary } from "@/lib/shohoj-path/mock-data";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const task = await getFrontendTask(slug);

  if (!task) {
    notFound();
  }

  const taskComments = await getTaskComments(task.id);
  const routeSummary = getRouteSummary(task.route);
  const relatedTasks = (await getFrontendTasks())
    .filter((relatedTask) => relatedTask.id !== task.id)
    .slice(0, 2);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <article className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                {task.category}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1">
                {task.estimatedDays}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1">
                BDT {task.estimatedCostBdt}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1">
                {task.reviewCount} reviews
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
              {task.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              {task.summary}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              <div className="rounded-[24px] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Steps
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {task.stepsCount}
                </p>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Locations
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {task.locationsCount}
                </p>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Documents
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {task.documentsCount}
                </p>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Difficulty
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {task.difficulty}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-950">
              Step-by-step process
            </h2>
            <div className="mt-6 space-y-4">
              {task.steps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5"
                >
                  <div className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                      {step.order}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {step.description}
                          </p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Est. {step.duration}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                        {step.documents.map((document) => (
                          <span
                            key={document}
                            className="rounded-full bg-white px-3 py-1"
                          >
                            {document}
                          </span>
                        ))}
                        {step.fee ? (
                          <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                            Fee BDT {step.fee}
                          </span>
                        ) : null}
                        {step.contributionLocked ? (
                          <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-600">
                            Contribution login required
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-4 rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Practical tips
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                          {step.tips.map((tip) => (
                            <li key={tip}>- {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] bg-slate-50 p-4">
                <Clock3 className="size-5 text-emerald-700" />
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  Travel time
                </p>
                <p className="text-sm text-slate-600">
                  {routeSummary.totalTravelMinutes} minutes total
                </p>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-4">
                <WalletCards className="size-5 text-emerald-700" />
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  Estimated cost
                </p>
                <p className="text-sm text-slate-600">
                  BDT {task.estimatedCostBdt.toLocaleString()}
                </p>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-4">
                <NotebookPen className="size-5 text-emerald-700" />
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  Required docs
                </p>
                <p className="text-sm text-slate-600">
                  {task.documentsCount} items before starting
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              Documents & locations
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="rounded-[26px] bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Required documents
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {task.documents.map((document) => (
                    <li key={document}>- {document}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[26px] bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">Key locations</h3>
                <div className="mt-3 space-y-3">
                  {task.locations.map((location) => (
                    <div key={location.id} className="rounded-2xl bg-white p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1 size-4 text-emerald-700" />
                        <div>
                          <p className="font-semibold text-slate-900">
                            {location.name}
                          </p>
                          <p className="text-sm text-slate-600">
                            {location.address}
                          </p>
                          <p className="text-xs text-slate-500">
                            {location.officeHours}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[26px] bg-emerald-50 p-5">
                <div className="flex items-center gap-3">
                  <Bot className="size-5 text-emerald-700" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    AI summary
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {task.aiSummary}
                </p>
              </div>
              <div className="rounded-[26px] bg-amber-50 p-5">
                <div className="flex items-center gap-3">
                  <MessageSquare className="size-5 text-amber-700" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Community tip
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {task.communityTip}
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="space-y-6">
          <TaskMapPanel
            task={task}
            title="Interactive route preview"
            description="Live OpenStreetMap route panel showing current area when location permission is available."
            heightClassName="min-h-[520px]"
          />

          <ContributionGate taskSlug={task.slug} taskTitle={task.title} />

          <TaskContributionForm task={task} comments={taskComments} />

          <article className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-950">
                Related tasks
              </h2>
              <Link
                href="/search"
                className="text-sm font-semibold text-emerald-700"
              >
                See more
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {relatedTasks.map((relatedTask) => (
                <Link
                  key={relatedTask.slug}
                  href={`/tasks/${relatedTask.id}`}
                  className="block rounded-[24px] bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="font-semibold text-slate-900">
                    {relatedTask.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {relatedTask.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
