import React, { useState, useEffect } from "react";
import TodoForm from "../components/todolist/TodoForm";
import TodoDisplay from "../components/todolist/TodoDisplay";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { get_todos } from "../features/todo/todoSlice";

function Todolist() {
  const dispatch = useDispatch();
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todo");

      dispatch(get_todos(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoDisplay />
    </div>
  );
}
export default Todolist;
