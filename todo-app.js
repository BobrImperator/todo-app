class TodoItem {
  name;
}

class TodoApp {
  todos = [];

  constructor() {
    this.renderTodos();
    this.formComponent();
    this.registerClick();
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

      this.todos.push(newTodo);
      this.renderTodos();
    });
  }

  registerClick() {
    let list = document.querySelector("[element-all-todos]");
    let targetList = document.querySelector("[element-done-todos]");

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
