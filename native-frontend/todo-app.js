import { save, read } from './db.js';

const ALL_TODOS_ELEMENT = "[element-all-todos]";
const DONE_TODOS_ELEMENT = "[element-done-todos]";


class TodoItem {
  id;
  name;
  isDone = false;
}

const clearList = (selector) => {
  let list = document.querySelector(selector);

  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }
};

const renderTodo = function todoRenderer(list, item, app) {
  let li = document.createElement("li");
  let button = document.createElement("button");

  li.addEventListener("click", (event) => {
    item.isDone = !item.isDone;
    app.renderTodos();
    app.saveTodos();
  });

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    app.todos = app.todos.filter((todo) => todo !== item);
    app.renderTodos();
    app.saveTodos();
  });

  li.innerText = item.name;
  button.innerText = "Remove";
  li.appendChild(button);
  list.appendChild(li);
};

class TodoApp {
  todos;

  constructor() {
    this.todos = this.getTodos();
    this.renderTodos();
    this.formComponent();
    this.clearTodosComponent();
  }

  renderTodos() {
    clearList(ALL_TODOS_ELEMENT);
    clearList(DONE_TODOS_ELEMENT);
    let allTodoList = document.querySelector(ALL_TODOS_ELEMENT);
    let doneTodoList = document.querySelector(DONE_TODOS_ELEMENT);

    for (let item of this.todos) {
      if (item.isDone) {
        renderTodo(doneTodoList, item, this);
      } else {
        renderTodo(allTodoList, item, this);
      }
    }
  }

  formComponent() {
    const todoForm = document.querySelector("[element-form]");

    todoForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      let newTodo = new TodoItem();
      newTodo.name = formData.get("name");
      let isDone = formData.get("isDone");
      newTodo.isDone = Boolean(isDone);

      let todoIds = this.todos.map((todo) => todo.id);
      let maxId = Math.max(...todoIds);

      newTodo.id = this.todos.length > 0 ? ++maxId : 1;

      event.target.reset();
      this.todos.push(newTodo);
      this.renderTodos();
      this.saveTodos();
    });
  }

  clearTodosComponent() {
    const button = document.querySelector("[element-clear-elements]");
    button.addEventListener("click", () => this.clearTodos());
  }

  saveTodos() {
    save('todos', this.todos);
  }

  getTodos() {
    return read('todos') || [];
  }

  clearTodos() {
    if (window.confirm("Are you sure you want to REMOVE ALL ELEMENTS?!?!?!?")) {
      window.localStorage.clear();
      this.todos = [];
      this.renderTodos();
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    new TodoApp();
  },
  { once: true }
);
