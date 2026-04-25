import ContributionGate from "@/src/components/shohoj/ContributionGate";
import CreateTaskContributionForm from "@/src/components/shohoj/CreateTaskContributionForm";

export default function ContributePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Contribute</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
          Help improve real-world task guidance
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          Share a real process you know. Submitted tasks are saved in the backend and become available in search and task pages.
        </p>

        <div className="mt-8">
          <ContributionGate />
        </div>

        <div className="mt-8">
          <CreateTaskContributionForm />
        </div>
      </section>
    </main>
  );
}
