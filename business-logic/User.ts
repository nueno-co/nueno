import { SignupRequestParams } from "@api-contracts/auth/signup";
import ErrorEntity from "@business-logic/Error";

import { hashPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";

export default class UserEntity {
  error: ErrorEntity | undefined;

  async find(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(params: SignupRequestParams) {
    const { name, email, password } = params;
    const userEmail = email.toLowerCase();

    await this.validateCreate(userEmail, password);

    const company = await prisma.company.create({
      data: {
        name,
      },
    });

    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: {
        name,
        email: userEmail,
        password: hashedPassword,
        companyId: company.id,
      },
    });

    return { message: "User created" };
  }

  private async validateCreate(email: string, password: string) {
    if (!email.includes("@")) {
      this.error = new ErrorEntity(402, "Invalid email");
      throw Error();
    }

    if (password.trim().length < 7) {
      this.error = new ErrorEntity(422, "Invalid input - password should be at least 7 characters long.");
      throw Error();
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      this.error = new ErrorEntity(409, "Email address is already registered.");
      throw Error();
    }
  }
}
