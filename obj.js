function foo(c) {
  var a = {
    b: 1,
    c: c,
    d: 3
  };
}

function bar(c) {
  var a = {};
  a.b = 1;
  a.c = c;
  a.d = 3;
}


while(true) {
  bar('af');
}
