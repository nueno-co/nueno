import UserEntity from "@business-logic/User";

import { hashPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";
import { teardown } from "@helpers/tests/teardown";

let hashedPassword: string;
const email = "example@email.com";

describe("User", () => {
  beforeEach(async () => {
    await teardown();
    hashedPassword = await hashPassword("Example@2022^3");
  });

  describe("#create", () => {
    it("should create user", async () => {
      const requestParams = {
        name: "Example Name",
        email,
        password: hashedPassword,
      };

      const entity = new UserEntity();
      const result = await entity.create(requestParams);
      const { message } = result;

      expect(message).toBe("User created");
    });

    it("Should not create user when email exists", async () => {
      const requestParams = {
        name: "Example Name",
        email,
        password: hashedPassword,
      };

      const entity = new UserEntity();
      await entity.create(requestParams);

      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Email address is already registered.");
    });

    it("Should not create user when password is invalid", async () => {
      const requestParams = {
        name: "Example Name",
        email: "example2@email.com",
        password: "",
      };

      const entity = new UserEntity();

      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Invalid input - password should be at least 7 characters long.");
    });

    it("Should not create user when email is invalid", async () => {
      const requestParams = {
        name: "Example Name",
        email: "exampleemail.com",
        password: hashedPassword,
      };

      const entity = new UserEntity();

      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Invalid email");
    });
  });
});

describe("#getOne", () => {
  it("Should get single user", async () => {
    const company = await prisma.company.create({
      data: {
        name: "Example Name",
      },
    });

    const user = await prisma.user.create({
      data: {
        name: "Example Name",
        email: "example@email.com",
        password: hashedPassword,
        companyId: company.id,
      },
    });

    const entity = new UserEntity();
    const result = await entity.find(user.id);

    expect(result?.name).toBe(user.name);
  });
});
