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
    <div className="grid grid-cols-1 md:grid:grid-cols-2 gap-4">
      {recommendations.map((rec, index) => (
        <div key={index} className="p-4 rounded-xl bg-zinc-950/80 shadow-sm">
          {rec.name}
        </div>
      ))}
    </div>
  );
};

export default RecommendationCard;
