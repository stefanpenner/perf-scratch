function Foo() {
  this.data = 1;
}

Foo.prototype.act = function() {
  return "" + this.data;
}

function Bar() {
  this.data = null
}

Bar.prototype = Object.create(Foo.prototype);
function Baz() {
  this.data = [];
}

Baz.prototype = Object.create(Foo.prototype);


var foo = new Foo();
var bar = new Bar();
var baz = new Baz();

foo.act();
bar.act();

%OptimizeFunctionOnNextCall(foo.act);

foo.act();
bar.act();
baz.act();

%OptimizeFunctionOnNextCall(foo.act);

foo.act();
bar.act();
baz.act();


%OptimizeFunctionOnNextCall(foo.act);

foo.act();
bar.act();

