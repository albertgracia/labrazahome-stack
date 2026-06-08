import React, { useState, useEffect, useRef, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import SommelierModeSelector from "./SommelierModeSelector";
import ProductContextPanel from "./ProductContextPanel";
import PairingSuggestion from "./PairingSuggestion";
import RecommendationCard from "./RecommendationCard";
import { Profile, ChatMessage as ChatMessageType } from "../../types/sommelier";
import { ProductPremium } from "../../types/catalog";
import { generateMockResponse } from "../../data/sommelier/mockResponses";

interface Props {
  initialProduct?: ProductPremium;
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
  const [profile, setProfile] = useState<Profile>("private");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

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

    setTimeout(() => {
      const response = generateMockResponse(input);

      const assistantMessage: ChatMessageType = {
        role: "assistant",
        content: response.answer,
        timestamp: new Date(),
        isMock: true,
        recommendations:
          response.recommendations.length > 0
            ? response.recommendations
            : undefined,
        pairings: response.pairings.length > 0 ? response.pairings : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

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
              {profile === "private"
                ? "Cliente Privado"
                : profile === "b2b"
                  ? "Cliente B2B"
                  : "Proveedor"}
            </p>
          </div>
        </div>
        <SommelierModeSelector
          selectedProfile={profile}
          onSelectProfile={setProfile}
        />
      </div>

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
              <span className="text-sm text-zinc-400">
                Analizando tu consulta...
              </span>
            </div>
          </div>
        )}
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
