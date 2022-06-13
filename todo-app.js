class TodoItem {
  name;
}

class TodoApp {
  todos = [];

  constructor() {
    this.renderTodos();
    this.formComponent();
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
}

document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
}, { once: true });
