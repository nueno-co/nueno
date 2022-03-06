import { SignupResponseParams } from "@api-contracts/auth/signup";
import UserEntity from "@business-logic/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  const userEntity = new UserEntity();

  try {
    const response: SignupResponseParams = await userEntity.create(req.body);
    return res.status(201).json(response);
  } catch (error) {
    const errorCode = userEntity.error?.code;
    const errorMessage = userEntity.error?.message;
    if (errorCode && errorMessage) return res.status(errorCode).json(errorMessage);

    throw error;
  }
}
