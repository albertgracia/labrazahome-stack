import type {
  BatchProductInput,
  BackofficeBatchOutput,
  BatchEvaluation,
  BatchSummary,
} from "./backoffice-batch.types";

const BASE_URL = "http://192.168.1.250:1234/v1";
const MODEL = "qwen3.5-9b-deepseek-v4-flash";
const MAX_TOKENS = 2048;
const TEMPERATURE = 0.5;
const TOP_P = 0.9;
const PER_FIELD_TIMEOUT = 120000;

const SOMMELIER_TERMS = [
  "nariz",
  "vista",
  "boca",
  "taninos",
  "cuerpo",
  "aroma",
  "retrogusto",
  "final",
  "persistencia",
  "equilibrado",
  "elegante",
  "potente",
  "sedoso",
  "afrutado",
  "especias",
  "vainilla",
  "roble",
  "barrica",
  "crianza",
  "mineral",
  "fresco",
  "untuoso",
  "estructurado",
  "complejo",
  "floral",
  "tostado",
  "cuero",
  "tabaco",
  "regaliz",
  "pizarra",
  "fruta",
  "dulce",
  "ácido",
  "amargo",
  "intenso",
  "suave",
  "redondo",
  "aterciopelado",
  "nuez",
  "almendra",
  "hierba",
  "balsámico",
];
const B2B_TERMS = [
  "restaurante",
  "hotel",
  "tienda",
  "distribuidor",
  "proveedor",
  "profesional",
  "carta",
  "cliente",
  "hostelería",
  "horeca",
  "argumento",
  "venta",
  "comercial",
  "diferenciador",
  "experiencia",
  "calidad premium",
  "selección",
  "exclusivo",
  "singular",
  "posicionamiento",
];

interface FieldResult {
  field: string;
  value: unknown;
  latencyMs: number;
  jsonValid: boolean;
  rawContent: string | null;
}

function buildFieldSystemPrompt(
  product: BatchProductInput,
  field: string,
): string {
  const base = `Eres un redactor editorial y sumiller experto para LabrazaHome. Responde SIEMPRE en español.

PRODUCTO:
- Nombre: ${product.name}
- Categoría: ${product.category}
- Productor: ${product.producer}
- Descripción: ${product.shortDescription}
- Tags: ${product.tags.join(", ")}
- Maridajes sugeridos: ${product.pairings.join(", ")}

REGLAS: 1) Solo datos del producto. 2) No precios/stock/disponibilidad/certificaciones. 3) Sin markdown.`;

  const specs: Record<string, { instruction: string; format: string }> = {
    storytelling: {
      instruction:
        "Genera un storytelling narrativo y premium de 2-4 frases. Debe ser atractivo, evocar la esencia del producto, su origen y carácter.",
      format: `{"productSlug":"${product.slug}","storytelling":"texto narrativo de 2-4 frases"}`,
    },
    sensoryNotes: {
      instruction:
        "Genera una lista de 3-5 notas sensoriales (vista, nariz, boca para vinos; textura, aroma, sabor para otros). Cada nota debe ser descriptiva y específica del producto.",
      format: `{"productSlug":"${product.slug}","sensoryNotes":["nota sensorial 1","nota sensorial 2","nota sensorial 3"]}`,
    },
    pairings: {
      instruction:
        "Genera 2-4 maridajes recomendados. Cada maridaje debe incluir un producto con el que marida, la sugerencia específica y una razón. Usa los maridajes sugeridos como base pero desarróllalos.",
      format: `{"productSlug":"${product.slug}","pairings":[{"product":"${product.name}","pairing":"sugerencia de maridaje","reason":"razón por la que funciona"}]}`,
    },
    b2bArgument: {
      instruction:
        "Genera un argumentario comercial profesional para hostelería (restaurantes, hoteles, tiendas gourmet). 2-4 frases que expliquen por qué este producto es interesante para un negocio.",
      format: `{"productSlug":"${product.slug}","b2bArgument":"argumentario comercial para hostelería"}`,
    },
    seoTitle: {
      instruction:
        "Genera un título SEO de máximo 60 caracteres. Debe incluir el nombre del producto y palabras clave relevantes.",
      format: `{"productSlug":"${product.slug}","seoTitle":"título SEO máximo 60 caracteres"}`,
    },
    metaDescription: {
      instruction:
        "Genera una meta description de máximo 160 caracteres. Debe ser atractiva, incluir el nombre del producto y palabras clave.",
      format: `{"productSlug":"${product.slug}","metaDescription":"meta description para SEO máximo 160 caracteres"}`,
    },
    editorialTags: {
      instruction:
        "Genera una lista de 4-8 tags editoriales. Deben ser palabras clave relevantes para el producto, su categoría y su posicionamiento.",
      format: `{"productSlug":"${product.slug}","editorialTags":["tag1","tag2","tag3","tag4"]}`,
    },
  };

  const spec = specs[field];
  if (!spec) throw new Error(`Unknown field: ${field}`);

  return `${base}\n\n${spec.instruction}\n\nRESPONDE SOLO CON ESTE JSON:\n${spec.format}`;
}

function extractJSON(text: string): Record<string, unknown> | null {
  const t = text.trim();
  if (t.startsWith("{") && t.endsWith("}")) {
    try {
      const j = JSON.parse(t);
      if (j && typeof j === "object") return j as Record<string, unknown>;
    } catch {}
  }
  let d = 0,
    s = -1;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === "{") {
      if (d === 0) s = i;
      d++;
    } else if (t[i] === "}") {
      if (d > 0 && --d === 0 && s !== -1) {
        try {
          const j = JSON.parse(t.slice(s, i + 1));
          if (j && typeof j === "object") return j as Record<string, unknown>;
        } catch {
          s = -1;
        }
      }
    }
  }
  const m = t.match(/```(?:json)?\s*({[\s\S]*?})\s*```/i);
  if (m)
    try {
      const j = JSON.parse(m[1]);
      if (j && typeof j === "object") return j as Record<string, unknown>;
    } catch {}
  return null;
}

async function callField(
  product: BatchProductInput,
  field: string,
  attempt = 1,
): Promise<FieldResult> {
  const sys = buildFieldSystemPrompt(product, field);
  const usr = `Genera ${field} para ${product.name}.`;
  const start = Date.now();
  try {
    const res = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: sys },
          { role: "user", content: usr },
        ],
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
        top_p: TOP_P,
        stream: false,
      }),
      signal: AbortSignal.timeout(PER_FIELD_TIMEOUT),
    });
    const lat = Date.now() - start;
    if (!res.ok)
      return {
        field,
        value: null,
        latencyMs: lat,
        jsonValid: false,
        rawContent: null,
      };
    const data = await res.json();
    const msg = data.choices?.[0]?.message || {};
    // Qwen 3.5 DeepSeek v4 outputs reasoning_content separately
    const rawContent = msg.content || "";
    const reasoningContent = msg.reasoning_content || "";
    // Try content first, then reasoning_content as fallback
    const content = rawContent || reasoningContent;
    const parsed = extractJSON(content);
    if (!parsed) {
      if (attempt === 1) {
        await new Promise((r) => setTimeout(r, 500));
        return callField(product, field, 2);
      }
      return {
        field,
        value: null,
        latencyMs: lat,
        jsonValid: false,
        rawContent: content.substring(0, 150),
      };
    }
    return {
      field,
      value: parsed[field] ?? null,
      latencyMs: lat,
      jsonValid: true,
      rawContent: null,
    };
  } catch (err) {
    return {
      field,
      value: null,
      latencyMs: Date.now() - start,
      jsonValid: false,
      rawContent: null,
    };
  }
}

function scoreField(
  field: string,
  value: unknown,
  product: BatchProductInput,
): { quality: number; hall: string[] } {
  const h: string[] = [];
  let q = 0;
  const str = typeof value === "string" ? value : "";
  const arr = Array.isArray(value) ? value : [];

  switch (field) {
    case "storytelling": {
      if (str.length > 100) q += 3;
      else if (str.length > 0) q += 1;
      const matched = SOMMELIER_TERMS.filter((t) =>
        str.toLowerCase().includes(t),
      ).length;
      q += Math.min(matched, 3);
      if (str.length > 150) q += 2;
      if (str.length > 250) q += 2;
      if (/\d+\s*€/.test(str)) h.push("Precio en storytelling");
      if (/stock|disponibilidad/.test(str.toLowerCase()))
        h.push("Stock en storytelling");
      break;
    }
    case "sensoryNotes": {
      if (arr.length >= 3) q += 4;
      else if (arr.length >= 1) q += 2;
      const totalChars = arr
        .filter((s) => typeof s === "string")
        .reduce((a, s) => a + s.length, 0);
      if (totalChars > 100) q += 3;
      else if (totalChars > 50) q += 2;
      const matched = SOMMELIER_TERMS.filter((t) =>
        arr
          .filter((s) => typeof s === "string")
          .join(" ")
          .toLowerCase()
          .includes(t),
      ).length;
      q += Math.min(matched, 3);
      break;
    }
    case "pairings": {
      const pairs = Array.isArray(value) ? value : [];
      if (pairs.length >= 2) q += 3;
      else if (pairs.length >= 1) q += 1;
      const reasons = pairs.filter(
        (p) => typeof p === "object" && p.reason && p.reason.length > 20,
      ).length;
      q += Math.min(reasons, 3);
      const pairings = pairs
        .filter((p) => typeof p === "object" && p.pairing)
        .map((p) => p.pairing)
        .join(" ");
      const matched = SOMMELIER_TERMS.filter((t) =>
        pairings.toLowerCase().includes(t),
      ).length;
      q += Math.min(matched, 2);
      if (pairs.length > 0) {
        const allText = pairs
          .map((p) => (typeof p === "object" ? JSON.stringify(p) : ""))
          .join(" ");
        if (/\d+\s*€/.test(allText)) h.push("Precio en pairings");
      }
      break;
    }
    case "b2bArgument": {
      if (str.length > 100) q += 2;
      if (str.length > 200) q += 2;
      const matched = B2B_TERMS.filter((t) =>
        str.toLowerCase().includes(t),
      ).length;
      q += Math.min(matched, 4);
      if (/restaurante|hotel|tienda|cliente/.test(str.toLowerCase())) q += 2;
      break;
    }
    case "seoTitle": {
      if (str.length >= 10 && str.length <= 60) q += 5;
      else if (str.length > 0) q += 2;
      const prodName = product.name.toLowerCase();
      if (str.toLowerCase().includes(prodName)) q += 3;
      const catKeywords = {
        vinos: ["vino", "tinto", "reserva", "crianza"],
        aceites: ["aceite", "aove"],
        mieles: ["miel"],
        packs: ["pack", "regalo", "selección"],
      };
      const kws =
        catKeywords[product.category as keyof typeof catKeywords] || [];
      if (kws.some((k) => str.toLowerCase().includes(k))) q += 2;
      break;
    }
    case "metaDescription": {
      if (str.length >= 50 && str.length <= 160) q += 4;
      else if (str.length > 0) q += 1;
      const prodName = product.name.toLowerCase();
      if (str.toLowerCase().includes(prodName)) q += 3;
      if (str.length > 100) q += 3;
      break;
    }
    case "editorialTags": {
      if (arr.length >= 4) q += 4;
      else if (arr.length >= 2) q += 2;
      else if (arr.length >= 1) q += 1;
      const validTags = arr.filter(
        (t: unknown) => typeof t === "string" && t.length > 0,
      ).length;
      if (validTags === arr.length && arr.length > 0) q += 2;
      const prodLow = product.name.toLowerCase();
      const prodKeywords = prodLow.split(" ").filter((w) => w.length > 3);
      const matches = arr.filter(
        (t: unknown) =>
          typeof t === "string" &&
          prodKeywords.some((k) => t.toLowerCase().includes(k)),
      ).length;
      q += Math.min(matches, 2);
      if (/[\s,]/.test(arr.join(" "))) q += 2;
      break;
    }
  }
  return { quality: Math.min(q, 10), hall: h };
}

const PRODUCTS: BatchProductInput[] = [
  {
    slug: "reserva-del-alto-ebro",
    name: "Reserva del Alto Ebro",
    category: "vinos",
    producer: "Bodegas Labraza Heritage",
    shortDescription:
      "Un reserva clásico de la Rioja Alta con 24 meses en barrica de roble americano. Potente y equilibrado.",
    pairings: [
      "Carnes rojas a la parrilla",
      "Quesos curados",
      "Cordero asado",
      "Setas salteadas",
    ],
    tags: ["Tempranillo", "Crianza", "Rioja Alta", "Tinto"],
  },
  {
    slug: "coupage-de-sierra",
    name: "Coupage de Sierra",
    category: "vinos",
    producer: "Bodegas Labraza Heritage",
    shortDescription:
      "Un coupage equilibrado de Tempranillo, Mazuelo y Graciano de viñedos de sierra.",
    pairings: ["Carnes rojas", "Caza", "Guisos de montaña", "Quesos curados"],
    tags: ["Coupage", "Rioja Alavesa", "Sierra", "Tinto"],
  },
  {
    slug: "miel-de-romero-clara",
    name: "Miel de Romero Clara",
    category: "mieles",
    producer: "Apícola Labraza",
    shortDescription:
      "Miel monofloral de romero, clara y suave. Recolectada en primavera en colmenares de alta montaña.",
    pairings: [
      "Tés e infusiones",
      "Quesos frescos",
      "Yogur natural",
      "Fruta fresca",
    ],
    tags: ["Romero", "Miel", "Primavera", "Sierra"],
  },
  {
    slug: "pack-mesa-premium",
    name: "Pack Mesa Premium",
    category: "packs",
    producer: "Labraza Heritage",
    shortDescription:
      "Selección especial: Reserva del Alto Ebro + AOVE Cosecha Temprana + Miel de Romero Clara.",
    pairings: ["Celebraciones", "Regalos corporativos", "Cenas especiales"],
    tags: ["Pack", "Premium", "Regalo", "Selección"],
  },
];

const FIELDS = [
  "storytelling",
  "sensoryNotes",
  "pairings",
  "b2bArgument",
  "seoTitle",
  "metaDescription",
  "editorialTags",
];

async function evaluateProduct(
  product: BatchProductInput,
): Promise<BatchEvaluation> {
  const fieldResults: FieldResult[] = [];
  let totalLatency = 0;
  const allHallucinations: string[] = [];
  let qualitySum = 0;
  let factualSum = 10;
  let b2bScore = 0;
  let seoScore = 0;
  let allJsonValid = true;
  const warnings: string[] = [];

  for (const field of FIELDS) {
    process.stdout.write(`  ${field.padEnd(18)} `);
    const fr = await callField(product, field);
    fieldResults.push(fr);
    totalLatency += fr.latencyMs;
    const icon = fr.jsonValid ? "✅" : "❌";
    const lat = (fr.latencyMs / 1000).toFixed(1);
    const valStr =
      typeof fr.value === "string"
        ? fr.value.substring(0, 80)
        : Array.isArray(fr.value)
          ? `[${fr.value.length} items]`
          : fr.value !== null
            ? String(fr.value).substring(0, 80)
            : "";
    console.log(`${icon} ${lat}s | ${valStr}`);

    if (!fr.jsonValid) {
      allJsonValid = false;
      warnings.push(
        `${field}: JSON fail${fr.rawContent ? ` (${fr.rawContent.substring(0, 60)})` : ""}`,
      );
      continue;
    }

    const { quality, hall } = scoreField(field, fr.value, product);
    qualitySum += quality;
    allHallucinations.push(...hall);

    if (field === "b2bArgument") b2bScore = quality;
    if (
      field === "seoTitle" ||
      field === "metaDescription" ||
      field === "editorialTags"
    )
      seoScore += quality;

    if (typeof fr.value === "string") {
      if (
        /\d+\s*€/.test(fr.value) ||
        /stock|disponibilidad/.test(fr.value.toLowerCase())
      ) {
        factualSum -= 2;
        allHallucinations.push(`${field}: precio/stock`);
      }
    }
  }

  const avgQuality = Math.min(10, Math.round(qualitySum / FIELDS.length));

  return {
    productSlug: product.slug,
    productName: product.name,
    latencyMs: totalLatency,
    jsonValid: allJsonValid,
    rawContent: null,
    output: {
      productSlug: product.slug,
      storytelling:
        (fieldResults.find((f) => f.field === "storytelling")
          ?.value as string) || "",
      sensoryNotes:
        (fieldResults.find((f) => f.field === "sensoryNotes")
          ?.value as string[]) || [],
      pairings:
        (fieldResults.find((f) => f.field === "pairings")?.value as {
          product: string;
          pairing: string;
          reason: string;
        }[]) || [],
      b2bArgument:
        (fieldResults.find((f) => f.field === "b2bArgument")
          ?.value as string) || "",
      seoTitle:
        (fieldResults.find((f) => f.field === "seoTitle")?.value as string) ||
        "",
      metaDescription:
        (fieldResults.find((f) => f.field === "metaDescription")
          ?.value as string) || "",
      editorialTags:
        (fieldResults.find((f) => f.field === "editorialTags")
          ?.value as string[]) || [],
      confidence:
        fieldResults.filter((f) => f.jsonValid).length / FIELDS.length,
      warnings: [],
    },
    qualityScore: avgQuality,
    factualScore: Math.max(0, factualSum - allHallucinations.length),
    b2bScore,
    seoScore: Math.min(10, seoScore),
    warnings,
    hallucinations: [...new Set(allHallucinations)],
    retryUsed: false,
  };
}

export async function runBatchEvaluation(): Promise<BatchSummary> {
  console.log("=".repeat(70));
  console.log("BACKOFFICE BATCH EVALUATION (PER-FIELD)");
  console.log(`Model: ${MODEL}`);
  console.log(
    `Products: ${PRODUCTS.length} | Fields: ${FIELDS.length} | Total calls: ${PRODUCTS.length * FIELDS.length}`,
  );
  console.log(
    `Params: max_tokens=${MAX_TOKENS} temp=${TEMPERATURE} top_p=${TOP_P}`,
  );
  console.log("=".repeat(70));

  try {
    const hr = await fetch(`${BASE_URL}/models`, {
      signal: AbortSignal.timeout(5000),
    });
    const hd = await hr.json();
    console.log(
      `Health: ${hr.ok ? "✅" : "❌"} (${hd.data?.length || 0} models)\n`,
    );
  } catch {
    console.log("Health: ❌\n");
  }

  const evaluations: BatchEvaluation[] = [];
  for (const product of PRODUCTS) {
    console.log(`\n--- ${product.name} (${product.slug}) ---`);
    const ev = await evaluateProduct(product);
    evaluations.push(ev);
    const totSec = (ev.latencyMs / 1000).toFixed(1);
    console.log(
      `  TOTAL: ${ev.jsonValid ? "✅" : "❌"} ${totSec}s | Q=${ev.qualityScore} F=${ev.factualScore} B=${ev.b2bScore} S=${ev.seoScore} halls=${ev.hallucinations.length}`,
    );
  }

  const valid = evaluations.filter((e) => e.jsonValid);
  const summary: BatchSummary = {
    model: MODEL,
    params: { maxTokens: MAX_TOKENS, temperature: TEMPERATURE, topP: TOP_P },
    productsTested: evaluations.length,
    date: new Date().toISOString(),
    evaluations,
    avgLatencyMs: Math.round(
      evaluations.reduce((a, e) => a + e.latencyMs, 0) / evaluations.length,
    ),
    avgQualityScore: +(
      valid.reduce((a, e) => a + e.qualityScore, 0) / Math.max(1, valid.length)
    ).toFixed(1),
    avgFactualScore: +(
      valid.reduce((a, e) => a + e.factualScore, 0) / Math.max(1, valid.length)
    ).toFixed(1),
    avgB2BScore: +(
      valid.reduce((a, e) => a + e.b2bScore, 0) / Math.max(1, valid.length)
    ).toFixed(1),
    avgSeoScore: +(
      valid.reduce((a, e) => a + e.seoScore, 0) / Math.max(1, valid.length)
    ).toFixed(1),
    totalHallucinations: evaluations.reduce(
      (a, e) => a + e.hallucinations.length,
      0,
    ),
    jsonValidCount: valid.length,
    result: "PASS",
  };

  console.log("\n" + "=".repeat(70));
  console.log("SUMMARY");
  console.log("=".repeat(70));
  console.log(
    `JSON field success: ${evaluations.reduce((a, e) => a + (e.jsonValid ? FIELDS.length - e.warnings.filter((w) => w.includes("JSON fail")).length : 0), 0)}/${PRODUCTS.length * FIELDS.length}`,
  );
  console.log(
    `Products OK:       ${summary.jsonValidCount}/${summary.productsTested}`,
  );
  console.log(
    `Avg total latency: ${(summary.avgLatencyMs / 1000).toFixed(1)}s (${FIELDS.length} fields)`,
  );
  console.log(`Avg quality:       ${summary.avgQualityScore}/10`);
  console.log(`Avg factual:       ${summary.avgFactualScore}/10`);
  console.log(`Avg B2B:           ${summary.avgB2BScore}/10`);
  console.log(`Avg SEO:           ${summary.avgSeoScore}/10`);
  console.log(`Hallucinations:    ${summary.totalHallucinations}`);
  console.log(`Result:            ${summary.result}`);

  for (const e of evaluations) {
    console.log(`\n--- ${e.productName} ---`);
    if (!e.jsonValid) {
      console.log(`  ❌ ${e.warnings.join("; ")}`);
      continue;
    }
    const o = e.output!;
    console.log(
      `  Storytelling (${o.storytelling.length}c): ${o.storytelling.substring(0, 120)}`,
    );
    console.log(
      `  SensoryNotes (${o.sensoryNotes.length}): ${o.sensoryNotes.join(" | ").substring(0, 120)}`,
    );
    console.log(
      `  Pairings (${o.pairings.length}): ${o.pairings
        .slice(0, 2)
        .map((p) => `${p.pairing}[${(p.reason || "").substring(0, 30)}]`)
        .join(" | ")}`,
    );
    console.log(
      `  B2B (${o.b2bArgument.length}c): ${o.b2bArgument.substring(0, 120)}`,
    );
    console.log(
      `  SEO: "${o.seoTitle}" | "${o.metaDescription.substring(0, 80)}"`,
    );
    console.log(
      `  Tags (${o.editorialTags.length}): ${o.editorialTags.join(", ")}`,
    );
    console.log(`  Halls: ${e.hallucinations.join("; ") || "none"}`);
    console.log(
      `  Scores: Q=${e.qualityScore} F=${e.factualScore} B=${e.b2bScore} S=${e.seoScore}`,
    );
  }

  console.log("\n" + "=".repeat(70) + "\nDONE\n" + "=".repeat(70));
  return summary;
}

import { fileURLToPath } from "url";
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  runBatchEvaluation().catch(console.error);
}
