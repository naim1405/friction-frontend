import { ShieldCheck } from "lucide-react";

export default function AuthLoader() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.16),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.16),transparent_46%)]" />

      <section className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white/95 p-8 text-center shadow-lg backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <ShieldCheck className="size-7" />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-slate-900">Checking your session</h1>
        <p className="mt-2 text-sm text-slate-600">
          Verifying authentication and refreshing access token securely.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.2s]" />
          <span className="size-2 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.1s]" />
          <span className="size-2 rounded-full bg-sky-500 animate-bounce" />
        </div>
      </section>
    </main>
  );
}
