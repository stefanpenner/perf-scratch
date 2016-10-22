function bar(f, i) {
  return f(i);
}
function foo() {
  var x = 0;
  for (var i = 0; i < 1000000; ++i) {
    x += bar(a => a, i);
  }
  return x;
}
foo();
