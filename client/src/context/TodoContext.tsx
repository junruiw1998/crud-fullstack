import { createContext, useReducer, FC, ReactNode, Dispatch } from "react";

interface Todo {
  _id: string;
  todo: string;
  priority?: "high" | "low";
}

interface IState {
  todos: Todo[];
}

type IAction =
  | { type: "add_todo"; payload: Todo }
  | { type: "get_todos"; payload: Todo[] }
  | { type: "delete_todo"; payload: string };

interface TodoContextProviderProps {
  children: ReactNode;
}

//initialize state and reducers
const initialState: IState = {
  todos: [],
};

const todoReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "add_todo":
      return { ...state, todos: [...state.todos, action.payload] };
    case "get_todos":
      return { ...state, todos: action.payload };
    case "delete_todo":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    default:
      return state;
  }
};

export const TodoContext = createContext<{
  state: IState;
  dispatch: Dispatch<IAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const TodoContextProvider: FC<TodoContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
