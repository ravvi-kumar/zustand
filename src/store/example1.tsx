import { create } from "zustand";

interface ITodoStore {
  todos: String[];
  addTodo: (text: string) => void;
  removeTodo: (index: number) => void;
}

export const useTodoStore = create<ITodoStore>()((set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({ todos: [...state.todos, text] })),
  removeTodo: (index) =>
    set((state) => ({ todos: state.todos.filter((_, i) => i !== index) })),
}));
