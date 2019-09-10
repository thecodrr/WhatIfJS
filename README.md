# WhatIfJS

<p align="center">
 <a href="https://www.npmjs.com/package/whatif-js"><img alt="total downloads of WhatIfJS" src="https://img.shields.io/npm/dt/whatif-js.svg"/></a>
 <a href="https://www.npmjs.com/package/whatif-js"><img alt="WhatIfJS's License" src="https://img.shields.io/npm/l/whatif-js.svg"/></a>
 <a href="https://www.npmjs.com/package/whatif-js"><img alt="latest version of WhatIfJS" src="https://img.shields.io/npm/v/whatif-js.svg"/></a>
</p>

<p align="center">
WhatIf is an extremely simple and easy to use JavaScript extension for expressing a single if-else statement anywhere, anytime.
</p>

<p align="center">
<img src="https://i.imgur.com/3N2bap4.png" width="844" height="341"/>
</p>

## Installation:

Install using `yarn` or `npm`

```bash
npm i --save whatif-js
yarn add whatif-js
```

Then in the `entryPoint` of your `app`/`module`just ` require``whatIf `:

```javascript
require("whatif-js");
```

And that's it, nothing more needed for setup. Everything is handled by the module itself.

## Usage

### Whfunction() {atIf

`WhatIf` is an expression for invoking an `action` when the given value is not-`null`, not-`undefined` and `true`.

The `whatIf`function has **three parameters**:

1. `given` - the value

2. `action` - the action to perform if the `given` value is not-`null`, not-`undefined` and `true`.

3. `actionWhatIfNot` - (optional) - the action to perform in case the `given` value returns `false`.

#### Examples:

The most basic (and useless) example would be:

```javascript
let obj = { name: "Awesome App", type: "App" };
obj = obj.whatIf(obj.type === "App", function() {
  this["description"] = "I am an awesome app.";
});
//output =
//{
//  name: 'Awesome App',
//  type: 'App',
//  description: 'I am an awesome app.'
//}
```

Now let's get a **little bit** more complex. Usage in a `builder` like an `Array` or `String`also works.

```javascript
let array = [0, 1, 2, 3, 4, 5];
array = array
  .whatIf(array.length === 6, ctx => {
    return ctx.concat(6, 7, 8, 9);
  })
  .slice(2, 4)
  .join(",");
//output = 2,3,4,5,6,7,8,9
```

`WhatIf` can also be used directly with `booleans`like so:

```javascript
function workingWithBoolean(stopWork) {
  stopWork.whatIf(function() {
    console.log("Stop all the work!");
  });
}
```

Now coming to the **the more complex** example. Using `WhatIf` with functions.

There are two ways of using `WhatIf` with `functions`, the first is more simple:

```javascript
function calculateSimple(doMultiplication, doDivision) {
  //three methods for three mathematical operations
  function add(...params) {
    return params.reduce((p, c) => p + c);
  }
  function multiply(...params) {
    return params.reduce((p, c) => p * c);
  }
  function divide(...params) {
    return params.reduce((p, c) => p / c);
  }

  //the values to work with
  let paramaters = [21, 23, 41, 51, 5, 1];

  //the result
  let result = add //perform add if both parameters are false
    .whatIf(doMultiplication, multiply) //this will only be executed if doDivision=false & doMultiplication=true
    .whatIf(doDivision, divide) //if doDivision=true, it will always take precedence no matter the value of doMultiplication
    .call(this, ...paramaters); //the final function call
  return result;
}
```

We can use the above `function` `calculateSimple`in the following three ways:

```javascript
calculateSimple(false, false); //142
calculateSimple(false, true); //0.0000873307965816231
calculateSimple(true, false); //5049765
calculateSimple(true, true); //0.0000873307965816231
```

**More complex example** includes performing <u>DMAS (Division, Multiplication, Addition, Subtraction)</u> on a `string`using only the power of`WhatIf`. See the [full example here](https://github.com/thecodrr/WhatIfJS/tree/master/examples/index.js)

### WhatIfNotNull

`whatIfNotNull` is an expression for invoking an `action` when the target object is not null.

```kotlin
let person = getPersonByUsername("John Doe");
person.whatIfNotNull(
    function() {
      console.log("person is not null.");
    },
    function() {
      console.log("person is null");
    }
);
```

### WhatIfNotUndefined

`whatIfNotUndefined` is exactly like `whatIfNotNull`but it checks whether the object is `undefined` or not.

### WhatIf With Different Return Type

In cases where you want a different return type then the input you can use `whatIf` like this:

```javascript
let stringLength = "i am a string".whatIf(getLength, function() {
  return this.length;
});
```

### WhatIfNotNullOrEmpty

An expression for invoking an `action` when the given `array` is not null and not empty.
If the `array` is null or empty, `actionWhatIfNot` will be invoked instead of the `action`.

```kotlin
anyArray.whatIfNotNullOrEmpty(
  function() {
    console.log("array is not null or empty.");
  },
  function() {
    console.log("array is null or empty");
  }
);
```

### Using Arrow Functions

All `function`s of `whatIf`are usable with `arrow functions` like so:

```javascript
anyArray.whatIfNotNullOrEmpty(
  ctx => console.log("array is not null or empty."),
  ctx => console.log("array is null or empty")
);
```

## Find this library useful? :heart:

Support it by joining **[stargazers](https://github.com/thecodrr/WhatIfJS/stargazers)** for this repository. :star:or [buy me a cup of coffee]([https://ko-fi.com/thecodrr](https://ko-fi.com/thecodrr)
And **[follow](https://github.com/thecodrr)** me for my next creations! 🤩

# License

```xml
Copyright 2019 thecodrr (Abdullah Atta)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
