"use client";

import { useChat } from "@/entities/chat";
import { CopyDocumentIcon } from "@/shared/icons";

export const CopyButton = () => {
  const schema = useChat(chat => chat.currentSchema?.currentVersion.data ?? "");

  if (!schema) return <></>;
  return (
    <button onClick={async () => {
      await navigator.clipboard.writeText(schema);
    }}
    >
      <CopyDocumentIcon />
    </button>
  );
};
