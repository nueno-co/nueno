import UserEntity from "@business-logic/User";

import { hashPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";
import { teardown } from "@helpers/tests/teardown";

let hashedPassword:string;
const userEmail = "lambert@example.com";

describe("User", () => {
  beforeEach(async () => {
    await teardown();
    hashedPassword = await hashPassword("lambert12345");
  });
    
  describe('Users Test', () => {
    it('should create new user',async () => {
      const userBody = {
        name:"Lamb Nsengimana",
        email:userEmail,
        password:hashedPassword
      }
      const user = new UserEntity()
      const userCreation = await user.create(userBody)
      const { message } = userCreation
      expect(message).toBe("User created")
    });

    it('should avoid creating user when exists',async () => {
      const userBody = {
        name:"Lamb Nsengimana",
        email:userEmail,
        password:hashedPassword
      }
      const user = new UserEntity()
      await user.create(userBody);
      await expect(async () => {
        await user.create(userBody);
      }).rejects.toThrowError("Email address is already registered.");
    });

    it('should not create user when password is less than 7 characters',async () => {
      const userBody = {
        name:"Nsengimana Lambert",
        email:"lamb@example.com",
        password:"lamb"
      }
      const user = new UserEntity()
      await expect(async () => {
        await user.create(userBody);
      }).rejects.toThrowError("Invalid input - password should be at least 7 characters long.");
    });

    it('should not create user when email is not valid',async () => {
      const userBody = {
        name:"Nsengimana Lambert",
        email:"lambexample.com",
        password:"lambert12345"
      }
      const user = new UserEntity()
      await expect(async () => {
        await user.create(userBody);
      }).rejects.toThrowError("Invalid email");
    });

    it('should get a single user',async () => {
      const newCompany = await prisma.company.create({
        data:{
          name:"Lambert Company"
        },
      });
      const newUser = await prisma.user.create({
        data:{
          name: "Lambert Company",
          email: "lambertCompany@example.com",
          password: hashedPassword,
          companyId: newCompany.id,
        } 
      })
      const entity = new UserEntity();
      const result = await entity.find(newUser.id);
      expect(result?.name).toBe(newUser.name);
    });
  });    
});