

function run1() {
  var x = 0;

  function bar(f, i) {
    return f(i);
  }

  for (var i = 0; i < 1000000; ++i) {
    x += bar(a => Math.sqrt(a), i);
  }
  return x;
}


function run2() {
  var x = 0;

  function bar(f, i) {
    return f(i);
  }

  function identity(x) { return Math.sqrt(x); }
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
    function identity(x) { return Math.sqrt(x); }
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

/*
 * v8:
 *   - sha: 3a7b389
 *   - 5.6.0 (candidate)
bar(x => x, i)
 - duration: 34.257000000000005


bar(identity, i)
 - duration: 3.296999999999997


bar(inlineIdentity, i)
 - duration: 42.114000000000004
 */
