import type {
  ConversationContext,
  ConversationResult,
  Profile,
} from "../../types/sommelier";
import { generateMockResponse } from "./mockResponses";

const VAGUE_PATTERNS: { pattern: RegExp; category: string }[] = [
  {
    pattern:
      /^(quiero\s+)?(un\s+|una\s+)?(vino|tinto|blanco|rosado)\s*(por\s+favor)?$/i,
    category: "vinos",
  },
  {
    pattern:
      /^(quiero\s+)?(un\s+|una\s+)?(aceite|aove)(\s+de\s+oliva)?\s*(por\s+favor)?$/i,
    category: "aceites",
  },
  {
    pattern: /^(quiero\s+)?(una\s+|un\s+)?(miel|mieles)\s*(por\s+favor)?$/i,
    category: "mieles",
  },
  {
    pattern:
      /^(quiero\s+)?(un\s+|una\s+)?(regalo|pack|caja|pack\s+regalo)\s*(por\s+favor)?$/i,
    category: "packs",
  },
  {
    pattern:
      /^(qué\s+vino|qué\s+aceite|qué\s+miel|qué\s+regalo)\s*(me\s+recomiendas)?\s*\??$/i,
    category: "auto",
  },
  {
    pattern:
      /^recomiéndame\s+(un\s+vino|un\s+aceite|una\s+miel|un\s+regalo)\s*$/i,
    category: "auto",
  },
  { pattern: /^recomiéndame\s+algo\s*$/i, category: "auto" },
  {
    pattern: /^(vinos?|aceites?|miel(es)?|packs?|regalos?)\s*$/i,
    category: "auto",
  },
];

function detectCategory(input: string): string | null {
  const lower = input.toLowerCase().trim();
  const matched = VAGUE_PATTERNS.find((p) => p.pattern.test(lower));
  if (!matched) return null;
  if (matched.category !== "auto") return matched.category;
  if (/vino|tinto|blanco|rosado/.test(lower)) return "vinos";
  if (/aceite|aove/.test(lower)) return "aceites";
  if (/miel/.test(lower)) return "mieles";
  if (/regalo|pack|caja/.test(lower)) return "packs";
  return null;
}

const FLOWS: Record<string, { steps: { field: string; question: string }[] }> =
  {
    vinos: {
      steps: [
        {
          field: "occasion",
          question:
            "Para ayudarte mejor, ¿es para una ocasión especial o para consumo diario?",
        },
        {
          field: "foodType",
          question: "¿Habrá carnes, pescado o menú variado?",
        },
        {
          field: "preference",
          question:
            "Una última pregunta: ¿Prefieres tinto, blanco o te dejas recomendar?",
        },
      ],
    },
    aceites: {
      steps: [
        {
          field: "culinaryUse",
          question:
            "Para ayudarte mejor, ¿para qué uso culinario lo necesitas? ¿Aliños, cocina o repostería?",
        },
        {
          field: "intensity",
          question:
            "Una última pregunta: ¿Prefieres un aceite suave y afrutado o uno más intenso y con carácter?",
        },
      ],
    },
    mieles: {
      steps: [
        {
          field: "destination",
          question:
            "Para ayudarte mejor, ¿cómo piensas consumirla? ¿Desayuno, infusiones o para cocinar?",
        },
        {
          field: "intensity",
          question:
            "Una última pregunta: ¿Prefieres una miel suave y dulce o una más intensa con personalidad?",
        },
      ],
    },
    packs: {
      steps: [
        {
          field: "recipient",
          question: "Para ayudarte mejor, ¿para quién es el regalo?",
        },
        {
          field: "budget",
          question:
            "Una última pregunta: ¿Qué presupuesto tienes en mente? ¿Básico, medio o premium?",
        },
      ],
    },
  };

const CATEGORY_LABELS: Record<string, string> = {
  vinos: "Vinos",
  aceites: "Aceites",
  mieles: "Mieles",
  packs: "Regalos",
};

function buildSyntheticQuery(
  category: string,
  collected: Record<string, string>,
): string {
  switch (category) {
    case "vinos":
      return `vino para ${collected.foodType || "carne"}`;
    case "aceites":
      return `aceite de oliva ${collected.intensity || ""}`;
    case "mieles":
      return `miel ${collected.destination || ""}`;
    case "packs":
      return `pack regalo ${collected.recipient || ""}`;
    default:
      return category;
  }
}

export function getCategoryLabel(category: string | null): string {
  return category ? CATEGORY_LABELS[category] || category : "";
}

export function processConversation(
  input: string,
  context: ConversationContext,
  profile?: Profile,
): { result: ConversationResult; context: ConversationContext } {
  // If no active flow or flow completed, try fresh detection
  if (!context.category || context.completed) {
    const category = detectCategory(input);
    if (category) {
      const flow = FLOWS[category];
      const newCtx: ConversationContext = {
        category,
        step: 1,
        totalSteps: flow.steps.length,
        collected: {},
        completed: false,
      };
      return {
        result: {
          type: "question",
          answer: flow.steps[0].question,
          step: 1,
          totalSteps: flow.steps.length,
          confidence: 0.85,
        },
        context: newCtx,
      };
    }

    const direct = generateMockResponse(input, profile);
    if (direct.confidence >= 0.5) {
      return {
        result: {
          ...direct,
          type: "recommendation",
        },
        context: {
          category: null,
          step: 0,
          totalSteps: 0,
          collected: {},
          completed: false,
        },
      };
    }

    return {
      result: { ...direct, type: "fallback" },
      context: {
        category: null,
        step: 0,
        totalSteps: 0,
        collected: {},
        completed: false,
      },
    };
  }

  // Active flow in progress
  const flow = FLOWS[context.category];
  if (!flow) {
    const direct = generateMockResponse(input, profile);
    return {
      result: {
        ...direct,
        type: direct.confidence >= 0.5 ? "recommendation" : "fallback",
      },
      context: {
        category: null,
        step: 0,
        totalSteps: 0,
        collected: {},
        completed: false,
      },
    };
  }

  const currentStepIdx = context.step - 1;
  const field = flow.steps[currentStepIdx]?.field;
  const newCollected = { ...context.collected };
  if (field) newCollected[field] = input;

  if (context.step < context.totalSteps) {
    const nextStep = context.step + 1;
    const isLast = nextStep === context.totalSteps;
    const nextQ = flow.steps[currentStepIdx + 1]?.question || "";
    const answer = isLast ? nextQ.replace("Para ayudarte mejor, ", "") : nextQ;

    return {
      result: {
        type: "question",
        answer,
        step: nextStep,
        totalSteps: context.totalSteps,
        confidence: 0.85,
      },
      context: {
        ...context,
        step: nextStep,
        collected: newCollected,
      },
    };
  }

  // All steps complete → recommend
  const syntheticQuery = buildSyntheticQuery(context.category, newCollected);
  const mockResult = generateMockResponse(syntheticQuery, profile);

  const answer = `Perfecto, ya tengo suficiente información. Aquí va mi recomendación:\n\n${mockResult.answer}`;

  return {
    result: {
      type: "recommendation",
      answer,
      recommendations: mockResult.recommendations,
      pairings: mockResult.pairings,
      step: context.totalSteps,
      totalSteps: context.totalSteps,
      confidence: mockResult.confidence,
    },
    context: {
      ...context,
      step: context.totalSteps,
      collected: newCollected,
      completed: true,
    },
  };
}
