import { sign } from "jsonwebtoken";

function signJWT(data: string | object | Buffer): string {
  return sign(data, process.env["JWT_SECRET"] || "test", { expiresIn: "7d" });
}

export default signJWT;
