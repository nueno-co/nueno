/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const withCheckAuthHandler = (
  handler: (req: NextApiRequest, res: NextApiResponse<any>, next: NextApiHandler<any>) => any
) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    const session = await getSession({ req });
    if (!session)
      return res.status(401).json({
        status: "failed",
        error: "Not authorized",
        data: {},
      });
    await handler(req, res, next);
  };
};

export default withCheckAuthHandler;
