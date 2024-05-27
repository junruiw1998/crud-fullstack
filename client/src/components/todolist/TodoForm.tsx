import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useTodoContext } from "../../hooks/useTodoContext";
import axios from "axios";

interface FormValues {
  todo: string;
  priority?: "high" | "low";
}

function TodoForm() {
  const form = useForm<FormValues>({});
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;
  const { state, dispatch } = useTodoContext();

  const onSubmit = async (data: FormValues) => {
    const preparedData = { ...data };
    if (!data.priority) {
      delete preparedData.priority;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/todo",
        preparedData
      );
      console.log("response data", response.data);
      const { _id, todo, priority } = response.data;

      dispatch({ type: "add_todo", payload: { _id, todo, priority } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label>Todo</label>
          <input
            type="text"
            {...register("todo", {
              required: { value: true, message: "Todo is required." },
            })}
            placeholder="Create a Todo..."
          />
          <p>{errors.todo?.message}</p>
        </div>
        <div>
          <label>Priority</label>
          <select {...register("priority")}>
            <option value="">Select the Priority ...</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
          <p>{errors.priority?.message}</p>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default TodoForm;
