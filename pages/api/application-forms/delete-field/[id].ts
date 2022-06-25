import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import HttpError from "@helpers/errors/HttpError";
import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return;

  const session = await getSession({ req });
  if (!session) return res.status(401).json("Not authenticated");

  try {
    const response = await prisma.field.delete({
      where: { id: Number(req.query.id) },
    });
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpError) return res.status(error.code).json(error.message);
    throw error;
  }
}
