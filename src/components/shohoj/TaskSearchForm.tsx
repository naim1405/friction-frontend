import { Search, Sparkles } from "lucide-react";

interface TaskSearchFormProps {
  defaultValue?: string;
}

export default function TaskSearchForm({
  defaultValue = "",
}: TaskSearchFormProps) {
  return (
    <form
      action="/search"
      className="flex flex-col gap-3 rounded-[30px] border border-emerald-100 bg-white/90 p-4 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.28)] sm:flex-row sm:items-center"
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className="mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Search className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <label
            htmlFor="task-query"
            className="block text-sm font-semibold text-slate-900"
          >
            What task do you want to complete?
          </label>
          <input
            id="task-query"
            name="q"
            defaultValue={defaultValue}
            placeholder='Try: "How do I apply for a passport?" or "Open a bank account"'
            className="mt-1 w-full border-none bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
          />
          <p className="mt-1 text-xs text-slate-500">
            AI maps your intent to a task, then shows the best steps, locations,
            and route.
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        <Sparkles className="size-4" />
        Search
      </button>
    </form>
  );
}
