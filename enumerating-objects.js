function a(obj) {
  var i=0;
  for (var x in obj) {
    i++;
  }

  return i;
}

function b(obj) {
  var i=0;
  for (var x in obj) {
    if (obj.hasOwnProperty(x)) {
      i++;
    }
  }

  return i;
}

function c(obj) {
  var x=0;
  var a = Object.keys(b);

  for (var i =0,l=a.length; i<l; i+=1) {
    x++;
  }

  return x;
}

var obj = {
  a: 1,
  b: 1,
  c: 1,
  d: 1,
  e: 1,
  f: 1,
  g: 1,
  h: 1,
  i: 1,
  j: 1,
  k: 1,
  l: 1,
  m: 1,
}

// delete obj.a; // <-- make obj slow
require('do-you-even-bench')([
  { name: '(a) for (x in y)',                  fn: function() { return a(obj); } },
  { name: '(b) for (x in y) + hasOwnProperty', fn: function() { return b(obj); } },
  { name: '(c) Object.keys + for loop',        fn: function() { return c(obj); } },
]);


