import prisma from "@helpers/prisma";

export async function teardown() {
  return prisma.company.deleteMany({});
}
