import prisma from "@helpers/prisma";

export default class UserEntity {
  async find(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
