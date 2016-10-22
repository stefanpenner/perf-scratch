var assert = require('assert');

global.KEYS = JSON.parse(require('fs').readFileSync('bindings.json','utf8'));
global.RESULT = false;
global.CHARAT = function (key) {
  var l = key.length;
  return l > 7 &&
    key.charAt(l - 7) === 'B' &&
    key.charAt(l - 6) === 'i' &&
    key.charAt(l - 5) === 'n' &&
    key.charAt(l - 4) === 'd' &&
    key.charAt(l - 3) === 'i' &&
    key.charAt(l - 2) === 'n' &&
    key.charAt(l - 1) === 'g';
}

global.CHARCODEAT = function (key) {
  var l = key.length;
  return l > 7 &&
    key.charCodeAt(l - 7) === 66 &&
    key.charCodeAt(l - 6) === 105 &&
    key.charCodeAt(l - 5) === 110 &&
    key.charCodeAt(l - 4) === 100 &&
    key.charCodeAt(l - 3) === 105 &&
    key.charCodeAt(l - 2) === 110 &&
    key.charCodeAt(l - 1) === 103;
}

function printStatus(fn) {
  switch(%GetOptimizationStatus(fn)) {
    case 1: console.log("Function is optimized"); break;
    case 2: console.log("Function is not optimized"); break;
    case 3: console.log("Function is always optimized"); break;
    case 4: console.log("Function is never optimized"); break;
    case 6: console.log("Function is maybe deoptimized"); break;
  }
}

for (var i =0; i < 100; i++) {
  "asdf".charCodeAt(1);
  "asdf".charAt(1);

  %OptimizeFunctionOnNextCall("asdf".charCodeAt);
  %OptimizeFunctionOnNextCall("asdf".charAt);

  "asdf".charCodeAt(1);
  "asdf".charAt(1);

  printStatus("asdf".charCodeAt);
  printStatus("asdf".charAt);

  "asdf".charCodeAt(10);
  "asdf".charAt(10);

  printStatus("asdf".charCodeAt);
  printStatus("asdf".charAt);

  %OptimizeFunctionOnNextCall("asdf".charCodeAt);
  %OptimizeFunctionOnNextCall("asdf".charAt);

  "asdf".charCodeAt(1);
  "asdf".charAt(1);
}

  printStatus("asdf".charCodeAt);
  printStatus("asdf".charAt);

// process.exit();

global.IS_BINDING = /^.+Binding$/;
global.REGEX = function (key) {
  return key.length > 7 && IS_BINDING.test(key);
}

global.SUBSTRING = function (key) {
  var l = key.length;
  return l > 7 && 'Binding' === key.substring(l - 7, l);
}

global.INDEXOF = function (key) {
  var l = key.length;
  return l > 7 && key.indexOf('Binding', l - 7) !== -1;
}

global.INDEXOFMIX = function (key) {
  var l = key.length;
  return l > 7 && key.charCodeAt(l - 7) === 66 && key.indexOf('inding', l - 6) !== -1;
}

assert(CHARAT('fooBinding'), 'works');
assert(!CHARAT('foo'), 'works');
assert(CHARCODEAT('fooBinding'), 'works');
assert(!CHARCODEAT('foo'), 'works');
assert(REGEX('fooBinding'), 'works');
assert(!REGEX('foo'), 'works');
assert(SUBSTRING('fooBinding'), 'works');
assert(!SUBSTRING('foo'), 'works');
assert(INDEXOF('fooBinding'), 'works');
assert(!INDEXOF('foo'), 'works');
assert(INDEXOFMIX('fooBinding'), 'works');
assert(!INDEXOFMIX('foo'), 'works');

require('do-you-even-bench')([
  { name: 'indexOf',
    setup: 'var next = 0;',
    fn: 'RESULT = INDEXOF(KEYS[next++ % 10150])'
  },
  { name: 'charCodeAt + indexOf',
    setup: 'var next = 0;',
    fn: 'RESULT = INDEXOFMIX(KEYS[next++ % 10150])'
  },
  { name: 'charAt',
    setup: 'var next = 0;',
    fn: 'RESULT = CHARAT(KEYS[next++ % 10150])'
  },
  { name: 'charCodeAt',
    setup: 'var next = 0;',
    fn: 'RESULT = CHARCODEAT(KEYS[next++ % 10150])'
  },
  {
    name: 'RegExp',
    setup: 'var next = 0;',
    fn: 'RESULT = REGEX(KEYS[next++ % 10150])'
  },
  {
    name: 'substring',
    setup: 'var next = 0;',
    fn: 'RESULT = SUBSTRING(KEYS[next++ % 10150])'
  }
]);
