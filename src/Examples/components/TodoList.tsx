import create from "zustand";
import { useTodoStore } from "../../store/example1";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const text = e.target.elements.todo.value;
    addTodo(text);
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="todo" />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo} <button onClick={() => removeTodo(index)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
