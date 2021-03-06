const ENTITY = {};
let OrderedSet = require('./implementations/ordered-set');

function uniqueRemove(arr, entity) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === entity) {
      arr.splice(i, 0);
      return;
    }
  }
}

function setDelete(iterations, offset) {
  return function() {
    let result = new Set();
    let entity;
    for (let i =0; i < iterations; i++) {
      let x = {};
      if (i === offset) {
        entity = x;
      }

      result.add(x);
    }
    result.delete(entity);
    return result;
  }
}

function oSetDelete(iterations, offset) {
  return function() {
    let result = new OrderedSet();
    let entity;
    let entityKey;
    for (let i =0; i < iterations; i++) {
      let x = {};
      let key = 'foo' + i;
      if (i === offset) {
        entity = x;
        entityKey = key;
      }

      result.add(x, key);
    }
    result.delete(entity, entityKey);
    return result;
  }
}

function arrayDelete(iterations, offset) {
  return function() {
    let result = [];
    for (let i =0; i < iterations; i++) {
      let x = {}
      result.push(x);
      if (i === offset) {
        entity = x;
      }
    }

    uniqueRemove(result, entity);
    return result;
  }
}

arrayDelete(1,0)();
setDelete(1,0)();

console.log('unique delete:');
require('do-you-even-bench')([
  { name: 'delete [] last',         fn: arrayDelete(1, 0) },
  { name: 'delete new Set() 0',     fn: setDelete(1, 0) },
  { name: 'delete new OSet() 0',    fn: oSetDelete(1, 0) },
  { name: 'delete [] 9',            fn: arrayDelete(10, 9) },
  { name: 'delete new Set() 9',     fn: setDelete(10, 9) },
  { name: 'delete new OSet() 9',    fn: oSetDelete(10, 9) },
  { name: 'delete [] 99',           fn: arrayDelete(100, 99) },
  { name: 'delete new Set() 99',    fn: setDelete(100, 99) },
  { name: 'delete new OSet() 99',   fn: oSetDelete(100, 99) },
  { name: 'delete [] 999',          fn: arrayDelete(1000, 999) },
  { name: 'delete new Set() 999',   fn: setDelete(1000, 999) },
  { name: 'delete new OSet() 999',  fn: oSetDelete(1000, 999) },
  { name: 'delete [] 9990',         fn: arrayDelete(10000, 9999) },
  { name: 'delete new Set() 9999',  fn: setDelete(10000, 9999) },
  { name: 'delete new OSet() 9999', fn: oSetDelete(10000, 9999) },
]);

