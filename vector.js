function Vector(x, y) {
  this[0] = x;
  this[1] = y;
}

Vector.prototype.dot = function(other) {
  if (other) {
    return this[0] * other[0] + this[1] * other[0];
  }
};

Vector.prototype.blah = function(other) {
  other + other;
}

var v = new Vector(1, 2);
v.dot(v);

v = new Vector(1.5, 2.2);
v.dot(v);

// force dot

%OptimizeFunctionOnNextCall(Vector.prototype.dot);
v.dot(v)
%OptimizeFunctionOnNextCall(Vector.prototype.dot);
v.dot(null);
