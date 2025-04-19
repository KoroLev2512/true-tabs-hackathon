import { createStore, useStore } from "zustand";
// Provider implementation
// Mimic the hook returned by `create`
import type { PropsWithChildren } from "react";
import { createContext, useContext, useRef } from "react";

interface ChatProps {
  id: number
}

type Message = {
  id: number
  text: string
  author: "user" | "gpt"
  timestamp: string
};

type JSONSchema = {
  id: number
  chatID: number
  name: string
  data: string
};

interface ChatState extends ChatProps {
  sendMessage: (message: string) => string
  name: string
  messages: Array<Message>
  schemas: Array<JSONSchema>
}

type ChatStore = ReturnType<typeof createChatStore>;

const createChatStore = (initProps: ChatProps) => {
  return createStore<ChatState>()(set => ({
    ...initProps,
    sendMessage: (msg: string) => {
      return "";
    },
    name: "Новый чат",
    messages: [],
    schemas: [],
  }));
};

export const ChatContext = createContext<ChatStore | null>(null);

function ChatProvider({ children, ...props }: PropsWithChildren<ChatProps>) {
  const storeRef = useRef<ChatStore>();
  if (!storeRef.current) {
    storeRef.current = createChatStore(props);
  }
  return (
    <ChatContext.Provider value={storeRef.current}>
      {children}
    </ChatContext.Provider>
  );
}

function useBearContext<T>(selector: (state: ChatState) => T): T {
  const store = useContext(ChatContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  return useStore(store, selector);
}
