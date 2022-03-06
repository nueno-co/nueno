import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import UserEntity from "@business-logic/User";

import NotFoundError from "@helpers/errors/NotFoundError";

export default class ApplicationFormEntity {
  async create(params: ApplicationFormsCreateRequestParams, userId: number) {
    const user = await new UserEntity().find(userId);

    if (!user) throw new NotFoundError("Not found");

    // SAVE fields here. prisma.create(...)
    console.log(params, userId);
    return { jobUid: "asdf" };
  }
}
