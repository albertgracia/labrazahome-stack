import { useState } from "react";
import type { B2BDocumentMock } from "../../../types/b2b";
import type {
  B2BDocumentType,
  B2BDocumentProfile,
  B2BDocumentStatus,
} from "../../../types/b2b";
import DocumentFilters from "./DocumentFilters";
import DocumentDetailView from "./DocumentDetailView";

interface Props {
  documents: B2BDocumentMock[];
  categories: B2BDocumentType[];
  profiles: B2BDocumentProfile[];
  statuses: B2BDocumentStatus[];
}

const statusColors: Record<string, string> = {
  Disponible: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  "En preparación": "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Futuro: "border-zinc-500/20 bg-zinc-500/10 text-zinc-400",
};

export default function FeaturedDocuments(props: Props) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);

  const filtered = props.documents.filter((doc) => {
    if (selectedCategory && doc.category !== selectedCategory) return false;
    if (
      selectedProfile &&
      !doc.profile.includes(selectedProfile as B2BDocumentProfile)
    )
      return false;
    if (selectedStatus && doc.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <div className="rounded-xl border border-border bg-card p-4 dark:border-border-dark dark:bg-card-dark">
          <DocumentFilters
            categories={props.categories}
            profiles={props.profiles}
            statuses={props.statuses}
            selectedCategory={selectedCategory}
            selectedProfile={selectedProfile}
            selectedStatus={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onProfileChange={setSelectedProfile}
            onStatusChange={setSelectedStatus}
          />
        </div>
      </div>
      <div className="space-y-4 lg:col-span-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center dark:border-border-dark dark:bg-card-dark">
            <p className="text-sm text-muted dark:text-muted-dark">
              No hay documentos que coincidan con los filtros seleccionados.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedProfile("");
                setSelectedStatus("");
              }}
              className="mt-3 text-xs text-primary underline transition hover:text-primary-dark"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((doc) => {
              const isExpanded = expandedDocId === doc.id;
              const sc =
                statusColors[doc.status] ||
                "border-zinc-500/20 bg-zinc-500/10 text-zinc-400";
              return (
                <div className="rounded-xl border border-border bg-card transition hover:shadow-lg dark:border-border-dark dark:bg-card-dark">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                        {doc.type}
                      </span>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${sc}`}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold leading-snug">
                      {doc.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted dark:text-muted-dark">
                      {doc.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {doc.profile.slice(0, 3).map((p) => (
                        <span className="rounded-full border border-primary/10 bg-primary/[0.04] px-2 py-0.5 text-[10px] text-primary">
                          {p}
                        </span>
                      ))}
                      {doc.profile.length > 3 && (
                        <span className="text-[10px] text-muted">
                          +{doc.profile.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-t border-border px-4 py-3 dark:border-border-dark">
                    <button
                      onClick={() =>
                        setExpandedDocId(isExpanded ? null : doc.id)
                      }
                      className="flex-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-zinc-100 dark:border-border-dark dark:hover:bg-zinc-800"
                    >
                      {isExpanded ? "Ocultar detalle" : "Ver detalle"}
                    </button>
                    <button
                      onClick={() => {}}
                      className="flex-1 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/20"
                    >
                      Descargar mock
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <DocumentDetailView
                        doc={doc}
                        onClose={() => setExpandedDocId(null)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
