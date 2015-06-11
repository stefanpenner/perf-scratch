function printStatus(fn) {
  switch (%GetOptimizationStatus(fn)) {
    case 1: console.log('Function is optimized'); break;
    case 2: console.log('Function is not optimized'); break;
    case 3: console.log('Function is always optimized'); break;
    case 4: console.log('Function is never optimized'); break;
    case 6: console.log('Function is maybe deoptimized'); break;
  }
}

function Apple (){

}

Apple.prototype.apple = function() {
  this.orange.apply(this, arguments);
}

Apple.prototype.orange  = function() {
}

var a = new Apple();
a.apple(1, 2, 3, 4);
a.apple(1, 2, 3, 4);

%OptimizeFunctionOnNextCall(a.apple);

a.apple(1, 2, 3, 4);

printStatus(a.apple);
