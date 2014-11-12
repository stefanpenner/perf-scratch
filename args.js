function printStatus(fn) {
  switch (%GetOptimizationStatus(fn)) {
    case 1: console.log('Function is optimized'); break;
    case 2: console.log('Function is not optimized'); break;
    case 3: console.log('Function is always optimized'); break;
    case 4: console.log('Function is never optimized'); break;
    case 6: console.log('Function is maybe deoptimized'); break;
  }
}

function foo(a,b,c) {
  return [a, b, c];
}

function bar() {
  return foo.apply(null, arguments);
}

bar(1, 2, 3);

%OptimizeFunctionOnNextCall(bar);

bar(1, 2, 3);

printStatus(bar);
