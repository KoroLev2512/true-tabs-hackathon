"use server";

import { api } from "@/shared/api";

export const getSchema = async (prompt: string) => {
  return api.post<string>("/generate", prompt);
};
