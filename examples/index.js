require("../index");

function withObject(published) {
  let testObject = { name: "Awesome App", type: "App" }.whatIf(
    published,
    ctx => {
      //perform complex computations here
      //and change the object based on that.
      ctx["output"] = "The app is published.";
    }
  );
  return testObject;
}
function withBuilder(published) {
  let builder = "I am a string builder."
    .trim()
    .slice(2)
    .whatIf(published, ctx => {
      return ctx.toLowerCase();
    })
    .toUpperCase();
  return builder;
}

function withArrays(addSix) {
  return [0, 1, 2, 3, 4, 5].whatIf(addSix, ctx => {
    return ctx.concat(6);
  });
}

function withFunctions(doMultiplication, doDivision) {
  function add(...params) {
    return params.reduce((p, c) => p + c);
  }
  function multiply(...params) {
    return params.reduce((p, c) => p * c);
  }
  function divide(...params) {
    return params.reduce((p, c) => p / c);
  }
  let paramaters = [21, 23, 41, 51, 5, 1];
  let result = add
    .whatIf(doMultiplication, multiply)
    .whatIf(doDivision, divide)
    .call(this, ...paramaters);
  return result;
}

//let's get a little bit complex
function DMAS(input) {
  function add(...params) {
    let ret = params.reduce((p, c) => parseInt(p) + parseInt(c));
    return ret;
  }
  function multiply(...params) {
    return params.reduce((p, c) => p * c);
  }
  function divide(...params) {
    return params.reduce((p, c) => p / c);
  }
  function subtract(...params) {
    return params.reduce((p, c) => p - c);
  }
  input = input.split(" ");
  let output = [...input];
  const get = operator =>
    output
      .filter(
        (v, i) =>
          i % 2 === 0 &&
          (output[i + 1] === operator || output[i - 1] === operator)
      )
      .slice(0, 2);
  const perform = (operator, operation, output) => {
    let values = get(operator);
    if (values.length <= 0) return output;
    output.splice(output.indexOf(values[0]), 3, operation(...values));
    return output;
  };
  const hasOperator = operator => get(operator).length > 0;
  while (output.length !== 1) {
    output = perform
      .bind(this, "/", divide, output)
      .whatIf(hasOperator("*"), perform.bind(this, "*", multiply))
      .whatIf(hasOperator("+"), perform.bind(this, "+", add))
      .whatIf(hasOperator("-"), perform.bind(this, "-", subtract));
  }
  return output[0];
}

function withBoolean(stopWork) {
  //direct usage with boolean
  stopWork.whatIf(function() {
    console.log("Stop working man!");
  });
}

function bookBuilder(published) {
  let book = " I am a book. "
    .trim()
    //whatIf can be used anywhere
    .whatIf(published, function() {
      console.log(this);
      return this.concat(" And I am published.");
    })
    .toUpperCase();
  return book; // -> I AM A BOOK. AND I AM PUBLISHED.
}

function differentReturnType(getLength) {
  let stringLength = "i am a string".whatIf(getLength, function() {
    return this.length;
  });
  console.log(stringLength, typeof stringLength);
}

function whatIfNotUsage(result) {
  result.whatIfNotNull(
    function() {
      console.log(result + " is not null.");
    },
    function() {
      console.log(result + " is null");
    }
  );
}
