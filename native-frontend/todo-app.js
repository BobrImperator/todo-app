import {
  TodoItem,
  renderTodo,
  saveTodos,
  getTodos,
  clearTodos,
} from "./todo.js";

const ALL_TODOS_ELEMENT = "[element-all-todos]";
const DONE_TODOS_ELEMENT = "[element-done-todos]";

const clearList = (selector) => {
  let list = document.querySelector(selector);

  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }
};

class TodoApp {
  todos;

  constructor() {
    this.start(); 
  }

  async start() {
    try {
      let response = await fetch('http://localhost:8080/todos');
      let todos = await response.json();

      this.todos = todos;
      this.renderTodos();
      this.formComponent();
      this.clearTodosComponent();
    } catch(error) {
      console.error(error);
    }
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
      saveTodos(this.todos);
    });
  }

  clearTodosComponent() {
    const button = document.querySelector("[element-clear-elements]");
    button.addEventListener("click", () => {
      clearTodos(() => {
        this.todos = [];
        this.renderTodos();
      });
    });
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    new TodoApp();
  },
  { once: true }
);
