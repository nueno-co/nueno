export default class HttpError extends Error {
  code!: number;

  constructor(message: string) {
    super(message);
  }
}
