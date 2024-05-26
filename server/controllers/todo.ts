import { NextFunction, Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import Todo from "../models/todoModel";
import { handleServerError } from "../validators/serverError";

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "No Such Todo" });
    }
    res.status(200).json(todo);
  } catch (error) {
    handleServerError(res, error);
  }
};

const createTodo = async (req: Request, res: Response) => {
  //add to database
  try {
    const newTodo = await Todo.create({ ...req.body });
    res.status(201).json({ msg: "new instance is created", data: newTodo });
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    //add to database
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ msg: "No Such Todo" });
    }
    res.status(200).json({ msg: "Todo has updated", data: updatedTodo });
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ msg: "No Such Todo" });
    }
    res.status(200).json({ msg: "Todo has been deleted", data: deletedTodo });
  } catch (error) {
    handleServerError(res, error);
  }
};

export { getTodo, getAllTodos, createTodo, updateTodo, deleteTodo };
