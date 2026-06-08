import React from "react";

interface Props {
  recommendations: Array<{
    slug: string;
    name: string;
    category: string;
    reason: string;
    confidence: number;
  }>;
}

const RecommendationCard: React.FC<Props> = ({ recommendations }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {recommendations.map((rec, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-300 hover:border-indigo-500/30 hover:bg-zinc-900/80 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]"
        >
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h4 className="text-base font-semibold text-white">{rec.name}</h4>
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wide">
                {rec.category}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-zinc-500">Confianza</span>
              <span className="text-sm font-bold text-emerald-400">
                {Math.round(rec.confidence * 100)}%
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">{rec.reason}</p>
          <a
            href={`/catalogo/${rec.category.toLowerCase()}/${rec.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Ver ficha completa
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};

export default RecommendationCard;
