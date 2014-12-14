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
}

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

require('./bench')([
  { name: 'bar.name', fn: function() { return bar.name(); } },
  { name: 'foo.name', fn: function() { return foo.name(); } },
  { name: 'baz.name', fn: function() { return baz.name(); } },

  { name: 'bar.otherName', fn: function() { return bar.otherName(); } },
  { name: 'foo.otherName', fn: function() { return foo.otherName(); } },
  { name: 'baz.otherName', fn: function() { return baz.otherName(); } },

  { name: 'bar.traditionalName', fn: function() { return bar.traditionalName(); } },
  { name: 'foo.traditionalName', fn: function() { return foo.traditionalName(); } },
  { name: 'baz.traditionalName', fn: function() { return baz.traditionalName(); } },
]);
