const ENTITY = {};

function uniquePush(arr, entity) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === entity) { return; }
  }
  arr.push(entity);
}

function setAdd(iterations, entity) {
  if (arguments.length === 1) {
  return function() {
      let result = new Set();
      for (let i =0; i < iterations; i++) {
        result.add({});
      }
      return result;
    }
  } else {
    return function() {
      let result = new Set();
      for (let i =0; i < iterations; i++) {
        result.add(entity);
      }
      return result;
    }
  }
}

function arrayAdd(iterations, entity) {
  if (arguments.length === 1) {
    return function() {
      let result = [];
      for (let i =0; i < iterations; i++) {
        uniquePush(result, {});
      }
      return result;
    }
  } else {
    return function() {
      let result = [];
      for (let i =0; i < iterations; i++) {
        uniquePush(result, entity);
      }
      return result;
    }
  }
}

console.log('unique add:');
require('do-you-even-bench')([
  { name: 'duplicate [].push 1',           fn: arrayAdd(1, ENTITY) },
  { name: 'duplicate new Set().add 1',     fn: setAdd(1, ENTITY) },
  { name: 'duplicate [].push 10',          fn: arrayAdd(10, ENTITY) },
  { name: 'duplicate new Set().add 10',    fn: setAdd(10, ENTITY) },
  { name: 'duplicate [].push 100',         fn: arrayAdd(100, ENTITY) },
  { name: 'duplicate new Set().add 100',   fn: setAdd(100, ENTITY) },
  { name: 'duplicate [].push 1000',        fn: arrayAdd(1000, ENTITY) },
  { name: 'duplicate new Set().add 1000',  fn: setAdd(1000, ENTITY) },
  { name: 'duplicate [].push 10000',       fn: arrayAdd(10000, ENTITY) },
  { name: 'duplicate new Set().add 10000', fn: setAdd(10000, ENTITY) },

  { name: 'unique [].push 1',           fn: arrayAdd(1) },
  { name: 'unique new Set().add 1',     fn: setAdd(1) },
  { name: 'unique [].push 10',          fn: arrayAdd(10) },
  { name: 'unique new Set().add 10',    fn: setAdd(10) },
  { name: 'unique [].push 100',         fn: arrayAdd(100) },
  { name: 'unique new Set().add 100',   fn: setAdd(100) },
  { name: 'unique [].push 1000',        fn: arrayAdd(1000) },
  { name: 'unique new Set().add 1000',  fn: setAdd(1000) },
  { name: 'unique [].push 10000',       fn: arrayAdd(10000) },
  { name: 'unique new Set().add 10000', fn: setAdd(10000) },
]);

