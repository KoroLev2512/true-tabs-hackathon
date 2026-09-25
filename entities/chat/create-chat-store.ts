import { createStore } from "zustand";
import type { ChatProps, ChatState, JSONSchemaVersion, Message } from "./types";
import { getFirstSchema, getSchema } from "@/app/actions";

export const createChatStore = (initProps: ChatProps) => {
  return createStore<ChatState>()((set, get) => ({
    ...initProps,
    name: "Новый чат",
    messages: [{
      text: "Опишите ваш бизнес-процесс простыми словами — мы преобразуем его в структурированную схему.",
      timestamp: Date.now(),
      author: "gpt",
    }],
    schemas: [],
    currentVersionId: null,
    currentSchema: null,
    isLoading: false,

    setVersion: (versionId: number) => {
      const target = get().schemas.find(s => s.id === versionId);
      if (target) {
        set({
          currentVersionId: versionId,
          currentSchema: target,
        });
      }
    },

    sendMessage: async (msg: string) => {
      const newMessage: Message = {
        text: msg,
        author: "user",
        timestamp: Date.now(),
      };
      set(state => ({
        messages: state.messages.concat([newMessage]),
        isLoading: true,
      }));
      try {
        let response: string;
        if (get().schemas.length === 0) {
          response = await getFirstSchema(msg);
        }
        else {
          const currentData = get().currentSchema?.data ?? "";
          response = await getSchema(msg, currentData);
        }

        const newId = get().schemas.length;
        const newVersion: JSONSchemaVersion = {
          id: newId,
          version: `v${newId + 1}.0`,
          name: `Версия ${newId + 1}.0`,
          data: response,
          timestamp: Date.now(),
        };

        set(state => ({
          messages: state.messages.concat([{
            timestamp: Date.now(),
            text: "Сгенерировал JSON-схему по вашему запросу",
            author: "gpt",
          }]),
          schemas: state.schemas.concat([newVersion]),
          currentSchema: newVersion,
          currentVersionId: newId,
          isLoading: false,
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
          isLoading: false,
        }));
      }
      return get().messages.at(-1) as Message;
    },
  }));
};

export type ChatStore = ReturnType<typeof createChatStore>;

