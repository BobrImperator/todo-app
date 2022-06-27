import { save, read, clear } from "./db.js";

export class TodoItem {
  id;
  name;
  isDone = false;
}

export const renderTodo = function todoRenderer(list, item, app) {
  let li = document.createElement("li");
  let button = document.createElement("button");

  li.addEventListener("click", (event) => {
    item.isDone = !item.isDone;
    app.renderTodos();
    saveTodos();
  });

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    app.todos = app.todos.filter((todo) => todo !== item);
    app.renderTodos();
    saveTodos();
  });

  li.innerText = item.name;
  button.innerText = "Remove";
  li.appendChild(button);
  list.appendChild(li);
};

export function saveTodos(todos) {
  save("todos", todos);
}

export function getTodos() {
  return read("todos") || [];
}

export function clearTodos(callback) {
  if (window.confirm("Are you sure you want to REMOVE ALL ELEMENTS?!?!?!?")) {
    clear("todos");
    callback();
  }
}
