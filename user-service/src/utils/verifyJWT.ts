import { JwtPayload, verify } from "jsonwebtoken";

function signJWT(data: string): string | JwtPayload {
  return verify(data, process.env["JWT_SECRET"] || "test");
}

export default signJWT;
