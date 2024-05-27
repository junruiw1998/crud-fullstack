import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  _id: string;
  todo: string;
  priority?: "high" | "low";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const initialState: Todo[] = [
  {
    _id: "",
    todo: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add_todo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    get_todos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    delete_todo: (state, action: PayloadAction<string>) => {
      return state.filter((s) => s._id !== action.payload);
    },
  },
});

export const { add_todo, get_todos, delete_todo } = todoSlice.actions;
export default todoSlice.reducer;
