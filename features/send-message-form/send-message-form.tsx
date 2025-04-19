"use client";

import type { ComponentProps } from "react";
import { useActionState, useState } from "react";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/ui/button";
import { ArrowUpIcon } from "@/shared/icons";
import { useChat } from "@/entities/chat";

export type SendMessageFormProps = ComponentProps<"textarea">;

export const SendMessageForm = ({ className, ...props }: SendMessageFormProps) => {
  const [message, setMessage] = useState<string>("");
  const sendMessage = useChat(store => store.sendMessage);
  const [error, action, isLoading] = useActionState<string>(async (prev) => {
    console.log("action");
    setMessage("");
    await sendMessage(message);
    return prev;
  }, "");

  return (
    <>
      <form
        className={cn("bg-[#2D3035] border-[1px] rounded-[1.25rem] w-full border-white/20 font-normal text-base text-[#F8F8F8] p-8 flex gap-5 min-h-32", className)}
      >
        <textarea
          className="grow placeholder:text-white/20 text-[#F8F8F8] resize-none focus-visible:outline-none"
          value={message}
          onChange={event => setMessage(event.target.value.trim())}
          {...props}
        />
        <Button
          disabled={isLoading}
          size="icon"
          formAction={action}
          onClick={async (event) => {
            event.preventDefault();
            console.log("action");
            setMessage("");
            await sendMessage(message);
          }}
        >
          <ArrowUpIcon />
        </Button>
      </form>
      <p className="text-red-500">{error}</p>
    </>
  )
  ;
};
