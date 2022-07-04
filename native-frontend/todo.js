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
    saveTodos(app.todos);
  });

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    app.todos = app.todos.filter((todo) => todo !== item);
    app.renderTodos();
    saveTodos(app.todos);
  });

  li.innerText = item.name;
  li.className = "todo";

  button.innerText = "Remove";
  button.className = "button --danger"

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
