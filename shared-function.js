function Person( ){

}

function Car( ){
  this.bar = 1;
}

Person.prototype.foo = foo;
Car.prototype.foo = foo;

function foo() {
  for (var i in this) {

  }
  return 1+1;
}

var count = 0;
var a = new Person();
var b = new Car();

(function() {
  while (true) {
    a.foo();
    count++
  }
}());

delete b.bar;
while (true) {
  b.foo();
}
