export default class ApiError extends Error {
    public statusCode: number;
    public readonly success: boolean;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.name = "ApiError";
      this.statusCode = statusCode;
      this.success = false;
    }
  }