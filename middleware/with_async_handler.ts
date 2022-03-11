/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const withAsyncHandler = (
  handler: (req: NextApiRequest, res: NextApiResponse<any>, next: NextApiHandler<any>) => any
) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      res.status(500).json({
        status: "failed",
        error: "Something went wrong",
        data: [{ error: error.message }],
      });
    }
  };
};

export default withAsyncHandler;
