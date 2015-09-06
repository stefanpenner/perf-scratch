
function Meta() {
  this.a = 1;
}

function foo(m) {

}

var parent = new Meta();

var a = Object.create(parent);
var b = Object.create(parent);
delete b.a;

foo(a);

%OptimizeFunctionOnNextCall(foo);
foo(b);



//require('do-you-even-bench')([
//  { name: 'aaa',        fn: function() { if (a === 'aaaaaaaaaaaaaaaaa') { } } },
//  { name: 'a:a',        fn: function() { if (b === 'aaaaaaaaaaaaaaa:a') { } } },
//  { name: 'a:a rope',   fn: function() { if (c === 'aaaaaaaaaaaaaaa:a') { } } },
//  { name: 'a:a intern', fn: function() { if (d === 'aaaaaaaaaaaaaaa:a') { } } },
//]);
//
//
