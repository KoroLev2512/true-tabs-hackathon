"use client";

import { useStore } from "zustand";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useRef } from "react";
import type { ChatStore } from "./create-chat-store";
import { createChatStore } from "./create-chat-store";
import type { ChatProps, ChatState } from "./types";

export const ChatContext = createContext<ChatStore | null>(null);

export function ChatProvider({ children, ...props }: PropsWithChildren<ChatProps>) {
  const storeRef = useRef<ChatStore>(null);
  if (!storeRef.current) {
    storeRef.current = createChatStore(props);
  }
  return (
    <ChatContext.Provider value={storeRef.current}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat<T>(selector: (state: ChatState) => T): T {
  const store = useContext(ChatContext);
  if (!store) throw new Error(`Missing ${ChatProvider.name} in the tree`);
  return useStore(store, selector);
}
