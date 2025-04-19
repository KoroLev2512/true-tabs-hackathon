"use client";

import type { ComponentProps } from "react";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/ui/button";
import { ArrowUpIcon } from "@/shared/icons";

export type SendMessageFormProps = ComponentProps<"textarea">;

export const SendMessageForm = ({ className, ...props }: SendMessageFormProps) => {
  // const [error, action, isLoading] = useActionState();

  return (
    <form
      className={cn("bg-[#2D3035] border-[1px] rounded-[1.25rem] w-full border-white/20 font-normal text-base text-[#F8F8F8] p-8 flex gap-5 min-h-32", className)}
    >
      <textarea
        className="grow placeholder:text-white/20 text-[#F8F8F8] resize-none focus-visible:outline-none"
        {...props}
      />
      <Button size="icon" type="submit" onClick={event => event.preventDefault()}>
        <ArrowUpIcon />
      </Button>
    </form>
  );
};
