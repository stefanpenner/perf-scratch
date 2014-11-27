// node --trace_deopt --trace_opt --allow_natives_syntax  for-a-in-b.js
function printStatus(fn) {
  switch(%GetOptimizationStatus(fn)) {
    case 1: console.log("Function is optimized"); break;
    case 2: console.log("Function is not optimized"); break;
    case 3: console.log("Function is always optimized"); break;
    case 4: console.log("Function is never optimized"); break;
    case 6: console.log("Function is maybe deoptimized"); break;
  }
}

var dict = {
 a: 1,
 b: 2
};

function keys(obj) {
  var keys = [];
  for (var x in obj) {
    keys.push(x); 
  }
  return keys;
}


keys(dict);
%OptimizeFunctionOnNextCall(keys);
keys(dict);
printStatus(keys);
dict[1] = undefined;
keys(dict);

printStatus(keys);
