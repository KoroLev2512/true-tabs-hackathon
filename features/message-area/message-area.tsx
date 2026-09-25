"use client";

import { useEffect, useRef } from "react";
import { Message } from "./message";
import { useChat } from "@/entities/chat";

export const MessageArea = () => {
  const messages = useChat(state => state.messages);
  const isLoading = useChat(state => state.isLoading);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div id="tour-message-area" className="flex flex-col flex-1 min-h-0 w-full gap-4 overflow-y-auto pr-2 scrollbar-thin py-2">
      {messages.map((msg, idx) => (
        <Message key={`${msg.timestamp}-${idx}`} author={msg.author}>
          {msg.text}
        </Message>
      ))}

      {isLoading && (
        <div className="w-full flex justify-start animate-in fade-in duration-200">
          <div className="w-fit py-3 px-5 font-normal bg-[#2D3035] border border-[#738DB8]/30 rounded-3xl text-[#738DB8] text-sm flex items-center gap-2">
            <span className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E30611] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#E30611] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#E30611] animate-bounce [animation-delay:0.4s]" />
            </span>
            <span>Генерирую схему...</span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

