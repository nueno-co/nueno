import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import ErrorEntity from "@business-logic/Error";
import UserEntity from "@business-logic/User";

export default class ApplicationFormEntity {
  error: ErrorEntity | undefined;

  async create(params: ApplicationFormsCreateRequestParams, userId: number) {
    const user = await new UserEntity().find(userId);

    if (!user) {
      this.error = new ErrorEntity(401, "Not found");
      throw new Error();
    }

    // SAVE fields here. prisma.create(...)
    console.log(params, userId);
    return { jobUid: "asdf" };
  }
}
