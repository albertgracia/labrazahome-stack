import type {
  SommelierProvider,
  ChatInput,
  SommelierProviderResponse,
  ProviderConfig,
} from "./sommelier-provider";
import type {
  ProviderHealth,
  ProviderMetadata,
  SommelierIntent,
  SommelierWarning,
  SommelierSource,
} from "../schemas/sommelier.schemas";

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIChoice {
  message: OpenAIMessage;
  finish_reason: string;
}

interface OpenAIResponse {
  id: string;
  choices: OpenAIChoice[];
  model: string;
}

interface LLMResponseStructure {
  answer: string;
  intent: string;
  recommendations: Array<{
    slug: string;
    name: string;
    category: string;
    reason: string;
    confidence: number;
  }>;
  pairings: Array<{
    product: string;
    pairing: string;
    reason: string;
  }>;
  confidence: number;
  warnings: Array<{
    type: string;
    message: string;
  }>;
  sources: Array<{
    type: string;
    id?: string;
    name: string;
  }>;
}

function buildSystemPrompt(
  catalogContext: ChatInput["catalogContext"],
): string {
  const catalogText =
    catalogContext.length > 0
      ? catalogContext
          .map(
            (p) =>
              `- ${p.name} (${p.category}): ${p.shortDescription} | Productor: ${p.producer} | Tags: ${p.tags.join(", ")} | Maridajes: ${p.pairings.join(", ")}`,
          )
          .join("\n")
      : "No hay productos disponibles en el catálogo para esta consulta.";

  return `Eres un sumiller experto en productos gourmet españoles. Responde SIEMPRE en español, con tono premium y cercano.

CATÁLOGO DISPONIBLE (máximo 5 productos relevantes):
${catalogText}

REGLAS ESTRICTAS:
1. Usa SOLO el catálogo proporcionado. No inventes productos.
2. No menciones precios, stock, disponibilidad ni puntuaciones numéricas — no tienes esos datos.
3. Si el usuario pregunta por algo fuera del catálogo, indícalo amablemente y sugiere lo más cercano disponible.
4. Si falta contexto o no estás seguro, indica que estás en modo laboratorio y los datos son simulados.
5. Las recomendaciones deben incluir el slug exacto y la categoría del catálogo.
6. Los maridajes deben ser sugerencias gastronómicas realistas.

RESPONDE EXACTAMENTE con este JSON (sin markdown, solo JSON):
{
  "answer": "texto de respuesta premium en español",
  "intent": "pairing|recommendation|comparison|product_explanation|general",
  "recommendations": [
    { "slug": "slug-del-producto", "name": "Nombre del producto", "category": "categoría", "reason": "por qué recomendar esto", "confidence": 0.95 }
  ],
  "pairings": [
    { "product": "Nombre del producto", "pairing": "sugerencia de maridaje", "reason": "por qué funciona este maridaje" }
  ],
  "confidence": 0.85,
  "warnings": [
    { "type": "mock_data", "message": "descripción de la advertencia" }
  ],
  "sources": [
    { "type": "product", "id": "slug-del-producto", "name": "Nombre del producto" }
  ]
}

IMPORTANTE: Recommendations y pairings pueden ser arrays vacíos si no aplican. Confidence debe ser entre 0 y 1.`;
}

function buildUserPrompt(input: ChatInput): string {
  return `Perfil: ${input.profile}
Contexto de conversación: ${JSON.stringify(input.conversationContext)}
Mensaje del usuario: ${input.message}`;
}

function extractJSON(text: string): LLMResponseStructure | null {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return parsed as LLMResponseStructure;
  } catch {
    return null;
  }
}

const VALID_INTENTS: SommelierIntent[] = [
  "pairing",
  "recommendation",
  "comparison",
  "product_explanation",
  "general",
];

function clampConfidence(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function mapToProviderResponse(
  parsed: LLMResponseStructure,
  modelName: string | undefined,
): SommelierProviderResponse {
  const intent: SommelierIntent = VALID_INTENTS.includes(
    parsed.intent as SommelierIntent,
  )
    ? (parsed.intent as SommelierIntent)
    : "general";

  return {
    answer:
      parsed.answer ||
      "Gracias por tu consulta. Estoy revisando las mejores opciones para ti.",
    intent,
    recommendations: (parsed.recommendations || []).map((r) => ({
      slug: r.slug,
      name: r.name,
      category: r.category,
      reason: r.reason,
      confidence: clampConfidence(r.confidence),
    })),
    pairings: (parsed.pairings || []).map((p) => ({
      product: p.product,
      pairing: p.pairing,
      reason: p.reason,
    })),
    confidence: clampConfidence(parsed.confidence ?? 0.5),
    model: modelName,
    warnings: (parsed.warnings || []).map((w) => ({
      type: w.type as SommelierWarning["type"],
      message: w.message,
    })),
    sources: (parsed.sources || []).map((s) => ({
      type: s.type as SommelierSource["type"],
      id: s.id,
      name: s.name,
    })),
  };
}

export class LMStudioSommelierProvider implements SommelierProvider {
  private baseUrl: string;
  private model: string;
  private timeoutMs: number;

  constructor(private config: ProviderConfig = {}) {
    this.baseUrl =
      config.baseUrl ??
      process.env.LMSTUDIO_BASE_URL ??
      "http://192.168.1.250:1234/v1";
    this.model =
      config.model ?? process.env.LMSTUDIO_MODEL ?? "llama-3.2-1b-instruct";
    this.timeoutMs =
      config.timeoutMs ??
      parseInt(process.env.SOMMELIER_TIMEOUT_MS ?? "30000", 10);
  }

  async chat(input: ChatInput): Promise<SommelierProviderResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const systemPrompt = buildSystemPrompt(input.catalogContext);
      const userPrompt = buildUserPrompt(input);

      const body = {
        model: this.model,
        messages: [
          { role: "system" as const, content: systemPrompt },
          { role: "user" as const, content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      };

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `LM Studio API error: ${response.status} ${response.statusText}`,
        );
      }

      const data: OpenAIResponse = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("Empty response from LM Studio");
      }

      const parsed = extractJSON(content);
      if (!parsed) {
        return {
          answer: content,
          intent: "general",
          recommendations: [],
          pairings: [],
          confidence: 0.4,
          model: data.model ?? this.model,
          warnings: [
            {
              type: "low_confidence",
              message:
                "No se pudo estructurar la respuesta del modelo. Se muestra en bruto.",
            },
          ],
          sources: [],
        };
      }

      return mapToProviderResponse(parsed, data.model ?? this.model);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      throw new Error(`LMStudioProvider: ${message}`);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async health(): Promise<ProviderHealth> {
    const startTime = Date.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        signal: controller.signal,
      });

      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        return {
          status: "degraded",
          provider: "lmstudio",
          model: this.model,
          latencyMs,
          error: `LM Studio returned ${response.status}`,
          timestamp: new Date().toISOString(),
        };
      }

      return {
        status: "ok",
        provider: "lmstudio",
        model: this.model,
        latencyMs,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      const latencyMs = Date.now() - startTime;
      return {
        status: "down",
        provider: "lmstudio",
        model: this.model,
        latencyMs,
        error: err instanceof Error ? err.message : "Connection failed",
        timestamp: new Date().toISOString(),
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  metadata(): ProviderMetadata {
    return {
      name: "lmstudio",
      version: "1.0.0",
      available: true,
      model: this.model,
      description: `LM Studio provider (${this.model}) for local LLM inference`,
    };
  }
}
