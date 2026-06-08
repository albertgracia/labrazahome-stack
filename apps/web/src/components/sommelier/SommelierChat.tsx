import React, { useState, useEffect, useRef, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import SommelierModeSelector from "./SommelierModeSelector";
import ProductContextPanel from "./ProductContextPanel";
import PairingSuggestion from "./PairingSuggestion";
import RecommendationCard from "./RecommendationCard";
import type {
  Profile,
  ChatMessage as ChatMessageType,
  ConversationContext,
} from "../../types/sommelier";
import type { ProductPremium } from "../../types/catalog";
import {
  processConversation,
  getCategoryLabel,
} from "../../data/sommelier/flows";
import {
  PROFILE_STORAGE_KEY,
  SOMMELIER_PROFILES,
} from "../../data/sommelier/profiles";
import { chat as apiChat } from "../../lib/sommelier/api-client";
import {
  getApiMode,
  getProviderLabel,
  type SommelierApiMode,
} from "../../lib/sommelier/config";

interface Props {
  initialProduct?: ProductPremium;
}

function loadProfile(): Profile {
  if (typeof window === "undefined") return "private";
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (
      saved === "private" ||
      saved === "b2b" ||
      saved === "producer" ||
      saved === "admin"
    ) {
      return saved;
    }
  } catch {}
  return "private";
}

function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, profile);
  } catch {}
}

function clearProfile() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch {}
}

const SommelierChat: React.FC<Props> = ({ initialProduct }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu Sommelier AI. ¿En qué puedo ayudarte hoy? Puedes preguntarme por vinos, maridajes o productos específicos.",
      timestamp: new Date(),
      isMock: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<Profile>(loadProfile);
  const [isTyping, setIsTyping] = useState(false);
  const [isSaved, setIsSaved] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(PROFILE_STORAGE_KEY) !== null;
  });
  const [flowCtx, setFlowCtx] = useState<ConversationContext>({
    category: null,
    step: 0,
    totalSteps: 0,
    collected: {},
    completed: false,
  });
  const [apiMode] = useState<SommelierApiMode>(() => getApiMode());
  const [providerLabel, setProviderLabel] = useState<string>("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSelectProfile = useCallback((p: Profile) => {
    setProfile(p);
    saveProfile(p);
    setIsSaved(true);
  }, []);

  const handleClearProfile = useCallback(() => {
    clearProfile();
    setProfile("private");
    setIsSaved(false);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessageType = {
      role: "user",
      content: input,
      timestamp: new Date(),
      isMock: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    let fallbackUsed = false;

    if (apiMode === "api") {
      const { data, error } = await apiChat({
        message: input,
        profile,
        conversationContext: flowCtx,
        locale: "es",
      });

      if (data && !error) {
        setProviderLabel(getProviderLabel(apiMode, false));
        setFlowCtx((prev) => ({
          ...prev,
          category: data.intent !== "general" ? data.intent : prev.category,
        }));

        const assistantMessage: ChatMessageType = {
          role: "assistant",
          content: data.answer,
          timestamp: new Date(),
          isMock: false,
          recommendations:
            data.recommendations && data.recommendations.length > 0
              ? data.recommendations.map((r) => ({
                  slug: r.slug,
                  name: r.name,
                  category: r.category,
                  reason: r.reason,
                  confidence: r.confidence,
                }))
              : undefined,
          pairings:
            data.pairings && data.pairings.length > 0
              ? data.pairings.map((p) => ({
                  product: p.product,
                  pairing: p.pairing,
                  reason: p.reason,
                }))
              : undefined,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
        return;
      }

      fallbackUsed = true;
      setProviderLabel(getProviderLabel(apiMode, true));
    }

    setTimeout(() => {
      const { result, context } = processConversation(input, flowCtx, profile);
      setFlowCtx(context);

      if (apiMode === "mock") {
        setProviderLabel(getProviderLabel("mock", false));
      } else {
        setProviderLabel(getProviderLabel("api", true));
      }

      const assistantMessage: ChatMessageType = {
        role: "assistant",
        content: result.answer,
        timestamp: new Date(),
        isMock: true,
        recommendations:
          result.recommendations && result.recommendations.length > 0
            ? result.recommendations
            : undefined,
        pairings:
          result.pairings && result.pairings.length > 0
            ? result.pairings
            : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const currentProfile = SOMMELIER_PROFILES[profile];

  return (
    <div className="flex h-[min(640px,calc(100vh-220px))] min-h-[480px] w-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-30" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Sommelier AI</h2>
            <p className="text-[11px] text-zinc-500 tracking-wide uppercase">
              {currentProfile.label}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {providerLabel && (
            <span className="text-[10px] text-zinc-600 bg-white/5 px-2 py-0.5 rounded-full">
              {providerLabel}
            </span>
          )}
          <SommelierModeSelector
            selectedProfile={profile}
            onSelectProfile={handleSelectProfile}
            isSaved={isSaved}
            onClear={handleClearProfile}
          />
        </div>
      </div>

      {/* Profile memory indicator */}
      {isSaved && (
        <div className="flex shrink-0 items-center gap-1.5 px-5 py-1.5 border-b border-white/5 bg-indigo-950/20">
          <span className="text-[10px] text-indigo-400/70">
            💾 Perfil recordado localmente
          </span>
          <span className="text-[10px] text-zinc-600">·</span>
          <span className="text-[10px] text-zinc-500">
            Solo se guarda el tipo de perfil en este navegador
          </span>
        </div>
      )}

      {/* Flow Step Indicator */}
      {flowCtx.category && !flowCtx.completed && (
        <div className="flex shrink-0 items-center gap-3 px-5 py-2 border-b border-white/5 bg-black/20">
          <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
            {getCategoryLabel(flowCtx.category)}
          </span>
          <span className="text-[11px] text-zinc-600">·</span>
          <span className="text-[11px] text-zinc-500">
            Paso {flowCtx.step} de {flowCtx.totalSteps}
          </span>
          <div className="flex gap-1.5 ml-auto">
            {Array.from({ length: flowCtx.totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i < flowCtx.step ? "w-4 bg-indigo-500" : "w-2 bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.95) 0%, rgba(24,24,27,0.9) 100%)",
        }}
      >
        {initialProduct && (
          <div className="animate-fade-in-up">
            <ProductContextPanel product={initialProduct} />
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx}>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <ChatMessage message={msg} />
            </div>

            {msg.recommendations && msg.recommendations.length > 0 && (
              <div
                className="mt-4 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100 + 200}ms` }}
              >
                <RecommendationCard recommendations={msg.recommendations} />
              </div>
            )}

            {msg.pairings && msg.pairings.length > 0 && (
              <div
                className="mt-4 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100 + 300}ms` }}
              >
                <PairingSuggestion pairings={msg.pairings} />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl glass-panel-light">
              <div className="flex gap-1">
                <span
                  className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="text-sm text-zinc-400">Pensando...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="shrink-0 border-t border-white/5 bg-black/30 px-4 py-2">
        <div className="flex flex-wrap gap-2">
          {currentProfile.quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => {
                setInput(prompt);
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-400 transition-colors hover:border-indigo-500/30 hover:text-indigo-300"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="shrink-0 border-t border-white/10 bg-zinc-950/90 p-4"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta algo (ej: ¿Qué vino para carnes rojas?)"
            className="flex-1 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            type="submit"
            className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-400 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SommelierChat;
