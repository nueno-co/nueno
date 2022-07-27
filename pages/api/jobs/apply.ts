import { JobsApplyRequestParam, JobsApplyResponseParam } from "@api-contracts/jobs/apply";
import JobEntity from "@business-logic/Job";
import { NextApiRequest, NextApiResponse } from "next";

import HttpError from "@helpers/errors/HttpError";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;
  try {
    const body: JobsApplyRequestParam = req.body;
    const entity = new JobEntity();
    const applyRes: JobsApplyResponseParam | null = await entity.apply(body);
    if (!applyRes) {
      return res.status(201).json({ status: false, message: "You already applied", data: [] });
    }
    return res.status(201).json({ status: true, data: applyRes, message: "Application successfull" });
  } catch (error) {
    if (error instanceof HttpError) return res.status(error.code).json(error.message);
    throw error;
  }
}
