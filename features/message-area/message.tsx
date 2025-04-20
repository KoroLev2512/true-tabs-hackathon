"use client";

import type { PropsWithChildren } from "react";
import { cn } from "@/shared/utils";

export interface MessageProps {
  author: "user" | "gpt"
}

export const Message = ({ author, children }: PropsWithChildren<MessageProps>) => {
  return (
    <div className={cn("w-full flex", author === "gpt" ? "justify-start" : "justify-end")}>
      <div
        className={cn("w-fit py-4 px-6 font-normal bg-[#2D3035] border-[1px] rounded-4xl max-w-[90%] text-[#F8F8F8] text-base", author === "gpt" ? "border-white/20" : "border-[#FE0034]/50")}
      >
        {children}
      </div>
    </div>
  );
};
