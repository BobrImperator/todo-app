# Syntax Cheatsheet

One of the biggest hurdles when learning any language be it programming one or human(?) is syntax,
when I was making my first steps, one of the best repos that helped me was airbnb's styleguide https://github.com/airbnb/javascript.

I'll try to create a cheatsheet for noobs too as JavaScript has a few ways to define and work with functions, methods etc.

1. [Boolean](#boolean)
2. [String](#string)
3. [Number](#number)
4. [Variables](#variables)

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
.5;
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
number = .5;
```

Most of the time though both are done at the same time, like below, so we'll stick to that too.

Declaration and Initialization examples:

`let`
```js
let number = .5;
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
var number = .5;
var user = { name: "BobrImperator" };
var userName = user.name;

var nothingYet; // undefined
```

I'd prefer to not explore the differences between yet as this relies on `scope` and `context`, so it's better to leave it for later chapters.

https://javascript.info/var
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables

## Functions
