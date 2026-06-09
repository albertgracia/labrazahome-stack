import type { SeoPreview } from "../../../types/admin";

interface Props {
  seo: SeoPreview;
}

export default function SeoPreviewPanel({ seo }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 dark:border-border-dark dark:bg-card-dark">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold">SEO Preview</h4>
        <span className="rounded-full border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 text-[10px] font-medium text-amber-400">
          {seo.status}
        </span>
      </div>
      <div className="mt-3 space-y-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
            SEO Title
          </p>
          <p className="mt-0.5 text-sm text-zinc-900 dark:text-zinc-100">
            {seo.title}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
            Meta Description
          </p>
          <p className="mt-0.5 text-xs text-muted">{seo.metaDescription}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
            Slug
          </p>
          <p className="mt-0.5 text-xs font-mono text-primary">{seo.slug}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
            Canonical
          </p>
          <p className="mt-0.5 text-xs font-mono text-muted break-all">
            {seo.canonical}
          </p>
        </div>
      </div>
    </div>
  );
}
