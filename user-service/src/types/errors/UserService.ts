export class UserServiceError extends Error {
  code: UserServiceErrorCodes;

  constructor(message: string, code: UserServiceErrorCodes) {
    super(message);
    this.name = "UserServiceError";
    this.code = code;
  }
}

export enum UserServiceErrorCodes {
  MISSING_FIELD = 400,
  DUPLICATED_DATA = 409,
}
