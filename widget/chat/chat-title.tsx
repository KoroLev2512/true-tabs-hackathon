"use client";

import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/shared/utils";

export type ChatTitleProps = ComponentProps<"h2">;

export const ChatTitle = ({ className, children, ...props }: PropsWithChildren<ChatTitleProps>) => {
  return (
    <h2 className={cn("font-semibold text-2xl py-4 text-[#F8F8F8]", className)} {...props}>
      {children}
    </h2>
  );
};
