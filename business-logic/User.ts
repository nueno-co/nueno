import { SignupRequestParams } from "@api-contracts/auth/signup";

import { hashPassword } from "@helpers/auth";
import BadRequestError from "@helpers/errors/BadRequestError";
import prisma from "@helpers/prisma";

export default class UserEntity {
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
      throw new BadRequestError("Invalid email");
    }

    if (password.trim().length < 7) {
      throw new BadRequestError("Invalid input - password should be at least 7 characters long.");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestError("Email address is already registered.");
    }
  }
}
