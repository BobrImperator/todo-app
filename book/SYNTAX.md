# Syntax Cheatsheet

One of the biggest hurdles when learning any language be it programming one or human(?) is syntax,
when I was making my first steps, one of the best repos that helped me was airbnb's styleguide https://github.com/airbnb/javascript.

I'll try to create a cheatsheet for noobs too as JavaScript has a few ways to define and work with functions, methods etc.

1. [Boolean](#boolean)
2. [String](#string)
3. [Number](#number)
4. [Variables](#variables)
5. [Functions](#functions)
6. [Objects](#objects)
7. [Methods](#methods)
8. [Arrays](#arrays)
9. [Loops](#loops)

## Primitive values a.k.a Scalar values

To put it simply, primitive value is a kind of value that is it's own reference.
We'll look into the specifics of references later together with object and arrays,
for now though, a good connection to make is that objects or arrays can keep other values inside them,
while primitives are standalone and can't be changed, but only something new can be created based on them.

## Boolean

```js
true;
```

```js
false;
```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean

## String

Strings can be created in 3 different ways, they have small differences, but at the end of the day they are a `string` value.

Quotes `""`

```js
"a string";
```

Single quotes a.k.a Ticks a.k.a Apostrophe `''`

```js
"a string";
```

Backticks ```` https://en.wikipedia.org/wiki/Backtick

```js
`a string`;
```

There's one additional thing to remember regarding strings, you'll notice the use of a Forward Slash `\`.
It's an escaping charachter in JavaScript and most other languages.
The most common issue you might run into is when trying to write some English sentence while constructing it with Single Quotes.

```js
'That's wonderful!';
```

If you tried to run this code, you'd get a nice little error:

```js
Uncaught SyntaxError: Unexpected identifier
```

![Single quotes error](./assets/oh-single-quotes-1.png)

The highlighting helps understand the issue a lot, the problem here is that from the JavaScript compiler's standpoint,
you're trying to create a `string` containing `'That'`, then read a variable called `s` and then...
Damn, let's not go into that too deply, all you need to know is that JavaScript is confused and it breaks.

There are a few ways to work through it:

Escape the inner Tick:

```js
'That\'s wonderful!';
```

Quotes

```js
"That's wonderful!";
```

Backticks

```js
`That's wonderful!`;
```

![Single quotes and escaping](./assets/oh-single-quotes-2.png)

This varies between projects, but usually developers tend to use Ticks `''` in their JavaScript code,
unless you need to write an English sentence.

...or concatenate...that's what the `Backticks` were invented for, but that's a separate topic.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

## Number

JavaScript is pretty simple when it comes to numeric values, there's pretty much just a `Number`, it can have a floating point, but it's still a `Number` type.

0 (Zero) Number

```js
0;
```

1 (One) Number

```js
1;
```

1 000 000 (1 Million) Number

```js
1000000;
```

0.5 (a half) `Float`ing point Number

```js
0.5;
```

1/8th (One eighth) `Float`ing point Number

```js
0.125;
```

1 and 1/8th (One and one eighth) `Float`ing point Number

```js
1.125;
```

Floating point numbers that don't have a whole part to it, can also be written 'american style' e.g.

Point five

```js
0.5;
```

is the same as

```js
0.5;
```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number

## Variables

There are 3 types of variables `var`, `let`, `const`.

The goto keyword for variable declaration is `let`, considering some nuance regarding `const` is also useful.
`var` however is pretty much a thing of the past and I don't really see myself using it.
It also has some weird behavior and this is why it was effectively replaced by `let`.

The basic usage of variables with any of the keywords is pretty much the same.
This is a 2 step process, but most of the time you'll see them as one-liners.

Declaration step:

```js
let number;
```

When a variable has been only declared, and no value has been assigned to it, it's value will be `undefined`.

Initialization / Assignment step:

```js
let number;
number = 0.5;
```

Most of the time though both are done at the same time, like below, so we'll stick to that too.

Declaration and Initialization examples:

`let`

```js
let number = 0.5;
let user = { name: "BobrImperator" };
let userName = user.name;

let nothingYet; // undefined
```

`const`

```js
const number = .5;
const user = { name: "BobrImperator" };
const userName = user.name;

const nothingYet; // undefined
```

`var`

```js
var number = 0.5;
var user = { name: "BobrImperator" };
var userName = user.name;

var nothingYet; // undefined
```

I'd prefer to not explore the differences between yet as this relies on `scope` and `context`, so it's better to leave it for later chapters.

https://javascript.info/var
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables

## Functions

Functions can be created in several ways too but there are essentially 2 types of functions, a function, and an arrow function.
They are some kind of construct that allow to define some functionality that can be later used in code.
Functions need to be called to perform whatever is inside them, and most of the time they also need to receive arguments when they are called.

Sometimes a function call might also be referred to as function invocation, or running a function.
If someone tells you to "run a function x", "invoke a function x", "call a function x" then they essentially mean the same thing i.e `x()`.

a regular function:

```js
// a function called add that takes no arguments and returns nothing.
function add() {}

add(); // undefined

// a function called add that takes two arguments called a and b
function add(a, b) {
  return a + b;
}

add(1, 2); // 3

// a function called add assigned to a variable called 'x'
const x = function add(a, b) {
  return a + b;
};

x(1, 2); // 3

// an anonymous function assigned to a variable called 'add'
const add = function (a, b) {
  return a + b;
};

add(1, 2); // 3
```

an arrow function:

```js
// an anonymous function assigned to a variable called 'add'
const add = (a, b) => {
  return a + b;
};

add(1, 2); // 3

// an anonymous function assigned to a variable called 'add'
const add = (a, b) => a + b;

add(1, 2); // 3
```

The arrow function doesn't require curly brackets `{}` to define where it's body is, as you can see above.
Sometimes it's more convenient to create a one-liner function.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

## Objects

`Object` is a data structure that allows to store many `properties`, usually they are used to "describe" some kind of "Entity" like a "User".

They are created with "Curly Braces" like this `{}`.

For example, every single one of us has some kind of account, be it YouTube or Github.
Those services would usually, and probably are keeping some kind of data about you or me,
that data could be described as an `object` with `properties` describing a `User`.

```js
// an object assign to a variable called 'user'
const user = {
  name: "Bartłomiej",
  nickname: "BobrImperator",
};
```

Properties are a `key: value` pairs, on the left-hand side are keys, and on the right-side are their values.

The above `object` has 2 `properties`:

- a "name" with a value "Bartłomiej"
- a "nickname" with a value "BobrImperator"

Object `properties` can be accessed with a "dot" `.` and "brackets" `[]` i.e

```js
const user = {
  name: "Bartłomiej",
  nickname: "BobrImperator",
};

user.name; // "Bartłomiej"

user["nickname"]; // "BobrImperator"
```

You should always stick to using the "dot" `.` notation, but the "bracket" `[]` notation can also be useful.
It's possible to use a variable to access an object's property:

```js
const displayKey = "nickname";

const user = {
  name: "Bartłomiej",
  nickname: "BobrImperator",
};

user.name; // "Bartłomiej"

user[displayKey]; // "BobrImperator"
```

This is also true for creating new properties:

```js
const displayKey = "nickname";

const user = {
  name: "Bartłomiej",
  [displayKey]: "BobrImperator",
};

user.name; // "Bartłomiej"

user[displayKey]; // "BobrImperator"
user.nickname; // "BobrImperator"
```

```js
const displayKey = "nickname";

let user = {
  name: "Bartłomiej",
  [displayKey]: "BobrImperator",
};

user[displayKey]; // BobrImperator;

// Assign a new value "Bober" to "nickname" key;
user[displayKey] = "Bober";

user.nickname; // "Bober"
```

Given the above, let's create a function that returns a `string` saying "Bartłomiej a.k.a BobrImperator".

```js
const user = {
  name: "Bartłomiej",
  nickname: "BobrImperator",
};

// a function 'printUser' which takes a 'user' as an argument
function printUser(user) {
  return `${user.name} a.k.a ${user.nickname}`;
}

printUser(user); // "Bartłomiej a.k.a BobrImperator"
```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

## Methods

With both `object` and `function` in the previous chapter, "methods" are a natural choice as the next one.
Methods are simply functions, with the exception being a part of some `object` and being able to do stuff in their `context`.

Let's bring the example from before, but make it so "printUser" is a "method" instead, while at it, let's rename it to just "print", so it's a bit neater 😎.

```js
const user = {
  name: "Bartłomiej",
  nickname: "BobrImperator",
  // a method 'print' which takes no arguments
  print() {
    // `this` refers to the 'user' object, hence it's not necessary to pass the user as an argument anymore
    return `${this.name} a.k.a ${this.nickname}`;
  },
};

user.print(); // "Bartłomiej a.k.a BobrImperator"
```

There are few ways to create a method:

```js
let user = {
  name: "Bartłomiej",
  nickname: "BobrImperator",
  // Shorthand Syntax
  print() {
    return `${this.name} a.k.a ${this.nickname}`;
  },

  // 'classic' long syntax
  getName: function () {
    return this.name;
  },
};

// create a function and assign it as 'getNickname' property of 'user'
user.getNickname = function () {
  return this.nickname;
};

user.getName(); // Bartłomiej

user.print(); // "Bartłomiej a.k.a BobrImperator"

user.getNickname(); // "BobrImperator"
```

It's important to note here that I don't use the "Arrow Function" here, the reason being the `context`.
This is one of the nuances that is at most only worth mentioning for now.

By a principle, if you want to create a `method` that uses it's "surrounding" object as a `context` (`this`), then just stick to the "Shorthand Syntax", and you'll be just fine.

## Arrays

`Array` is a data structure that allows to store multiple values and references inside it.

They are created with "Brackets" like this `[]`.

Arrays are also a lot of times referred to as "lists" because it's a bit better sounding to say "A list of users", but ultimately in JavaScript lingo they are one and the same.
A very simple example would be an array of numbers.

```js
// create an array of numbers called 'costs'
const costs = [0.5, 1.25, 7, 9, 32];
```

We can read any value from the list by referring to them by their index:

```js
const costs = [0.5, 1.25, 7, 9, 32];

// read the first number
costs[0]; // 0.5

// read the second number
costs[1]; // 1.25

// read the fourth number

costs[3]; // 9

// read the last number
// we must subtract 1 from the length of the array
// because costs.length is 5 (there are 5 elements in the list)
// while indexes are zero-based (first index starts from 0)
costs[costs.length - 1]; // 32
```

Indexes are zero-based, this is why the first element can be found under index "0" and not "1".
Also if we want to access the last element, we must get the total length of the list and subtract 1 and as a result we receive the index of the last element.

An index can only be read with "bracket" `[]` notation.

Arrays on their own don't seem that useful, so let's enter [Loops][#loops].

## Loops

100% of time where's a list, there's a loop.

```js
// create an array of numbers called 'costs'
const costs = [0.5, 1.25, 7, 9, 32];

// Call 'reduce' method of an `array`
// 'reduce' takes a function as first argument
// and an initial value of 'total' as second argument.
// The callback adds 'total' and 'cost' together
costs.reduce((total, cost) => cost + total, 0); // 49.75
```

In the example, we're "iterating over", "traversing" or "looping over" the whole "costs" list by calling the `reduce` method,
we're not bothered here with the "how" of the `reduce` method.

Let's do the same but without cheating, we'll create a loop that reads each value of an array by using their indexes.
First we'll take a look at the good ol' classic `for` loop.

```js
const costs = [0.5, 1.25, 7, 9, 32];
// create variable 'total', initialize it with value 0;
let total = 0;

// create a for loop
for (let index = 0; index <= costs.length - 1; index = index + 1) {
  // create variable 'cost', assign it with a value read from 'costs'
  let cost = costs[index];

  // assign 'total' variable a new value by adding 'total' and 'cost' together.
  total = total + cost;
}

total; // 49.75
```

There's a lot going on in the `for` loop at first glance, so let's try breaking it down.

For loop has 3 steps which are separated by semicolons `;` inside the parenthesis `()` after `for` keyword.
The steps in order are `Initialization`, `Condition`, `Update`,
in the following example, we

1. `Initialize` a `variable` called "index",
2. Check if the `Condition` is `true`

- For loop runs when the condition evaluates to `true`,
  so we check if the "index" is smaller or equal to `costs.length - 1`.

3. The for loop then runs the code inside it's body (inside `{}`)
4. After it runs that code, it then executes the `Update`
5. Then it does the 2nd step again until the condition returns `false` (If a condition is wrong, it will run forever)

```js
for (
  let index = 0 /* Initialization step */;
  index <= costs.length - 1 /* Condition step */;
  index = index + 1 /* Update step */
) {}
```

Today though, you'll rarely need the 'classic' `for` loop, most of the time when a loop is performed, it's over an array of data,
and there are more convenient options than the `for` loop, we could use a `for..of` loop instead.

```js
const costs = [0.5, 1.25, 7, 9, 32];
let total = 0;

// create a for..of loop
for (let cost of costs) {
  total = total + cost;
}

total; // 49.75
```

Or a `reduce` method like before.

Lastly, I'd like to finish this section with a slightly more complex example, which is pretty common in the 'real world'.
Imagine we have an array of `transactions`, the transactions are objects that have a `value`.
Now we'd like to sum up all the transactions and return them.

```js
const transactions = [
  {
    description: "Allowance",
    value: 200,
  },
  {
    description: "Beer",
    value: -12,
  },
  {
    description: "Burger",
    value: -38,
  },
  {
    description: "Cola",
    value: -8,
  },
  {
    description: "Coffee Beans",
    value: -95,
  },
];

transactions
  .map((transaction) => transaction.value)
  .reduce((total, value) => total + value, 0); // 47;
```

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
