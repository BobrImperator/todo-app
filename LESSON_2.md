## Lesson 2 on building interactive website

Related changes: https://github.com/BobrImperator/todo-app/pull/1/files

### Ideally script tags should be in the `<head></head>` of the document

In this lesson, one of the changes is that we've moved the `script` tag from the document body
to the document head.

There can be some cases where having a `script` tag inside body might be useful e.g. when it's some Third-Party 'module'
that you'd like to load _sometime after_ your application is already running.
Most of the time however, especially when working with frameworks all of the javascript is loaded before anything else
because it's required for your application to function at all as nowadays all of the HTML is created 'on the fly' with Javascript (client-side rendering).
Unlike before when it was the server sending over complete HTML document (server-side rendering).

Given all that, we can go back to the todo-app.
So as mentioned, we've moved the `script` tag from the `body` to the `head`.

But this creates an issue:
```js
Uncaught TypeError: Cannot read properties of null (reading 'lastChild')
    at TodoApp.renderTodos (todo-app.js:16:17)
    at new TodoApp (todo-app.js:9:10)
    at todo-app.js:44:3
```
The application stopped working, so what's going on?!

Well, a thing to consider is that the browser is "parsing" the `document` (index.html) in top-to-bottom manner.
Meaning that the javascript is loaded and run **before** any content inside the document's `body`.
Which we rely on inside `renderTodos` method, because this is where we try to find the element with "element-all-todos" attribute,
but because the element doesn't exist yet, the `document.querySelector` returns `null`.
So once we try to access some property on `null`, in this case "lastchild" - the application crashes.

We can check this by using `debugger` and adding it right above the `new TodoApp()` line. 
It is a special keyword that stops browser from processing anything when it "encounters" a `debugger` in code. 


![Check browser state with debugger](./check-document-with-debugger.png)

As shown, our "index.html" file is only parsed to the point when our javascript is loaded and nothing more.
And our application fails because we try to reference an element that doesn't exist.

Luckily, browser emits a lot of useful events that we can use to avoid this problem.
The event we're looking for is called "DOMContentLoaded", the browser emits it only **after** the whole document is parsed and ready.

```js
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
}, { once: true });
```

So similarly to the "submit" event on the form element, we add an 'eventListener' on the `document` directly,
inside it `initialize` the application and additionally we pass it additional option `once: true` which will make it so
the function runs only "once" and it can remove/detach the event listener so it won't be run again just in case.

A thing to consider here is that, even though the "DOMContentLoaded" is very useful,
if we are creating and rendering the HTML elements client-side (with javascript).
We shouldn't rely on the elements that are in the document, so later on we'll change the code to reflect that.

### Creating new Todos

Now we'll implement a form that will let us create more todos.
Let's start off by calling a method called `formComponent` inside the `constructor` of TodoApp `class`:

```js
  constructor() {
    ..
    this.formComponent();
  }
```

and for `formComponent` method implementation:
```js
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
```

It's a pretty small function, but there's a bit going on

```html
    <main>
      ...
      <form element-form>
        <input type="text" name="name" />
        <button type="submit">
          Submit
        </button>
      </form>
    </main>
```

https://developer.mozilla.org/en-US/docs/Web/API/FormData
https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
https://developer.mozilla.org/en-US/docs/Web/Events
https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
