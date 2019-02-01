

function apple(obj) {
  return obj.id + 1;
}

let obj = { id: 1 };

apple(obj);
%OptimizeFunctionOnNextCall(apple);
apple(obj);

Object.freeze(obj);

apple(obj);

console.log(%GetOptimizationStatus(apple));
