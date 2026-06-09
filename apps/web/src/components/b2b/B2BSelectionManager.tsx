import React, { useState, useEffect, useCallback } from "react";
import type {
  B2BSelectionItem,
  B2BUseCase,
  B2BSelectionSummary,
} from "../../types/b2b";
import { B2B_USE_CASES, SELECTION_STORAGE_KEY } from "../../types/b2b";
import {
  loadSelection,
  saveSelection,
  addToSelection,
  removeFromSelection,
  updateQuantity,
  updateUseCase,
  clearSelection as clearStorageSelection,
  computeSummary,
} from "../../data/b2b/quoteFlow";

interface CatalogProduct {
  slug: string;
  name: string;
  category: string;
  image: string;
  professionalUse: string;
  moq: string;
}

interface Props {
  products: CatalogProduct[];
}

const QUANTITY_OPTIONS = [1, 6, 12, 24, 48, 96];

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function B2BSelectionManager({ products }: Props) {
  const [selection, setSelection] = useState<B2BSelectionItem[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [justCleared, setJustCleared] = useState(false);

  useEffect(() => {
    setSelection(loadSelection());
  }, []);

  useEffect(() => {
    saveSelection(selection);
  }, [selection]);

  const summary: B2BSelectionSummary = computeSummary(selection);

  const handleAdd = useCallback(
    (slug: string, name: string, category: string) => {
      setSelection((prev) => addToSelection(slug, name, category, prev));
      setJustCleared(false);
    },
    [],
  );

  const handleRemove = useCallback((slug: string) => {
    setSelection((prev) => removeFromSelection(slug, prev));
  }, []);

  const handleQty = useCallback((slug: string, qty: number) => {
    setSelection((prev) => updateQuantity(slug, qty, prev));
  }, []);

  const handleUseCase = useCallback((slug: string, uc: B2BUseCase) => {
    setSelection((prev) => updateUseCase(slug, uc, prev));
  }, []);

  const handleClear = useCallback(() => {
    setSelection([]);
    clearStorageSelection();
    setJustCleared(true);
    setShowPreview(false);
    setTimeout(() => setJustCleared(false), 2000);
  }, []);

  const handlePrepare = useCallback(() => {
    if (selection.length === 0) return;
    setShowPreview(true);
  }, [selection]);

  const isInSelection = useCallback(
    (slug: string) => selection.some((i) => i.productSlug === slug),
    [selection],
  );

  const getItem = useCallback(
    (slug: string) => selection.find((i) => i.productSlug === slug),
    [selection],
  );

  return (
    <div className="space-y-8">
      {/* Product Catalog */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Catálogo profesional</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const inSel = isInSelection(p.slug);
            const item = getItem(p.slug);
            return (
              <div
                key={p.slug}
                className={`rounded-xl border p-5 transition hover:shadow-lg ${
                  inSel
                    ? "border-primary/30 bg-primary/[0.03]"
                    : "border-border bg-card dark:border-border-dark dark:bg-card-dark"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                    {p.image || "📦"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{p.name}</h3>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-primary/60">
                      {p.category}
                    </span>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {p.professionalUse}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full border border-zinc-500/20 bg-zinc-500/5 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                        {p.moq}
                      </span>
                      {inSel && (
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          {item?.quantity} uds
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => handleAdd(p.slug, p.name, p.category)}
                        className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          inSel
                            ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            : "border border-border bg-card text-gray-600 hover:bg-gray-50 dark:border-border-dark dark:bg-card-dark dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                      >
                        {inSel ? "✓ Añadido" : "Añadir a selección"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Selection */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Selección actual</h2>
          {selection.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs font-medium text-red-400 hover:text-red-300 transition"
            >
              Limpiar selección
            </button>
          )}
        </div>

        {selection.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center dark:border-border-dark dark:bg-card-dark/50">
            <span className="text-3xl">📋</span>
            <p className="mt-3 font-medium">
              No hay productos seleccionados todavía.
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Añade productos desde el catálogo profesional para preparar una
              solicitud.
            </p>
            {justCleared && (
              <p className="mt-3 text-xs text-emerald-400">
                Selección eliminada correctamente.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {selection.map((item) => (
              <div
                key={item.productSlug}
                className="rounded-xl border border-border bg-card p-4 dark:border-border-dark dark:bg-card-dark"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{item.productName}</h3>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-primary/60">
                        {item.productCategory}
                      </span>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Cantidad:
                      </span>
                      <div className="flex items-center gap-1">
                        {QUANTITY_OPTIONS.map((q) => (
                          <button
                            key={q}
                            onClick={() => handleQty(item.productSlug, q)}
                            className={`rounded-md px-2 py-1 text-xs font-medium transition ${
                              item.quantity === q
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                        <div className="flex items-center gap-0.5 ml-1">
                          <button
                            onClick={() =>
                              handleQty(item.productSlug, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="rounded-md px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQty(item.productSlug, item.quantity + 1)
                            }
                            className="rounded-md px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Use Case Selector */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Uso:
                      </span>
                      {B2B_USE_CASES.map((uc) => (
                        <button
                          key={uc}
                          onClick={() =>
                            handleUseCase(
                              item.productSlug,
                              item.useCase === uc ? "" : uc,
                            )
                          }
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition ${
                            item.useCase === uc
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : "border-gray-200 text-gray-500 hover:border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600"
                          }`}
                        >
                          {uc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item.productSlug)}
                    className="shrink-0 rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                    title="Quitar producto"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selection Summary */}
      {selection.length > 0 && (
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.03] to-primary/[0.08] p-5 dark:from-primary/[0.05] dark:to-primary/[0.12]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">Resumen de selección</h3>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{summary.productCount} productos</span>
                <span>·</span>
                <span>{summary.totalUnits} unidades</span>
                {summary.categories.length > 0 && (
                  <>
                    <span>·</span>
                    <span>{summary.categories.join(", ")}</span>
                  </>
                )}
              </div>
              {summary.lastUpdated && (
                <p className="mt-1 text-xs text-gray-400">
                  Actualizado: {formatDate(summary.lastUpdated)}
                </p>
              )}
            </div>
            <button
              onClick={handlePrepare}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
            >
              Preparar solicitud
            </button>
          </div>
          <p className="mt-3 text-[10px] text-amber-500">
            Modo laboratorio: esta selección no genera pedidos reales,
            presupuestos reales ni condiciones comerciales reales.
          </p>
        </div>
      )}

      {/* Quote Preview Modal */}
      {showPreview && selection.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl dark:border-border-dark dark:bg-card-dark">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                Solicitud de presupuesto
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {selection.map((item) => (
                <div
                  key={item.productSlug}
                  className="flex items-center justify-between border-b border-border pb-3 dark:border-border-dark"
                >
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.quantity} uds
                      {item.useCase ? ` · ${item.useCase}` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {item.productCategory}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
              <p className="text-sm font-medium">
                {summary.productCount} productos · {summary.totalUnits} unidades
              </p>
              {summary.categories.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Categorías: {summary.categories.join(", ")}
                </p>
              )}
            </div>

            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center">
              <p className="text-sm font-medium text-amber-400">
                🧪 No se ha enviado ninguna solicitud real.
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Esta es una simulación de laboratorio. Los datos no se han
                transmitido a ningún sistema comercial.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-border-dark dark:bg-card-dark dark:hover:bg-gray-800 transition"
              >
                Cerrar
              </button>
              <button
                onClick={handleClear}
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
              >
                Nueva selección
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
