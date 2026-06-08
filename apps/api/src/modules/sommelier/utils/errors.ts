export enum SommelierErrorCode {
  INVALID_REQUEST = "INVALID_REQUEST",
  PROVIDER_TIMEOUT = "PROVIDER_TIMEOUT",
  PROVIDER_UNAVAILABLE = "PROVIDER_UNAVAILABLE",
  INVALID_PROVIDER_RESPONSE = "INVALID_PROVIDER_RESPONSE",
  CATALOG_CONTEXT_EMPTY = "CATALOG_CONTEXT_EMPTY",
  GUARDRAIL_VIOLATION = "GUARDRAIL_VIOLATION",
  RATE_LIMITED = "RATE_LIMITED",
}

export class SommelierError extends Error {
  constructor(
    public code: SommelierErrorCode,
    message: string,
    public statusCode: number = 500,
    public traceId?: string,
    public provider?: string,
  ) {
    super(message);
    this.name = "SommelierError";
  }
}
