import React, { useState, useEffect } from "react";
import TodoForm from "../components/todolist/TodoForm";
import TodoDisplay from "../components/todolist/TodoDisplay";
import { useTodoContext } from "../hooks/useTodoContext";
import axios from "axios";

interface Todo {
  _id: string;
  todo: string;
  priority?: "high" | "low";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function Todolist() {
  const { dispatch } = useTodoContext();
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todo");

      dispatch({ type: "get_todos", payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, [dispatch]);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoDisplay />
    </div>
  );
}

export default Todolist;
