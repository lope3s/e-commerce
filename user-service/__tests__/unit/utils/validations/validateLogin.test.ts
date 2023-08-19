import validateLogin from "../../../../src/utils/validations/validateLogin";

describe("Testing validateLogin fn", () => {
  it("Should throw an Error if no email is present", () => {
    const reqBody = {
      password: "asdf",
    };

    expect(() => {
      validateLogin(reqBody);
    }).toThrow();
  });

  it("Should throw an Error if no password is present", () => {
    const reqBody = {
      email: "asdf@mail.com",
    };

    expect(() => {
      validateLogin(reqBody);
    }).toThrow();
  });

  it("Should execute silently if the payload is as expected", () => {
    const reqBody = {
      email: "asdf@mail.com",
      password: "asdf",
    };

    expect(validateLogin(reqBody)).toBe(undefined);
  });
});
