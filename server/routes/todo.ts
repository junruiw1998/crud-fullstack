import express, { Request, Response } from "express";
import {
  getTodo,
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo";
import { isTodoValid } from "../validators/todo";
import { isIdValid } from "../validators/id";

const router = express.Router();

router.get("/", getAllTodos);
router.get("/:id", isIdValid, getTodo);
router.post("/", isTodoValid, createTodo);
router.patch("/:id", isIdValid, isTodoValid, updateTodo);
router.delete("/:id", isIdValid, deleteTodo);

export default router;
