"use client";

import { createStore, useStore } from "zustand";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useRef } from "react";
import { api } from "@/shared/api";

interface ChatProps {
  id: number
}

type Message = {
  id?: number
  text: string
  author: "user" | "gpt"
  timestamp: number
};

type JSONSchema = JSONSchemaPreview & {
  data: string
};

type JSONSchemaPreview = {
  id: number
  chatID: number
  name: string
};

interface ChatState extends ChatProps {
  sendMessage: (message: string) => Promise<Message>
  name: string
  messages: Array<Message>
  schemas: Array<JSONSchema>
}

type ChatStore = ReturnType<typeof createChatStore>;

const createChatStore = (initProps: ChatProps) => {
  return createStore<ChatState>()((set, get) => ({
    ...initProps,
    sendMessage: async (msg: string) => {
      const newMessage: Message = {
        text: msg,
        author: "user",
        timestamp: Date.now(),
      };
      set(state => ({
        messages: state.messages.concat([newMessage]),
      }));
      try {
        const response = await api.post<Message[]>("/aboba", { msg });

        set(() => ({
          messages: response,
        }));
      }
      catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Что-то пошло не так :(";
        set(state => ({
          messages: state.messages.concat([{
            text: `Упс... Произошла ошибка (${errorMessage}) D:`,
            author: "gpt",
            timestamp: Date.now(),
          }]),
        }));
        // throw new Error("No messages found!");
      }
      return get().messages.at(-1) as Message;
    },
    name: "Новый чат",
    messages: [{
      text: "Опишите ваш бизнес-процесс простыми словами — мы преобразуем его в структурированную схему.",
      timestamp: Date.now(),
      author: "gpt",
    }],
    schemas: [],
  }));
};

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
