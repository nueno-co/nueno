import { JobsListResponseParams } from "@api-contracts/jobs/list";
import JobEntity from "@business-logic/Job";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Not authenticated" });

  const jobEntity = new JobEntity();

  try {
    const response: JobsListResponseParams = await jobEntity.list(session.user.id);
    return res.status(201).json(response);
  } catch (error) {
    const errorCode = jobEntity.error?.code;
    const errorMessage = jobEntity.error?.message;
    if (errorCode && errorMessage) return res.status(errorCode).json(errorMessage);

    throw error;
  }
}
