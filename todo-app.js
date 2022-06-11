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

//class TodoApp {
//  allItems = [];
//  doneItems = [];
//
//  allTodoListElement;
//  todoFormElement;
//
//  constructor() {
//    const todoForm = document.querySelector("[element-add-todo-form]");
//    const todoListElement = document.querySelector("[element-all-todos]");
//
//    this.allTodoListElement = todoListElement;
//    this.todoFormElement = todoForm;
//
//    todoForm.addEventListener("submit", (submitEvent) => {
//      submitEvent.preventDefault();
//      const formData = new FormData(submitEvent.target);
//
//      let newTodoItem = new TodoItem();
//      newTodoItem.name = formData.get("name");
//      newTodoItem.id = formData.get("id");
//
//      this.allItems.push(newTodoItem);
//      submitEvent.target.reset();
//      this.renderTodo(newTodoItem);
//    });
//  }
//
//  renderTodo(newTodoItem) {
//      let newTodoElement = document.createElement("li");
//      newTodoElement.innerText = newTodoItem.name;
//      this.allTodoListElement.appendChild(newTodoElement);
//  }
//}

new TodoApp();
