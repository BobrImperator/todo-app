class TodoItem {
  name;
}

class TodoApp {
  todos = [];

  constructor() {
    let newTodo = new TodoItem();
    newTodo.name = "Hello from Javascript";
    this.todos.push(newTodo);

    this.renderTodos();
  }

  renderTodos() {
    let list = document.querySelector("[element-all-todos]");

    for (let child of list.children) {
      list.removeChild(child);
    }

    for (let item of this.todos) {
      let li = document.createElement("li");
      li.innerText = item.name;
      list.appendChild(li);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
}, { once: true });
