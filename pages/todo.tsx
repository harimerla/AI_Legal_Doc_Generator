import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch {
        // ignore malformed storage
      }
    }
  }, []);

  // Persist todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">My To-Do List</h1>
      <div className="flex w-full max-w-md">
        <input
          className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="w-full max-w-md mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white p-2 my-2 rounded shadow"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`flex-grow cursor-pointer select-none ${
                todo.done ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="text-red-500 ml-4 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
