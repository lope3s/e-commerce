import hashPassword from "../../../src/utils/hashPassword";

describe("Testing hashPassword fn", () => {
  it("Should correctly hash a password using sha256 and return as hex", () => {
    const testValue = "test1234";

    const current = hashPassword(testValue);

    const expected =
      "937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244";

    expect(current).toStrictEqual(expected);
  });
});
