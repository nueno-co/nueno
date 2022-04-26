import ApplicationFormEntity from "@business-logic/ApplicationForm";
import { ApplicationForm } from "@prisma/client";

import prisma from "@helpers/prisma";
import { createJob } from "@helpers/tests/createJob";
import { minimalSetup } from "@helpers/tests/setup";
import { teardown } from "@helpers/tests/teardown";

describe("ApplicationForm", () => {
  beforeEach(async () => {
    await teardown();
  });

  describe("#create", () => {
    it("creates applicationForm", async () => {
      const { user } = await minimalSetup();
      await Promise.all([createJob(user.companyId)]);
      const job = prisma.job.findFirst({
        where: {
          companyId: user.companyId,
        },
      });

      const requestParams = {
        fields: [
          {
            type: "SHORT_TEXT",
            label: "Github user URL",
          },
        ],
        jobUid: job.uid,
      };

      const entity = new ApplicationFormEntity();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await entity.create(requestParams, user.id);

      const applicationForm = (await prisma.field.findFirst({
        where: { jobId: job.id },
      })) as ApplicationForm;

      expect(applicationForm.label).toBe(requestParams.fields[0].label);
      expect(applicationForm.type).toBe(requestParams.fields[0].type);
    });

    it("throws error if user was not found", async () => {
      const { user } = await minimalSetup();
      const job = prisma.job.findFirst({
        where: {
          companyId: user.companyId,
        },
      });

      const requestParams = {
        fields: [
          {
            type: "SHORT_TEXT",
            label: "Github user URL",
            jobId: job.id,
            companyId: user.companyId,
          },
        ],
        jobUid: job.uid,
      };

      const nonExistingUserId = 99999;
      const entity = new ApplicationFormEntity();

      await expect(async () => {
        await entity.create(requestParams, nonExistingUserId);
      }).rejects.toThrowError("User Not found");
    });
  });

  describe("#list", () => {
    it("lists all applicationForms of a job", async () => {
      const { user } = await minimalSetup();
      await Promise(createJob(user.companyId));
      const job = prisma.job.findFirst({
        where: {
          companyId: user.companyId,
        },
      });

      const fields = [
        {
          type: "SHORT_TEXT",
          label: "Github user URL",
          jobId: job.id,
          companyId: user.companyId,
        },
        {
          type: "LONG_TEXT",
          label: "Describe Yourself",
          jobId: job.id,
          companyId: user.companyId,
        },
      ];

      const entity = new ApplicationFormEntity();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await entity.create(fields, user.id);
      const fieldslist = await entity.list(user.id, job.id);

      expect(fieldslist.length).toBe(2);
    });

    it("throws error if user was not found", async () => {
      const { user } = await minimalSetup();
      await Promise(createJob(user.companyId));
      const job = prisma.job.findFirst({
        where: {
          companyId: user.companyId,
        },
      });

      const nonExistingUserId = 99999;
      const entity = new ApplicationFormEntity();

      await expect(async () => {
        await entity.list(nonExistingUserId, job.id);
      }).rejects.toThrowError("User Not found");
    });
    it("throws error if Job was not found", async () => {
      const { user } = await minimalSetup();

      const nonExistingJobId = 999999;
      const entity = new ApplicationFormEntity();

      await expect(async () => {
        await entity.list(user.id, nonExistingJobId);
      }).rejects.toThrowError("Job Not found");
    });
  });
});
