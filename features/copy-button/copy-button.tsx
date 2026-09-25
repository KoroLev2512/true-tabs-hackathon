"use client";

import { useState } from "react";
import { useChat } from "@/entities/chat";
import { CopyDocumentIcon } from "@/shared/icons";

export const CopyButton = () => {
  const [copied, setCopied] = useState(false);
  const schema = useChat(chat => chat.currentSchema?.data ?? "");

  if (!schema) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(schema);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    catch (e) {
      console.error("Failed to copy schema", e);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Скопировано!" : "Скопировать схему"}
      className="p-2 rounded-xl text-[#738DB8] hover:text-[#C0D3F3] hover:bg-[#2D3035] transition-all duration-200 cursor-pointer flex items-center gap-1.5"
    >
      <CopyDocumentIcon />
      {copied && (
        <span className="text-xs text-[#FF2D3B] font-medium animate-in fade-in duration-150">
          Скопировано!
        </span>
      )}
    </button>
  );
};

