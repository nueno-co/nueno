import UserEntity from "@business-logic/User";

import { hashPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";
import { teardown } from "@helpers/tests/teardown";

let hashedPassword: string;
const email = "ayeolakenny@gmail.com";
const name = "Ayeola Kehinde";

describe("User", () => {
  beforeEach(async () => {
    await teardown();
    hashedPassword = await hashPassword("$password");
  });

  describe("User Tests", () => {
    it("creates a new user", async () => {
      const requestParams = {
        name,
        email,
        password: hashedPassword,
      };

      const entity = new UserEntity();
      const result = await entity.create(requestParams);
      const { message } = result;

      expect(message).toBe("User created");
    });

    it("does not create user when email has been used", async () => {
      const requestParams = {
        name,
        email,
        password: hashedPassword,
      };

      const entity = new UserEntity();
      await entity.create(requestParams);

      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Email address is already registered.");
    });

    it("does create user when password is invalid", async () => {
      const requestParams = {
        name,
        email,
        password: "less",
      };

      const entity = new UserEntity();

      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Invalid input - password should be at least 7 characters long.");
    });

    it("does noe create user when email is invalid", async () => {
      const requestParams = {
        name,
        email: "wrongemail.com",
        password: hashedPassword,
      };

      const entity = new UserEntity();

      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Invalid email");
    });

    it("gets a single user", async () => {
      const newCompany = await prisma.company.create({
        data: {
          name: "Shoppie",
        },
      });

      const newUser = await prisma.user.create({
        data: {
          name: "Shoppie",
          email: "shoppie@company.com",
          password: hashedPassword,
          companyId: newCompany.id,
        },
      });
      const entity = new UserEntity();
      const result = await entity.find(newUser.id);
      expect(result?.name).toBe(newUser.name);
    });
  });
});
