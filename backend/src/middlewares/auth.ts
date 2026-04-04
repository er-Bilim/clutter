import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { HydratedDocument } from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config.ts";
import type { IUser } from "../types/user.types.ts";
import User from "../model/user/User.ts";

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUser>;
}
const auth: RequestHandler = async (
  expressReq: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressReq as RequestWithUser;

  const token = req.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      error: "Access denied. No token provided",
    });
  }
  const decoded = jwt.verify(token, config.jwtSecret) as { _id: string };

  const user = await User.findOne({ _id: decoded._id, token });

  if (!user) {
    return res.status(401).json({
      error: "Access denied. Invalid token",
    });
  }

  req.user = user;
  next();
};

export default auth;
