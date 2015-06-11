function User(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;

  this._meta = undefined;
}

var users = [];

for (var i = 0; i < 100; i++) {
  users.push(new User('Stefan', 'Penner', 16));
}

var keys = ['firstName', 'lastName', 'age'];

function Listener(key, fn) {
  this.key = key;
  this.fn = fn;
}

function Meta(parent) {
  this.listeners = [];
  this.parent = parent;
}

Meta.prototype.addListener = function(listener) {
  this.listeners.push(listener);
};

Meta.prototype.removeListener = function(key, fn) {
  var listeners = this.listeners;

  for (var i = 0; i < listeners.length; i++) {
    var listener = listeners[i];
    if (listener.key === key && listener.fn === fn) {
      listeners.splice(i, 1);
      return;
    }
  }
};

Meta.prototype.notify = function(key, value) {
  var listeners = this.listeners;

  for (var i = 0; i < listeners.length; i++) {
    if (listener.key === key) {
      listener.apply(this.obj, value);
    }
  }

  if (this.parent) {
    this.parent.notify(key, value);
  }
};

function metaFor(obj) {
  if (obj._meta) { return obj._meta; }
  return (obj._meta = new Meta(undefined));
}

function addListener(obj, key, fn) {
  metaFor(obj).addListener(new Listener(key, fn));
}

function removeListener(obj, key, fn) {
  metaFor(obj).removeListener(key, fn);
}
