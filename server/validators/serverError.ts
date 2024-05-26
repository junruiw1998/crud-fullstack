import { Response } from "express";

//handle error
export const handleServerError = (res: Response, error: unknown) => {
  console.error(error);
  res.status(500).json({ msg: "Server Error" });
};
