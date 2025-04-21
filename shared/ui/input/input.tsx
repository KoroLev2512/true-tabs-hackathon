"use client";

import type { ComponentProps } from "react";
import { cn } from "@/shared/utils";

export type InputProps = ComponentProps<"input">;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input className={cn("", className)} {...props} />
  );
};
