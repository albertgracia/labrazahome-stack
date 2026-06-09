import type { B2BDocumentMock } from "../../../types/b2b";

interface Props {
  doc: B2BDocumentMock;
  onClose: () => void;
}

export default function DocumentDetailView({ doc, onClose }: Props) {
  return (
    <div className="mt-4 rounded-xl border border-primary/20 bg-primary/[0.03] p-6 dark:bg-primary/[0.05]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {doc.type}
            </span>
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
              {doc.status}
            </span>
          </div>
          <h3 className="mt-2 text-base font-semibold">{doc.title}</h3>
          <p className="mt-1 text-sm text-muted dark:text-muted-dark">
            {doc.description}
          </p>
          {doc.productName && (
            <p className="mt-2 text-sm">
              <span className="font-medium">Producto relacionado: </span>
              <span className="text-primary">{doc.productName}</span>
            </p>
          )}
          <div className="mt-3">
            <p className="text-sm font-medium">Uso profesional</p>
            <p className="text-sm text-muted dark:text-muted-dark">
              {doc.professionalUse}
            </p>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium">Contenido simulado</p>
            <p className="mt-1 text-sm leading-relaxed text-muted dark:text-muted-dark">
              {doc.mockContent}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted dark:text-muted-dark">
              Perfiles:
            </span>
            {doc.profile.map((p) => (
              <span className="rounded-full border border-zinc-500/20 bg-zinc-500/5 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">
                {p}
              </span>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-xs text-amber-500">
              Documento mock. No contiene informaci&oacute;n comercial real.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-zinc-100 dark:border-border-dark dark:hover:bg-zinc-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
