"use client";

import { Message } from "./message";
import { useChat } from "@/entities/chat";

export const MessageArea = () => {
  const messages = useChat(state => state.messages);

  return (
    <div className="flex flex-col grow w-full gap-5">
      {
        messages.map(msg => (
          <Message key={msg.timestamp} author={msg.author}>{msg.text}</Message>
        ))
      }
    </div>
  );
};
