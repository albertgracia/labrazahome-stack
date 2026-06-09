import { useState } from "react";
import type { ContentReviewProduct } from "../../../types/admin";
import ProductEditorialDetail from "./ProductEditorialDetail";

interface Props {
  products: ContentReviewProduct[];
}

const statusDotColor: Record<string, string> = {
  "Listo B2B": "bg-emerald-500",
  "SEO pendiente": "bg-indigo-500",
  "Necesita media": "bg-red-500",
  "En revisión": "bg-amber-500",
  Draft: "bg-zinc-400",
};

export default function ContentReviewBoard({ products }: Props) {
  const [selected, setSelected] = useState<ContentReviewProduct | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const isSelected = selected?.slug === p.slug;
          return (
            <button
              key={p.slug}
              onClick={() => setSelected(isSelected ? null : p)}
              className={`rounded-xl border p-5 text-left transition hover:shadow-lg ${
                isSelected
                  ? "border-primary/40 bg-primary/[0.04] ring-1 ring-primary/30"
                  : "border-border bg-card dark:border-border-dark dark:bg-card-dark"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${statusDotColor[p.editorialStatus] || "bg-zinc-400"}`}
                    />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    {p.editorialStatus}
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {p.completeness}%
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${p.hasImage ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-400"}`}
                >
                  {p.hasImage ? "IMG" : "NO-IMG"}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${p.hasSeo ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-400"}`}
                >
                  {p.hasSeo ? "SEO" : "NO-SEO"}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${p.isB2BReady ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-500/10 text-zinc-400"}`}
                >
                  {p.isB2BReady ? "B2B" : "B2B-"}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${p.isSommelierReady ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-500/10 text-zinc-400"}`}
                >
                  {p.isSommelierReady ? "SOM" : "SOM-"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <ProductEditorialDetail
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
