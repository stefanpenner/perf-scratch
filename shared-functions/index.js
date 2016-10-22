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

function run3() {
  const array = [1,2,3];

  function loop(fn) {
    for (let i =0; i < array.length; i++) {
      fn(array[i]);
    }
  }

  for (let i =0; i < ITERATIONS; i++) {
    loop(function add(x) { return x + x; });
  }
}

function run4() {
  const array = [1,2,3];

  function loop(fn) {
    for (let i =0; i < array.length; i++) {
      fn(array[i]);
    }
  }

  let add = x => x+x;
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
measure('loop(function(x) { return x + x; })', run3);
measure('add = x => x+x;loop(add)', run4);

/* v8:
 *   - sha: 3a7b389
 *   - 5.6.0 (candidate)
 *
 * d8 --trace_concurrent_recompilation  index.js
 *
 *
 *  OUTPUT: (which suggested shared function recompilation
 *
 *

v8: 5.6.0 (candidate) @ 3a7b389

loop(x => x + x)
 - duration: 66.922


loop(add)
 - duration: 13.116


loop(function(x) { return x + x; })
 - duration: 61.10300000000001


add = x => x+x;loop(add)
 - duration: 16.197000000000003

loop(x => x + x)
  ** Marking 0x250d1a28d889 <JS Function x (SharedFunctionInfo 0x117c76aac461)> for concurrent recompilation.
  ** Queued 0x250d1a28d889 <JS Function x (SharedFunctionInfo 0x117c76aac461)> for concurrent optimization.
  ** Marking 0x250d1a28e531 <JS Function x (SharedFunctionInfo 0x117c76aac461)> for concurrent recompilation.
  ** Marking 0x250d1a28f191 <JS Function x (SharedFunctionInfo 0x117c76aac461)> for concurrent recompilation.
  ** Queued 0x250d1a28f191 <JS Function x (SharedFunctionInfo 0x117c76aac461)> for concurrent optimization.
  ** Marking 0x250d1a28fe81 <JS Function x (SharedFunctionInfo 0x117c76aac461)> for concurrent recompilation.
  ** Queued 0x250d1a28fe81 <JS Function x (SharedFunctionInfo 0x117c76aac461)> for concurrent optimization.
  ** Marking 0x250d1a290b29 <JS Function x (SharedFunctionInfo 0x117c76aac461)> for concurrent recompilation.
  ** Marking 0x250d1a291039 <JS Function x (SharedFunctionInfo 0x117c76aac461)> for concurrent recompilation.
  ** Marking 0x250d1a28bf99 <JS Function loop (SharedFunctionInfo 0x117c76aac399)> for concurrent recompilation.
  ** Queued 0x250d1a28bf99 <JS Function loop (SharedFunctionInfo 0x117c76aac399)> for concurrent optimization.
  ** Marking 0x117c76aabb81 <JS Function run1 (SharedFunctionInfo 0x117c76aab479)> for concurrent recompilation.

loop(add)
  ** Marking 0x383fe9be9ab1 <JS Function add (SharedFunctionInfo 0x117c76ab7599)> for concurrent recompilation.
  ** Queued 0x383fe9be9ab1 <JS Function add (SharedFunctionInfo 0x117c76ab7599)> for concurrent optimization.
  ** Marking 0x383fe9be9a69 <JS Function loop (SharedFunctionInfo 0x117c76ab74d1)> for concurrent recompilation.
  ** Queued 0x383fe9be9a69 <JS Function loop (SharedFunctionInfo 0x117c76ab74d1)> for concurrent optimization.
  ** Marking 0x117c76aabc01 <JS Function run2 (SharedFunctionInfo 0x117c76aab541)> for concurrent recompilation.

loop(function(x) { return x + x; })
  ** Marking 0x383fe9bebd21 <JS Function add (SharedFunctionInfo 0x117c76ab9dc1)> for concurrent recompilation.
  ** Queued 0x383fe9bebd21 <JS Function add (SharedFunctionInfo 0x117c76ab9dc1)> for concurrent optimization.
  ** Marking 0x383fe9bec9c9 <JS Function add (SharedFunctionInfo 0x117c76ab9dc1)> for concurrent recompilation.
  ** Marking 0x383fe9bed629 <JS Function add (SharedFunctionInfo 0x117c76ab9dc1)> for concurrent recompilation.
  ** Queued 0x383fe9bed629 <JS Function add (SharedFunctionInfo 0x117c76ab9dc1)> for concurrent optimization.
  ** Marking 0x383fe9bea431 <JS Function loop (SharedFunctionInfo 0x117c76ab9cf9)> for concurrent recompilation.
  ** Queued 0x383fe9bea431 <JS Function loop (SharedFunctionInfo 0x117c76ab9cf9)> for concurrent optimization.
  ** Marking 0x117c76aabc81 <JS Function run3 (SharedFunctionInfo 0x117c76aab609)> for concurrent recompilation.

--------------

v8: 5.6.0 (candidate) @ a4ff04a

loop(x => x + x)
 - duration: 68.034


loop(add)
 - duration: 13.295000000000002


loop(function(x) { return x + x; })
 - duration: 63.798

add = x => x+x;loop(add)
 - duration: 15.48999999999998

------

loop(x => x + x)
  ** Marking 0x3555ec38d4a1 <JS Function x (SharedFunctionInfo 0x90055eac461)> for concurrent recompilation.
  ** Queued 0x3555ec38d4a1 <JS Function x (SharedFunctionInfo 0x90055eac461)> for concurrent optimization.
  ** Marking 0x3555ec38e149 <JS Function x (SharedFunctionInfo 0x90055eac461)> for concurrent recompilation.
  ** Marking 0x3555ec38eda9 <JS Function x (SharedFunctionInfo 0x90055eac461)> for concurrent recompilation.
  ** Queued 0x3555ec38eda9 <JS Function x (SharedFunctionInfo 0x90055eac461)> for concurrent optimization.
  ** Marking 0x3555ec38fa99 <JS Function x (SharedFunctionInfo 0x90055eac461)> for concurrent recompilation.
  ** Queued 0x3555ec38fa99 <JS Function x (SharedFunctionInfo 0x90055eac461)> for concurrent optimization.
  ** Marking 0x3555ec390741 <JS Function x (SharedFunctionInfo 0x90055eac461)> for concurrent recompilation.
  ** Marking 0x3555ec390981 <JS Function x (SharedFunctionInfo 0x90055eac461)> for concurrent recompilation.
  ** Marking 0x3555ec38bbb1 <JS Function loop (SharedFunctionInfo 0x90055eac399)> for concurrent recompilation.
  ** Queued 0x3555ec38bbb1 <JS Function loop (SharedFunctionInfo 0x90055eac399)> for concurrent optimization.
  ** Marking 0x90055eabb81 <JS Function run1 (SharedFunctionInfo 0x90055eab479)> for concurrent recompilation.

loop(add)
  ** Marking 0x25b9c0f69319 <JS Function add (SharedFunctionInfo 0x90055eb71b1)> for concurrent recompilation.
  ** Queued 0x25b9c0f69319 <JS Function add (SharedFunctionInfo 0x90055eb71b1)> for concurrent optimization.
  ** Marking 0x25b9c0f692d1 <JS Function loop (SharedFunctionInfo 0x90055eb70e9)> for concurrent recompilation.
  ** Queued 0x25b9c0f692d1 <JS Function loop (SharedFunctionInfo 0x90055eb70e9)> for concurrent optimization.
  ** Marking 0x90055eabc01 <JS Function run2 (SharedFunctionInfo 0x90055eab541)> for concurrent recompilation.

loop(function(x) { return x + x; })
  ** Marking 0x25b9c0f6b589 <JS Function add (SharedFunctionInfo 0x90055eb99c9)> for concurrent recompilation.
  ** Queued 0x25b9c0f6b589 <JS Function add (SharedFunctionInfo 0x90055eb99c9)> for concurrent optimization.
  ** Marking 0x25b9c0f6c231 <JS Function add (SharedFunctionInfo 0x90055eb99c9)> for concurrent recompilation.
  ** Marking 0x25b9c0f6ce91 <JS Function add (SharedFunctionInfo 0x90055eb99c9)> for concurrent recompilation.
  ** Queued 0x25b9c0f6ce91 <JS Function add (SharedFunctionInfo 0x90055eb99c9)> for concurrent optimization.
  ** Marking 0x25b9c0f6d551 <JS Function add (SharedFunctionInfo 0x90055eb99c9)> for concurrent recompilation.
  ** Marking 0x25b9c0f69c99 <JS Function loop (SharedFunctionInfo 0x90055eb9901)> for concurrent recompilation.
  ** Queued 0x25b9c0f69c99 <JS Function loop (SharedFunctionInfo 0x90055eb9901)> for concurrent optimization.
  ** Marking 0x90055eabc81 <JS Function run3 (SharedFunctionInfo 0x90055eab609)> for concurrent recompilation.

add = x => x+x;loop(add)
  ** Marking 0x25b9c0f41b09 <JS Function add (SharedFunctionInfo 0x90055ebc9e1)> for concurrent recompilation.
  ** Queued 0x25b9c0f41b09 <JS Function add (SharedFunctionInfo 0x90055ebc9e1)> for concurrent optimization.
  ** Marking 0x25b9c0f41a91 <JS Function loop (SharedFunctionInfo 0x90055ebc919)> for concurrent recompilation.
  ** Queued 0x25b9c0f41a91 <JS Function loop (SharedFunctionInfo 0x90055ebc919)> for concurrent optimization.
  ** Marking 0x90055eabd01 <JS Function run4 (SharedFunctionInfo 0x90055eab6d1)> for concurrent recompilation.

*/
