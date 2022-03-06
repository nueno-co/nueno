import { JobsCreateRequestParams } from "@api-contracts/jobs/create";
import UserEntity from "@business-logic/User";
import { v4 as uuid } from "uuid";

import NotFoundError from "@helpers/errors/NotFoundError";
import prisma from "@helpers/prisma";

export default class JobEntity {
  async create(params: JobsCreateRequestParams, userId: number) {
    const user = await new UserEntity().find(userId);

    if (!user) throw new NotFoundError("Not found");

    return prisma.job.create({
      data: {
        uid: uuid().substring(0, 8),
        title: params.title,
        description: params.description,
        companyId: user.companyId,
      },
    });
  }

  async list(userId: number) {
    const user = await new UserEntity().find(userId);

    if (!user) throw new NotFoundError("Not found");

    return prisma.job.findMany({
      where: {
        companyId: user.companyId,
      },
    });
  }
}
