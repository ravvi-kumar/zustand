# Zustand Blog

# Zustand: A Simple and Flexible State Management Library for React

## Introduction

When working with large React applications, state management can quickly become complex and challenging to maintain. Zustand is a state management library that aims to simplify the process by providing a straightforward and flexible solution for managing state in React applications. In this article, we will explore what Zustand is, how it works, its benefits for React developers, and a simple example of how it can be used.

## What is Zustand?

Zustand is a lightweight state management library for React that uses a simple and functional approach to manage state in applications. Zustand allows developers to create stores, which are objects that hold state and provide methods for updating that state. Stores can be easily shared between components, allowing for a centralized and predictable way to handle state throughout an application.

## How Does Zustand Work?

Zustand uses a simple API to manage state in React applications. To create a store, developers use the `createStore` function provided by Zustand. This function takes an initial state object and returns an object that contains the current state and methods for updating that state.

```jsx
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

```

In the example above, we are creating a store that holds a count value and two methods for updating that count value. The `set` function is provided by Zustand and is used to update the state of the store.

Once a store is created, it can be used in components using the `useStore` hook provided by Zustand.

```jsx
import { useStore } from './store';

function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

```

In the example above, we are using the `useStore` hook to access the count value and methods for updating that value in our `Counter` component.

## Benefits of Using Zustand

Zustand provides several benefits for React developers. Firstly, it is a lightweight library that has a small API surface area, making it easy to learn and use. Additionally, because stores can be easily shared between components, Zustand provides a centralized and predictable way to handle state in React applications. Finally, Zustand provides a simple and functional approach to managing state, allowing developers to focus on building their applications rather than worrying about complex state management.

## Getting Started with Zustand

To get started with Zustand, you can install it via npm or yarn:

```
npm install zustand

```

or

```
yarn add zustand

```

Zustand works well with any React application, regardless of whether you're using class components or functional components. To create a store, you'll need to use the `createStore` function provided by Zustand, passing in an initial state object and a function that returns an object containing methods for updating state.

Once you've created your store, you can use the `useStore` hook to access state and methods for updating that state in your components. It's worth noting that you can create as many stores as you need in your application, allowing you to manage state in a centralized and predictable way.

## Example 1: Todo List

Let's take a look at a simple example of how Zustand can be used to manage state in a todo list application.

```tsx
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
```

```tsx
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
```

In the example above, we are creating a store that holds an array of todo items and two methods for updating that array: `addTodo` and `removeTodo`. We're then using the `useTodoStore` hook to access the state and methods in our `TodoList` component.

When the user submits the form in our `TodoList` component, we're using the `addTodo` method to add the new todo item to the store. When the user clicks the "x" button next to a todo item, we're using the `removeTodo` method to remove that item from the store.

## Example 2: Shopping Cart

Let's take a look at a more complex example of how Zustand can be used to manage state in a shopping cart application.

```tsx
import { create } from "zustand";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
};

interface ICartStore {
  items: ItemType[];
  addItem: (item: ItemType) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<ICartStore>()((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));
```

```tsx
import { useCartStore } from "../../store/example.2";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleAddItem = (e: any) => {
    e.preventDefault();
    const name = e.target.elements.itemName.value;
    addItem({
      ...{ id: (Math.random() + 1).toString(36).substring(2), name },
      quantity: 1,
    });
    e.target.reset();
  };

  const handleUpdateItem = (id: string) => {
    const existingItem = items.find((i) => i.id === id);

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    }
  };

  const handleRemoveItem = (id: string) => {
    const existingItem = items.find((i) => i.id === id);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        removeItem(id);
      } else {
        updateQuantity(id, existingItem.quantity - 1);
      }
    }
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity}{" "}
            <button onClick={() => handleUpdateItem(item.id)}>+</button>
            <button onClick={() => handleRemoveItem(item.id)}>-</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddItem}>
        <input type="text" name="itemName" />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
```

In the example above, we are creating a store that holds an array of items in a shopping cart and three methods for updating that array: `addItem`, `removeItem`, and `updateQuantity`. We're then using the `useCartStore` hook to access the state and methods in our `Cart` component.

When the user adds an item to the cart, we're using the `addItem` method to add the item to the store. If the item already exists in the cart, we're using the `updateQuantity` method to update the quantity of that item. When the user removes an item from the cart, we're using the `removeItem` method to remove the item from the store. If the quantity of an item in the cart is greater than 1, we're using the `updateQuantity` method to decrement the quantity.

## Conclusion

Zustand is a powerful and flexible state management library for React that makes it easy to manage state in large applications. Its lightweight and functional programming approach make it a great choice for developers looking for an easy-to-use and predictable state management solution. We hope this article has given you a good introduction to Zustand and its benefits. Give it a try in your next React project!