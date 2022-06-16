class TodoItem {
  name;
  isDone = false;
}

class TodoApp {
  todos = [];

  constructor() {
    this.renderTodos();
    this.formComponent();
    this.registerClick("[element-all-todos]", "[element-done-todos]");
    this.registerClick("[element-done-todos]", "[element-all-todos]");
  }

  renderTodos() {
    let list = document.querySelector("[element-all-todos]");

    while (list.lastChild) {
      list.removeChild(list.lastChild);
    }

    for (let item of this.todos) {
      let li = document.createElement("li");
      li.innerText = item.name;
      list.appendChild(li);
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

    list.addEventListener('click', (event) => {
      let child = event.srcElement;
      targetList.appendChild(child);
      // Mutable https://developer.mozilla.org/en-US/docs/Glossary/Mutable
      // let index = this.todos.findIndex((todo) => todo.name === child.innerText);
      // this.todos.splice(index, 1);

      // Immutable https://developer.mozilla.org/en-US/docs/Glossary/Immutable
      this.todos = this.todos.filter((todo) => todo.name !== child.innerText);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
}, { once: true });
