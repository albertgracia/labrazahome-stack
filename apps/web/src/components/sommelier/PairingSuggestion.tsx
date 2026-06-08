import React from "react";

interface Props {
  pairings: Array<{ product: string; pairing: string; reason: string }>;
}

const PairingSuggestion: React.FC<Props> = ({ pairings }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-white">
        Maridajes Sugeridos
      </h3>
      {pairings.map((p, index) => (
        <div
          key={index}
          className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-300 hover:border-indigo-500/30"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-lg">
              🍽️
            </div>
            <div>
              <h4 className="text-sm font-semibold text-indigo-400">
                {p.product}
              </h4>
              <span className="text-xs text-zinc-500">
                Ideal para: {p.pairing}
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-zinc-400 italic border-l-2 border-indigo-500/50 pl-3">
            {p.reason}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PairingSuggestion;
