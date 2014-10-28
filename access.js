function randomObject() {
  var prop = 'a' + (Math.random() * 10000000|0);
  var obj = {
    a: 'value',
    getter: new Function('o', 'return this.' + prop),
    prop: prop
  };

  obj[prop] = 'value';

  return obj;
}

var A_KEY = 'a';

var objs = new Array(1000);

for (var i =0; i < 1000; i++){
  objs[i] = randomObject();
}


function checkObjectsA() {
  return objs.forEach(function(obj) {
    if (obj.a === 'value') {
      return 1;
    } else {
      return 2;
    }
  })
}

function checkObjectsB() {
  return objs.forEach(function(obj) {
    if (obj[A_KEY] === 'value') {
      return 1;
    } else {
      return 2;
    }
  })
}

function checkObjectsC() {
  return objs.forEach(function(obj) {
    if (obj.getter(obj) === 'value') {
      return 1;
    } else {
      return 2;
    }
  })
}

function checkObjectsD() {
  return objs.forEach(function(obj) {
    if (obj['a'] === 'value') {
      return 1;
    } else {
      return 2;
    }
  })
}

require('./bench')([
  { name: '.',      fn: function() { checkObjectsA(); } },
  { name: '[]',     fn: function() { checkObjectsB(); } },
  { name: 'getter', fn: function() { checkObjectsC(); } },
  { name: "['a']",  fn: function() { checkObjectsD(); } },
]);
