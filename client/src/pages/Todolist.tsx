import React, { useState, useEffect } from "react";
import TodoForm from "../components/todolist/TodoForm";
import TodoDisplay from "../components/todolist/TodoDisplay";
import axios from "axios";

interface Todo {
  _id: string;
  todo: string;
  priority?: string;
}

function Todolist() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todo");
      console.log(response);
      setTodos(response.data);
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
      <TodoForm onSuccess={fetchTodos} />
      <TodoDisplay todos={todos} onDelete={fetchTodos} />
    </div>
  );
}

export default Todolist;
