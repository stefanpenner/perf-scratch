function makeBar() {
  return function bar(obj) {
    var result = [];
    for (var key in obj) {
      result.push(key);
    }

    return result;
  }
}

var map = {
  a: 1,
  b: 2,
  c: 'asdf'
};

//[marking foo 0x232f37f0c8b8 for recompilation, reason: small function, ICs with typeinfo: 1/1 (100%)]
//[optimizing: foo / 232f37f0c8b9 - took 0.232, 0.260, 0.000 ms]

var  dict = {
  a: 1,
  b: 2,
  c: 'asdf',
  d: 'asdf'
};

// [disabled optimization for foo, reason: ForInStatement is not fast case]

delete dict.d;
var array = [1,2,3];

function Foo() {

}
var bar = Foo.prototype.bar = makeBar();
function Baz() { }
Baz.prototype = Object.create(Foo.prototype);
Baz.prototype.bar = makeBar();

var f = new Foo();

Foo.prototype.bar.call(null, map);
%OptimizeFunctionOnNextCall(bar);
%OptimizeFunctionOnNextCall(Baz.prototype.bar);
Foo.prototype.bar.call(null, map);
Baz.prototype.bar.call(null, dict);

%OptimizeFunctionOnNextCall(bar);
%OptimizeFunctionOnNextCall(Baz.prototype.bar);
Foo.prototype.bar.call(null, map);
Foo.prototype.bar.call(null, map);
Foo.prototype.bar.call(null, map);
