import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import SommelierModeSelector from "./SommelierModeSelector";
import ProductContextPanel from "./ProductContextPanel";
import PairingSuggestion from "./PairingSuggestion";
import RecommendationCard from "./RecommendationCard";
import { Profile, ChatMessage as ChatMessageType } from "../../types/sommelier";
import { ProductPremium } from "../../types/catalog";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

    // Simulación de respuesta de IA (Fase 4: Mock responses)
    setTimeout(() => {
      const assistantMessage: ChatMessageType = {
        role: "assistant",
        content: `He analizado tu consulta sobre "${input}". Como experto, te sugiero explorar nuestras opciones premium. (Esta es una respuesta de laboratorio para la fase UX).`,
        timestamp: new Date(),
        isMock: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-[520px] md:min-h-[640px] w-full max-w-4xl mx-auto border rounded-2xl bg-zinc-950/80 shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b bg-zinc-900/80 border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <h2 className="font-bold text-zinc-900 dark:text-zinc-100">
              Sommelier AI&nbsp;
              <span className="text-xs font-normal opacity-60">(Lab Mode)</span>
            </h2>
          </div>
          <SommelierModeSelector
            selectedProfile={profile}
            onSelectProfile={setProfile}
          />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
        {initialProduct && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <ProductContextPanel product={initialProduct} />
          </div>
        )}

        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}

        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-card p-3 rounded-xl shadow-sm animate-pulse text-sm text-muted">
              El sumiller está pensando...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="border-t border-white/10 bg-zinc-950/90 p-4"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta algo (ej: ¿Qué vino para carnes rojas?)"
            className="flex-1 p-3 rounded-xl border border-white/10 bg-zinc-950 text-white placeholder:text-zinc-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-400 text-white"
          >
            Enviar
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-zinc-500">
          Modo Laboratorio: Los datos son simulados para fines de UX.
        </p>
      </form>
    </div>
  );
};

export default SommelierChat;
