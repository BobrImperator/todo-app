const ALL_TODOS_ELEMENT = "[element-all-todos]";
const DONE_TODOS_ELEMENT = "[element-done-todos]";

class TodoItem {
  name;
  isDone = false;
}

const clearList = (selector) => {
  let list = document.querySelector(selector);

  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }
};

const renderTodo = function todoRenderer(list, item) {
  let li = document.createElement("li");
  li.innerText = item.name;
  list.appendChild(li);
};

class TodoApp {
  todos = [];

  constructor() {
    this.renderTodos();
    this.formComponent();
    this.registerClick(ALL_TODOS_ELEMENT, DONE_TODOS_ELEMENT);
    this.registerClick(DONE_TODOS_ELEMENT, ALL_TODOS_ELEMENT);
  }

  renderTodos() {
    clearList(ALL_TODOS_ELEMENT);
    clearList(DONE_TODOS_ELEMENT);
    let allTodoList = document.querySelector(ALL_TODOS_ELEMENT);
    let doneTodoList = document.querySelector(DONE_TODOS_ELEMENT);

    for (let item of this.todos) {
      if (item.isDone) {
        renderTodo(doneTodoList, item);
      } else {
        renderTodo(allTodoList, item);
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

      event.target.reset();
      this.todos.push(newTodo);
      this.renderTodos();
      console.log(this.todos);
    });
  }

  registerClick(sourceElement, targetElement) {
    let list = document.querySelector(sourceElement);
    let targetList = document.querySelector(targetElement);

    list.addEventListener("click", (event) => {
      let child = event.srcElement;
      
      let todo = this.todos.find((todo) => todo.name === child.innerText);
      todo.isDone = !todo.isDone;
      
      this.renderTodos();
      console.log(this.todos);
      // targetList.appendChild(child);
      // Mutable https://developer.mozilla.org/en-US/docs/Glossary/Mutable
      // let index = this.todos.findIndex((todo) => todo.name === child.innerText);
      // this.todos.splice(index, 1);

      // Immutable https://developer.mozilla.org/en-US/docs/Glossary/Immutable
      // this.todos = this.todos.filter((todo) => todo.name !== child.innerText);
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
