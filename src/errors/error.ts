export class InfrastructureError extends Error {
  public constructor() {
    super();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InfrastructureError);
    }
    this.name = this.constructor.name;
  }
}

export class InfrastructureUnknownError extends InfrastructureError {
  public constructor(public error: unknown, public payload: object) {
    super();
    this.name = this.constructor.name;
    this.payload = payload;
    this.error = error;
  }
}

export class UseCaseError extends Error {
  public constructor() {
    super();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UseCaseError);
    }
    this.name = this.constructor.name;
  }
}

export class UseCaseUnknownError extends UseCaseError {
  public constructor(public error: unknown, public payload: object) {
    super();
    this.name = this.constructor.name;
    this.payload = payload;
    this.error = error;
  }
}
