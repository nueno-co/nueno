import { ApplicationFormsCreateResponseParams } from "@api-contracts/application-forms/create";
import ApplicationFormEntity from "@business-logic/ApplicationForm";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Not authenticated" });

  const applicationFormEntity = new ApplicationFormEntity();

  try {
    const response: ApplicationFormsCreateResponseParams = await applicationFormEntity.create(
      req.body,
      session.user.id
    );
    return res.status(201).json(response);
  } catch (error) {
    const errorCode = applicationFormEntity.error?.code;
    const errorMessage = applicationFormEntity.error?.message;
    if (errorCode && errorMessage) return res.status(errorCode).json(errorMessage);

    throw error;
  }
}
