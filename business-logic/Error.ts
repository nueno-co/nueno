export type ErrorParams = {
  code: number;
  message: string;
};

export default class ErrorEntity {
  build(params: ErrorParams) {
    return params;
  }
}
