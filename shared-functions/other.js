
function run1() {
  var x = 0;

  function bar(f, i) {
    return f(i);
  }

  for (var i = 0; i < 1000000; ++i) {
    x += bar(a => a, i);
  }
  return x;
}


function run2() {
  var x = 0;

  function bar(f, i) {
    return f(i);
  }

  function identity(x) { return x; }
  for (var i = 0; i < 1000000; ++i) {
    x += bar(identity, i);
  }
  return x;
}

function run3() {
  var x = 0;

  function bar(f, i) {
    return f(i);
  }

  for (var i = 0; i < 1000000; ++i) {
    function identity(x) { return x; }
    x += bar(identity, i);
  }
  return x;
}


function measure(name, run) {
  print(name)
  const start = performance.now();
  run();
  const stop = performance.now();
  print(' - duration:', stop - start);
  print('\n');
}



measure('bar(x => x, i)', run1);
measure('bar(identity, i)', run2);
measure('bar(inlineIdentity, i)', run3);
