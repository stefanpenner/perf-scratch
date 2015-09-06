'use strict';
class Bar {
  name( ) {
    return 'BAR';
  }

  otherName() {
    return 'BAR';
  }

  traditionalName() {
    return 'BAR';
  }

  emberName() {
    return 'BAR';
  }
}

class Foo extends Bar {
  name() {
    return 'FOO' + super.name();
  }
  otherName() {
    return 'FOO' + this._superBar$otherName();
  }

  traditionalName() {
    return 'FOO' + Bar.prototype.traditionalName.call(this);
  }

  emberName() {
    return 'FOO' + this._super();
  }
}

class Baz extends Foo {
  name() {
    return 'Baz' + super.name();
  }

  otherName() {
    return 'Baz' + this._superFoo$otherName();
  }

  traditionalName() {
    return 'Baz' + Foo.prototype.traditionalName.call(this);
  }

  emberName() {
    return 'Baz' + this._super();
  }
}

function giveMethodSuper(_super, fn) {
  return function() {
    var previousSuper = this._super;
    this._super = _super;

    var result = fn.call(this);
    this._super = previousSuper;
    return result;
  }
};

Bar.prototype.emberName = function() {
  return 'BAR';
};

Foo.prototype.emberName = giveMethodSuper(Bar.prototype.emberName, Foo.prototype.emberName);
Baz.prototype.emberName = giveMethodSuper(Foo.prototype.emberName, Baz.prototype.emberName);

Bar.prototype.toMethodName = function() {
  return 'BAR';
};

Foo.prototype.constructor = Foo;

Foo.prototype.toMethodName = function () {
    return 'FOO' + super.name();
}.toMethod(Foo.prototype);

Baz.prototype.constructor = Baz;

Baz.prototype.toMethodName = function () {
    return 'Baz' + super.name();
}.toMethod(Baz.prototype);


Foo.prototype._superBar$otherName = Bar.prototype.otherName;
Baz.prototype._superFoo$otherName = Foo.prototype.otherName;

var bar = new Bar();
var foo = new Foo();
var baz = new Baz();

var assert = require('assert');

assert(bar.name() === 'BAR');
assert(foo.name() === 'FOOBAR');
assert(baz.name() === 'BazFOOBAR');

assert(bar.otherName() === 'BAR');
assert(foo.otherName() === 'FOOBAR');
assert(baz.otherName() === 'BazFOOBAR');

assert(bar.traditionalName() === 'BAR');
assert(foo.traditionalName() === 'FOOBAR');
assert(baz.traditionalName() === 'BazFOOBAR');

assert(bar.toMethodName() === 'BAR');
assert(foo.toMethodName() === 'FOOBAR');
assert(baz.toMethodName() === 'BazFOOBAR');

assert(bar.name() === 'BAR');
assert(foo.emberName() === 'FOOBAR');
assert(baz.emberName() === 'BazFOOBAR');

require('do-you-even-bench')([
  { name: 'bar.name', fn: function() { return bar.name(); } },
  { name: 'foo.name', fn: function() { return foo.name(); } },
  { name: 'baz.name', fn: function() { return baz.name(); } },

  { name: 'bar.otherName', fn: function() { return bar.otherName(); } },
  { name: 'foo.otherName', fn: function() { return foo.otherName(); } },
  { name: 'baz.otherName', fn: function() { return baz.otherName(); } },

  { name: 'bar.traditionalName', fn: function() { return bar.traditionalName(); } },
  { name: 'foo.traditionalName', fn: function() { return foo.traditionalName(); } },
  { name: 'baz.traditionalName', fn: function() { return baz.traditionalName(); } },

  { name: 'bar.toMethodName', fn: function() { return bar.toMethodName(); } },
  { name: 'foo.toMethodName', fn: function() { return foo.toMethodName(); } },
  { name: 'baz.toMethodName', fn: function() { return baz.toMethodName(); } },

  { name: 'bar.emberName', fn: function() { return bar.emberName(); } },
  { name: 'foo.emberName', fn: function() { return foo.emberName(); } },
  { name: 'baz.emberName', fn: function() { return baz.emberName(); } },
])
