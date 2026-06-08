import React from "react";
import { ProductPremium } from "../../types/catalog";

interface Props {
  product: ProductPremium;
}

const ProductContextPanel: React.FC<Props> = ({ product }) => {
  return (
    <div className="p-6 border rounded-xl bg-zinc-900/80 border-white/10 dark:bg-surface-elevated">
      <h3 className="text-2xl font-bold text-zinc-300">{product.name}</h3>
      <p className="text-lg text-zinc-400 mt-1">{product.producer}</p>
      <div className="mt-4 space-y-3">
        <div>
          <h4 className="font-semibold text-muted dark:text-muted-dark">
            Origen:
          </h4>
          <p>{product.region}</p>
        </div>
        <div>
          <h4 className="font-semibold text-muted dark:text-muted-dark">
            Categoría:
          </h4>
          <p>{product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductContextPanel;
