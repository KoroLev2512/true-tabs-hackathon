"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils";
import { useRouter } from "next/navigation";

export type BackButtonProps = HTMLAttributes<HTMLButtonElement>;

export const BackButton = ({ className, onClick, ...props }: BackButtonProps) => {
  const router = useRouter();
  return (
    <button
      className={cn("text-white cursor-pointer p-4", className)}
      onClick={(event) => {
        router.back();
        onClick?.(event);
      }}
      {...props}
    >
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.8">
          <path
            d="M14.3502 25.6001C13.8554 25.6003 13.38 25.4075 13.0252 25.0626L4.27516 16.3126C3.54402 15.5805 3.54402 14.3946 4.27516 13.6626L13.0252 4.91259C13.5008 4.43921 14.1928 4.25553 14.8406 4.43073C15.4883 4.60593 15.9934 5.1134 16.1656 5.76198C16.3377 6.41056 16.1508 7.10171 15.6752 7.57509L10.1346 13.125H24.4C25.4356 13.125 26.275 13.9645 26.275 15C26.275 16.0355 25.4356 16.875 24.4 16.875H10.1407L15.6752 22.4001C16.2107 22.9363 16.3708 23.7422 16.0809 24.4424C15.7909 25.1426 15.108 25.5994 14.3502 25.6001Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </button>
  );
};
