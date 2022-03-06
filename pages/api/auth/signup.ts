import { SignupResponseParams as ResponseParams } from "@api-contracts/auth/signup";
import UserEntity from "@business-logic/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  const entity = new UserEntity();

  try {
    const response: ResponseParams = await entity.create(req.body);
    return res.status(201).json(response);
  } catch (error) {
    const errorCode = entity.error?.code;
    const errorMessage = entity.error?.message;
    if (errorCode && errorMessage) return res.status(errorCode).json(errorMessage);

    throw error;
  }
}
