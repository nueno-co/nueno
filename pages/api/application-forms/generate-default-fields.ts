import GenerateDefaultFields from "@business-logic/GenerateDefaultFields";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import HttpError from "@helpers/errors/HttpError";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  const session = await getSession({ req });
  if (!session) return res.status(401).json("Not authenticated");

  const entity = new GenerateDefaultFields();

  const data = req.body;
  const { jobUid } = data;

  try {
    const response = await entity.create(jobUid, session.user.id);
    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof HttpError) return res.status(error.code).json(error.message);
    throw error;
  }
}
