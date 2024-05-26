import mongoose, { Schema, Document, model } from "mongoose";

//create interface
interface ITodo extends Document {
  todo: string;
  priority?: "high" | "low";
}

//create a schema
const todoSchema = new Schema<ITodo>(
  {
    todo: { type: String, required: true },
    priority: { type: String, enum: ["high", "low"] },
  },
  { timestamps: true }
);

//create a model
const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
