import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import UserEntity from "@business-logic/User";

import NotFoundError from "@helpers/errors/NotFoundError";

export default class ApplicationFormEntity {
  async create(params: ApplicationFormsCreateRequestParams, userId: number) {
    const user = await new UserEntity().find(userId);
    const job = await prisma.job.findFirst({
      where: {
        uid: params.jobUid,
      },
    });
    if (!user) throw new NotFoundError("User Not found");
    if (!job) throw new NotFoundError("Job Not found");

    params.fields.forEach((field) => {
      prisma.field
        .create({
          data: {
            type: field.type,
            label: field.label,
            jobId: job.id,
            companyId: user.companyId,
          },
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return { jobUid: params.jobUid };
  }

  async list(userId: number, jobId: number) {
    const user = await new UserEntity().find(userId);
    const job = await prisma.job.findUnique({
      where: {
        uid: params.jobUid,
      },
    });

    if (!user) throw new NotFoundError("User Not found");
    if (!job) throw new NotFoundError("Job Not found");
    console.log(user, jobId);

    return prisma.field.findMany({
      where: {
        companyId: user.companyId,
        jobId,
      },
      include: {
        FieldValue: true,
        FieldChoice: true,
        Company: true,
      },
    });
  }
}
