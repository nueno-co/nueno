export default class ErrorEntity {
  // TODO: create custom HTTP errors
  code: number;
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}
