"use client";

import type { ComponentProps, KeyboardEvent } from "react";
import { useState } from "react";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/ui/button";
import { ArrowUpIcon } from "@/shared/icons";
import { useChat } from "@/entities/chat";

export type SendMessageFormProps = ComponentProps<"textarea">;

export const SendMessageForm = ({ className, ...props }: SendMessageFormProps) => {
  const [message, setMessage] = useState<string>("");
  const sendMessage = useChat(store => store.sendMessage);
  const isLoading = useChat(store => store.isLoading);

  const handleSubmit = async () => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    setMessage("");
    await sendMessage(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div id="tour-send-message-form" className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={cn(
          "bg-[#2D3035] border border-white/20 rounded-[1.25rem] w-full font-normal text-base text-[#F8F8F8] p-4 flex gap-3 min-h-22 transition-all focus-within:border-[#738DB8]/60 focus-within:ring-1 focus-within:ring-[#738DB8]/30",
          className,
        )}
      >
        <textarea
          className="grow placeholder:text-white/30 text-[#F8F8F8] resize-none focus-visible:outline-none bg-transparent"
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={2}
          {...props}
        />
        <div className="flex flex-col justify-end">
          <Button
            type="submit"
            disabled={isLoading || !message.trim()}
            size="icon"
            className={cn(
              "rounded-xl transition-all duration-200",
              isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95",
            )}
            title="Отправить сообщение (Enter)"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowUpIcon />
            )}
          </Button>
        </div>
      </form>
      <p className="text-xs text-[#738DB8]/70 mt-1.5 px-1 select-none">
        Нажмите Enter для отправки, Shift+Enter для переноса строки
      </p>
    </div>
  );
};

