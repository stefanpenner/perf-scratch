function foo() {
  if (Math.random() > 0.5) {
    bar.apply(null, arguments);
  } else {

  }
  return 5;
}

function bar(args) {
  return args;
}

while(true) {
  foo(1,2,3);
}
