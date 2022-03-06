import HttpError from "@business-logic/errors/HttpError";

export default class BadRequestError extends HttpError {
  code: number;

  constructor(message: string) {
    super(message);
    this.code = 400;
  }
}
