import { SignupResponseParams as ResponseParams } from "@api-contracts/auth/signup";
import UserEntity from "@business-logic/User";
import { NextApiRequest, NextApiResponse } from "next";

import HttpError from "@helpers/errors/HttpError";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  const entity = new UserEntity();

  try {
    const response: ResponseParams = await entity.create(req.body);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpError) return res.status(error.code).json(error.message);
    throw error;
  }
}
