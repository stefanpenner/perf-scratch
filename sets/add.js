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


const OrderedSet = require('./implementations/ordered-set')
const FasterOrderedSet = require('./implementations/faster-ordered-set')

function fOSetAdd(iterations, entity) {
  if (arguments.length === 1) {
  return function() {
      let result = new FasterOrderedSet();
      for (let i =0; i < iterations; i++) {
        result.add({});
      }
      return result;
    }
  } else {
    return function() {
      let result = new FasterOrderedSet();
      for (let i =0; i < iterations; i++) {
        result.add(entity);
      }
      return result;
    }
  }
}
function oSetAdd(iterations, entity) {
  if (arguments.length === 1) {
  return function() {
      let result = new OrderedSet();
      for (let i =0; i < iterations; i++) {
        result.add({});
      }
      return result;
    }
  } else {
    return function() {
      let result = new OrderedSet();
      for (let i =0; i < iterations; i++) {
        result.add(entity);
      }
      return result;
    }
  }
}

fOSetAdd(1000, {})()
fOSetAdd(10000, {})()
let o =  new FasterOrderedSet();
o.add("foo", "foo");

console.log('unique add:');
require('do-you-even-bench')([
  { name: 'duplicate [].push 1',               fn: arrayAdd(1, ENTITY) },
  { name: 'duplicate new Set().add 1',         fn: setAdd(1, ENTITY) },
  { name: 'duplicate new OrderedSet().add 1',  fn: oSetAdd(1, ENTITY) },
  { name: 'duplicate new FOrderedSet().add 1', fn: fOSetAdd(1, ENTITY) },

  { name: 'duplicate [].push 10',          fn: arrayAdd(10, ENTITY) },
  { name: 'duplicate new Set().add 10',    fn: setAdd(10, ENTITY) },
  { name: 'duplicate new OSet().add 10',   fn: oSetAdd(10, ENTITY) },
  { name: 'duplicate new FOSet().add 10',  fn: fOSetAdd(10, ENTITY) },

  { name: 'duplicate [].push 100',         fn: arrayAdd(100, ENTITY) },
  // { name: 'duplicate new Set().add 100',   fn: setAdd(100, ENTITY) },
  // { name: 'duplicate new OSet().add 100',  fn: oSetAdd(100, ENTITY) },
  { name: 'duplicate new FOSet().add 100', fn: fOSetAdd(100, ENTITY) },

  { name: 'duplicate [].push 1000',         fn: arrayAdd(1000, ENTITY) },
  // { name: 'duplicate new Set().add 1000',   fn: setAdd(1000, ENTITY) },
  // { name: 'duplicate new OSet().add 1000',  fn: oSetAdd(1000, ENTITY) },
  { name: 'duplicate new FOSet().add 1000', fn: fOSetAdd(1000, ENTITY) },

  { name: 'duplicate [].push 10000',         fn: arrayAdd(10000, ENTITY) },
  // { name: 'duplicate new Set().add 10000',   fn: setAdd(10000, ENTITY) },
  // { name: 'duplicate new OSet().add 10000',  fn: oSetAdd(10000, ENTITY) },
  { name: 'duplicate new FOSet().add 10000', fn: fOSetAdd(10000, ENTITY) },

  { name: 'unique [].push 1',           fn: arrayAdd(1) },
  { name: 'unique new Set().add 1',     fn: setAdd(1) },
  { name: 'unique new OSet().add 1',    fn: oSetAdd(1) },
  { name: 'unique new FOSet().add 1',   fn: fOSetAdd(1) },

  { name: 'unique [].push 10',          fn: arrayAdd(10) },
  { name: 'unique new Set().add 10',    fn: setAdd(10) },
  { name: 'unique new OSet().add 10',   fn: oSetAdd(10) },
  { name: 'unique new FOSet().add 10',  fn: fOSetAdd(10) },

  { name: 'unique [].push 20',         fn: arrayAdd(20) },
  { name: 'unique new Set().add 20',   fn: setAdd(20) },
  { name: 'unique new OSet().add 20',  fn: oSetAdd(20) },
  { name: 'unique new FOSet().add 20', fn: fOSetAdd(20) },
  { name: 'unique [].push 20',         fn: arrayAdd(20) },

  { name: 'unique [].push 50',         fn: arrayAdd(50) },
  { name: 'unique new Set().add 50',   fn: setAdd(50) },
  { name: 'unique new OSet().add 50',  fn: oSetAdd(50) },
  { name: 'unique new FOSet().add 50', fn: fOSetAdd(50) },
  { name: 'unique [].push 50',         fn: arrayAdd(50) },

  { name: 'unique new Set().add 99',   fn: setAdd(99) },
  { name: 'unique new OSet().add 99',  fn: oSetAdd(99) },
  { name: 'unique new FOSet().add 99', fn: fOSetAdd(99) },

  { name: 'unique new Set().add 100',   fn: setAdd(100) },
  { name: 'unique new OSet().add 100',  fn: oSetAdd(100) },
  { name: 'unique new FOSet().add 100', fn: fOSetAdd(100) },

  { name: 'unique [].push 1000',        fn: arrayAdd(1000) },
  { name: 'unique new Set().add 1000',  fn: setAdd(1000) },
  { name: 'unique new OSet().add 1000', fn: oSetAdd(1000) },
  { name: 'unique new FOSet().add 1000',fn: fOSetAdd(1000) },

  { name: 'unique [].push 10000',        fn: arrayAdd(10000) },
  { name: 'unique new Set().add 10000',  fn: setAdd(10000) },
  { name: 'unique new OSet().add 10000', fn: oSetAdd(10000) },
  { name: 'unique new FOSet().add 10000', fn: fOSetAdd(10000) },
]);

