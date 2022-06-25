import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import JobEntity from "@business-logic/Job";
import UserEntity from "@business-logic/User";

import NotFoundError from "@helpers/errors/NotFoundError";
import prisma from "@helpers/prisma";

export default class ApplicationFormEntity {
  async create(params: ApplicationFormsCreateRequestParams, userId: number) {
    const user = await new UserEntity().find(userId);

    if (!user) throw new NotFoundError("Not found");

    // SAVE fields here. prisma.create(...)
    console.log(params, userId);
    return { jobUid: "asdf" };
  }

  /**
   * @description Find all fields associated to a job application form.
   * @param jobUid: string
   *
   * @return fields: array
   * */
  async fieldList(jobUid: string) {
    const job = await new JobEntity().findByUuid(jobUid);

    // Throw a Not found error if job uid does not exist
    if (!job) throw new NotFoundError("Job Not found");

    return prisma.field.findMany({
      where: {
        jobId: job.id,
      },
    });
  }
}
