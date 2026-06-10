import React from "react";
import type { ProductMaster } from "../../../../../packages/shared/src/product-master";

interface Props {
  product: ProductMaster;
}

const ProductContextPanel: React.FC<Props> = ({ product }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
          🍷
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{product.name}</h3>
          <p className="text-sm text-indigo-400">{product.producer}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
            Origen
          </span>
          <p className="mt-0.5 text-sm text-zinc-300">{product.region}</p>
        </div>
        <div>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
            Categoría
          </span>
          <p className="mt-0.5 text-sm text-zinc-300">{product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductContextPanel;
