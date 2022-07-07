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

// INPUT { isDone: true, name: "Ree" }
// OUTPUT { is_done: true, name: "Ree" }
const CAPITAL_LETTERS_REGEX = /(?=[A-Z])/g;

const snakelize = (data) => {
  return Object.fromEntries(
    Object.entries(data).map((entry) => {
      let match = entry[0].split(CAPITAL_LETTERS_REGEX);

      let newEntry;

      if (!match) {
        newEntry = entry[0];
      } else {
        newEntry = match.map((word) => word.toLowerCase()).join("_");
      }

      return [
        newEntry,
        entry[1], // value
      ];
    })
  );
};

const camelize = (data) => {
  return Object.fromEntries(
    Object.entries(data).map((entry) => {
      let match = entry[0].split("_");

      let newEntry;

      if (!match) {
        newEntry = entry[0];
      } else {
        let [first, ...others] = match;

        if (others.length) {
          let o = others.map((word) => {
            let [firstLetter, ...letters]= word.split("");
            
            return [firstLetter.toUpperCase(), ...letters].join('');
          });

          newEntry = `${match[0]}${o}`;
        } else {
          newEntry = entry[0];
        }
      }

      return [
        newEntry,
        entry[1], // value
      ];
    })
  );
};

class TodoApp {
  todos;

  constructor() {
    this.start();

    let todo = new TodoItem();

    let snake = snakelize(todo);

    let camel = camelize(snake);
    console.log(snake);
    console.log(camel);
  }

  async start() {
    try {
      let response = await fetch("http://localhost:8080/todos");
      let todos = await response.json();

      this.todos = todos;
      this.renderTodos();
      this.formComponent();
      this.clearTodosComponent();
    } catch (error) {
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

    todoForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      let newTodo = new TodoItem();
      newTodo.name = formData.get("name");
      let isDone = formData.get("isDone");
      newTodo.isDone = Boolean(isDone);

      let response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        body: JSON.stringify(snakelize(newTodo)),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();

      let todo = new TodoItem();
      
      todo.isDone = camelize(json).isDone;
      todo.name = json.name;

      event.target.reset();
      this.todos.push(todo);
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
