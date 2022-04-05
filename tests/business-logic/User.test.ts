import UserEntity from "@business-logic/User";

import { hashPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";
import { teardown } from "@helpers/tests/teardown";

let hashedPassword: string;

describe("User", () => {
  beforeEach(async () => {
    await teardown();
    hashedPassword = await hashPassword("User@123!");
  });

  describe("#create", () => {
    it("throws error if email address provided was invalid", async () => {
      const payload = {
        name: "John Doe",
        email: "johndoegmail.com",
        password: hashedPassword,
      };
      const entity = new UserEntity();
      await expect(async () => {
        await entity.create(payload);
      }).rejects.toThrowError("Invalid email");
    });

    it("throws error if password provided was invalid", async () => {
      const payload = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "",
      };
      const entity = new UserEntity();
      await expect(async () => {
        await entity.create(payload);
      }).rejects.toThrowError("Invalid input - password should be at least 7 characters long.");
    });

    it("throws error if user email already exists", async () => {
      const payload = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: hashedPassword,
      };
      const entity = new UserEntity();
      await entity.create(payload);
      await expect(async () => {
        await entity.create(payload);
      }).rejects.toThrowError("Email address is already registered.");
    });

    it("creates a new user", async () => {
      const payload = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: hashedPassword,
      };
      const entity = new UserEntity();
      const user = await entity.create(payload);

      expect(user.message).toBe("User created");
    });
  });
  describe("#findOne", () => {
    it("should return a specific user", async () => {
      const company = await prisma.company.create({
        data: {
          name: "Tesla",
        },
      });

      const newUser = await prisma.user.create({
        data: {
          name: "John Doe",
          email: "johndoe@example.com",
          password: hashedPassword,
          companyId: company.id,
        },
      });

      const userEntity = new UserEntity();
      const user = await userEntity.find(newUser.id);

      expect(user?.name).toBe(newUser.name);
    });
  });
});
