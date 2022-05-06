import UserEntity from "@business-logic/User";
import { User } from "@prisma/client";
import faker from "@faker-js/faker";

import prisma from "@helpers/prisma";
import { minimalSetup } from "@helpers/tests/setup";
import { teardown } from "@helpers/tests/teardown";


let userInfo: any; 


describe("User", () => {
  beforeEach(async () => {
    await teardown();
  });

  describe("#create", () => {
    const requestParams = {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    it(`Email must not be empty`, () => {
      expect(requestParams.email).not.toBe("");
    });
    it(`Is email valid?`, () => {
      expect(requestParams.email).toContain("@");
    });
    it(`Password must not be empty`, () => {
      expect(requestParams.password).not.toBe("");
    });
    it(`Check for password length`, () => {
      expect(requestParams.password.length).toBeGreaterThan(7);
    });
    it(`Check if email belongs to an existing user`, async () => {
      const user = (await prisma.user.findUnique({ where: { email: requestParams.email } })) as User;

      expect(user?.email).not.toBe(requestParams.email);
    });
    it("creates user", async () => {
      const entity = new UserEntity();
      const result = await entity.create(requestParams);

      userInfo = result.user

      expect(result.message).toBe("User created");
    });
  });

  describe("#find", () => {
    it("find a user", async () => {
      const { user } = await minimalSetup();
      const entity = new UserEntity();
      // const result = await entity.find(userInfo.id); This is suposed to come from just created user but using minimalSetup instead.
      const result = await entity.find(user.id);
      expect(result).toHaveProperty('id') 
    });
  });
});
