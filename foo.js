

function Foo(b) {
  this.b = b;
}

Foo.prototype.add = function(b) {
  b |=0;
  var c = this.b;
  return c += b;
};

var f = new Foo(1);
f.add(1);
%OptimizeFunctionOnNextCall(Foo.prototype.add);
f.add(1);


var f = new Foo(1);
f.add(1);
//
//
//f.add(1);
