"use client";

import { useChat } from "@/entities/chat";

export const CopyButton = () => {
  const schema = useChat(chat => chat.currentSchema);
  if (!schema) return <></>;
  // TODO
  return (
    <></>
  );
};
