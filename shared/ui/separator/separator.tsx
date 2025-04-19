"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal"
}

export const Separator = ({ orientation = "vertical", ...props }: SeparatorProps) => {
  return (
    <div
      className={cn("bg-white shrink-0 opacity-40", orientation === "vertical" ? "w-[1px] grow" : "grow h-[1px]")}
    />
  );
};
