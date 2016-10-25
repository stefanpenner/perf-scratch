function bar(f, i) {
  return f(i);
}
function foo() {
  var x = 0;
  function identity (x) { return x; }
  for (var i = 0; i < 10000; ++i) {
    x += bar(identity, i);
  }
  return x;
}
foo();
