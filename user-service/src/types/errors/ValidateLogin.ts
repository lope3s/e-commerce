export class LoginValidationError extends Error {
  code: ValidateLogin;

  constructor(message: string) {
    super(message);
    this.name = "LoginValidationError";
    this.code = ValidateLogin.MISSING_FIELD;
  }
}

export enum ValidateLogin {
  MISSING_FIELD = 400,
}
