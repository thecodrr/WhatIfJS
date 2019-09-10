const prototypeHelper = require("./prototypeHelper");
prototypeHelper.bindTypes({
  whatIf,
  whatIfNotNull,
  whatIfNotUndefined,
  whatIfNotNullOrEmpty
});
prototypeHelper.monkeyPatchBind();

/**
 * An expression for invoking action when the given value is true.
 * NOTE: When using directly with boolean, given becomes the boolean passed
 * so pass your action in the given parameter.
 * @param {any} given - the condition
 * @param {function} action - the action to perform when condition is true
 * @param {function} actionWhatIfNot - the action to perform when condition is not true
 */
function whatIf(given, action, actionWhatIfNot = null) {
  given =
    (typeof given === "function" && given) ||
    (given != null && given != undefined && given == true); //non-strict mode is intentional
  return whatIfNot.call(this, given, action, actionWhatIfNot);
}

/**
 * An expression for invoking action when the value is not null.
 * @param {function} action - the action to perform when the value is not null
 * @param {function} actionWhatIfNot - the action to perform when the value is null.
 */
function whatIfNotNull(action, actionWhatIfNot) {
  let given = this;
  return whatIfNot.call(this, given !== null, action, actionWhatIfNot);
}

/**
 * An expression for invoking action when the value is not undefined.
 * @param {function} action - the action to perform when the value is not undefined.
 * @param {function} actionWhatIfNot - the action to perform when the value is undefined.
 */
function whatIfNotUndefined(action, actionWhatIfNot) {
  let given = this;
  return whatIfNot.call(this, given !== undefined, action, actionWhatIfNot);
}

/**
 * An expression for invoking action when the given array is not null & not empty.
 * @param {function} action - the action to perform
 * @param {function} actionWhatIfNot - the action to perform when the array is null or empty.s
 */
function whatIfNotNullOrEmpty(action, actionWhatIfNot) {
  if (!Array.isArray(this)) return this;
  let given = this;
  return whatIfNot.call(
    this,
    given !== null && given.length > 0,
    action,
    actionWhatIfNot
  );
}

/**
 * @ignore
 */
function whatIfNot(given, action, actionWhatIfNot) {
  if (typeof given === "function") {
    actionWhatIfNot = action;
    action = given;
    given = this;
  }
  if (given) {
    return typeof this === "function"
      ? this.boundObject
        ? action.call(this, this())
        : action
      : (action && action.call(this, this)) || this;
  } else if (actionWhatIfNot) actionWhatIfNot(this);
  else return this;
}
