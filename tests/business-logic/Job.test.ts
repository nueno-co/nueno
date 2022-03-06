import JobEntity from "@business-logic/Job";
import { Job } from "@prisma/client";

import prisma from "@helpers/prisma";
import { minimalSetup } from "@helpers/tests/setup";
import { teardown } from "@helpers/tests/teardown";

beforeEach(async () => {
  await teardown();
});

test("creates job successfully", async () => {
  const { user } = await minimalSetup();

  const requestParams = {
    title: "Software Engineer",
    description: "You write code.",
  };

  const entity = new JobEntity();
  const result = await entity.create(requestParams, user.id);

  const job = (await prisma.job.findUnique({ where: { id: result.id } })) as Job;

  expect(job).not.toBeNull();
  expect(job.title).toBe(requestParams.title);
  expect(job.description).toBe(requestParams.description);
});
