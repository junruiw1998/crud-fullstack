import React, { useEffect, useState } from "react";
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

function TodoDisplay({ todos, onDelete }: TodoDisplayProps) {
  const handleDeleteTodo = async (deleteId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/todo/${deleteId}`
      );
      console.log("delete response", response);
      onDelete();
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
