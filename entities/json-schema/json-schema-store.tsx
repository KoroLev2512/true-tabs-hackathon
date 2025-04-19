"use client";

import { createStore } from "zustand";

interface ChatProps {
  jsonID: number
}

interface BearState extends ChatProps {
  data: string
  name: string
  edit: (newText: string) => void

  // sendMessage: () => void
  // messages: {
  //   author: "user" | "gpt",
  //   text: string
  // }[]
  // jsons: number[]
}

// const createBearStore = (initProps?: Partial<ChatProps>) => {
//   const DEFAULT_PROPS: ChatProps = {
//     bears: 0,
//   }
//   return createStore<BearState>()((set) => ({
//     ...DEFAULT_PROPS,
//     ...initProps,
//     addBear: () => set((state) => ({ bears: ++state.bears })),
//   }))
// }
