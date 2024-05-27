import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delete_todo } from "../../features/todo/todoSlice";
import type { RootState } from "../../store/store";
import axios from "axios";
interface Todo {
  _id: string;
  todo: string;
  priority?: string;
}
interface TodoDisplayProps {
  todos: Todo[]; // Define props interface
  onDelete: () => void;
}

function TodoDisplay() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo);

  const handleDeleteTodo = async (deleteId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/todo/${deleteId}`
      );
      dispatch(delete_todo(deleteId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Display: </h2>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo._id}>
              <p style={{ display: "inline" }}>
                {todo.todo} : ({todo.priority || "Not Specified"})
              </p>
              <button onClick={() => handleDeleteTodo(todo._id)}>delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default TodoDisplay;
