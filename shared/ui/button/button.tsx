"use client";

import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/shared/utils";

export interface ButtonProps extends ComponentProps<"button"> {
  size?: "default" | "icon"
}

export const Button = ({ children, className, size = "default", ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={cn("rounded-full bg-[#FE0034]/90 flex items-center justify-center text-[#F8F8F8] cursor-pointer hover:not-disabled:bg-[#FF4168] hover:not-disabled:opacity-90 disabled:bg-[#631323]",
        size === "icon" ? "h-10 w-10 p-0" : "px-5 py-4 font-semibold text-2xl", className)}

      {...props}
    >
      {children}
    </button>
  );
};
