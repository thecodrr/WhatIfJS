function bindWithTypes(name, func) {
  Function.prototype[name] = func;
  Object.prototype[name] = func;
  String.prototype[name] = func;
  Array.prototype[name] = func;
  Boolean.prototype[name] = func;
}
module.exports = {
  bindTypes(obj) {
    bindWithTypes("whatIf", obj.whatIf);
    bindWithTypes("whatIfNotNull", obj.whatIfNotNull);
    bindWithTypes("whatIfNotUndefined", obj.whatIfNotUndefined);
    bindWithTypes("whatIfNotNullOrEmpty", obj.whatIfNotNullOrEmpty);
  },
  monkeyPatchBind() {
    var _bind = Function.prototype.apply.bind(Function.prototype.bind);
    Object.defineProperty(Function.prototype, "bind", {
      value: function(obj) {
        var boundFunction = _bind(this, arguments);
        boundFunction.boundObject = obj;
        return boundFunction;
      }
    });
  }
};
