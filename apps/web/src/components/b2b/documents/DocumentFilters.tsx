interface Props {
  categories: string[];
  profiles: string[];
  statuses: string[];
  selectedCategory: string;
  selectedProfile: string;
  selectedStatus: string;
  onCategoryChange: (cat: string) => void;
  onProfileChange: (prof: string) => void;
  onStatusChange: (stat: string) => void;
}

function FilterGroup({
  label,
  items,
  selected,
  onChange,
}: {
  label: string;
  items: string[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted dark:text-muted-dark">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onChange("")}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
            selected === ""
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-border text-muted hover:border-zinc-300 dark:border-border-dark dark:hover:border-zinc-600"
          }`}
        >
          Todas
        </button>
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              selected === item
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted hover:border-zinc-300 dark:border-border-dark dark:hover:border-zinc-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DocumentFilters(props: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold">Filtros</h2>
        {(props.selectedCategory ||
          props.selectedProfile ||
          props.selectedStatus) && (
          <button
            onClick={() => {
              props.onCategoryChange("");
              props.onProfileChange("");
              props.onStatusChange("");
            }}
            className="text-xs text-muted underline transition hover:text-primary"
          >
            Limpiar filtros
          </button>
        )}
      </div>
      <FilterGroup
        label="Categoría"
        items={props.categories}
        selected={props.selectedCategory}
        onChange={props.onCategoryChange}
      />
      <FilterGroup
        label="Perfil profesional"
        items={props.profiles}
        selected={props.selectedProfile}
        onChange={props.onProfileChange}
      />
      <FilterGroup
        label="Estado"
        items={props.statuses}
        selected={props.selectedStatus}
        onChange={props.onStatusChange}
      />
    </div>
  );
}
