import ContributionGate from "@/src/components/shohoj/ContributionGate";

export default function ContributePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Contribute</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
          Help improve real-world task guidance
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          This frontend page explains the login gate and contribution flow. Once the backend is ready, it can post to
          `/api/contributions` with task, step, contribution type, and moderation metadata.
        </p>

        <div className="mt-8">
          <ContributionGate />
        </div>

        <div className="mt-8 rounded-[28px] bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-950">Expected contribution payload</h2>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">
{`{
  "taskSlug": "apply-passport",
  "stepId": "passport-step-6",
  "type": "improvement",
  "comment": "Police verification was faster when I kept my landlord phone number ready."
}`}
          </pre>
        </div>
      </section>
    </main>
  );
}
