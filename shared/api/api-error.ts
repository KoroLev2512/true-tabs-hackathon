export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly statusText: string;

  constructor(code: number, message: string) {
    super(`Error ${code}: ${message}`);
    this.statusCode = code;
    this.statusText = message;
  }
}
