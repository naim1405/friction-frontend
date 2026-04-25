import { backendContracts } from "@/lib/shohoj-path/mock-data";

export default function ApiSpecPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Backend requirements</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
          Mock API contract for the backend team
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          These endpoints are already mocked in the frontend under `app/api/*`. The same shapes are also exported in
          `public/contracts/shohoj-path-backend-contract.json` for easy handoff.
        </p>
      </section>

      <section className="mt-8 grid gap-4">
        {backendContracts.map((contract) => (
          <article key={`${contract.method}-${contract.path}`} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                {contract.method}
              </span>
              <code className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{contract.path}</code>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {contract.authRequired ? "Auth required" : "Public"}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{contract.description}</p>

            {contract.requestExample ? (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Request example</p>
                <pre className="mt-2 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">
                  {JSON.stringify(contract.requestExample, null, 2)}
                </pre>
              </div>
            ) : null}

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Response example</p>
              <pre className="mt-2 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">
                {JSON.stringify(contract.responseExample, null, 2)}
              </pre>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
