import prisma from "@helpers/prisma";

export async function minimalSetup() {
  const company = await prisma.company.create({
    data: {
      name: "John Inc",
    },
  });
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
      companyId: company.id,
    },
  });

  return { user, company };
}
