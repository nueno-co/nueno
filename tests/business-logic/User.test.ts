import UserEntity from "@business-logic/User";
import { User } from "@prisma/client";

import prisma from "@helpers/prisma";
import { teardown } from "@helpers/tests/teardown";

// Default rquest parameters
const requestParams = {
  name: "Anthony Joboy",
  email: "test.user@gmail.com",
  password: "password",
};

// Create instance of the user entity class
const entity = new UserEntity();

describe("User", () => {
  beforeEach(async () => {
    await teardown();
  });

  describe("#create", () => {
    it("throws an error if password length is less than 7 characters", async () => {
      const requestParams = {
        name: "Anthony Joboy",
        email: "test.user@gmail.com",
        password: "pass",
      };

      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Invalid input - password should be at least 7 characters long.");
    });

    it("throws an error if email address is invalid ", async () => {
      const requestParams = {
        name: "Anthony Joboy",
        email: "test.usergmail.com",
        password: "pass",
      };

      await expect(async () => {
        await entity.create(requestParams);
      }).rejects.toThrowError("Invalid email");
    });

    it("throws an error if email address exists", async () => {
      // Create first user
      await entity.create(requestParams);

      await expect(async () => {
        // Create second user with the saame request parameters
        await entity.create(requestParams);
      }).rejects.toThrowError("Email address is already registered.");
    });

    it("can create a new user", async () => {
      // Create a new user
      const result = await entity.create(requestParams);

      // Get the new newly created user
      const user = (await prisma.user.findUnique({ where: { id: result.data.id } })) as User;

      // Verify the name parameter matches the name saved in the `user` table
      expect(user.name).toBe(requestParams.name);

      // Verify the email address parameter matches the email address saved in the `user` table
      expect(user.email).toBe(requestParams.email);
    });
  });
});
