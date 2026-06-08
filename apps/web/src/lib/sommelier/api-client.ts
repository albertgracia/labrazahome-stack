import { getApiBaseUrl } from "./config";

export interface ApiChatRequest {
  message: string;
  profile: string;
  conversationContext: {
    category: string | null;
    step: number;
    totalSteps: number;
    collected: Record<string, string>;
    completed: boolean;
  };
  selectedProductSlug?: string;
  locale?: string;
}

export interface ApiRecommendation {
  slug: string;
  name: string;
  category: string;
  reason: string;
  confidence: number;
}

export interface ApiPairing {
  product: string;
  pairing: string;
  reason: string;
}

export interface ApiWarning {
  type: string;
  message: string;
}

export interface ApiSource {
  type: string;
  id?: string;
  name: string;
}

export interface ApiChatResponse {
  answer: string;
  intent: string;
  recommendations: ApiRecommendation[];
  pairings: ApiPairing[];
  confidence: number;
  provider: string;
  model?: string;
  traceId: string;
  warnings: ApiWarning[];
  sources: ApiSource[];
  fallbackUsed: boolean;
  metadata: {
    traceId: string;
    provider: string;
    model?: string;
    latencyMs: number;
    fallbackUsed: boolean;
    sourcesUsed: number;
    warningsCount: number;
    intent: string;
    profile: string;
    timestamp: string;
  };
}

interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<{ data?: T; error?: string }> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path}`;

  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const errorBody: ApiErrorResponse = await res.json().catch(() => ({
        error: "UNKNOWN",
        message: `HTTP ${res.status}`,
        statusCode: res.status,
      }));
      return { error: errorBody.message || `Error HTTP ${res.status}` };
    }

    const data: T = await res.json();
    return { data };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : "Error de conexión con el servidor",
    };
  }
}

export async function chat(
  req: ApiChatRequest,
): Promise<{ data?: ApiChatResponse; error?: string }> {
  return request<ApiChatResponse>("/api/v1/sommelier/chat", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export async function health(): Promise<{ data?: unknown; error?: string }> {
  return request("/api/v1/sommelier/health");
}

export async function providers(): Promise<{ data?: unknown; error?: string }> {
  return request("/api/v1/sommelier/providers");
}

export async function guardrails(): Promise<{
  data?: unknown;
  error?: string;
}> {
  return request("/api/v1/sommelier/guardrails");
}

export async function catalogContext(req: {
  message: string;
  profile: string;
  maxProducts?: number;
}): Promise<{ data?: unknown; error?: string }> {
  return request("/api/v1/sommelier/catalog-context", {
    method: "POST",
    body: JSON.stringify(req),
  });
}
