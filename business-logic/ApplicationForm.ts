import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import JobEntity from "@business-logic/Job";
import UserEntity from "@business-logic/User";

import NotFoundError from "@helpers/errors/NotFoundError";

export default class ApplicationFormEntity {
  async create(params: ApplicationFormsCreateRequestParams, userId: number) {
    const user = await new UserEntity().find(userId);
    const job = await new JobEntity().find(params.jobUid);
    if (!user) throw new NotFoundError("User Not found");
    if (!job) throw new NotFoundError("Job Not found");

    params.fields.forEach(async (attribute) => {
      await prisma?.field?.create({
        data: {
          type: attribute.type,
          label: attribute.label,
          order: attribute.order,
          jobId: job.id,
          companyId: user.companyId,
        },
      });
    });
    return { jobUid: params.jobUid };
  }

  async list(userId: number, jobUid: string) {
    const user = await new UserEntity().find(userId);
    const job = await new JobEntity().find(jobUid);

    if (!user) throw new NotFoundError("User Not found");
    if (!job) throw new NotFoundError("Job Not found");

    return prisma?.field?.findMany({
      where: {
        companyId: user.companyId,
        jobId: job.id,
      },
      include: {
        FieldValue: true,
        FieldChoice: true,
        Company: true,
      },
    });
  }
}
