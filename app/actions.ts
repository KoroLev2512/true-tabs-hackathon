"use server";

import { api } from "@/shared/api";

export const getFirstSchema = async (prompt: string) => {
  return api.post<string>("/schemas/workflows/generate", prompt);
};

export const getSchema = async (prompt: string) => {
  return api.post<string>("/schemas/workflows/edit", prompt);
};
