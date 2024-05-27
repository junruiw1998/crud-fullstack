import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { add_todo } from "../../features/todo/todoSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
interface FormValues {
  todo: string;
  priority?: "high" | "low";
}

function TodoForm() {
  const dispatch = useDispatch();
  const form = useForm<FormValues>({});
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;
  const onSubmit = async (data: FormValues) => {
    const preparedData = { ...data };
    if (!data.priority) {
      delete preparedData.priority;
    }
    console.log("Form submission: ", preparedData);
    try {
      const response = await axios.post(
        "http://localhost:3000/todo",
        preparedData
      );
      dispatch(add_todo(response.data.data));
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
