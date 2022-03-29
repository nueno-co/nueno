import UserEntity from "@business-logic/User";

import { hashPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";
import { teardown } from "@helpers/tests/teardown";

let passwordHash: string;
const email = "test@example.com";

// I used 40000ms as timeout.

describe("User Entity", () => {
  beforeEach(async () => {
    await teardown();
    passwordHash = await hashPassword("test@123.");
  });

  describe("#CreateNewUser", () => {
    it("should create new user", async () => {
      const body = {
        name: "Chris Rock",
        email,
        password: passwordHash,
      };

      const userEntity = new UserEntity();
      const result = await userEntity.create(body);
      
      expect(result.message).toBe("User created");
    }, 40000);

    it("should not create user if email already exists", async () => {
      const body = {
        name: "Chris Rock",
        email,
        password: passwordHash,
      };

      const entity = new UserEntity();
      await entity.create(body);

      await expect(async () => {
        await entity.create(body);
      }).rejects.toThrowError("Email address is already registered.");
    }, 40000);

    it("Should not create user when email is invalid", async () => {
      const body = {
        name: "Chris Rock",
        email: "chris2022rock.com",
        password: passwordHash,
      };

      const userEntity = new UserEntity();

      await expect(async () => {
        await userEntity.create(body);
      }).rejects.toThrowError("Invalid email");
    }, 40000);

    it("should not create user if password validation fails", async () => {
      const body = {
        name: "Chris Rock",
        email: "test2@example.com",
        password: "",
      };
      
      const userEntity = new UserEntity();

      await expect(async () => {
        await userEntity.create(body);
      }).rejects.toThrowError("Invalid input - password should be at least 7 characters long.");
    }, 40000);
  });
});

describe("#GetExistingUser", () => {
  it("should return an existing user", async () => {
    const company = await prisma.company.create({
      data: {
        name: "Academy Records",
      },
    });

    const user = await prisma.user.create({
      data: {
        name: "Dr SID",
        email: "test2@example.com",
        password: passwordHash,
        companyId: company.id,
      },
    });

    const userEntity = new UserEntity();
    const result = await userEntity.find(user.id);

    expect(result?.name).toBe(user.name);
  }, 40000);
});
