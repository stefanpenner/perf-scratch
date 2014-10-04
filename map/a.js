// noprotect
var science = require('science');
var now = require('performance-now');

// Lib-y stuff

var __guid = 0;

function guid(obj) {
  if (!obj.__guid__) {
    obj.__guid__ = __guid++;
  }

  return obj.__guid__;
}

function makeMap() {
  var map = Object.create(null);
  map.foo = 1;
  delete map.foo;
  return map;
}

function syncMap(mapped, source, mapFn) {
  var i,x, l, guidMap = makeMap();

  for (i = 0, l = mapped.length; i < l; i++) {
    var mappedItem = mapped[i];
    var sourceItem = mappedItem.__source__;
    guidMap[guid(sourceItem)] = mappedItem;
  }

  mapped.length = source.length;

  for (x = 0, l = source.length; x < l; x++) {
    var sourceItem = source[x];
    var sourceItemGuid = guid(source[x]);
    var mappedItem;

    if (guidMap[sourceItemGuid] === undefined) {
      mappedItem = mapFn(sourceItem);
      mappedItem.__source__ = sourceItem;
    } else {
      mappedItem = guidMap[sourceItemGuid];
    }

    mapped[x] = mappedItem;
  }
}

// Test

console.log("working...");

function ident(item) {
  try {} finally {}
  return item;
}

var counter = 0;
var mapped = [];
var source = [];
var swap = [];

function Entry(foo) {
  this.foo = foo;
  this.__guid__ = undefined;
  this.__source__ = undefined;
}

for (var i = 0; i < 50000; i++) {
  source.push(new Entry(counter++));
}

for (var i = 0; i < 1000; i++) {
  swap.push(new Entry(counter++));
}

syncMap(mapped, source, ident);

var times = [];

for (var runs = 0; runs < 100; runs++) {
  var newSwap = [];

  for (var i = 0; i < swap.length; i++) {
    var j = Math.floor(Math.random() * source.length);
    newSwap.push(source.splice(j, 1)[0]);
  }

  for (var i = 0; i < swap.length; i++) {
    var j = Math.floor(Math.random() * (source.length+1));
    source.splice(j, 0, swap[i]);
  }

  swap = newSwap;

  var startTime = now();

  syncMap(mapped, source, ident);

  times.push(now() - startTime)
}

console.log("(times in ms)");
console.log("mean:", science.stats.mean(times));
console.log("sd:", Math.sqrt(science.stats.variance(times)));
