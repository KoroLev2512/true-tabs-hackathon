"use client";

import React, { useEffect, useState } from "react";
import { TOUR_STEPS, useTourStore } from "./tour-store";
import { cn } from "@/shared/utils";

interface TargetRect {
  top: number
  left: number
  width: number
  height: number
}

export const InteractiveTour: React.FC = () => {
  const { isOpen, currentStep, nextStep, prevStep, closeTour, startTour } = useTourStore();
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [measuredCardHeight, setMeasuredCardHeight] = useState(300);

  // Check initial first-time tour trigger on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasCompleted = localStorage.getItem("true_tabs_tour_completed");
      if (!hasCompleted) {
        // slight delay to let elements render
        const timer = setTimeout(() => {
          startTour();
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [startTour]);

  // Measure card height when step or open state changes
  useEffect(() => {
    if (cardRef.current) {
      setMeasuredCardHeight(cardRef.current.offsetHeight);
    }
  }, [currentStep, isOpen]);

  // Update target rect when open or step changes
  useEffect(() => {
    if (!isOpen) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const step = TOUR_STEPS[currentStep];
      if (!step) return;

      const element = document.getElementById(step.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      else {
        setTargetRect(null);
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [isOpen, currentStep]);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];
  const isLast = currentStep === TOUR_STEPS.length - 1;

  // Calculate card position with strict viewport clamping
  let cardStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 60,
  };
  let arrowPlacement: "top" | "bottom" | "left" | "right" | "none" = "none";

  if (targetRect) {
    const cardWidth = 380;
    const cardHeight = Math.max(260, measuredCardHeight);
    const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
    const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;

    let desiredTop = 0;
    let desiredLeft = 0;

    if (step.placement === "left" && targetRect.left >= cardWidth + 30) {
      desiredLeft = targetRect.left - cardWidth - 16;
      desiredTop = targetRect.top + (targetRect.height - cardHeight) / 2;
      arrowPlacement = "right";
    }
    else if (step.placement === "right" && viewportWidth - (targetRect.left + targetRect.width) >= cardWidth + 30) {
      desiredLeft = targetRect.left + targetRect.width + 16;
      desiredTop = targetRect.top + (targetRect.height - cardHeight) / 2;
      arrowPlacement = "left";
    }
    else if (step.placement === "top" || viewportHeight - (targetRect.top + targetRect.height) < cardHeight + 40) {
      desiredLeft = targetRect.left + (targetRect.width - cardWidth) / 2;
      desiredTop = targetRect.top - cardHeight - 16;
      arrowPlacement = "bottom";
    }
    else {
      desiredLeft = targetRect.left + (targetRect.width - cardWidth) / 2;
      desiredTop = targetRect.top + targetRect.height + 16;
      arrowPlacement = "top";
    }

    // STRICT CLAMPING: guarantee card is always visible with at least 24px margin
    const maxTop = Math.max(24, viewportHeight - cardHeight - 32);
    const clampedTop = Math.max(24, Math.min(maxTop, desiredTop));
    const clampedLeft = Math.max(20, Math.min(viewportWidth - cardWidth - 20, desiredLeft));

    cardStyle = {
      position: "fixed",
      top: clampedTop,
      left: clampedLeft,
      zIndex: 60,
    };
  }
  else {
    cardStyle = {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 60,
    };
    arrowPlacement = "none";
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Dimmed background overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={closeTour}
      />

      {/* Target element spotlight frame */}
      {targetRect && (
        <div
          className="fixed pointer-events-none rounded-2xl ring-4 ring-[#E30611] shadow-[0_0_0_9999px_rgba(0,0,0,0.60)] transition-all duration-300 ease-out z-50"
          style={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
        />
      )}

      {/* "Пропустить" button in the top right corner */}
      <div className="fixed top-6 right-8 z-[70]">
        <button
          onClick={closeTour}
          className="bg-black/70 hover:bg-black/90 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 shadow-lg cursor-pointer backdrop-blur-md active:scale-95 border border-white/10"
        >
          Пропустить
        </button>
      </div>

      {/* Tooltip Card (identical to provided screenshot) */}
      <div
        ref={cardRef}
        style={cardStyle}
        className="w-[360px] sm:w-[380px] bg-white text-gray-900 rounded-3xl p-6 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Pointer Arrow */}
        {arrowPlacement === "top" && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100" />
        )}
        {arrowPlacement === "bottom" && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-gray-100" />
        )}
        {arrowPlacement === "right" && (
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-t border-r border-gray-100" />
        )}
        {arrowPlacement === "left" && (
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-b border-l border-gray-100" />
        )}

        {/* Step Badge */}
        <div className="inline-block bg-[#E30611]/10 text-[#E30611] text-xs font-bold px-3 py-1 rounded-full tracking-wide">
          {currentStep + 1} / {TOUR_STEPS.length}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mt-2.5">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 leading-relaxed font-normal min-h-[4rem]">
          {step.description}
        </p>

        {/* Footer: Pagination dots & Action Button */}
        <div className="flex items-center justify-between mt-5 pt-1">
          {/* Dots Pagination */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === currentStep
                    ? "w-6 bg-[#E30611]"
                    : "w-2 bg-gray-200",
                )}
              />
            ))}
          </div>

          {/* Buttons: Назад & Далее / Завершить */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="text-gray-500 hover:text-gray-800 text-sm font-medium px-3 py-2 rounded-xl transition cursor-pointer"
              >
                Назад
              </button>
            )}
            <button
              onClick={nextStep}
              className="bg-[#E30611] hover:bg-[#C4000B] active:scale-95 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-red-600/25 cursor-pointer"
            >
              {isLast ? "Завершить" : "Далее"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
