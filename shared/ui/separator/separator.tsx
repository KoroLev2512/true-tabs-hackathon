"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal"
}

export const Separator = ({ orientation = "vertical", ...props }: SeparatorProps) => {
  return (
    <div
      className={cn("bg-white shrink-0 opacity-20", orientation === "vertical" ? "w-[1px] h-full" : "w-full h-[1px]")}
      {...props}
    />
  );
};
