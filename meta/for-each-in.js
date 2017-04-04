

function Meta() {

}


Meta.prototype.forEachInNewer = function(key, subkey, fn) {
  let pointer = this;
  let seen;
  let calls;
  while (pointer !== undefined) {
    let map = pointer[key];
    if (map !== undefined) {
      let innerMap = map[subkey];
      if (innerMap !== undefined) {
        for (let innerKey in innerMap) {
          seen = seen || Object.create(null);
          if (!seen[innerKey]) {
            seen[innerKey] = true;
            calls = calls || [];
            calls.push([innerKey, innerMap[innerKey]]);
          }
        }
      }
    }
    pointer = pointer.parent;
  }
  if (calls !== undefined) {
    for (let i = 0; i < calls.length; i++) {
      let [innerKey, value] = calls[i];
      fn(innerKey, value);
    }
  }
};


Meta.prototype.forEachInNewer = function(key, subkey, fn) {
  let pointer = this;
  let seen;
  let calls;
  while (pointer !== undefined) {
    let map = pointer[key];
    if (map !== undefined) {
      let innerMap = map[subkey];
      if (innerMap !== undefined) {
        for (let innerKey in innerMap) {
          seen = seen || Object.create(null);
          if (!seen[innerKey]) {
            seen[innerKey] = true;
            calls = calls || [];
            calls.push([innerKey, innerMap[innerKey]]);
          }
        }
      }
    }
    pointer = pointer.parent;
  }
  if (calls !== undefined) {
    for (let i = 0; i < calls.length; i++) {
      let [innerKey, value] = calls[i];
      fn(innerKey, value);
    }
  }
};
Meta.prototype.forEachInNew = function(key, subkey, fn) {
  let pointer = this;
  let seen;
  let calls;
  while (pointer !== undefined) {
    let map = pointer[key];
    if (map !== undefined) {
      seen = seen || Object.create(null);
      let innerMap = map[subkey];
      if (innerMap !== undefined) {
        for (let innerKey in innerMap) {
          if (!seen[innerKey]) {
            seen[innerKey] = true;
            calls = calls || [];
            calls.push([innerKey, innerMap[innerKey]]);
          }
        }
      }
    }
    pointer = pointer.parent;
  }
  if (calls !== undefined) {
    for (let i = 0; i < calls.length; i++) {
      let [innerKey, value] = calls[i];
      fn(innerKey, value);
    }
  }
};

Meta.prototype.forEachInOld = function(key, subkey, fn) {
  let pointer = this;
  let seen = Object.create(null);
  let calls = [];
  while (pointer !== undefined) {
    let map = pointer[key];
    if (map) {
      let innerMap = map[subkey];
      if (innerMap) {
        for (let innerKey in innerMap) {
          if (!seen[innerKey]) {
            seen[innerKey] = true;
            calls.push([innerKey, innerMap[innerKey]]);
          }
        }
      }
    }
    pointer = pointer.parent;
  }
  for (let i = 0; i < calls.length; i++) {
    let [innerKey, value] = calls[i];
    fn(innerKey, value);
  }
};

console.log('meta forEachIn');

function callback() {

}

let empty = new Meta();
let notEmpty = new Meta();

const assert = require('assert');
notEmpty.foo = Object.create(null)
notEmpty.foo.bar = { name: 'stef' };

let result = {};
notEmpty.forEachInNew('foo', 'bar', function(key, value) {
  result[key] = value;
});

assert.equal(result.name, 'stef');

require('do-you-even-bench')([
  { name: 'newer (empty)', fn() { return empty.forEachInNewer('foo', 'bar', callback)}},
  { name: 'new (empty)', fn() { return empty.forEachInNew('foo', 'bar', callback)}},
  { name: 'old (empty)', fn() { return empty.forEachInOld('foo', 'bar', callback)}},

  { name: 'newer (notEmpty)', fn() { return notEmpty.forEachInNewer('foo', 'bar', callback)}},
  { name: 'new (notEmpty)', fn() { return notEmpty.forEachInNew('foo', 'bar', callback)}},
  { name: 'old (notEmpty)', fn() { return notEmpty.forEachInOld('foo', 'bar', callback)}},

  { name: 'newer (notEmpty miss)', fn() { return notEmpty.forEachInNewer('foo', 'baz', callback)}},
  { name: 'new (notEmpty miss)', fn() { return notEmpty.forEachInNew('foo', 'baz', callback)}},
  { name: 'old (notEmpty miss)', fn() { return notEmpty.forEachInOld('foo', 'baz', callback)}},
])
