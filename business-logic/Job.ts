import { JobsCreateRequestParams } from "@api-contracts/jobs/create";
import ErrorEntity, { ErrorParams } from "@business-logic/Error";
import UserEntity from "@business-logic/User";
import { v4 as uuid } from "uuid";

import prisma from "@helpers/prisma";

export default class JobEntity {
  error: ErrorParams | undefined;

  async create(params: JobsCreateRequestParams, userId: number) {
    const user = await new UserEntity().find(userId);

    if (!user) {
      this.error = new ErrorEntity().build({ code: 401, message: "Not found" });
      throw new Error();
    }

    return prisma.job.create({
      data: {
        uid: uuid().substring(0, 10),
        title: params.title,
        description: params.description,
        companyId: user.companyId,
      },
    });
  }

  async list(userId: number) {
    const user = await new UserEntity().find(userId);

    if (!user) {
      this.error = new ErrorEntity().build({ code: 401, message: "Not found" });
      throw new Error();
    }

    return prisma.job.findMany({
      where: {
        companyId: user.companyId,
      },
    });
  }
}
