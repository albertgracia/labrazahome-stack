import type {
  SommelierChatRequest,
  SommelierWarning,
} from "../schemas/sommelier.schemas";
import type { SommelierProviderResponse } from "../providers/sommelier-provider";

export class GuardrailsService {
  validateInput(request: SommelierChatRequest): SommelierWarning[] {
    const warnings: SommelierWarning[] = [];

    // TODO(STACK-2026-GUARDRAILS-SERVICE-01): implement guardrails
    // - Max message length (2000)
    // - Basic sanitization (strip HTML/scripts)
    // - Profile-specific rules

    if (request.message.length > 2000) {
      warnings.push({
        type: "guardrail",
        message: "El mensaje excede la longitud máxima permitida.",
      });
    }

    return warnings;
  }

  validateOutput(_response: SommelierProviderResponse): SommelierWarning[] {
    const warnings: SommelierWarning[] = [];

    // TODO(STACK-2026-GUARDRAILS-SERVICE-01): implement guardrails
    // - Ensure no price/stock/disponibility claims
    // - Ensure lab/production distinction
    // - Ensure response in Spanish

    return warnings;
  }
}
