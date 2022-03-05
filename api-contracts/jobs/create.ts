import { Job } from "@prisma/client";

export type JobsCreateRequestParams = {
  title: string;
  description: string;
};

export type JobsCreateResponseParams = Job;
