function makeClass() {
  function Class() {

  }

  Class.prototype.invoke = function(a,b,c) {
    return 1;
  };

  return new Class();
}

function makeClassThatDeopts() {
  function Class() { }

  Class.prototype.invoke = function(a,b,c) {
    var args = arguments;
    try { } catch(e) { }

    function foo () {
      args;
    }
    return foo;
  };

  return new Class();
}

var queue = []

for (var i = 0; i < 100; i++) {
  queue[i] = makeClass();
}
var id=0;
function invoker(obj) {
  obj.id = id++;
  obj.invoke();
}

function flush() {
  for (var i = 0; i < queue.length; i++) {
    invoker(queue[i]);
  }
}

(function test() {
  for (var i = 0; i < 10000; i++) {
    flush();
  }
}());

for (var i = 0; i < 100; i++) {
  queue[i] = makeClassThatDeopts();
}

(function test() {
  console.log('test 2');
  for (var i = 0; i < 10000; i++) {
    flush();
  }
  console.log('test 2 - done');
}());
