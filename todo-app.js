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

  let dataId = document.createAttribute("data-id");
  dataId.value = item.id;

  li.addEventListener("click", (event) => {
    let dataId = event.srcElement.attributes.getNamedItem("data-id");

    if (dataId.value) {
      let todo = app.todos.find((todo) => todo.id === Number(dataId.value));
      todo.isDone = !todo.isDone;

      app.renderTodos();
    }
  });
  button.addEventListener("click", () => {});

  li.innerText = item.name;
  button.innerText = "Remove";
  li.attributes.setNamedItem(dataId);
  li.appendChild(button);
  list.appendChild(li);
};

class TodoApp {
  todos = [];

  constructor() {
    this.renderTodos();
    this.formComponent();
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
      console.log(this.todos);
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
