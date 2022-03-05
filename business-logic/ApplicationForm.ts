import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";

export default class ApplicationFormEntity {
  create(params: ApplicationFormsCreateRequestParams) {
    // SAVE fields here. prisma.create(...)
    console.log(params);
    return {};
  }
}
