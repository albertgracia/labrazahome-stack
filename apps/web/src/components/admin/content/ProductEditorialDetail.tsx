import type {
  ContentReviewProduct,
  EditorialChecklistItem,
} from "../../../types/admin";
import {
  editorialChecklistData,
  getSeoPreview,
  getSommelierReadiness,
  getB2BReadiness,
} from "../../../data/admin/contentManager";
import EditorialChecklist from "./EditorialChecklist";
import SeoPreviewPanel from "./SeoPreviewPanel";
import SommelierReadinessPanel from "./SommelierReadinessPanel";
import B2BReadinessPanel from "./B2BReadinessPanel";

interface Props {
  product: ContentReviewProduct;
  onClose: () => void;
}

export default function ProductEditorialDetail({ product, onClose }: Props) {
  const seo = getSeoPreview(product.name);
  const sommelierItems = getSommelierReadiness(product);
  const b2bItems = getB2BReadiness(product);

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-6 dark:bg-primary/[0.05]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-zinc-500/10 px-2 py-0.5 text-xs font-medium text-zinc-400">
              {product.category}
            </span>
            <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
              {product.editorialStatus}
            </span>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {product.completeness}% completo
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {product.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-zinc-100 dark:border-border-dark dark:hover:bg-zinc-800"
        >
          Cerrar
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold">Storytelling</h4>
            <p
              className={`mt-1 text-sm leading-relaxed ${product.hasStorytelling ? "text-zinc-700 dark:text-zinc-300" : "text-muted italic"}`}
            >
              {product.hasStorytelling
                ? product.storytelling
                : "Pendiente de redacción"}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Notas de cata / Uso</h4>
            <p
              className={`mt-1 text-sm leading-relaxed ${product.tastingNotes !== "pendiente de redacción" ? "text-zinc-700 dark:text-zinc-300" : "text-muted italic"}`}
            >
              {product.tastingNotes}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Maridajes</h4>
            <p
              className={`mt-1 text-sm leading-relaxed ${product.pairings !== "pendiente de redacción" ? "text-zinc-700 dark:text-zinc-300" : "text-muted italic"}`}
            >
              {product.pairings}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-xs text-muted">Rating:</span>
              <span className="ml-1 font-semibold">{product.rating} / 5.0</span>
            </div>
            <div>
              <span className="text-xs text-muted">Imagen principal:</span>
              <span
                className={`ml-1 font-semibold ${product.hasImage ? "text-emerald-500" : "text-red-500"}`}
              >
                {product.hasImage ? "✓" : "✗"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <EditorialChecklist items={editorialChecklistData} />
          <SeoPreviewPanel seo={seo} />
          <SommelierReadinessPanel items={sommelierItems} />
          <B2BReadinessPanel items={b2bItems} />
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
        <p className="text-xs text-amber-500">
          Vista previa editorial. No se puede editar realmente en esta fase de
          laboratorio.
        </p>
      </div>
    </div>
  );
}
