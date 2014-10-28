function foo() {
  return bar(arguments);
}

function bar(args) {
  return args;
}

while(true) {
  foo(1,2,3);
}
