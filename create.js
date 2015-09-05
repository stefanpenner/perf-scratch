function One(foo, bar) {
  this.foo = foo
  this.bar = bar;
}

function Two(options) {
  this.foo = options.foo;
  this.bar = options.bar;
}

var shape = {
  foo: undefined,
  bar: undefined
};

var keys = Object.keys(shape);

function REQUIRED() { }

function StructSeal(options){
  var c = this;
  keys.forEach(function(key) {
    if (options.hasOwnProperty(key)) {
      c[key] = options[key];
    } else if (shape[key] === REQUIRED) {
      throw new Error("Missing required" + key + " in struct");
    } else {
      c[key] = shape[field];
    }
  });

  Object.seal(this);
}

function Struct(options){
  var c = this;
  keys.forEach(function(key) {
    if (options.hasOwnProperty(key)) {
      c[key] = options[key];
    } else if (shape[key] === REQUIRED) {
      throw new Error("Missing required" + key + " in struct");
    } else {
      c[key] = shape[key];
    }
  });
}

function Struct2Seal(options){
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (options.hasOwnProperty(key)) {
      this[key] = options[key];
    } else if (shape[key] === REQUIRED) {
      throw new Error("Missing required" + key + " in struct");
    } else {
      this[key] = shape[key];
    }
  }

  Object.seal(this);
}

function Struct2(options){
  for (var i = 0; i< keys.length; i++) {
    var key = keys[i];
    if (options.hasOwnProperty(key)) {
      this[key] = options[key];
    } else if (shape[key] === REQUIRED) {
      throw new Error("Missing required" + key + " in struct");
    } else {
      this[key] = shape[key];
    }
  }
}

function Struct3(options){
  for (var i = 0; i< keys.length; i++) {
    var key = keys[i];
    this[key] = options[key];
  }
}

function Struct3Seal(options){
  for (var i = 0; i< keys.length; i++) {
    var key = keys[i];
    this[key] = options[key];
  }

  Object.seal(this);
}

function testOne() {
  return new One('a', 'b');
}

function testTwo() {
  return new Two({
    foo: 'a',
    bar: 'b'
  });
}


function testStruct() {
  return new Struct({
    foo: 'a',
    bar: 'b'
  });
}

function testStructSeal() {
  return new StructSeal({
    foo: 'a',
    bar: 'b'
  });
}

function testStruct2Seal() {
  return new Struct2Seal({
    foo: 'a',
    bar: 'b'
  });
}

function testStruct2() {
  return new Struct2({
    foo: 'a',
    bar: 'b'
  });
}

function testStruct3() {
  return new Struct3({
    foo: 'a',
    bar: 'b'
  });
}

function testStruct3Seal() {
  return new Struct3Seal({
    foo: 'a',
    bar: 'b'
  });
}

// run the scenarios to ensure they work, if they returned something complex assert for it
testOne();
testTwo();
testStructSeal();
testStruct();
testStruct2Seal();
testStruct2();

require('./bench')([
  { name: 'new F(x,y)',          fn: testOne         },
  { name: 'new F(pojo)',         fn: testTwo         },
  { name: 'struct (seal)',       fn: testStructSeal  },
  { name: 'struct (no-seal)',    fn: testStruct      },
  { name: 'struct2 (seal)',      fn: testStruct2Seal },
  { name: 'struct2 (no-seal)',   fn: testStruct2     },
  { name: 'struct3 (seal)',      fn: testStruct3Seal },
  { name: 'struct3 (no-seal)',   fn: testStruct3     }
]);


