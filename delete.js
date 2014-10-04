function makeDictionary() {
  var dict = { '-': undefined};
  return dict;
}

var i = 0;
var dict = makeDictionary();

function Foo() {

}

Foo.prototype = dict;

f = new Foo();
(function foo() {
  while(true) {
    f.bar === true;
  }
}());
