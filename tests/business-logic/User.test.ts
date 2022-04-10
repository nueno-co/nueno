import UserEntity from "@business-logic/User";

import prisma from "@helpers/prisma";
import { teardown } from "@helpers/tests/teardown";

const password = "User@123!";
const email = "test@nueno.com";

describe("User", () => {
  beforeEach(async () => {
    await teardown();
  });

  describe("#Create new user", () => {
    it("should create new user", async () => {
      const body = {
        name: "Harry Maguire",
        email: "harry@gmail.com",
        password,
      };

      const entity = new UserEntity();
      const result = await entity.create(body);

      expect(result.message).toBe("User created");
    });

    it("should not create user if email already exists", async () => {
      const requestParams = {
        name: "Nicklas Bendtner",
        email,
        password,
      };
      const entity = new UserEntity();
      await entity.create(requestParams);
      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Email address is already registered.");
    });

    it("Should not create user when email is invalid", async () => {
      const requestParams = {
        name: "Harry Maguire",
        email: "maguire.ts",
        password,
      };

      const entity = new UserEntity();

      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Invalid email");
    });

    it("should not create user if password is invalid", async () => {
      const requestParams = {
        name: "Lord Bendtner",
        email: "lordbentner@gmail.com",
        password: "123",
      };

      const entity = new UserEntity();

      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Invalid input - password should be at least 7 characters long.");
    });
  });
});

describe("#GetExistingUser", () => {
  it("should return an existing user", async () => {
    const company = await prisma.company.create({
      data: {
        name: "Netflix Inc.",
      },
    });

    const user = await prisma.user.create({
      data: {
        name: "Karolina Gonzalez",
        email: "nicklas@gmail.com",
        password,
        companyId: company.id,
      },
    });

    const entity = new UserEntity();
    const result = await entity.find(user.id);

    expect(result?.name).toBe(user.name);
  });
});
