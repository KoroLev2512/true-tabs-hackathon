"use client";

import type { ComponentProps } from "react";
import { cn } from "@/shared/utils";
import { useChat } from "@/entities/chat";

export type ChatTitleProps = ComponentProps<"h2">;

export const ChatTitle = ({ className, ...props }: ChatTitleProps) => {
  const title = useChat(store => store.name);
  return (
    <h2 className={cn("font-semibold text-2xl py-4 text-[#F8F8F8]", className)} {...props}>
      {title}
    </h2>
  );
};
