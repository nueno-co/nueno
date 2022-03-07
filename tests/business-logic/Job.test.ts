import JobEntity from "@business-logic/Job";
import { Job } from "@prisma/client";

import prisma from "@helpers/prisma";
import { createJob } from "@helpers/tests/createJob";
import { minimalSetup } from "@helpers/tests/setup";
import { teardown } from "@helpers/tests/teardown";

describe("Job", () => {
  beforeEach(async () => {
    await teardown();
  });

  describe("#create", () => {
    it("creates job", async () => {
      const { user } = await minimalSetup();

      const requestParams = {
        title: "Software Engineer",
        description: "You write code.",
      };

      const entity = new JobEntity();
      const result = await entity.create(requestParams, user.id);

      const job = (await prisma.job.findUnique({ where: { id: result.id } })) as Job;

      expect(job.title).toBe(requestParams.title);
      expect(job.description).toBe(requestParams.description);
    });
  });

  describe("#list", () => {
    it("lists all jobs of user", async () => {
      const { user } = await minimalSetup();

      await Promise.all([createJob(user.companyId), createJob(user.companyId)]);

      const entity = new JobEntity();
      const result = await entity.list(user.id);

      expect(result.length).toBe(2);
    });
  });
});
