export type SommelierApiMode = "api" | "mock";

export function getApiMode(): SommelierApiMode {
  if (typeof window === "undefined") return "mock";

  const stored = localStorage.getItem(
    "SOMMELIER_API_MODE",
  ) as SommelierApiMode | null;
  if (stored === "api" || stored === "mock") return stored;

  if (import.meta.env.PUBLIC_SOMMELIER_API_MODE === "api") return "api";

  return "api";
}

export function getApiBaseUrl(): string {
  if (import.meta.env.PUBLIC_SOMMELIER_API_URL) {
    return import.meta.env.PUBLIC_SOMMELIER_API_URL;
  }
  return "http://localhost:8080";
}

export function getProviderLabel(
  mode: SommelierApiMode,
  fallbackUsed: boolean,
): string {
  if (mode === "mock") return "Simulador local";
  if (fallbackUsed) return "Frontend Fallback";
  return "Mock API";
}

export function setApiMode(mode: SommelierApiMode) {
  if (typeof window === "undefined") return;
  localStorage.setItem("SOMMELIER_API_MODE", mode);
}
