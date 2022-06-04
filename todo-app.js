class TodoItem {
  id;
  name;
}

class TodoApp {
  allItems = [];
  doneItems = [];

  allTodoListElement;
  todoFormElement;

  constructor() {
    const todoForm = document.querySelector("[element-add-todo-form]");
    const todoListElement = document.querySelector("[element-all-todos]");

    this.allTodoListElement = todoListElement;
    this.todoFormElement = todoForm;

    todoForm.addEventListener("submit", (submitEvent) => {
      submitEvent.preventDefault();
      const formData = new FormData(submitEvent.target);
    
      let newTodoItem = new TodoItem();
      newTodoItem.name = formData.get("name");
      newTodoItem.id = formData.get("id");

      this.allItems.push(newTodoItem);
      submitEvent.target.reset();
      this.renderTodo(newTodoItem);
    });
  }

  renderTodo(newTodoItem) {
      let newTodoElement = document.createElement("li");
      newTodoElement.innerText = newTodoItem.name;
      this.allTodoListElement.appendChild(newTodoElement);
  }
}

new TodoApp();
