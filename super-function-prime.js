function printStatus(fn) {
  switch (%GetOptimizationStatus(fn)) {
    case 1: console.log('Function is optimized'); break;
    case 2: console.log('Function is not optimized'); break;
    case 3: console.log('Function is always optimized'); break;
    case 4: console.log('Function is never optimized'); break;
    case 6: console.log('Function is maybe deoptimized'); break;
  }
}

function superFunction() {
  var func = this.__nextSuper;
  var ret;

  if (func) {
    var length = arguments.length;
    this.__nextSuper = null;
    if (length === 0) {
      ret = func.call(this);
    } else if (length === 1) {
      ret = func.call(this, arguments[0]);
    } else if (length === 2) {
      ret = func.call(this, arguments[0], arguments[1]);
    } else {
      ret = func.apply(this, arguments);
    }
    this.__nextSuper = func;
    return ret;
  }
}

var primer = {};

superFunction.call(primer, 1, 2, 3, 4);

%OptimizeFunctionOnNextCall(superFunction);

superFunction.call(primer, 1, 2, 3, 4);

printStatus(superFunction);
