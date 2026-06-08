import React from "react";
import { ChatMessage as ChatMessageType } from "../../types/sommelier";

interface Props {
  message: ChatMessageType;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-2xl bg-indigo-600/90 px-4 py-3 shadow-lg shadow-indigo-500/10">
          <p className="text-sm leading-relaxed text-white">
            {message.content}
          </p>
          <span className="mt-1.5 block text-[10px] text-indigo-300/70 text-right">
            {time}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium tracking-wide text-indigo-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Sommelier AI
          </span>
          <span className="text-[10px] text-zinc-600">{time}</span>
        </div>
        <div className="rounded-2xl border border-white/5 bg-black/30 px-5 py-4 backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-zinc-200">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
