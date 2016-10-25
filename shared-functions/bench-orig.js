
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

function measure(name, run) {
  print(name)
  const start = performance.now();
  run();
  const stop = performance.now();
  print(' - duration:', stop - start);
  print('\n');
}

// yes yes I know, micro benchmarks...
measure('bar(x => x, i)', run1);

/* v8: v5.6.0 (candidate) @ 3a7b389 (master)
bar(x => x, i)
 - duration: 32.161

v8: 5.6.0 (candidate) @ a4ff04a (before the fix

bar(x => x, i)
 - duration: 21.72
*/
