import { LoginValidationError } from "../../types/errors/ValidateLogin";

function validateLogin(reqBody: { [key: string]: any }) {
  if (!reqBody.email) throw new LoginValidationError("No e-mail provided");

  if (!reqBody.password) throw new LoginValidationError("No password provided");

  return;
}

export default validateLogin;
