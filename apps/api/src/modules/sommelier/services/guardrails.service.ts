import type {
  SommelierChatRequest,
  SommelierWarning,
} from "../schemas/sommelier.schemas";
import type { SommelierProviderResponse } from "../providers/sommelier-provider";

export interface GuardrailsInfo {
  maxMessageLength: number;
  maxCatalogProducts: number;
  allowedProfiles: string[];
  labMode: boolean;
  noPersonalDataLogging: boolean;
  forbiddenClaims: string[];
  disclaimers: string[];
}

export class GuardrailsService {
  getInfo(): GuardrailsInfo {
    return {
      maxMessageLength: 2000,
      maxCatalogProducts: 5,
      allowedProfiles: ["private", "b2b", "producer", "admin"],
      labMode: true,
      noPersonalDataLogging: true,
      forbiddenClaims: [
        "stock",
        "prices",
        "availability",
        "real commercial terms",
        "unverified ratings",
      ],
      disclaimers: [
        "Respuestas generadas en modo laboratorio con datos simulados.",
        "Las puntuaciones de cata pueden ser simuladas hasta verificación.",
        "No se garantiza disponibilidad real de productos.",
        "Los precios mostrados no son vinculantes.",
      ],
    };
  }

  validateInput(request: SommelierChatRequest): SommelierWarning[] {
    const warnings: SommelierWarning[] = [];

    if (request.message.length > 2000) {
      warnings.push({
        type: "guardrail",
        message:
          "El mensaje excede la longitud máxima permitida de 2000 caracteres.",
      });
    }

    if (request.message.trim().length === 0) {
      warnings.push({
        type: "guardrail",
        message: "El mensaje no puede estar vacío.",
      });
    }

    return warnings;
  }

  validateOutput(response: SommelierProviderResponse): SommelierWarning[] {
    const warnings: SommelierWarning[] = [];

    if (this.containsPriceClaim(response.answer)) {
      warnings.push({
        type: "guardrail",
        message:
          "La respuesta fue revisada para eliminar referencias a precios no verificados.",
      });
    }

    if (this.containsStockClaim(response.answer)) {
      warnings.push({
        type: "guardrail",
        message:
          "La respuesta fue revisada para eliminar referencias a disponibilidad no verificada.",
      });
    }

    if (
      !response.answer.toLowerCase().includes("laboratorio") &&
      !response.answer.toLowerCase().includes("mock")
    ) {
      warnings.push({
        type: "lab_mode",
        message:
          "Respuesta generada en modo laboratorio. Los datos son simulados.",
      });
    }

    return warnings;
  }

  private containsPriceClaim(text: string): boolean {
    return /\d+[.,]?\d*\s*(€|EUR|euros?|precio|coste)/i.test(text);
  }

  private containsStockClaim(text: string): boolean {
    return /(stock|disponibilidad|unidades?|existencias|inventario)/i.test(
      text,
    );
  }
}
