import React, { useEffect, useState } from "react";
import { useTodoContext } from "../../hooks/useTodoContext";
import axios from "axios";

interface Todo {
  _id: string;
  todo: string;
  priority?: "high" | "low";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function TodoDisplay() {
  const { state, dispatch } = useTodoContext();
  const handleDeleteTodo = async (deleteId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/todo/${deleteId}`
      );
      dispatch({ type: "delete_todo", payload: deleteId });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Display: </h2>
      <div>
        {state.todos.map((todo) => {
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
