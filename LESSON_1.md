# What this is about?

I thought I'd try to create a tutorial for people with no programming experience
on how to build interactive website.

There are of course tons of them, but when I was learning, most of them were only `static` websites,
e.g. blogs, portfolios which were focusing on HTML and styles.

Other tutorials were a lot of times either old -
meaning they didn't use ES6, ES7 (Ecmascript 6, 2015, Ecmascript 7, 2016) and newer features,
which are the most notable that were a big deal in JS land.

And finally, a lot of web application building tutorials are using frameworks like Ember, React, Angular,
which I believe to be actually a bit hurtful for complete noobs to take on, as they are hiding a lot of
implementation detail.

For comparison, and the fact that most modern websites are built with frameworks,
you might expect this tutorial to be later built in some framework environment.

I also invite you to take a look at other tutorials I found:

In this tutorial you'll learn the basics of HTML.
https://www.digitalocean.com/community/tutorial_series/how-to-build-a-website-with-html

In these books you'll learn basics of Javascript:
I recommend reading both, but if you are feeling lazy, then read the "eloquentjavascript" as it's less "dry".
https://eloquentjavascript.net/
https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/README.md

# What to expect?

You'll learn how to put together HTML and make it interactive.
Ultimately the end goal is to build a more or less fully working client facing Todo Application,
with ability to save your state locally, so everytime you make changes and close the browser,
it'll be the same as you left it.

There's going to be more on Javascript, it's architecture and practices rather than HTML.
The biggest emphasis I'd like to put in on in this tutorial is development in practice,
if you'd like to get on with some theory first, then please take a look a the books and blogs mentioned previously.

We _might_ do some styling as well, but I'm really bad at it myself, so don't count on me on this :D
We'll definitely go through creating some basic layout however, but nothing fancy.

# What not to expect?

I won't teach you how to use an editor.
But if you haven't one already, then I recommend installing VsCode (Visual Studio Code).

A lot of theory will be skipped.

## Lesson 1 on building interactive website

This is a summary of a first lesson on building an interactive website.
Usually the summary will be a high level overview, with bit by bit snippets and explanation at the end.

**Important note**
A lot of times you'll notice me including a comment inside code snippets e.g.

For html:

```html
<!-- index.html -->
```

For Javascript

```js
// todo-app.js
```

They are the names of files the snippets belong to.
Of course there might be more comments inside code,
so try to go through each line,
because there might be more explanation included inside.

### Shelling out the HTML

First we start with some boilerplate html and also create the files that are imported from here.
I.e. `styles.css`, `todo-app.js`.
Also the HTML lives inside `index.html`:

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Todo App</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <script src="todo-app.js"></script>
  </body>
</html>
```

Then we can quickly whip up our todo app structure.
We know that we'll want 2 lists with "Todo" and "Done" items.

Inside the body we'll have a `main` element inside which is a `div` and then our lists.

```html
<!-- index.html -->
<main>
  <div>
    <ul element-all-todos>
      Todo items
      <li>Do laundry</li>
    </ul>
    <ul>
      Done items
      <li>Do water change for fish</li>
    </ul>
  </div>
</main>
```

We now have 2 lists rendered in the browser one on top of the other.
Also one of them is given `[all-element-todos]` attribute, so we can easily refer to it from the Javascript later.

### Data and the meaning of it

We start out with a completely empty file and we'll work towards creating an ability to add new items.

The question is, what do we put here to make our todo list interactive?

To be a bit philosophical, what makes up the world?
If you're also interested in science and listening about life, evolution and blackholes.

Then you might've answered _information_ or _data_.
If not, then don't worry, I'll make sure that thinking about _data_ and its properties will be natural for you :)

Because... you see, app, services, game development most of the time, like 90% of it.
For us mere mortals is about managing and moving data around rather than coming up with beautiful algorithms.

When we go back and take a look at our HTML,
we notice that the ListItem elements `<li></li>` have some content inside.
We could say that the content is showing a "name" of our Todo.

```js
// todo-app.js

class TodoItem {
  name;
}
```

Here we represent our data by creating a `class` called "TodoItem" that has a `property` called "name".
This serves two purposes,
one is to have a `Data Structure` that can "hold" data for us, meaning write to and read from,
second give our data a meaningful name and `type`.

Consider these examples of simple `objects` a.k.a POJOs (Plain Old Javascript Object)

```js
{
  name: "Do laundry";
}
```

```js
{
  name: "Heaps and Heap sort";
}
```

Do you see the difference?
I don't.

If it wasn't me who's actually written that, I'd have no idea what I'm looking at!

The difference between those two `objects` is that the first one is our TodoItem,
and the other is a title of a youtube video!
Those are two fundamentally different things "living" inside two completely different systems!

This is why we start with creating a meaningful represenation of our data,
so we as developers can actually know at a glance what this thing is and what is its meaning.

### Displaying todos

First thing we'll want to do is being able to display application data
on the screen by modyfing the HTML document with Javascript.

```js
// todo-app.js

class TodoApp {
  // an `todos` property with an empty array as default value
  todos = [];

  constructor() {
    // Initialize a sample todo
    let newTodo = new TodoItem();
    newTodo.name = "Hello from Javascript";
    // Push the newTodo to the this.todos list
    this.todos.push(newTodo);

    // Render the items
    this.renderTodos();
  }

  // Renders all todo items based on `this.todos` property content
  renderTodos() {
    // Select the `ul` element with all todos
    let list = document.querySelector("[element-all-todos]");

    // Remove all child elements
    for (let child of list.children) {
      list.removeChild(child);
    }

    // Create new li elements and append them to the list
    for (let item of this.todos) {
      let li = document.createElement("li");
      li.innerText = item.name;
      list.appendChild(li);
    }
  }
}

new TodoApp();
```

What this bit does is as follows:

- Declare a class called "TodoApp"
- Define a `property` called "todos" and give it an empty array as a default value
- Define a "constructor" `method`
  - This is a special class `method`, it's called when a `class` is initialized.
    Classes are initialized with a `new` keyword, like you can see at the bottom of the snippet.
- Define a "renderTodos" `method`.
- Initialize the application immediately as the script is loaded by the browser.
