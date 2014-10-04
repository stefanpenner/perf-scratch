function foo() {
  try { } finally {}
  return 1+1;
}

(function bar() {
  while (true) {
    foo();
  }
}());
