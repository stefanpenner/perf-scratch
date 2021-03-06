let array = [{},{},{},{},{},{},{},{},{},{}];
let set = new Set(array);
let OrderedSet = require('./implementations/ordered-set');

function find(array, entity) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === entity) {
      return true;
    }
  }

  return false;
}

function arrayIncludes(count, offset) {
  let array = [];
  for (let i = 0; i < count; i++) {
    array.push({});
  }
  let entry = array[offset];

  return function() {
    return array.includes(entry)
  };
}

function arrayFind(count, offset) {
  let array = [];
  for (let i = 0; i < count; i++) {
    array.push({});
  }
  let entry = array[offset];

  return function() {
    return find(array, entry);
  };
}

function setHas(count, offset) {
  let set = new Set();
  let entry;
  for (let i = 0; i < count; i++) {
    let x = {};
    if (offset === i) {
      entry = x;
    }
    set.add(x);
  }

  return function() {
    return set.has(entry)
  };
}
function oSetHas(count, offset) {
  let set = new OrderedSet();
  let entry;
  let entryKey;
  for (let i = 0; i < count; i++) {
    let x = {};
    let key = 'foo' + i;
    if (offset === i) {
      entry = x;
      entryKey = key;
    }
    set.add(x, key);
  }

  return function() {
    return set.has(entry, entryKey);
  };
}

const MISSING = {};
console.log('has');
require('do-you-even-bench')([
  { name: '1 array.includes(FIRST)', fn: arrayIncludes(1, 0) },
  { name: '1 set.has(FIRST)',        fn: setHas(1, 0) },
  { name: '1 oSet.has(FIRST)',       fn: oSetHas(1, 0) },
  { name: '1 find(array, FIRST)',    fn: arrayFind(1, 0) },

  { name: '5 array.includes(LAST)', fn: arrayIncludes(5, 4) },
  { name: '5 set.has(LAST)',        fn: setHas(5, 4) },
  { name: '5 oSet.has(LAST)',       fn: oSetHas(5, 4) },
  { name: '5 find(array, LAST)',    fn: arrayFind(5, 4) },

  { name: '10 array.includes(LAST)',  fn: arrayIncludes(10, 9) },
  { name: '10 set.has(LAST)',         fn: setHas(10, 9) },
  { name: '10 oSet.has(LAST)',        fn: oSetHas(10, 9) },
  { name: '10 find(array, LAST)',     fn: arrayFind(10, 9) },

  { name: '10 array.includes(MIDDLE)',  fn: arrayIncludes(10, 5) },
  { name: '10 set.has(MIDDLE)',         fn: setHas(10, 5) },
  { name: '10 oSet.has(MIDDLE)',        fn: oSetHas(10, 5) },
  { name: '10 find(array, MIDDLE)',     fn: arrayFind(10, 5) },

  { name: '15 array.includes(LAST)',  fn: arrayIncludes(15, 14) },
  { name: '15 set.has(LAST)',         fn: setHas(15, 14) },
  { name: '15 oSet.has(LAST)',        fn: oSetHas(15, 14) },
  { name: '15 find(array, LAST)',     fn: arrayFind(15, 14) },

  { name: '20 array.includes(LAST)',  fn: arrayIncludes(20, 19) },
  { name: '20 set.has(LAST)',         fn: setHas(20, 19) },
  { name: '20 oSet.has(LAST)',        fn: oSetHas(20, 19) },
  { name: '20 find(array, LAST)',     fn: arrayFind(20, 19) },

  { name: '20 array.includes(MIDDLE)',  fn: arrayIncludes(20, 9) },
  { name: '20 set.has(MIDDLE)',         fn: setHas(20, 9) },
  { name: '20 oSet.has(MIDLE)',         fn: oSetHas(20, 9) },
  { name: '20 find(array, MIDDLE)',     fn: arrayFind(20, 9) },

  { name: '20 array.includes(undefined)',  fn: arrayIncludes(20, 20) },
  { name: '20 set.has(undefined)',         fn: setHas(20, 20) },
  { name: '20 oSet.has(undefined)',        fn: oSetHas(20, 20) },
  { name: '20 find(array, undefined)',     fn: arrayFind(20, 20) },

  { name: '100 array.includes(LAST)',  fn: arrayIncludes(100, 99) },
  { name: '100 set.has(LAST)',         fn: setHas(100, 09) },
  { name: '100 set.oHas(LAST)',        fn: oSetHas(100, 09) },
  { name: '100 find(array, LAST)',     fn: arrayFind(100, 99) },

  { name: '100 array.includes(MIDDLE)',  fn: arrayIncludes(100, 50) },
  { name: '100 set.has(MIDDLE)',         fn: setHas(100, 50) },
  { name: '100 oSet.has(MIDDLE)',        fn: oSetHas(100, 50) },
  { name: '100 find(array, MIDDLE)',     fn: arrayFind(100, 50) },

  { name: '100 array.includes(undefined)',  fn: arrayIncludes(100, 100) },
  { name: '100 set.has(undefined)',         fn: setHas(100, 100) },
  { name: '100 oSet.has(undefined)',        fn: oSetHas(100, 100) },
  { name: '100 find(array, undefined)',     fn: arrayFind(100, 100) },

  { name: '1000 array.includes(LAST)',  fn: arrayIncludes(1000, 999) },
  { name: '1000 set.has(LAST)',         fn: setHas(1000, 999) },
  { name: '1000 oSet.has(LAST)',        fn: oSetHas(1000, 999) },
  { name: '1000 find(array, LAST)',     fn: arrayFind(1000, 999) },

  { name: '1000 array.includes(MIDDLE)',  fn: arrayIncludes(1000, 500) },
  { name: '1000 set.has(MIDDLE)',         fn: setHas(1000, 500) },
  { name: '1000 oSet.has(MIDDLE)',        fn: oSetHas(1000, 500) },
  { name: '1000 find(array, MIDDLE)',     fn: arrayFind(1000, 500) },

  { name: '1000 array.includes(undefined)',  fn: arrayIncludes(1000, 1000) },
  { name: '1000 set.has(undefined)',         fn: setHas(1000, 1000) },
  { name: '1000 oSet.has(undefined)',        fn: oSetHas(1000, 1000) },
  { name: '1000 find(array, undefined)',     fn: arrayFind(1000, 1000) },

]);

