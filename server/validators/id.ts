import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

//validator as middleware
export const isIdValid = (req: Request, res: Response, next:NextFunction) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid Data" });
  }
  next()
};
