import type { EditorialChecklistItem } from "../../../types/admin";

interface Props {
  items: EditorialChecklistItem[];
}

export default function EditorialChecklist({ items }: Props) {
  const done = items.filter((i) => i.done).length;
  return (
    <div className="rounded-xl border border-border bg-card p-5 dark:border-border-dark dark:bg-card-dark">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold">Checklist editorial</h4>
        <span className="text-xs text-muted">
          {done}/{items.length} completados
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(done / items.length) * 100}%` }}
        />
      </div>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div key={item.field} className="flex items-center gap-2">
            <span
              className={`text-sm ${item.done ? "text-emerald-500" : "text-zinc-400"}`}
            >
              {item.done ? "✓" : "○"}
            </span>
            <span
              className={`text-xs ${item.done ? "text-zinc-700 dark:text-zinc-300" : "text-muted"}`}
            >
              {item.field}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
