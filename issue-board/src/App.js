import { useState, useEffect } from "react";

const getTodos = async () => {
  const response = await fetch("http://localhost:8080/todos");
  return await response.json();
};

const TodoList = (props) => {
  return (
    <ul>
      <h1>{props.title}</h1>
      {props.todos.map((todo) => (
        <li key={todo.id} onClick={() => props.toggleDone(todo)}>
          {todo.id}: {todo.name}{" "}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(function () {
    getTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  const toggleDone = (toggledTodo) => {
    setTodos(
      todos.map((todo) => {
        if (todo === toggledTodo) {
          todo.is_done = !todo.is_done;
          return todo;
        }
        return todo;
      })
    );
  };

  return (
    <div>
      <TodoList
        title={"Todos"}
        todos={todos.filter((todo) => !todo.is_done)}
        toggleDone={toggleDone}
      />
      <TodoList
        title={"Done"}
        todos={todos.filter((todo) => todo.is_done)}
        toggleDone={toggleDone}
      />
    </div>
  );
};

export default App;
