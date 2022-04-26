import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import UserEntity from "@business-logic/User";

import NotFoundError from "@helpers/errors/NotFoundError";

export default class ApplicationFormEntity {
  async create(params: ApplicationFormsCreateRequestParams, userId: number) {
    const user = await new UserEntity().find(userId);
    const job = await prisma.job.findUnique({
      where: {
        uid: params.jobUid,
      },
    });
    if (!job) throw new NotFoundError("Not found");
    if (!user) throw new NotFoundError("Not found");

    params.fields.forEach((field) => {
      prisma.field.create({
        data: {
          type: field.type,
          label: field.label,
          jobId: job.id,
          companyId: user.companyId,
        },
      });
    });
    return { jobUid: params.jobUid };
  }
}
