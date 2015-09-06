var foo = (function foo() {
  try { } catch(e) { }
  return this;
}.bind({}));

function bar() {
  try { } catch(e) { }
}

function baz() {
  try { } catch(e) { }
}
console.log(foo());
var context = {};

// delete obj.a; // <-- make obj slow
require('do-you-even-bench')([
  { name: 'static bind',  fn: function() { foo();             } },
  { name: 'runtime bind', fn: function() { bar.bind(context); } },
  { name: 'no bind',      fn: function() { baz();             } }
]);
