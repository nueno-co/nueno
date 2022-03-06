import { asStringOrUndefined } from "@helpers/type-safety";

test("returns undefined when null", () => {
  const testy = asStringOrUndefined(null);
  expect(testy).toEqual(undefined);
});
