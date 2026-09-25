"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "@/shared/icons";
import { cn } from "@/shared/utils";
import { useChat } from "@/entities/chat";

export const VersionTabulator: React.FC = () => {
  const [isTabulatorVisible, setTabulatorVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const schemas = useChat(state => state.schemas);
  const currentVersionId = useChat(state => state.currentVersionId);
  const currentSchema = useChat(state => state.currentSchema);
  const setVersion = useChat(state => state.setVersion);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setTabulatorVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasSchemas = schemas.length > 0;
  const currentLabel = currentSchema?.name ?? (hasSchemas ? `Версия 1.0` : "Схема не создана");

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={cn(
          "flex justify-center w-full items-center gap-3 cursor-pointer my-4 py-1.5 px-4 rounded-xl transition-all duration-200 select-none",
          hasSchemas ? "hover:bg-[#2D3035]/60" : "opacity-75 cursor-default",
        )}
        onClick={() => {
          if (hasSchemas) {
            setTabulatorVisible(!isTabulatorVisible);
          }
        }}
      >
        <span
          className="font-jetbrains-mono text-[#738DB8] text-2xl font-bold tracking-tight"
        >
          {currentLabel}
        </span>
        {hasSchemas && (
          <ArrowDownIcon
            className={cn(
              "w-5 h-5 text-[#738DB8] transition-transform duration-200",
              isTabulatorVisible && "rotate-180",
            )}
          />
        )}
      </div>

      {isTabulatorVisible && hasSchemas && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-1 w-52 rounded-xl bg-[#1C1F24] border border-[#738DB8]/30 shadow-2xl p-1.5 flex flex-col gap-1 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
          <div className="text-[11px] font-semibold text-[#738DB8]/70 px-3 py-1 uppercase tracking-wider">
            История версий ({schemas.length})
          </div>
          {schemas.map(schema => {
            const isActive = currentVersionId === schema.id;
            return (
              <button
                key={schema.id}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-jetbrains-mono cursor-pointer transition-colors text-left",
                  isActive
                    ? "bg-[#738DB8]/20 text-[#C0D3F3] font-semibold"
                    : "text-gray-300 hover:bg-[#2D3035] hover:text-white",
                )}
                onClick={() => {
                  setVersion(schema.id);
                  setTabulatorVisible(false);
                }}
              >
                <span>{schema.name ?? schema.version}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E30611]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VersionTabulator;

