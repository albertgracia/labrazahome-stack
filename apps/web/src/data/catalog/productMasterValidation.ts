import {
  products,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
} from "./products";
import { type ProductCategory } from "../../types/catalog";
import {
  toProductMasters,
  getProductMasterBySlug,
  getProductMastersByCategory,
  getFeaturedProductMasters,
} from "./productMasterAdapter";

export interface ParityResult {
  totalProducts: number;
  totalProductMasters: number;
  passed: boolean;
  failures: string[];
  warnings: string[];
  categoryCounts: Record<string, { premium: number; master: number }>;
  featuredCount: { premium: number; master: number };
  ratingCoverage: {
    productsWithRatings: number;
    productsAfterConversion: number;
    lostRatings: string[];
  };
  knowledgeCoverage: {
    productsWithKnowledge: number;
    productsAfterConversion: number;
  };
  pairingCoverage: { allMatch: boolean; mismatches: string[] };
}

export function validateProductMasterParity(): ParityResult {
  const failures: string[] = [];
  const warnings: string[] = [];

  const masters = toProductMasters(products);

  // ── 1. Count parity ──────────────────────────────────────
  totalCheck: if (products.length !== masters.length) {
    failures.push(
      `Count mismatch: ${products.length} premiums vs ${masters.length} masters`,
    );
  }

  // ── 2. Slug parity ───────────────────────────────────────
  const premiumSlugs = new Set(products.map((p) => p.slug));
  const masterSlugs = new Set(masters.map((m) => m.slug));

  for (const slug of premiumSlugs) {
    if (!masterSlugs.has(slug)) {
      failures.push(`Slug missing in masters: ${slug}`);
    }
  }
  for (const slug of masterSlugs) {
    if (!premiumSlugs.has(slug)) {
      failures.push(`Slug missing in premiums: ${slug}`);
    }
  }

  // ── 3. Category parity ───────────────────────────────────
  const premiumCats = new Map<string, string>();
  for (const p of products) premiumCats.set(p.slug, p.category);

  for (const m of masters) {
    const expected = premiumCats.get(m.slug);
    if (expected && m.category !== expected) {
      failures.push(
        `Category mismatch for ${m.slug}: expected ${expected}, got ${m.category}`,
      );
    }
  }

  // ── 4. Featured parity ───────────────────────────────────
  const premiumFeatured = new Set(
    products.filter((p) => p.featured).map((p) => p.slug),
  );
  const masterFeatured = new Set(
    masters.filter((m) => m.featured).map((m) => m.slug),
  );

  for (const slug of premiumFeatured) {
    if (!masterFeatured.has(slug)) {
      failures.push(
        `Featured mismatch: ${slug} is featured in premium but not in master`,
      );
    }
  }
  for (const slug of masterFeatured) {
    if (!premiumFeatured.has(slug)) {
      failures.push(
        `Featured mismatch: ${slug} is featured in master but not in premium`,
      );
    }
  }

  // ── 5. Ratings parity ────────────────────────────────────
  const productsWithRatings = products.filter(
    (p) => p.ratings && p.ratings.length > 0,
  );
  const mastersWithRatings = masters.filter(
    (m) => m.ratings && m.ratings.length > 0,
  );
  const lostRatings: string[] = [];

  for (const p of productsWithRatings) {
    const m = masters.find((x) => x.slug === p.slug);
    if (!m || !m.ratings || m.ratings.length === 0) {
      lostRatings.push(p.slug);
    } else if (p.ratings) {
      for (let i = 0; i < p.ratings.length; i++) {
        const pr = p.ratings[i];
        const mr = m.ratings[i];
        if (!mr || pr.source !== mr.source || pr.score !== mr.score) {
          lostRatings.push(
            `${p.slug}[${i}]: ${pr.source} ${pr.score} → ${mr?.source} ${mr?.score}`,
          );
        }
      }
    }
  }

  // ── 6. Knowledge parity ──────────────────────────────────
  const productsWithKnowledge = products.filter((p) => p.knowledge);
  const mastersWithKnowledge = masters.filter((m) => m.knowledge);

  for (const p of productsWithKnowledge) {
    const m = masters.find((x) => x.slug === p.slug);
    if (!m || !m.knowledge) {
      warnings.push(`Knowledge lost for ${p.slug}`);
    }
  }

  // ── 7. Pairings parity ───────────────────────────────────
  const pairingMismatches: string[] = [];
  for (const p of products) {
    const m = masters.find((x) => x.slug === p.slug);
    if (!m) continue;
    const pSorted = [...p.pairing].sort();
    const mSorted = [...m.pairings].sort();
    if (JSON.stringify(pSorted) !== JSON.stringify(mSorted)) {
      pairingMismatches.push(
        `${p.slug}: premium=${JSON.stringify(pSorted)} master=${JSON.stringify(mSorted)}`,
      );
    }
  }

  // ── 8. Specs parity ──────────────────────────────────────
  for (const p of products) {
    const m = masters.find((x) => x.slug === p.slug);
    if (!m) continue;
    const pKeys = Object.keys(p.specs).sort();
    const mKeys = Object.keys(m.specs).sort();
    if (JSON.stringify(pKeys) !== JSON.stringify(mKeys)) {
      failures.push(`Specs key mismatch for ${p.slug}`);
    }
    for (const key of pKeys) {
      if (p.specs[key] !== m.specs[key]) {
        failures.push(`Specs value mismatch for ${p.slug}.${key}`);
      }
    }
  }

  // ── 9. Tags/highlights parity ────────────────────────────
  for (const p of products) {
    const m = masters.find((x) => x.slug === p.slug);
    if (!m) continue;
    if (
      JSON.stringify([...p.tags].sort()) !== JSON.stringify([...m.tags].sort())
    ) {
      failures.push(`Tags mismatch for ${p.slug}`);
    }
    if (
      JSON.stringify([...p.highlights].sort()) !==
      JSON.stringify([...m.highlights].sort())
    ) {
      failures.push(`Highlights mismatch for ${p.slug}`);
    }
  }

  // ── 10. Lookup parity ────────────────────────────────────
  for (const p of products) {
    const found = getProductMasterBySlug(p.slug);
    if (!found) {
      failures.push(`getProductMasterBySlug failed for ${p.slug}`);
    }
    const foundWithCat = getProductMasterBySlug(
      p.slug,
      p.category as ProductCategory,
    );
    if (!foundWithCat) {
      failures.push(
        `getProductMasterBySlug (with category) failed for ${p.slug}`,
      );
    }
  }

  // ── 11. Category lookup parity ────────────────────────────
  const categories = [
    "vinos",
    "aceites",
    "mieles",
    "gourmet",
    "packs",
  ] as const;
  for (const cat of categories) {
    const premiums = getProductsByCategory(cat);
    const mastersByCat = getProductMastersByCategory(cat as ProductCategory);
    if (premiums.length !== mastersByCat.length) {
      failures.push(
        `Category ${cat}: ${premiums.length} premiums vs ${mastersByCat.length} masters`,
      );
    }
  }

  // ── 12. Featured lookup parity ───────────────────────────
  const featuredPremiums = getFeaturedProducts();
  const featuredMasters = getFeaturedProductMasters();
  if (featuredPremiums.length !== featuredMasters.length) {
    failures.push(
      `Featured count: ${featuredPremiums.length} premiums vs ${featuredMasters.length} masters`,
    );
  }

  // ── Category counts ──────────────────────────────────────
  const categoryCounts: Record<string, { premium: number; master: number }> =
    {};
  for (const cat of categories) {
    categoryCounts[cat] = {
      premium: products.filter((p) => p.category === cat).length,
      master: masters.filter((m) => m.category === cat).length,
    };
  }

  const passed = failures.length === 0;

  return {
    totalProducts: products.length,
    totalProductMasters: masters.length,
    passed,
    failures,
    warnings,
    categoryCounts,
    featuredCount: {
      premium: featuredPremiums.length,
      master: featuredMasters.length,
    },
    ratingCoverage: {
      productsWithRatings: productsWithRatings.length,
      productsAfterConversion: mastersWithRatings.length,
      lostRatings,
    },
    knowledgeCoverage: {
      productsWithKnowledge: productsWithKnowledge.length,
      productsAfterConversion: mastersWithKnowledge.length,
    },
    pairingCoverage: {
      allMatch: pairingMismatches.length === 0,
      mismatches: pairingMismatches,
    },
  };
}
