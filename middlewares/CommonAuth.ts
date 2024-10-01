import { AuthPayLoad } from "../dto";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utility";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayLoad;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await verifyToken(req);

  if (validate) {
    next();
  } else {
    res.json({ message: "User not authenticated" });
  }
};
