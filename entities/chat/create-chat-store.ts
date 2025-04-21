import { createStore } from "zustand";
import type { ChatProps, ChatState, Message } from "./types";
import { getFirstSchema, getSchema } from "@/app/actions";

export const createChatStore = (initProps: ChatProps) => {
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
        let response: string;
        if (get().messages.length <= 2) {
          response = await getFirstSchema(msg);
        }
        else {
          const schema: string = get().currentSchema?.data ?? "";
          response = await getSchema(msg, schema);
        }
        set(state => ({
          messages: state.messages.concat([{
            timestamp: Date.now(),
            text: "Сгенерировал JSON-схему по вашему запросу",
            author: "gpt",
          }]),
          currentSchema: {
            data: response,
          },
        }));
      }
      catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Что-то пошло не так :(";
        set(state => ({
          messages: state.messages.concat([{
            text: `Упс... Произошла ошибка (${errorMessage})`,
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
    currentSchema: null,
  }));
};

export type ChatStore = ReturnType<typeof createChatStore>;
