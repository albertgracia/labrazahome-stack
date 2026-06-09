import type { ReadinessItem } from "../../../types/admin";

interface Props {
  items: ReadinessItem[];
}

export default function SommelierReadinessPanel({ items }: Props) {
  const ready = items.filter((i) => i.ready).length;
  return (
    <div className="rounded-xl border border-border bg-card p-5 dark:border-border-dark dark:bg-card-dark">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold">Sommelier Readiness</h4>
          <p className="text-xs text-muted">
            Preparación para recomendaciones AI
          </p>
        </div>
        <span className="rounded-full border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 text-[10px] font-medium text-amber-400">
          {ready}/{items.length}
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`text-sm ${item.ready ? "text-emerald-500" : "text-zinc-400"}`}
              >
                {item.ready ? "✓" : "○"}
              </span>
              <span className="text-xs text-zinc-700 dark:text-zinc-300">
                {item.label}
              </span>
            </div>
            <span
              className={`shrink-0 text-[10px] font-medium ${item.ready ? "text-emerald-500" : "text-muted"}`}
            >
              {item.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
