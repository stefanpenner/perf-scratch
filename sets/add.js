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


const OrderedSet = require('./implementations/ordered-set');
const FasterOrderedSet = require('./implementations/faster-ordered-set');
const FasterOrderedSetMap = require('./implementations/faster-ordered-set-map');

function fOSetAdd(iterations, entity) {
  if (arguments.length === 1) {
  return function() {
      let result = new FasterOrderedSet();
      for (let i =0; i < iterations; i++) {
        result.add({ __id__: i});
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

function fOSetMAdd(iterations, entity) {
  if (arguments.length === 1) {
  return function() {
      let result = new FasterOrderedSetMap();
      for (let i =0; i < iterations; i++) {
        result.add({ __id__: i});
      }
      return result;
    }
  } else {
    return function() {
      let result = new FasterOrderedSetMap();
      for (let i =0; i < iterations; i++) {
        result.add(entity);
      }
      return result;
    }
  }
}
function fOSetMAdd(iterations, entity) {
  if (arguments.length === 1) {
  return function() {
      let result = new FasterOrderedSetMap();
      for (let i =0; i < iterations; i++) {
        result.add({ __id__: i});
      }
      return result;
    }
  } else {
    return function() {
      let result = new FasterOrderedSetMap();
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
        result.add({ __id__: i});
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

fOSetAdd(10000, {})()
let o =  new FasterOrderedSet();
o.add("foo", "foo");

console.log('unique add:');
require('do-you-even-bench')([
  { name: 'duplicate [].push 1',          fn: arrayAdd(1, ENTITY) },
  { name: 'duplicate new Set().add 1',    fn: setAdd(1, ENTITY) },
  { name: 'duplicate new OSet().add 1',   fn: oSetAdd(1, ENTITY) },
  { name: 'duplicate new FOSet().add 1',  fn: fOSetAdd(1, ENTITY) },
  { name: 'duplicate new FOSMet().add 1', fn: fOSetMAdd(1, ENTITY) },

  { name: 'duplicate [].push 2',          fn: arrayAdd(2, ENTITY) },
  { name: 'duplicate new Set().add 2',    fn: setAdd(2, ENTITY) },
  { name: 'duplicate new OSet().add 2',   fn: oSetAdd(2, ENTITY) },
  { name: 'duplicate new OSetM().add 2',  fn: fOSetAdd(2, ENTITY) },
  { name: 'duplicate new FOSetM().add 2', fn: fOSetMAdd(2, ENTITY) },

  { name: 'duplicate [].push 10',           fn: arrayAdd(10, ENTITY) },
  { name: 'duplicate new Set().add 10',     fn: setAdd(10, ENTITY) },
  { name: 'duplicate new OSet().add 10',    fn: oSetAdd(10, ENTITY) },
  { name: 'duplicate new FOSet().add 10',   fn: fOSetAdd(10, ENTITY) },
  { name: 'duplicate new FOSetM().add 10',  fn: fOSetMAdd(10, ENTITY) },

  { name: 'duplicate [].push 100',          fn: arrayAdd(100, ENTITY) },
  { name: 'duplicate new Set().add 100',    fn: setAdd(100, ENTITY) },
  { name: 'duplicate new OSet().add 100',   fn: oSetAdd(100, ENTITY) },
  { name: 'duplicate new FOSet().add 100',  fn: fOSetAdd(100, ENTITY) },
  { name: 'duplicate new FOSetM().add 100', fn: fOSetMAdd(100, ENTITY) },

  { name: 'duplicate [].push 1000',          fn: arrayAdd(1000, ENTITY) },
  { name: 'duplicate new Set().add 1000',    fn: setAdd(1000, ENTITY) },
  { name: 'duplicate new OSet().add 1000',   fn: oSetAdd(1000, ENTITY) },
  { name: 'duplicate new FOSet().add 1000',  fn: fOSetAdd(1000, ENTITY) },
  { name: 'duplicate new FOSetM().add 1000', fn: fOSetMAdd(1000, ENTITY) },

  { name: 'duplicate [].push 10000',         fn: arrayAdd(10000, ENTITY) },
  { name: 'duplicate new Set().add 10000',   fn: setAdd(10000, ENTITY) },
  { name: 'duplicate new OSet().add 10000',  fn: oSetAdd(10000, ENTITY) },
  { name: 'duplicate new FOSet().add 10000', fn: fOSetAdd(10000, ENTITY) },
  { name: 'duplicate new FOSetM().add 10000', fn: fOSetMAdd(10000, ENTITY) },

  { name: 'unique [].push 1',           fn: arrayAdd(1) },
  { name: 'unique new Set().add 1',     fn: setAdd(1) },
  { name: 'unique new OSet().add 1',    fn: oSetAdd(1) },
  { name: 'unique new FOSet().add 1',   fn: fOSetAdd(1) },
  { name: 'unique new FOSetM().add 1',  fn: fOSetMAdd(1) },

  { name: 'unique [].push 10',          fn: arrayAdd(10) },
  { name: 'unique new Set().add 10',    fn: setAdd(10) },
  { name: 'unique new OSet().add 10',   fn: oSetAdd(10) },
  { name: 'unique new FOSet().add 10',  fn: fOSetAdd(10) },
  { name: 'unique new FOSetM().add 10', fn: fOSetMAdd(10) },

  { name: 'unique [].push 20',          fn: arrayAdd(20) },
  { name: 'unique new Set().add 20',    fn: setAdd(20) },
  { name: 'unique new OSet().add 20',   fn: oSetAdd(20) },
  { name: 'unique new FOSet().add 20',  fn: fOSetAdd(20) },
  { name: 'unique new FOSetM().add 20', fn: fOSetMAdd(20) },

  { name: 'unique [].push 49',          fn: arrayAdd(49) },
  { name: 'unique new Set().add 49',    fn: setAdd(49) },
  { name: 'unique new OSet().add 49',   fn: oSetAdd(49) },
  { name: 'unique new FOSet().add 49',  fn: fOSetAdd(49) },
  { name: 'unique new FOSetM().add 49', fn: fOSetMAdd(49) },

  { name: 'unique [].push 50',          fn: arrayAdd(50) },
  { name: 'unique new Set().add 50',    fn: setAdd(50) },
  { name: 'unique new OSet().add 50',   fn: oSetAdd(50) },
  { name: 'unique new FOSet().add 50',  fn: fOSetAdd(50) },
  { name: 'unique new FOSetM().add 50', fn: fOSetMAdd(50) },

  { name: 'unique [].push 99',          fn: arrayAdd(99) },
  { name: 'unique new Set().add 99',    fn: setAdd(99) },
  { name: 'unique new OSet().add 99',   fn: oSetAdd(99) },
  { name: 'unique new FOSet().add 99',  fn: fOSetAdd(99) },
  { name: 'unique new FOSetM().add 99', fn: fOSetMAdd(99) },

  { name: 'unique [].push 100',         fn: arrayAdd(100) },
  { name: 'unique new Set().add 100',   fn: setAdd(100) },
  { name: 'unique new OSet().add 100',  fn: oSetAdd(100) },
  { name: 'unique new FOSet().add 100', fn: fOSetAdd(100) },
  { name: 'unique new FOSetM().add 49', fn: fOSetMAdd(100) },

  { name: 'unique [].push 1000',         fn: arrayAdd(1000) },
  { name: 'unique new Set().add 1000',   fn: setAdd(1000) },
  { name: 'unique new OSet().add 1000',  fn: oSetAdd(1000) },
  { name: 'unique new FOSet().add 1000', fn: fOSetAdd(1000) },
  { name: 'unique new FOSetM().add 1000', fn: fOSetMAdd(1000) },

  { name: 'unique [].push 10000',        fn: arrayAdd(10000) },
  { name: 'unique new Set().add 10000',  fn: setAdd(10000) },
  { name: 'unique new OSet().add 10000', fn: oSetAdd(10000) },
  { name: 'unique new FOSet().add 10000', fn: fOSetAdd(10000) },
  { name: 'unique new FOSetM().add 10000', fn: fOSetMAdd(10000) },
]);

