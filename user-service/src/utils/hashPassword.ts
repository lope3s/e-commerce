import { createHash } from "node:crypto";

function hashPassword(password: string) {
  const hash = createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

export default hashPassword;
