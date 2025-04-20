import type { JSONValue } from "@/shared/utils";
import { ApiError } from "@/shared/api/api-error";

type ApiPath = `/${string}`;

class ApiClient {
  private readonly domain: string;

  constructor(domain?: string) {
    this.domain = domain ?? "";
  }

  public async get<T extends JSONValue = JSONValue>(url: ApiPath, opts?: Omit<RequestInit, "method">): Promise<T> {
    const response = await fetch(`${this.domain}${url}`, {
      method: "GET",
      ...opts,
    });

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }

    return await response.json() as T;
  }

  public async post<T, P extends JSONValue = JSONValue>(url: ApiPath, body: P, opts?: Omit<RequestInit, "method" | "body">): Promise<T> {
    const response = await fetch(`${this.domain}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      ...opts,
    });

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }

    return await response.json() as T;
  }
}

export const api = new ApiClient();
