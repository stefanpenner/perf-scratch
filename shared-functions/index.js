const ITERATIONS = 1000000;
print('v8:', version(), '\n');

function run1() {
  const array = [1,2,3];

  function loop(fn) {
    for (let i =0; i < array.length; i++) {
      fn(array[i]);
    }
  }

  for (let i =0; i < ITERATIONS; i++) {
    loop(x => x + x);
  }
}

function run2() {
  const array = [1,2,3];

  function loop(fn) {
    for (let i =0; i < array.length; i++) {
      fn(array[i]);
    }
  }

  function add(x) { return x + x; }

  for (let i =0; i < ITERATIONS; i++) {
    loop(add);
  }
}

function measure(name, run) {
  print(name)
  const start = performance.now();
  run();
  const stop = performance.now();
  print(' - duration:', stop - start);
  print('\n');
}

measure('loop(x => x + x)', run1);
measure('loop(add)', run2);

/* v8:
 *   - sha: 3a7b389
 *   - 5.6.0 (candidate)
 *
 * d8 --trace_opt index.js
 *
 *

loop(x => x + x)
[marking 0x2a5f6000cff1 <JS Function x (SharedFunctionInfo 0x85b8aac099)> for optimized recompilation, reason: small function, ICs with typeinfo: 1/1 (100%), generic ICs: 0/1 (0%)]
[compiling method 0x2a5f6000cff1 <JS Function x (SharedFunctionInfo 0x85b8aac099)> using Crankshaft]
[marking 0x2a5f6000dc99 <JS Function x (SharedFunctionInfo 0x85b8aac099)> for optimized recompilation, reason: small function, ICs with typeinfo: 1/1 (100%), generic ICs: 0/1 (0%)]
[marking 0x2a5f6000e8f9 <JS Function x (SharedFunctionInfo 0x85b8aac099)> for optimized recompilation, reason: small function, ICs with typeinfo: 1/1 (100%), generic ICs: 0/1 (0%)]
[compiling method 0x2a5f6000e8f9 <JS Function x (SharedFunctionInfo 0x85b8aac099)> using Crankshaft]
[marking 0x2a5f6000f5e9 <JS Function x (SharedFunctionInfo 0x85b8aac099)> for optimized recompilation, reason: small function, ICs with typeinfo: 1/1 (100%), generic ICs: 0/1 (0%)]
[compiling method 0x2a5f6000f5e9 <JS Function x (SharedFunctionInfo 0x85b8aac099)> using Crankshaft]
[optimizing 0x2a5f6000cff1 <JS Function x (SharedFunctionInfo 0x85b8aac099)> - took 0.110, 0.142, 0.065 ms]
[completed optimizing 0x2a5f6000cff1 <JS Function x (SharedFunctionInfo 0x85b8aac099)>]
[optimizing 0x2a5f6000e8f9 <JS Function x (SharedFunctionInfo 0x85b8aac099)> - took 0.018, 0.112, 0.010 ms]
[completed optimizing 0x2a5f6000e8f9 <JS Function x (SharedFunctionInfo 0x85b8aac099)>]
[optimizing 0x2a5f6000f5e9 <JS Function x (SharedFunctionInfo 0x85b8aac099)> - took 0.014, 0.038, 0.008 ms]
[completed optimizing 0x2a5f6000f5e9 <JS Function x (SharedFunctionInfo 0x85b8aac099)>]
[marking 0x2a5f6000b701 <JS Function loop (SharedFunctionInfo 0x85b8aabfd1)> for optimized recompilation, reason: hot and stable, ICs with typeinfo: 7/7 (100%), generic ICs: 1/7 (14%)]
[compiling method 0x2a5f6000b701 <JS Function loop (SharedFunctionInfo 0x85b8aabfd1)> using Crankshaft]
[optimizing 0x2a5f6000b701 <JS Function loop (SharedFunctionInfo 0x85b8aabfd1)> - took 0.164, 0.270, 0.062 ms]
[completed optimizing 0x2a5f6000b701 <JS Function loop (SharedFunctionInfo 0x85b8aabfd1)>]
[marking 0x85b8aab8b9 <JS Function run1 (SharedFunctionInfo 0x85b8aab3b9)> for optimized recompilation, reason: hot and stable, ICs with typeinfo: 6/5 (120%), generic ICs: 0/5 (0%)]
[compiling method 0x85b8aab8b9 <JS Function run1 (SharedFunctionInfo 0x85b8aab3b9)> using Crankshaft OSR]
[optimizing 0x85b8aab8b9 <JS Function run1 (SharedFunctionInfo 0x85b8aab3b9)> - took 0.224, 0.361, 0.082 ms]
 - duration: 97.295


loop(add)
[marking 0x14b2a19e8989 <JS Function add (SharedFunctionInfo 0x85b8ab6939)> for optimized recompilation, reason: small function, ICs with typeinfo: 1/1 (100%), generic ICs: 0/1 (0%)]
[compiling method 0x14b2a19e8989 <JS Function add (SharedFunctionInfo 0x85b8ab6939)> using Crankshaft]
[optimizing 0x14b2a19e8989 <JS Function add (SharedFunctionInfo 0x85b8ab6939)> - took 0.057, 0.066, 0.020 ms]
[completed optimizing 0x14b2a19e8989 <JS Function add (SharedFunctionInfo 0x85b8ab6939)>]
[marking 0x14b2a19e8941 <JS Function loop (SharedFunctionInfo 0x85b8ab6871)> for optimized recompilation, reason: hot and stable, ICs with typeinfo: 8/7 (114%), generic ICs: 0/7 (0%)]
[compiling method 0x14b2a19e8941 <JS Function loop (SharedFunctionInfo 0x85b8ab6871)> using Crankshaft]
[optimizing 0x14b2a19e8941 <JS Function loop (SharedFunctionInfo 0x85b8ab6871)> - took 0.095, 0.235, 0.035 ms]
[completed optimizing 0x14b2a19e8941 <JS Function loop (SharedFunctionInfo 0x85b8ab6871)>]
[marking 0x85b8aab939 <JS Function run2 (SharedFunctionInfo 0x85b8aab481)> for optimized recompilation, reason: hot and stable, ICs with typeinfo: 6/5 (120%), generic ICs: 0/5 (0%)]
[compiling method 0x85b8aab939 <JS Function run2 (SharedFunctionInfo 0x85b8aab481)> using Crankshaft OSR]
[optimizing 0x85b8aab939 <JS Function run2 (SharedFunctionInfo 0x85b8aab481)> - took 0.254, 0.340, 0.091 ms]
 - duration: 14.87400000000001
 * 
*/



