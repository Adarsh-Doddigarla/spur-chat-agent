export class AppError extends Error {
    constructor(
      public statusCode: number,
      message: string,
      public expose = true
    ) {
      super(message);
      this.name = this.constructor.name;
    }
  }
  
  export class ValidationError extends AppError {
    constructor(message: string) {
      super(400, message);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message = "Not found") {
      super(404, message);
    }
  }
  
  export class LLMError extends AppError {
    constructor(message = "The assistant is temporarily unavailable.") {
      super(502, message);
    }
  }
  