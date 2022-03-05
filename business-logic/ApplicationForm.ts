import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import ErrorEntity, { ErrorParams } from "@business-logic/Error";
import UserEntity from "@business-logic/User";

export default class ApplicationFormEntity {
  error: ErrorParams | undefined;

  async create(params: ApplicationFormsCreateRequestParams, userId: number) {
    const user = await new UserEntity().find(userId);

    if (!user) {
      this.error = new ErrorEntity().build({ code: 401, message: "Not found" });
      throw new Error();
    }

    // SAVE fields here. prisma.create(...)
    console.log(params, userId);
    return { jobUid: "asdf" };
  }
}
