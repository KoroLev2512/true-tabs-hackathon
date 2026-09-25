"use client";

import React from "react";
import { HelpIcon } from "@/shared/icons";
import { useTourStore } from "./tour-store";
import { cn } from "@/shared/utils";

interface TourTriggerButtonProps {
  className?: string
}

export const TourTriggerButton: React.FC<TourTriggerButtonProps> = ({ className }) => {
  const startTour = useTourStore(state => state.startTour);

  return (
    <button
      onClick={startTour}
      title="Запустить интерактивное обучение"
      className={cn(
        "p-1.5 rounded-xl text-[#738DB8] hover:text-[#C0D3F3] transition-colors duration-200 cursor-pointer flex items-center gap-1.5",
        className,
      )}
    >
      <HelpIcon />
      <span className="text-xs font-medium hidden sm:inline">Обучение</span>
    </button>
  );
};
