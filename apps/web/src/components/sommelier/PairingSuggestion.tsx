import React from "react";

interface Props {
  pairings: Array<{ product: string; pairing: string; reason: string }>;
}

const PairingSuggestion: React.FC<Props> = ({ pairings }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        Maridajes Sugeridos
      </h3>
      {pairings.map((p, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg bg-zinc-950/80 border-white/10"
        >
          <h4 className="text-lg font-semibold text-indigo-500">{p.product}</h4>
          <p className="mt-1 text-zinc-400 dark:text-zinc-300">
            Ideal para: {p.pairing}
          </p>
          <p className="text-sm mt-2 italic border-l-4 border-indigo-500 pl-3 text-zinc-200">
            {p.reason}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PairingSuggestion;
