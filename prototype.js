function Foo() {
  this.a = 1;
}

Foo.prototype.b = 1;
Foo.prototype.bar = function(a,b) {
  return this.a + a + this.b + b;
};

function bar() {
  try { } finally {}
  return 'foooo';
}

Object.defineProperty(Foo.prototype, 'b', {
  configurable: true,
  enumerable: false,
  get: function() {
    return this.a;
  },
  set: function() {
    return this.a;
  }
});

var foo = new Foo();

foo.bar(1,2);
%OptimizeFunctionOnNextCall(foo.bar);
foo.bar(1,2);

%DebugPrint(foo);
%DebugPrint(Foo.prototype);

//  ~/src/v8/out/x64.debug/d8 --trace_deopt --trace_opt --allow_natives_syntax prototype.js
