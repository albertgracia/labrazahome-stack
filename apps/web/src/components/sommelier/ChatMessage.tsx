import React from "react";
import { ChatMessage as ChatMessageType } from "../../types/sommelier";

interface Props {
  message: ChatMessageType;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] p-3 rounded-xl shadow-md ${
          isUser ? "bg-indigo-600 text-white" : "bg-black/20 border-white/10"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span
          className={`block mt-1 text-xs ${isUser ? "text-indigo-400" : "text-muted dark:text-muted-dark"} text-right`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          · {message.role === "assistant" ? "IA" : "Tú"}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
