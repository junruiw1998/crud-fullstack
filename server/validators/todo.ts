import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

const createTodoSchema = Joi.object({
  todo: Joi.string().required(),
  priority: Joi.string().valid("high", "low").optional(),
});

export const isTodoValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createTodoSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ msg: "Invalid input data", error: error.details });
  }
  next();
};
