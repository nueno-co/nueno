export function asStringOrUndefined(str: unknown) {
  return typeof str === "string" ? str : undefined;
}
