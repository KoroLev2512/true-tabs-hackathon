class ApiError extends Error {



  constructor(message?: string) {
    super(message);
  }
}

class ApiClient {
  private readonly domain: string;

  constructor(domain?: string) {
    this.domain = domain ?? "";
  }

  public async get<T>(url: string, opts: ): Promise<T> {
    const response = await fetch()

    return
  }

  public async post<T>(): Promise<T>;
}
