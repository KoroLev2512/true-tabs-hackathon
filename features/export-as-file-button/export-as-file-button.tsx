"use client";

import { useChat } from "@/entities/chat";

export const ExportAsFileButton = () => {
  const schema = useChat(chat => chat.currentSchema);
  if (!schema) return <></>;
  // TODO
  return (
    <></>
  );
};
